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
    return userAnswers.indexOf(title) === index ? 'green' : 'red'
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
                  flexWrap: 'nowrap',
                  overflowX: 'hidden',
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
                        justifyContent: 'center',
                        margin: '1%',
                        width: `calc((100% - (${inputValues.length} * 2%)) / ${inputValues.length})`,
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
                              maxWidth: '220px',
                              width: `calc((100% - (${inputValues.length} * 2%)) / ${inputValues.length})`,
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
                                style={{ maxWidth: '100%', maxHeight: 300 }}
                              />
                              <p style={{ marginTop: '0.5rem' }}>
                                {movie.title}
                              </p>
                            </Card>
                            {submitted && (
                              <p
                                style={{
                                  color: getColor(movie.title, index),
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
