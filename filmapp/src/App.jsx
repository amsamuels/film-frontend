import react from 'react';
import { Route, Routes } from 'react-router-dom';
import { Addfilm, EditFilm, Films } from './features-films/index';

function App() {
  return (
    <div className='container mx-auto px-2 max-w-5xl pt-10 md:pt-32'>
    <h1 className="text-center font-bold text-2xl text-gray-700">Film App</h1>
      <Routes>
        <Route path='/' element={<Films />}></Route>
        <Route path='add-film' element={<Addfilm />} />
        <Route path='/edit-film/:id' element={<EditFilm />} />
      </Routes>
    </div>
  );
}

export default App;
