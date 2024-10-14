import React, { useState, useRef } from 'react'
import { Box, VStack, Heading, FormControl, FormLabel, Input, Textarea, Button, Image, SimpleGrid, NumberInput, NumberInputField, Select } from "@chakra-ui/react"

interface ProfileData {
  name: string;
  age: number;
  bio: string;
  motorcycleType: string;
  ridingStyle: string;
  yearsRiding: number;
  images: string[];
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    age: 0,
    bio: '',
    motorcycleType: '',
    ridingStyle: '',
    yearsRiding: 0,
    images: []
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberInputChange = (name: string, value: number) => {
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setProfile(prev => ({ ...prev, images: [...prev.images, ...newImages].slice(0, 5) }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile data:', profile);
    // Here you would typically send the data to your backend
  };

  return (
    <Box>
      <Heading as="h2" size="xl" mb={6}>Your Profile</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input name="name" value={profile.name} onChange={handleInputChange} />
          </FormControl>

          <FormControl>
            <FormLabel>Age</FormLabel>
            <NumberInput min={18} max={100} onChange={(_, value) => handleNumberInputChange('age', value)}>
              <NumberInputField name="age" value={profile.age} />
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Textarea name="bio" value={profile.bio} onChange={handleInputChange} />
          </FormControl>

          <FormControl>
            <FormLabel>Motorcycle Type</FormLabel>
            <Input name="motorcycleType" value={profile.motorcycleType} onChange={handleInputChange} />
          </FormControl>

          <FormControl>
            <FormLabel>Riding Style</FormLabel>
            <Select name="ridingStyle" value={profile.ridingStyle} onChange={handleInputChange}>
              <option value="">Select a riding style</option>
              <option value="cruiser">Cruiser</option>
              <option value="sport">Sport</option>
              <option value="touring">Touring</option>
              <option value="offroad">Off-road</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Years Riding</FormLabel>
            <NumberInput min={0} max={70} onChange={(_, value) => handleNumberInputChange('yearsRiding', value)}>
              <NumberInputField name="yearsRiding" value={profile.yearsRiding} />
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel>Profile Pictures (Max 5)</FormLabel>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            <Button onClick={() => fileInputRef.current?.click()}>Upload Images</Button>
          </FormControl>

          <SimpleGrid columns={[2, 3, 5]} spacing={4}>
            {profile.images.map((image, index) => (
              <Image key={index} src={image} alt={`Profile picture ${index + 1}`} boxSize="100px" objectFit="cover" />
            ))}
          </SimpleGrid>

          <Button type="submit" colorScheme="blue">Save Profile</Button>
        </VStack>
      </form>
    </Box>
  )
}

export default Profile