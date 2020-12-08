import React from 'react'

interface StyleVProps {
  src: String
}

const StyleV: React.FC<StyleVProps> = ({ src }) => {
  return <link rel='stylesheet' href={`https://${src}`} />
}

export default StyleV
