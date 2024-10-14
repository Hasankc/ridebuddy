import React from 'react'
import { Box, Heading, Text, Button } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"

const Home: React.FC = () => {
  return (
    <Box>
      <Heading as="h2" size="xl" mb={4}>Welcome to RideBuddy</Heading>
      <Text mb={4}>Find your perfect riding companion and hit the road together!</Text>
      <Button as={RouterLink} to="/discover" colorScheme="blue">Start Discovering</Button>
    </Box>
  )
}

export default Home