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
  portraitMode,
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
        {!portraitMode && (
          <p style={{ whiteSpace: 'pre-wrap' }}>⟵ Higher ranks Lower ranks ⟶</p>
        )}

        {portraitMode && <p>Put higher ranks at the top</p>}

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="droppable-movie-list"
            direction={portraitMode ? 'vertical' : 'horizontal'}
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={{
                  display: 'flex',
                  flexDirection: portraitMode ? 'column' : 'row',
                  alignItems: 'center',
                  overflowY: portraitMode ? 'auto' : 'hidden',
                  overflowX: portraitMode ? 'hidden' : 'auto',
                  maxHeight: portraitMode ? '90vh' : 'auto', // Adjust as needed for mobile screen height
                  justifyContent: portraitMode ? 'flex-start' : 'space-between',
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
                            display: 'flex',
                            flexDirection: portraitMode ? 'row' : 'column',
                            alignItems: 'center',
                            marginBottom: portraitMode ? '10px' : '0',
                            width: portraitMode
                              ? '100%'
                              : `calc((100% - (${inputValues.length} * 2%)) / ${inputValues.length})`,
                          }}
                        >
                          <Card
                            style={{
                              marginRight: portraitMode ? '10px' : '0',
                              maxWidth: portraitMode ? '100px' : '220px',
                            }}
                          >
                            <img
                              alt={movie.title}
                              src={movie.poster}
                              style={{
                                maxWidth: '100%',
                                maxHeight: portraitMode ? '150px' : '300px',
                              }}
                            />
                          </Card>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: portraitMode ? 'column' : 'row',
                              alignItems: portraitMode
                                ? 'flex-start'
                                : 'center',
                            }}
                          >
                            <p
                              style={{
                                margin: portraitMode
                                  ? '0 0 5px 0'
                                  : '5px 0 0 0',
                              }}
                            >
                              {movie.title}
                            </p>
                            {submitted && (
                              <div style={{ textAlign: 'center' }}>
                                <p>{userAnswers.indexOf(movie.title) + 1}</p>
                                <p
                                  style={{
                                    color: getColor(movie.title, index),
                                  }}
                                >
                                  {ratingsMode ? movie.rating : movie.boxOffice}
                                </p>
                              </div>
                            )}
                          </div>
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
