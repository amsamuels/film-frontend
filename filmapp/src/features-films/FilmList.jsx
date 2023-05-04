import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsPencilSquare } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { JSONtoXML } from '../apicalls';

export const FilmList = ({ film, format }) => {
  //creates a variable called url and assigns it a string value
  const url = 'http://localhost:8080/filmapi/mainapi';
  // handleRemoveUser function takes in a single parameter called id.
  const handleRemoveUser = (id) => {
    const filmID = {
      id: parseInt(id),
    };
    // It then checks if the format is equal to ‘xml’.
    if (format == 'xml') {
    // If it is, it creates a variable called fID and assigns it an object.
      const fID = {
        film: [
          {
            id: parseInt(id),
          },
        ],
      };
      //If the format is equal to ‘xml’, it then creates a variable called xml 
      // and assigns it the value of JSONtoXML(fID) which is the json object parsed to xml 
      const xml = JSONtoXML(fID);
      //send a DELETE request to the url variable that we created earlier. It passes in the following parameters:
      axios.delete(url, {
        headers: {
          'Content-Type': 'application/xml',
        },
        //we’re sending the XML variable that we created in the previous step.
        data: xml,
      });
    }
      // It then checks if the format is equal to text.
    if (format == 'text') {
      // convert the filmID object to an array.
      const text = Object.values(filmID);
      // convert the array to a string.
      const newText = text.join('#');
      // send a DELETE request to the server.
      axios.delete(url, {
        data: newText,
      });
    // else execute this 
    } else {
        // send a DELETE request to the server in json.
      axios.delete(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: filmID,
      });
    }
    // Reload the page
    window.location.reload();
  };
  return (
    <>
      {film.map((films) => (
        <div
          className='bg-gray-300 p-5 flex items-center justify-between'
          key={films.id}
        >
          <div>
            <div>
              <span className='font-bold text-lg text-gray-700'>ID: </span>
              <span className='font-normal text-gray-600'>{films.id}</span>
            </div>
            <div>
              <span className='font-bold text-lg text-gray-700'>Title: </span>
              <span className='font-normal text-gray-600'>{films.title}</span>
            </div>
            <div>
              <span className='font-bold text-lg text-gray-700'>Year: </span>
              <span className='font-normal text-gray-600'>{films.year}</span>
            </div>
            <div>
              <span className='font-bold text-lg text-gray-700'>Director:</span>
              <span className='font-normal text-gray-600'>
                {films.director}
              </span>
            </div>
            <div>
              <span className='font-bold text-lg text-gray-700'>Stars: </span>
              <span className='font-normal text-gray-600'>{films.stars}</span>
            </div>
            <div>
              <span className='font-bold text-lg text-gray-700'>Review:</span>
              <span className='font-normal text-gray-600'>{films.review}</span>
            </div>
          </div>
          <div className='flex gap-4 justify-items-center items-center'>
            <Link to={`/edit-film/${films.id}`}>
              <button>
                <BsPencilSquare className='h-8 w-8' />
              </button>
            </Link>
            <button onClick={() => handleRemoveUser(films.id)}>
              <RiDeleteBin6Line className='h-8 w-8' />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
export default FilmList;
