import React from 'react'
import RandomQuoteMachineV from './RandomQuoteMachineV'

interface RandomQuoteMachineCProps {}

const RandomQuoteMachineC: React.FC<RandomQuoteMachineCProps> = ({}) => {
  return (
    <RandomQuoteMachineV
      quote='aofnoaond sakofn osfoan'
      author='jajaj soso'
      refreshQuote={() => {
        console.log('refresh')
      }}
    />
  )
}

export default RandomQuoteMachineC
