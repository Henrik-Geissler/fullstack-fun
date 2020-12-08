import { Button, Text, Box, IconButton } from '@chakra-ui/react'
import React from 'react'
import { FaTwitterSquare, FaTumblrSquare, FaQuoteLeft } from 'react-icons/fa'
import { MdRefresh } from 'react-icons/md'
import StyleV from '../General/Style/StyleV'
import { Wrapper } from '../Wrapper'
import RandomQuoteMachineFooterV from './RandomQuoteMachineFooter/RandomQuoteMachineFooterV'

interface RandomQuoteMachineVProps {
  author: String
  quote: String
  refreshQuote: CallableFunction
}

const RandomQuoteMachineV: React.FC<RandomQuoteMachineVProps> = ({
  author,
  quote,
  refreshQuote,
}) => {
  return (
    <>
      <StyleV src='' />
      <Wrapper variant='small'>
        <Box>
          <Text fontSize='4xl'>
            <FaQuoteLeft />
            {quote}
          </Text>
          <Text fontSize='4xl'>- {author}</Text>
        </Box>
        <Box>
          <IconButton
            aria-label='Share on Twitter'
            colorScheme='twitter'
            icon={<FaTwitterSquare />}
          />
          <IconButton
            aria-label='Share on Tumblr'
            colorScheme='tumblr'
            icon={<FaTumblrSquare />}
          />
          <Button
            leftIcon={<MdRefresh />}
            onClick={() => {
              refreshQuote()
            }}
          >
            New quote
          </Button>
        </Box>
        <RandomQuoteMachineFooterV />
      </Wrapper>
    </>
  )
}

export default RandomQuoteMachineV
