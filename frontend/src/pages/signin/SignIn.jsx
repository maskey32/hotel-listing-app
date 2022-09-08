import React from "react";
import { Banner } from '../../components/banner';
import { Footer } from "../../components/footer";
import { LoginForm } from "../../components/login-form";
import { Heading } from '@chakra-ui/react'
import './SignIn.css'

export const SignInPage = () => {
    return (
        <div id="signin-banner">
            <Banner />
            <div id="account">
                <Heading noOfLines={1}>
                    Create an account
                </Heading>
            </div>
            <div id="signin-form">
                <LoginForm />
            </div>
            <Footer id="footer-bar"/>
        </div>
    );
};