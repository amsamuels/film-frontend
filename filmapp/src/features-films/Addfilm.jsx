import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, TextArea, Button } from '../component';
import axios from 'axios';
import { JSONtoXML } from '../apicalls';

const Addfilm = () => {
  const url = 'http://localhost:8080/filmapi/mainapi';
  const [format, setFormat] = useState('selectFormat');
  const navigate = useNavigate();
   //create a state for the form values.
  const [values, setValues] = useState({
    title: '',
    year: '',
    director: '',
    stars: '',
    review: '',
  });
// create a function which handles an event
  const handleOnChange = (e) => {
    // We’re setting the format state to the selected value.
    setFormat(e.target.value);
  };
  const handleAddFilm = (format) => {
     //checks if the format is JSON
    if (format == 'json') {
        // send a POST request to the server in json.
      axios
        .post(url, values, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
     // //checks if the format is XML
    if (format == 'xml') {
       //create a new object called newfilm.
      const newfilm = {
        film: [
          {
            director: values.director,
            review: values.review,
            stars: values.stars,
            title: values.title,
            year: values.year,
          },
        ],
      };
        //convert the values object to XML.
      const xml = JSONtoXML(newfilm);
        // send a POST request to the server in xml.
      axios
        .post(url, xml, {
          headers: {
            'Content-Type': 'application/xml',
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (format == 'text') {
      const text = Object.values(values);
      const newText = text.join('#');
      axios
      .post(url, newText, {
        headers: {},
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    navigate('/');
  };

  return (
    <div className='mt-8 mb-6 max-w-xl mx-auto'>
      <TextField
        label='Title'
        value={values.title}
        onChange={(e) => setValues({ ...values, title: e.target.value })}
        inputProps={{ type: 'text', placeholder: 'Title' }}
      />
      <br />
      <TextField
        label='Director'
        value={values.director}
        onChange={(e) => setValues({ ...values, director: e.target.value })}
        inputProps={{ type: 'text', placeholder: 'Director' }}
      />
      <br />
      <TextField
        label='Stars'
        value={values.stars}
        onChange={(e) => setValues({ ...values, stars: e.target.value })}
        inputProps={{ type: 'text', placeholder: 'Stars' }}
      />
      <br />
      <TextField
        label='Year'
        value={values.year}
        onChange={(e) => setValues({ ...values, year: e.target.valueAsNumber })}
        inputProps={{ type: 'number', placeholder: 'Year' }}
      />
      <br />
      <TextArea
        label='Review'
        value={values.review}
        onChange={(e) => setValues({ ...values, review: e.target.value })}
        inputProps={{ type: 'text', placeholder: 'Review' }}
      />
      <div className='relative w-full lg:max-w-sm space-x-4'>
        <select
          className=''
          value={format}
          onChange={handleOnChange}
        >
          <option value='selectFormat'>Select Format</option>
          <option value='json'>Json</option>
          <option value='xml'>Xml</option>
          <option value='text'>Text</option>
        </select>
        <Button onClick={() => handleAddFilm(format)}>Submit</Button>
      </div>
    </div>
  );
};

export default Addfilm;
