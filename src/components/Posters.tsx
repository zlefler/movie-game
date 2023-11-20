import React from 'react'

const Posters = (movieData) => {


    return (<div>
{movieData?.movies?.map(movie => <div><img alt={movie.title} src={movie.poster}/> <p>{movie.title}</p></div>)}
    </div>)
}

export default Posters