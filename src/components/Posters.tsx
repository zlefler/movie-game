import React from 'react'
import { Card, Button } from '@mui/material'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const Posters = ({
  movieData,
  inputValues,
  setInputValues,
  submitted,
  handleSubmit,
  ratingsMode,
  onReset,
  userAnswers,
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

        {/* prettier-ignore */}
        <p style={{ whiteSpace: 'pre-wrap' }}>
          ⟵ Higher ranks                                       Lower ranks ⟶
        </p>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable-movie-list" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                }}
                {...provided.droppableProps}
              >
                {inputValues.map((title, index) => {
                  const movie = movieData.movies.find((m) => m.title === title)
                  return (
                    <div
                      key={movie.title}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
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
                              flexGrow: 1,
                              width: 200,
                              margin: '1vw',
                              textAlign: 'center',
                            }}
                          >
                            {submitted && (
                              <div>
                                <p>{userAnswers.indexOf(movie.title) + 1}</p>
                              </div>
                            )}
                            <Card>
                              <img
                                alt={movie.title}
                                src={movie.poster}
                                style={{ maxHeight: 300, maxWidth: 'auto' }}
                              />
                              <p style={{ marginTop: '0.5rem' }}>
                                {movie.title}
                              </p>
                            </Card>
                            {submitted && (
                              <p
                                style={{
                                  color: getColor(movie.title, movie.index),
                                }}
                              >
                                {ratingsMode ? movie.rating : movie.boxOffice}
                              </p>
                            )}
                          </div>
                        )}
                      </Draggable>
                    </div>
                  )
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {!submitted && (
          <Button
            sx={{ width: '300px', marginTop: '30px' }}
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        )}
        <Button
          sx={{ margin: '2%' }}
          color={submitted ? 'primary' : 'error'}
          variant={submitted ? 'contained' : 'text'}
          onClick={onReset}
        >
          {submitted ? 'Play Again' : 'Reset'}
        </Button>
      </>
    )
  )
}

export default Posters
