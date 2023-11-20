import React from 'react'
import { Box } from '@mui/material'

const Posters = ({ movieData, selectedTitles }) => {
  return (
    movieData && (
      <>
        <h2>
          {movieData.genre} Movies In {movieData.year}
        </h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          {movieData.movies.map((movie) => (
            <div
              key={movie.title}
              style={{
                width: '18%',
                margin: '1%',
                textAlign: 'center',
                filter: selectedTitles.includes(movie.title)
                  ? 'grayscale(100%)'
                  : 'none',
                opacity: selectedTitles.includes(movie.title) ? '0.5' : '1',
              }}
            >
              <Box>
                <img
                  alt={movie.title}
                  src={movie.poster}
                  style={{ maxHeight: 300, maxWidth: '100%' }}
                />
                <p style={{ marginTop: '0.5rem' }}>{movie.title}</p>
              </Box>
            </div>
          ))}
        </div>
      </>
    )
  )
}

export default Posters
