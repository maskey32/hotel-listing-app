import React from "react";
import { Link, Text } from '@chakra-ui/react'

export const Account = (props) => {
    return (
        <div id="props.id">
            <Text>
  {props.text}{' '}
  <Link color='teal.500' href='/signin'>
    {props.type}
  </Link>
</Text>
        </div>
    );
};