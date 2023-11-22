import React from 'react'
import { Card } from '@mui/material'
import dragula from 'dragula'
import { useEffect, useRef } from 'react'

const Posters = ({ movieData, inputValues, setInputValues }) => {
  const movieContainerRef = useRef(null)

  useEffect(() => {
    if (movieContainerRef.current && movieData.movies.length) {
      const drake = dragula([movieContainerRef.current], {
        revertOnSpill: true,
      })

      drake.on('drag', function (el) {
        el.style.opacity = '0.5'
      })

      drake.on('dragend', function (el) {
        el.style.opacity = '1'
      })

      drake.on('drop', function (el, target, source, sibling) {
        // Get the movie title of the dragged element
        const draggedTitle = el.querySelector('p').innerText

        // Create a copy of the current inputValues array
        const newInputValues = [...inputValues]

        // Find the index of the dragged movie in the current array
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
        // setInputValues(newInputValues)
      })

      drake.on('cancel', function (el) {
        el.style.opacity = '1'
      })

      return () => drake.destroy()
    }
  }, [movieData?.movies])

  return (
    movieData && (
      <>
        <h2>
          {movieData.genre} Movies In {movieData.year}
        </h2>
        <div
          ref={movieContainerRef}
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
                filter: inputValues.includes(movie.title)
                  ? 'grayscale(100%)'
                  : 'none',
                opacity: inputValues.includes(movie.title) ? '0.5' : '1',
              }}
            >
              <Card>
                <img
                  alt={movie.title}
                  src={movie.poster}
                  style={{ maxHeight: 300, maxWidth: '100%' }}
                />
                <p style={{ marginTop: '0.5rem' }}>{movie.title}</p>
              </Card>
            </div>
          ))}
        </div>
      </>
    )
  )
}

export default Posters
