import React, { useEffect, useState } from 'react'
import Posters from './Posters.tsx'
import Header from './Header.tsx'
import { MovieResult } from '../types'
import ResultsModal from './ResultsModal.tsx'
import fetchMovies from '../lib/fetchMovies.ts'
import Footer from './Footer.tsx'

const HomePage = () => {
  const [movieData, setMovieData] = useState<MovieResult>()
  const [ratingsMode, setRatingsMode] = useState<boolean>(false)
  const [inputValues, setInputValues] = useState<string[]>([])
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [answerArray, setAnswerArray] = useState<boolean[]>([])

  const getMovies = async () => {
    const response = await fetchMovies()
    setInputValues(response.movies.map((movie) => movie.title))
    setMovieData(response)
  }

  useEffect(() => {
    getMovies()
  }, [])

  const parseRating = (value: string | undefined): number => {
    if (value === undefined) {
      return 0
    }
    return ratingsMode
      ? parseInt(value.slice(0, -1))
      : parseInt(value.replace(/[$,]/g, ''))
  }

  const handleSubmit = async () => {
    if (!movieData) {
      return
    }

    const order = [...movieData.movies].sort((a, b) => {
      const aValue = ratingsMode ? a.rating : a.boxOffice
      const bValue = ratingsMode ? b.rating : b.boxOffice
      return parseRating(bValue) - parseRating(aValue)
    })
    const orderedTitles = order.map((movie) => movie.title)
    console.log(inputValues)
    console.log(orderedTitles)
    const answers = inputValues.map((title, index) => {
      console.log(title, index)
      return orderedTitles[index] === title
    })
    console.log(answers)
    setAnswerArray(
      inputValues.map((title, index) => orderedTitles[index] === title)
    )

    setUserAnswers(inputValues)

    setInputValues(orderedTitles)
    setSubmitted(true)
    setOpenModal(true)
  }

  const handleModeSwitch = () => {
    setRatingsMode((ratingsMode) => !ratingsMode)
  }

  const handleReset = () => {
    setSubmitted(false)
    setMovieData(undefined)
    setInputValues([])
    getMovies()
  }

  if (!movieData) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header onModeChange={handleModeSwitch} ratingsMode={ratingsMode} />
      <ResultsModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        answerArray={answerArray}
      />
      <Posters
        movieData={movieData}
        inputValues={inputValues}
        setInputValues={setInputValues}
        submitted={submitted}
        handleSubmit={handleSubmit}
        ratingsMode={ratingsMode}
        onReset={handleReset}
        userAnswers={userAnswers}
      />
      <Footer />
    </>
  )
}

export default HomePage
