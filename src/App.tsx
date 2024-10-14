import React, { useState, useEffect } from 'react'
import { ChakraProvider, Box, VStack, useColorModeValue } from "@chakra-ui/react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Discover from './pages/Discover'
import Matches from './pages/Matches'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthProvider, useAuth } from './contexts/AuthContext'

function App() {
  const bgColor = useColorModeValue('gray.50', 'gray.900')

  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Box minH="100vh" bg={bgColor}>
            <VStack spacing={0}>
              <Header />
              <Box w="100%" maxW="1200px" p={[2, 4, 6]}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/discover" element={
                    <PrivateRoute>
                      <Discover />
                    </PrivateRoute>
                  } />
                  <Route path="/matches" element={
                    <PrivateRoute>
                      <Matches />
                    </PrivateRoute>
                  } />
                  <Route path="/chat" element={
                    <PrivateRoute>
                      <Chat />
                    </PrivateRoute>
                  } />
                  <Route path="/profile" element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  } />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              </Box>
              <Footer />
            </VStack>
          </Box>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  )
}

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />
}

export default App