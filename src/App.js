import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const[movies,setMovies]=useState([])
  const fetchMovieHandler=async()=>{
    const d= (await fetch('https://swapi.py4e.com/api/films/'))
    const res=await d.json()
     setMovies(res.results)
    
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
