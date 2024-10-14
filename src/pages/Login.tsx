import React, { useState } from 'react'
import { Box, VStack, Heading, FormControl, FormLabel, Input, Button, Text, Link } from "@chakra-ui/react"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to authenticate
    // For this example, we'll just simulate a successful login
    login('fake-jwt-token')
    navigate('/')
  }

  return (
    <Box maxW="400px" margin="auto" mt={8}>
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="xl" textAlign="center">Login</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full" mt={4}>Login</Button>
        </form>
        <Text textAlign="center">
          Don't have an account? <Link as={RouterLink} to="/register" color="blue.500">Register</Link>
        </Text>
      </VStack>
    </Box>
  )
}

export default Login