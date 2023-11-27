import React from 'react'
import { Card, Button } from '@mui/material'
import dragula from 'react-dragula'
import { useEffect, useRef } from 'react'

const Posters = ({
  movieData,
  inputValues,
  setInputValues,
  submitted,
  handleSubmit,
  ratingsMode,
  onReset,
}) => {
  const movieContainerRef = useRef(null)

  useEffect(() => {
    if (movieContainerRef.current && movieData.movies.length) {
      const drake = dragula([movieContainerRef.current], {})

      drake.on('drop', function (el, target, source, sibling) {
        const draggedTitle = el.querySelector('p').innerText

        const newInputValues = [...inputValues]

        const oldIndex = newInputValues.indexOf(draggedTitle)

        let newIndex
        if (!sibling) {
          // If there's no sibling, the movie was dragged to the end
          newIndex = newInputValues.length - 1
        } else {
          // If there's a sibling, find the index of the sibling in the array
          const siblingTitle = sibling.querySelector('p').innerText
          newIndex = newInputValues.indexOf(siblingTitle)

          // If dragging down, insert before the sibling's index; if up, after
          if (oldIndex < newIndex) {
            newIndex--
          }
        }
        // Remove the dragged item from its old position
        newInputValues.splice(oldIndex, 1)

        // Insert the dragged item at its new position
        newInputValues.splice(newIndex, 0, draggedTitle)

        // Update the state with the new order
        setInputValues(newInputValues)
      })

      return () => drake.destroy()
    }
  }, [movieData?.movies, inputValues, setInputValues])

  const getColor = (title, index) => {
    return inputValues.indexOf(title) === index ? 'green' : 'red'
  }

  return (
    movieData && (
      <>
        <h2>
          {movieData.genre} Movies In {movieData.year}
          {submitted && <p>Your ranks</p>}
        </h2>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <p style={{ marginLeft: '2%' }}>highest</p>
          <p style={{ marginRight: '2%' }}>lowest</p>
        </div>
        <div
          ref={movieContainerRef}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          {movieData.movies.map((movie, index) => (
            <div
              key={movie.title}
              style={{
                width: '18%',
                margin: '1%',
                textAlign: 'center',
              }}
            >
              {submitted && <p>{inputValues.indexOf(movie.title) + 1}</p>}
              <Card>
                <img
                  alt={movie.title}
                  src={movie.poster}
                  style={{ maxHeight: 300, maxWidth: '100%' }}
                />
                <p
                  style={{
                    marginTop: '0.5rem',
                  }}
                >
                  {movie.title}
                </p>
              </Card>
              {submitted && (
                <p style={{ color: getColor(movie.title, index) }}>
                  {ratingsMode ? movie.rating : movie.boxOffice}
                </p>
              )}
            </div>
          ))}
        </div>
        <Button
          sx={{ width: '300px', marginTop: '30px' }}
          variant="contained"
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
        <Button sx={{ margin: '2%' }} color="error" onClick={onReset}>
          Reset
        </Button>
      </>
    )
  )
}

export default Posters
