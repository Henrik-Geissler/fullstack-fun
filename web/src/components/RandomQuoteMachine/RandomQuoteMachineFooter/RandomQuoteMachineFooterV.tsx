import React from 'react'
import { Center } from '@chakra-ui/react'
interface RandomQuoteMachineFooterVProps {}

const RandomQuoteMachineFooterV: React.FC<RandomQuoteMachineFooterVProps> = ({}) => {
  return (
    <Center>
      <p>created by Henrik Geißler</p>
      <p>Quotes by https://type.fit/api/quotes</p>
      <p>Colors by http://www.colr.org/json/color/random</p>
    </Center>
  )
}

export default RandomQuoteMachineFooterV
