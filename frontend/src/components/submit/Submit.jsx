import React from "react";
import { Button } from '@chakra-ui/react'
// import './Submit.css';

export const Submit = (props) => {
    return (
        <Button
            size='200px'
            height='40px'
            width='300px'
            border='2px'
            borderColor='green.500'
            onClick={props.handler}
            >
            {props.name}
        </Button>
        // <button onClick={props.handler}>Click me</button>
    );
}