import React from "react";
import { MdMail , MdCall } from "react-icons/md";
import { Button, Stack} from '@chakra-ui/react'

export const Footer = (props) => {
    return (
        <div id={props.id}>
            <p>Copyright &copy; {new Date().getFullYear()}. All rights reserved - MaskeyServices</p>

<Stack direction='row' spacing={4}>
  <Button leftIcon={<MdMail />} colorScheme='teal' variant='solid'>
    Email
  </Button>
  <Button rightIcon={<MdCall />} colorScheme='teal' variant='outline'>
    Call us
  </Button>
</Stack>
            
        </div>
    );
}