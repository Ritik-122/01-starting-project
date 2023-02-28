import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {

  const deleteMovieHandler=()=>{
    props.deleteMovieHandler(props.id)
  }
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>Release Date: {props.releaseDate}</h3>
      <p>{props.openingText}</p>
     <button style={{backgroundColor:'grey'}} onClick={deleteMovieHandler}>Delete</button>
    </li>
  );
};

export default Movie;
