import React from 'react'
import { Box, Text } from "@chakra-ui/react"

const Footer: React.FC = () => {
  return (
    <Box as="footer" width="100%" py={4}>
      <Text>&copy; 2023 RideBuddy. All rights reserved.</Text>
    </Box>
  )
}

export default Footer