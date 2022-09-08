import React from "react";
import { Box, Badge, Image, Icon } from '@chakra-ui/react';
import { AiTwotoneStar } from 'react-icons/ai';
import { IconName } from "react-icons/io5";
import './HotelComponent.css';


export function Hotel(props) {
    const property = {
      imageUrl: props.url,
      imageAlt: props.alt,
      beds: props.beds,
      baths: props.baths,
      title: props.title,
      formattedPrice: props.price,
      reviewCount: props.review,
      rating: props.rating,
    }
    
  
    return (
      <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <Image src={property.imageUrl} alt={property.imageAlt} className='chakra-image' />
  
        <Box p='6'>
          <Box display='flex' alignItems='baseline'>
            <Badge borderRadius='full' px='2' colorScheme='teal'>
              New
            </Badge>
            <Box
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              textTransform='uppercase'
              ml='2'
            >
              {property.beds} beds &bull; {property.baths} baths
            </Box>
          </Box>
  
          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            noOfLines={1}
          >
            {property.title}
          </Box>
  
          <Box>
            {property.formattedPrice}
            <Box as='span' color='gray.600' fontSize='sm'>
              / wk
            </Box>
          </Box>
  
          <Box display='flex' mt='2' alignItems='center'>
            {Array(5)
              .fill('')
              .map((_, i) => (
                <AiTwotoneStar
                    // name="good"
                  key={i}
                  color={i < property.rating ? 'gold' : 'gray.300'}
                />
              ))}
            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
              {property.reviewCount} reviews
            </Box>
          </Box>
        </Box>
      </Box>
    )
  }