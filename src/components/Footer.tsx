import React from 'react'

const Footer = () => {
  const current = new Date()
  const year = current.getFullYear()
  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <p style={{ fontSize: '10px' }}>© {year.toString()}</p>
      <p style={{ fontSize: '10px' }}>
        Powered by omdbAPI and moviesminidatabase
      </p>
    </div>
  )
}

export default Footer
