import React from 'react'
import { Center, Box, Text, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
interface RandomQuoteMachineFooterVProps {}

const RandomQuoteMachineFooterV: React.FC<RandomQuoteMachineFooterVProps> = ({}) => {
  return (
    <Center>
      <Box>
        <Text>
          created by
          <NextLink href='/me'>Henrik Geißler</NextLink>
          <br />
          quotes by
          <Link href='https://type.fit/api/quotes' isExternal>
            type.fit/api/quotes <ExternalLinkIcon mx='2px' />
          </Link>
          <br />
          colors by
          <Link href='http://www.colr.org/json/color/random' isExternal>
            colr.org/json/color/random <ExternalLinkIcon mx='2px' />
          </Link>
        </Text>
      </Box>
    </Center>
  )
}

export default RandomQuoteMachineFooterV
