import React from 'react'

export default function Form() {
    const clickHandler=(e)=>{
        e.preventDefault()
        const NewMovieObj={
            title:e.target.title.value,
            opening_text:e.target.opening.value,
            release_date:e.target.date.value
        }
                        console.log(NewMovieObj)
    }
  return (

    <>
        <form onSubmit={clickHandler}>
            <label>Title:</label><br/>
            <input type="text"  name='title' /><br/><br/>
            <label>Opening Text:</label><br/>
            <input type="text" name='opening'/><br/><br/>
            <label>Release Date:</label><br/>
            <input type="date" name='date'/><br/><br/>
            <button type='submit' >Add Movie</button><br/><br/><br/>
        </form>
    </>
  )
}
