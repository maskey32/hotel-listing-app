import React, { Link } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Flex, Spacer, Box, Heading, Button, ButtonGroup, Avatar, AvatarBadge } from '@chakra-ui/react';
import './DashNav.css';

  export const DashNav = () => {
    const { name } = useAuth();

    return (
        <div id="dash-container">
            <Flex minWidth='max-content' alignItems='center' gap='2'>
                <Avatar>
                <AvatarBadge boxSize='1.25em' bg='green.500' />
                </Avatar>
                <Box p='2'>
                    <Heading size='md'> Welcome {name}!</Heading>
                </Box>
                <Spacer />
                <ButtonGroup gap='2'>
                    {/* <Link to="/home"> */}
                        <Button colorScheme='teal'>Go to Home</Button>
                    {/* </Link> */}
                    <Button colorScheme='teal'>Log Out</Button>
                </ButtonGroup>
            </Flex>
        </div>
    );
};