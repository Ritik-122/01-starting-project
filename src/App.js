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
      const d = await fetch("https://reacthttp-6df65-default-rtdb.firebaseio.com/movie.json");

      if (!d.ok) {
        throw new Error("...Retrying");
      }
      const data = await d.json();
      const trasformMovie = [];
      for (const key in data) {
        trasformMovie.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      setMovies(trasformMovie);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  let content = <p>Found no movies</p>;
  async function addMovieHandler(movie){
    const res=await fetch('https://reacthttp-6df65-default-rtdb.firebaseio.com/movie.json',{
      method:'POST',
      body:JSON.stringify(movie),
      headers:{
        'Content-type':'application/json'
      }
    })
    const data=res.json()
    console.log(data)
  
  }
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
    
  const deleteMovieHandler=async(id)=>{
    const s=await fetch(
      `https://reacthttp-6df65-default-rtdb.firebaseio.com/movie/${id}.json`,{method:'DELETE'});
      console.log(s)
      console.log(id)
     
        fetchMovieHandler();
      
   
  }
  if (movies.length > 0) {
    content = <MoviesList movies={movies} deleteMovieHandler={deleteMovieHandler} />;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }


  return (
    <React.Fragment>
  
      <section>
      <Form addMovieHandler={addMovieHandler}/>
      </section>
      <section>
      <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
