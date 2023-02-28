import React, { useEffect, useState,useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieHandler = useCallback( async () => {
    setLoading(true);
    setError(null);
    try {
      const d = await fetch("https://swapi.py4e.com/api/films/");

      if (!d.ok) {
        throw new Error("...Retrying");
      }
      const res = await d.json();
      setMovies(res.results);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  },[]);
  
  useEffect(()=>{
    fetchMovieHandler()
    },[fetchMovieHandler])

  let content = <p>Found no movies</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = (
      <>
        <p>
          {error}
          
        </p>
      </>
    );
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
