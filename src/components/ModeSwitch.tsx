import React from 'react'
import { Switch } from '@mui/material'

const ModeSwitch = ({ onModeChange, ratingsMode }) => {
  return (
    <div>
      <p>Change modes</p>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ color: ratingsMode ? 'gray' : 'white' }}>Box Office</p>
        <Switch onChange={onModeChange} />
        <p style={{ color: ratingsMode ? 'white' : 'gray' }}>RT %</p>
      </div>
    </div>
  )
}

export default ModeSwitch
