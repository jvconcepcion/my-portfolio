import React from 'react'

type Props = {}

const Text = ({ style= { color: '#F13024' }, text = 'Text' }) => {
  return (
    <p style={style} >{text}</p>
  )
}

export default Text