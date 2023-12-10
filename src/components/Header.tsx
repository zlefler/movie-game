import React from 'react'
import { Switch } from '@mui/material'

const Header = ({ onModeChange, ratingsMode }) => {
  return (
    <>
      <div>
        <h1>Movie Rankings</h1>
        {ratingsMode ? (
          <p>Rank the movies by their Rotten Tomatoes score</p>
        ) : (
          <p>Rank the movies by their box office take</p>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ color: ratingsMode ? 'gray' : 'white' }}>Box Office</p>
        <Switch checked={ratingsMode} onChange={onModeChange} />
        <p style={{ color: ratingsMode ? 'white' : 'gray' }}>RT %</p>
      </div>
      <p>Landscape mode strongly encouraged</p>
    </>
  )
}

export default Header
