import React, { useRef, useState, useEffect } from "react";
import api from '../../api/axios';
import { useAuth } from "../../hooks/useAuth";


import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Box,
  Input,
  Textarea,
  FormLabel,
  Select,
  Stack,
  InputRightAddon,
  InputLeftAddon,
  InputGroup,
  useDisclosure
} from '@chakra-ui/react';

export const UserListing = () => {
    const { token } = useAuth();

    const { isOpen, onOpen, onClose } = useDisclosure();
    // const firstField = useRef();

    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [address, setAddress] = useState('');
    const [price, setPrice] = useState('');
    const [numOfBeds, setNumOfBeds] = useState('');
    const [numOfBaths, setNumOfBaths] = useState('');
    const [rating, setRating] = useState('');

    // useEffect(() => {
    //   firstField.current.focus();
    // }, [])

    const descriptionHandler = (e) => {
      setDescription(e.target.value)
    }

    const imageHandler = (e) => {
      setImage(e.target.value)
    }

    const addressHandler = (e) => {
      setAddress(e.target.value)
    }

    const priceHandler = (e) => {
      setPrice(e.target.value)
    }

    const numOfBedsHandler = (e) => {
      setNumOfBeds(e.target.value)
    }

    const numOfBathsHandler = (e) => {
      setNumOfBaths(e.target.value)
    }

    const ratingHandler = (e) => {
      setRating(e.target.value)
    }
    const data = {description, image, address, price, numOfBeds, numOfBaths, rating};

    const handleSubmit = async (e) => {
      const POST_URL = '/api/listing/create';
      try {
        const response = await api.post(POST_URL, data, 
            {
                headers: { 
                  'Content-Type': 'Application/json',
                  'authorization': `Bearer ${token}`
                }
            }
        )
        console.log(response); 
      } catch (err) {
        console.log(err);
      }
    }


  
    return (
      <>
        <Button  colorScheme='teal' onClick={onOpen}>
          Create listing
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          // initialFocusRef={firstField}
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>
              Create listing of features
            </DrawerHeader>
  
            <DrawerBody>
              <Stack spacing='24px'>
                <Box>
                  <FormLabel htmlFor='desc'>Description</FormLabel>
                  <Textarea id='desc' 
                  value={description}
                  name='deacription'
                  onChange={descriptionHandler}
                  />
                </Box>
  
                <Box>
                  <FormLabel htmlFor='image-url'>Image Url</FormLabel>
                  <InputGroup>
                    <InputLeftAddon>http://</InputLeftAddon>
                    <Input
                      type='url'
                      id='imsge-url'
                      // ref={firstField}
                      name='image'
                      value={image}
                      onChange={imageHandler}
                      placeholder='Please enter image url'
                    />
                    <InputRightAddon>.com</InputRightAddon>
                  </InputGroup>
                </Box>
                <Box>
                  <FormLabel htmlFor='address'>Address</FormLabel>
                  <Input
                  type='text'
                    // ref={firstField}
                    id='address'
                    value={address}
                    name='address'
                    onChange={addressHandler}
                    placeholder='Please enter address'
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor='price'>Price</FormLabel>
                  <Input
                  type='number'
                    // ref={firstField}
                    id='price'
                    value={price}
                    name='price'
                    onChange={priceHandler}
                    placeholder='Please enter price'
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor='number of beds'>Number of Beds</FormLabel>
                  <Input
                  type='number'
                    // ref={firstField}
                    id='numOfBeds'
                    value={numOfBeds}
                    name='numOfBeds'
                    onChange={numOfBedsHandler}
                    placeholder='Please enter number of beds'
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor='numOfBaths'>Number of Baths</FormLabel>
                  <Input
                  type='number'
                    // ref={firstField}
                    id='numOfBaths'
                    value={numOfBaths}
                    name='numOfBaths'
                    onChange={numOfBathsHandler}
                    placeholder='Please enter price'
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor='rating'>Rating</FormLabel>
                  <Input
                  type='number'
                    // ref={firstField}
                    id='rating'
                    value={rating}
                    name='rating'
                    onChange={ratingHandler}
                    placeholder='Please enter price'
                  />
                </Box>
  
                
  
              </Stack>
            </DrawerBody>
  
            <DrawerFooter borderTopWidth='1px'>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='blue' onClick={handleSubmit}>Create</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }