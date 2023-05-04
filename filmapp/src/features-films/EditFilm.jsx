import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { JSONtoXML } from '../apicalls';
import { catchErrors } from '../utils';
import { filmDataById } from '../apicalls';
import { TextField, TextArea, Button } from '../component';

const EditFilm = ({}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const url = 'http://localhost:8080/filmapi/mainapi';
  const [format, setFormat] = useState('selectFormat');
  const [filmUpdate, setFilmUpdate] = useState(null);
  //create a state for the form values.
  const [values, setValues] = useState({
    id: id,
    title: '',
    year: '',
    director: '',
    stars: '',
    review: '',
  });
  // create a memoized version of the getFilmbyID function.
  const getFilmbyID = useCallback(async (id) => {
    const filmJson = await filmDataById(id);
    // We’re setting the filmUpdate state to the filmJson.data object.
    setFilmUpdate(filmJson.data);
  });
  useEffect(() => {
    catchErrors(getFilmbyID(id));
  }, []);
  // sets the format to the value of the input.
  const handleOnChange = (e) => {
    setFormat(e.target.value);
  };
  
  const handleEditFilm = (format) => {
    //checks if the format is JSON
    if (format == 'json') {
      // send a PUT request to the server in json.
      axios.put(url, values, {
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
            id: values.id,
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
      // send a PUT request to the server in xml.
      axios
        .put(url, xml, {
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
    // //checks if the format is Text
    if (format == 'text') {
      //convert the values object to an array of strings.
      const text = Object.values(values);
      const newText = text.join('#');
        // send a PUT request to the server in text
      axios
        .put(url, newText, {
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
      {filmUpdate &&  (
        <div>
          <TextField
            label='Title'
            value={filmUpdate.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            inputProps={{ type: 'text', placeholder: filmUpdate.title }}
          />
          <br />
          <TextField
            label='Director'
            value={filmUpdate.director}
            onChange={(e) => setValues({ ...values, director: e.target.value })}
            inputProps={{ type: 'text', placeholder: filmUpdate.director }}
          />
          <br />
          <TextField
            label='Stars'
            value={filmUpdate.stars}
            onChange={(e) => setValues({ ...values, stars: e.target.value })}
            inputProps={{ type: 'text', placeholder: filmUpdate.stars }}
          />
          <br />
          <TextField
            label='Year'
            value={filmUpdate.year}
            onChange={(e) => setValues({ ...values, year: e.target.valueAsNumber })}
            inputProps={{ type: 'number', placeholder: filmUpdate.year }}
          />
          <br />
          <TextArea
            label='Review'
            value={filmUpdate.review}
            onChange={(e) => setValues({ ...values, review: e.target.value })}
            inputProps={{ type: 'text', placeholder: filmUpdate.review }}
          />
        </div>
      )}
        <div className='relative w-full lg:max-w-sm space-x-4'>
        <select
          className='form-select'
          value={format}
          onChange={handleOnChange}
        >
          <option value='selectFormat'>Select Format</option>
          <option value='json'>Json</option>
          <option value='xml'>Xml</option>
          <option value='text'>Text</option>
        </select>
        <Button onClick={() => handleEditFilm(format)}>Submit</Button>
      </div>
    </div>
  );
};

export default EditFilm;
