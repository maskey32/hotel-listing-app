import React from 'react';
import { Stack, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';


export const RegisterButton = () => {
    return (
        <Stack direction='row' spacing={4} align='center'>
            <Button colorScheme='green' variant='outline'>
                List your property
            </Button>
            <Link to='/signup'>
                <Button colorScheme='green' variant='solid'>
                Register
                </Button>
            </Link>
            <Link to='/signin'>
                <Button colorScheme='green' variant='solid'>
                    Sign In
                </Button>
            </Link>
        </Stack>
    );
}