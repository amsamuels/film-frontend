import React from 'react';
import { useState, useCallback } from 'react';
import {
  filmDataJson,
  filmDataXml,
  filmDataText,
  filmDataByName,
  filmDataByYear,
} from '../apicalls';
import Button from '../component/Button';
import { Link } from 'react-router-dom';
import { catchErrors } from '../utils';
import XMLParser from 'react-xml-parser';
import { Pagination } from '@mui/material';
import { FilmList } from './FilmList';
import { Select } from '../component/index';
const Films = () => {
  const [film, setFilm] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [drop, setDrop] = useState('');
  const [currentPage, setcurrentPage] = useState(1);
  const filmPerPage = 8;
  const [buttons, setButtons] = useState([
    {
      id: 'json',
      enabled: false,
      format: 'JSON',
      onClick: () => setFormat('json'),
    },
    {
      id: 'xml',
      enabled: false,
      format: 'XML',
      onClick: () => setFormat('xml'),
    },
    {
      id: 'text',
      enabled: false,
      format: 'Text',
      onClick: () => setFormat('text'),
    },
  ]);

  const changeFormat = useCallback(async (format) => {
    try {
      setLoading(true);
      let filmData;
      let newData;
      // Checks if the format selected is equal to json
      if (format == 'json') {
        // makes api request if the format seleted is equal to json
        // assigns the data retunred by the api to the filmData variable
        filmData = await filmDataJson();
        //It creates a new variable called newData and assigns it the value
        // of the filmList property of the data property of the filmData object.
        newData = filmData.data.filmList;
        // Checks if the format selected is equal to xml
      } else if (format == 'xml') {
        // makes api request if the format seleted is equal to XML
        // assigns the data retunred by the api to the filmData variable
        filmData = await filmDataXml();
        // It parses the XML data into a JavaScript object.
        const jsonDataFromXml = new XMLParser().parseFromString(filmData.data);
        const newXmlf = jsonDataFromXml.children;
        // It creates a new array of objects, where each object has a key of "children" and a value of an array of objects.
        const result = newXmlf.map((film) => ({
          children: film.children.map((newfilm) => {
            return newfilm;
          }),
        }));
        // First, we create a new array called newData. Next, we loop through the result array.
        // Inside the loop, we create a new object and assign it to the newData array.
        // We then add the values of the input fields to the new object. Finally, we return the newData array.
        newData = result.map((filmObj) => ({
          id: filmObj.children[1].value,
          director: filmObj.children[0].value,
          review: filmObj.children[2].value,
          stars: filmObj.children[3].value,
          title: filmObj.children[4].value,
          year: filmObj.children[5].value,
        }));
        // Checks if the format selected is equal to text
      } else if (format == 'text') {
        // makes api request if the format seleted is equal to Text
        // assigns the data retunred by the api to the filmData variable
        filmData = await filmDataText();
        //creates a variable called rawData and assigns it the value of the filmData.data object.
        const rawData = filmData.data;
        // Split the raw data string into an array of strings,
        const arr = rawData
          // where each string is a substring of the raw data string that is separated by a “%” character.
          .split('%')
          // Filters out any empty strings from the array.
          .filter(Boolean)
          //Maps each substring into an array of strings,
          //where each string is a substring of the substring that is separated by a “#” character.
          .map((substr) => substr.split('#'));
          //takes the data from the array and maps it to a new array.
        newData = arr.map((filmObj) => ({
          id: filmObj[0],
          title: filmObj[1],
          year: filmObj[2],
          director: filmObj[3],
          stars: filmObj[4],
          review: filmObj[5],
        }));
      }
      // sets the `film` state to the new data.
      setFilm(newData);
      //sets the `error` state to `null`.
      setError(null);
    } catch (err) {
        // sets the Error state to err
      setError(err);
    } finally {
      // sets the loading state to false
      setLoading(false);
    }
  });
  // sets the data format to the chosen format
  const setFormat = (format) => catchErrors(changeFormat(format));
  // finds the index of the last film on the current page.
  const indexOfLastFilm = currentPage * filmPerPage;
   // finds the index of the first film on the current page.
  const indexOfFirstFilm = indexOfLastFilm - filmPerPage;
  //It creates a new array called currentFilm that contains the films from indexOfFirstFilm to indexOfLastFilm.
  const currentFilm = film.slice(indexOfFirstFilm, indexOfLastFilm);
  // First, it checks if the loading state is true. If it is, it returns a loading animation.
  // If the loading state is false, it returns the actual content.
  if (loading) {
    return (
      <div className='flex flex-col space-y-3 animate-pulse p-4 container mx-auto max-w-2xl'>
        <div className='h-6 bg-gray-300 mt-5 rounded-md'></div>
        <div className='h-40 bg-gray-300 mt-5 rounded-md'></div>
        <div className='h-8 bg-gray-300 mt-5 rounded-md'></div>
        <div className='h-40 bg-gray-300 mt-5 rounded-md'></div>
      </div>
    );
  }

  //set the current page to the value of the `value` property of the `e` event.
  const paginate = (e, value) => {
    //`setcurrentPage` function to set the current page to the value of the `value` property of the `e` event.
    setcurrentPage(value);
    //scroll to the top of the page.
    window.scrollTo({ top: 1600, behavior: 'smooth' });
  };

  const options = [
    { label: 'Search By', value: 'name' },
    { label: 'Name', value: 'name' },
    { label: 'Year', value: 'year' },
  ];
  const searchFilm = async (query, drop) => {
    try {
      //setting the loading state to true.
      setLoading(true);
      let filmData;
      let newData;
      //Then, we’re calling the filmDataByYear() or filmDataByName() functions dependig on the parameter passed
      if (drop == 'year') {
        filmData = await filmDataByYear(query);
        newData = filmData.data.filmList;
      } else if (drop == 'name') {
        filmData = await filmDataByName(query);
        newData = filmData.data.filmList;
      }
      // If the function call is successful, we’re setting the film state to the new data.
      setFilm(newData);
      setError(null);
    } catch (err) {
      // If the function call is unsuccessful, we’re setting the error state to the error.
      setError(err);
    } finally {
      // Finally, we’re setting the loading state to false.
      setLoading(false);
    }
  };
  //checks if there’s an error. If there is, it returns a message to the user.
  if (error) {
    return (
      <h3 className='text-center mt-10 font-semibold text-gray-500'>
        No Films Found 😥
      </h3>
    );
  }

  return (
    <div>
      <div>
        <div className='flex items-center justify-center mt-5'>
          <div className='flex border-2 border-gray-200 rounded'>
            <input
              className='px-4 py-2 md:w-52'
              type='text'
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search...'
            />
            <button
              onClick={() => searchFilm(query, drop)}
              className='bg-blue-400 border-l px-4 py-2 text-white'
            >
              Search
            </button>
            <Select
              options={options}
              onChange={(e) => setDrop(e.target.value)}
            />
          </div>
        </div>
        <Link to={'/add-film'}>
          <Button>Add Film</Button>
        </Link>
        <div className='py-4'>
          <div className='flex flex-row space-x-4'>
            {buttons.map(({ id, enabled, format, onClick }) => {
              return (
                <div key={id} className={enabled ? '' : ''}>
                  <button
                    onClick={() => {
                      setButtons((prevButtons) => {
                        return prevButtons.map((button) => {
                          return {
                            ...button,
                            enabled: button.id === id ? !button.enabled : false,
                          };
                        });
                      });
                    }}
                  >
                    <div
                      onClick={onClick}
                      className={
                        enabled
                          ? 'underline font-bold '
                          : ' font-bold hover:cursor-pointer'
                      }
                    >
                      {format}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className='grid gap-5 md:grid-cols-2'>
        {film.length ? (
          <FilmList film={currentFilm} format={buttons} query={query} />
        ) : (
          <h3 className='text-center mt-10 font-semibold text-gray-500'>
            Please Select a Data Format 😥
          </h3>
        )}
      </div>
      <div className='m-4 flex items-center justify-center '>
        {film.length > filmPerPage && (
          <Pagination
            color='standard'
            shape='rounded'
            size='large'
            defaultPage={1}
            page={currentPage}
            count={Math.ceil(film.length / filmPerPage)}
            onChange={paginate}
            className='bg-white md:flex items-center justify-center md:w-[460px] h-[55px]  w-[300px] p-2 rounded-md'
          />
        )}
      </div>
    </div>
  );
};
export default Films;
