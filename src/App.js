import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const fetchMovieHandler = async () => {
    setLoading(true)
    const d = await fetch("https://swapi.py4e.com/api/films/");
    const res = await d.json();
    setMovies(res.results);
    setLoading(false)
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {isLoading && <p>Loading....</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
