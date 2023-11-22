import React from 'react'
import { Autocomplete, TextField, Button } from '@mui/material'
import { useState, useEffect } from 'react'

const Choices = ({
  movieData,
  inputValues,
  setInputValues,
  handleSubmit,
  correctAnswers,
}) => {
  const [titles, setTitles] = useState<string[]>([])

  useEffect(() => {
    const titleArray = movieData.movies.map((movie) => movie.title)
    setTitles(titleArray)
  }, [movieData])

  const handleInputChange = (index, newValue) => {
    setInputValues((values) =>
      values.map((value, i) => (i === index ? newValue : value))
    )
  }

  return (
    titles &&
    titles.length > 0 && (
      <div>
        {titles.map((movie, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <Autocomplete
              sx={{
                padding: '0.5rem',
                width: 300,
                '& .MuiAutocomplete-inputRoot': {
                  backgroundColor: 'white',
                },
              }}
              options={titles}
              inputValue={inputValues ? inputValues[index] : ''}
              onInputChange={(event, newValue) =>
                handleInputChange(index, newValue)
              }
              renderInput={(params) => (
                <TextField {...params} label={`${index + 1}`} />
              )}
            />
          </div>
        ))}
        <Button
          sx={{ width: '300px', marginTop: '30px' }}
          variant="contained"
          onClick={() => handleSubmit(inputValues)}
        >
          Submit
        </Button>
      </div>
    )
  )
}

export default Choices
