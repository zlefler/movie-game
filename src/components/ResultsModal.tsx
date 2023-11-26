import React from 'react'
import { Modal, Box, Typography } from '@mui/material'
import { useState, useEffect } from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

const ResultsModal = ({ open, setOpen, answerArray }) => {
  const [right, setRight] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [correctPct, setCorrectPct] = useState<number>(0)

  useEffect(() => {
    if (answerArray.length) {
      setTotal(answerArray.length)
      const numRight = answerArray.reduce((count, val) => {
        return count + (val === true ? 1 : 0)
      })
      setRight(numRight)
      setCorrectPct(numRight / answerArray.length)
    }
  }, [answerArray])

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {correctPct === 0 && 'Ouch.'}
          {0 < correctPct &&
            correctPct < 0.13 &&
            'Could be worse...technically.'}
          {0.13 < correctPct && correctPct < 0.5 && 'Not great...'}
          {0.5 < correctPct && correctPct < 0.8 && 'Hey, not bad!'}
          {correctPct === 1 && 'You are a golden god.'}
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {correctPct === 1
            ? `You got all ${total}!`
            : `You got ${right} out of ${total}`}
        </Typography>
        {/* Additional content here */}
      </Box>
    </Modal>
  )
}

export default ResultsModal
