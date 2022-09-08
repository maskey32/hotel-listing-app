import React from "react";
import { Banner } from "../../components/banner";
import { Footer } from "../../components/footer";
import { RegisterForm } from "../../components/register-form/RegisterForm";
import { Heading } from '@chakra-ui/react'
import './SignUp.css';

export const SignUpPage = () => {
    return (
        <div id="signup-container">
            <Banner />
            <div id="account">
                <Heading noOfLines={1}>
                    Create an account
                </Heading>
            </div>
            <div id="form">
                <RegisterForm />
                <Footer id='footer-bar'/>
            </div>
        </div>
    );
}; 