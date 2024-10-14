import React from 'react'
import { Box, Heading } from "@chakra-ui/react"

const Matches: React.FC = () => {
  return (
    <Box>
      <Heading as="h2" size="xl">Your Matches</Heading>
      {/* Add list of matched riders here */}
    </Box>
  )
}

export default Matches