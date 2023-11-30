import React from 'react'
import { Card, Button } from '@mui/material'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
// import { useEffect, useRef } from 'react'

const Posters = ({
  movieData,
  inputValues,
  setInputValues,
  submitted,
  handleSubmit,
  ratingsMode,
  onReset,
}) => {
  const getColor = (title, index) => {
    return inputValues.indexOf(title) === index ? 'green' : 'red'
  }

  const reorder = (startIndex, endIndex) => {
    const result = Array.from(inputValues)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }
    const items = reorder(result.source.index, result.destination.index)
    setInputValues(items)
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable-movie-list" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  // background: snapshot.isDraggingOver ? 'lightblue' : 'inherit', // Optional: change background color when dragging over
                }}
                {...provided.droppableProps}
              >
                {inputValues.map((title, index) => {
                  const movie = movieData.movies.find((m) => m.title === title)
                  return (
                    <Draggable
                      key={movie.title}
                      draggableId={movie.title}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            width: '18%',
                            margin: '1%',
                            textAlign: 'center',
                          }}
                        >
                          {submitted && (
                            <p>{inputValues.indexOf(movie.title) + 1}</p>
                          )}
                          <Card>
                            <img
                              alt={movie.title}
                              src={movie.poster}
                              style={{ maxHeight: 300, maxWidth: '100%' }}
                            />
                            <p style={{ marginTop: '0.5rem' }}>{movie.title}</p>
                          </Card>
                          {submitted && (
                            <p style={{ color: getColor(movie.title, index) }}>
                              {ratingsMode ? movie.rating : movie.boxOffice}
                            </p>
                          )}
                        </div>
                      )}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Button
          sx={{ width: '300px', marginTop: '30px' }}
          variant="contained"
          onClick={handleSubmit}
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
