import React, { useState } from 'react'
import { Box, VStack, Heading, Select, Input, Button, Text, Image, Flex, useToast } from "@chakra-ui/react"
import { useAuth } from '../contexts/AuthContext'

interface Message {
  id: string;
  text: string;
  sender: string;
  image?: string;
}

interface Rider {
  id: string;
  name: string;
}

const mockRiders: Rider[] = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
  { id: '3', name: 'Charlie' },
]

const Chat: React.FC = () => {
  const [selectedRider, setSelectedRider] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const { isAuthenticated } = useAuth()
  const toast = useToast()

  const handleSendMessage = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to send messages.",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    if (inputMessage.trim() || selectedImage) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputMessage,
        sender: 'user',
        image: selectedImage ? URL.createObjectURL(selectedImage) :   undefined,
      }
      setMessages([...messages, newMessage])
      setInputMessage('')
      setSelectedImage(null)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Here you would typically check file type and size
      setSelectedImage(file)
    }
  }

  return (
    <Box>
      <Heading as="h2" size="xl" mb={6}>Chat</Heading>
      <Select placeholder="Select a rider" value={selectedRider} onChange={(e) => setSelectedRider(e.target.value)} mb={4}>
        {mockRiders.map((rider) => (
          <option key={rider.id} value={rider.id}>{rider.name}</option>
        ))}
      </Select>
      <VStack spacing={4} align="stretch" height="400px" overflowY="auto" borderWidth={1} borderRadius="md" p={4} mb={4}>
        {messages.map((message) => (
          <Box key={message.id} alignSelf={message.sender === 'user' ? 'flex-end' : 'flex-start'}>
            <Text bg={message.sender === 'user' ? 'blue.100' : 'gray.100'} p={2} borderRadius="md">
              {message.text}
            </Text>
            {message.image && <Image src={message.image} alt="Sent image" maxHeight="200px" mt={2} />}
          </Box>
        ))}
      </VStack>
      <Flex>
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          mr={2}
        />
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          display="none"
          id="image-upload"
        />
        <Button as="label" htmlFor="image-upload" mr={2}>
          Upload Image
        </Button>
        <Button onClick={handleSendMessage}>Send</Button>
      </Flex>
    </Box>
  )
}

export default Chat