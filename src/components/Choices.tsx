import React from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { useState, useEffect } from 'react'

const Choices = ({ movieData, onMovieSelect }) => {
  const [titles, setTitles] = useState<string[]>()
  const [one, setOne] = useState<string>('')
  const [two, setTwo] = useState<string>('')
  const [three, setThree] = useState<string>('')
  const [four, setFour] = useState<string>('')
  const [five, setFive] = useState<string>('')

  useEffect(() => {
    const titleArray = movieData.movies.map((movie) => movie.title)
    setTitles(titleArray)
  }, [movieData])

  return (
    <>
      {titles && titles.length > 0 && (
        <div>
          <Autocomplete
            className="autocomplete"
            sx={{
              padding: '0.5rem',
              width: 300,
              '& .MuiAutocomplete-inputRoot': {
                backgroundColor: 'white',
              },
            }}
            options={titles}
            inputValue={one}
            onInputChange={(event, newValue) => {
              if (newValue) {
                onMovieSelect(newValue, true)
              } else {
                onMovieSelect(one, false)
              }
              setOne(newValue)
            }}
            renderInput={(params) => <TextField {...params} label="1" />}
          />
          <Autocomplete
            className="autocomplete"
            sx={{
              padding: '0.5rem',
              width: 300,
              '& .MuiAutocomplete-inputRoot': {
                backgroundColor: 'white',
              },
            }}
            options={titles}
            inputValue={two}
            onInputChange={(event, newValue) => {
              if (newValue) {
                onMovieSelect(newValue, true)
              } else {
                onMovieSelect(two, false)
              }
              setTwo(newValue)
            }}
            renderInput={(params) => <TextField {...params} label="2" />}
          />
          <Autocomplete
            className="autocomplete"
            sx={{
              padding: '0.5rem',
              width: 300,
              '& .MuiAutocomplete-inputRoot': {
                backgroundColor: 'white',
              },
            }}
            options={titles}
            inputValue={three}
            onInputChange={(event, newValue) => {
              if (newValue) {
                onMovieSelect(newValue, true)
              } else {
                onMovieSelect(three, false)
              }
              setThree(newValue)
            }}
            renderInput={(params) => <TextField {...params} label="3" />}
          />
          <Autocomplete
            className="autocomplete"
            sx={{
              padding: '0.5rem',
              width: 300,
              '& .MuiAutocomplete-inputRoot': {
                backgroundColor: 'white',
              },
            }}
            options={titles}
            inputValue={four}
            onInputChange={(event, newValue) => {
              if (newValue) {
                onMovieSelect(newValue, true)
              } else {
                onMovieSelect(four, false)
              }
              setFour(newValue)
            }}
            renderInput={(params) => <TextField {...params} label="4" />}
          />
          <Autocomplete
            className="autocomplete"
            sx={{
              padding: '0.5rem',
              width: 300,
              '& .MuiAutocomplete-inputRoot': {
                backgroundColor: 'white',
              },
            }}
            options={titles}
            inputValue={five}
            onInputChange={(event, newValue) => {
              if (newValue) {
                onMovieSelect(newValue, true)
              } else {
                onMovieSelect(five, false)
              }
              setFive(newValue)
            }}
            renderInput={(params) => <TextField {...params} label="5" />}
          />
        </div>
      )}
    </>
  )
}

export default Choices
