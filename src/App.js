import React, { useEffect, useState, useCallback } from "react";
import Form from "./components/Form/Form";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieHandler = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  let content = <p>Found no movies</p>;

  let tt;
  const stopRetrying=()=>{
    clearInterval(tt)
    setError(false)
   
  }
   if(error){content = (
    <>
      <p>
        {error}
        <button onClick={stopRetrying}>Stop</button>
      </p>
    </>
  );
   }
 
  useEffect(()=>{
    if (error) {
      
       tt = setInterval(fetchMovieHandler, 5000);
      
    }
   return (()=>clearInterval(tt))
  })
    
 
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
   
      <section>
      <Form />
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
