import React from "react";
import { Outlet } from "react-router-dom";
import { Flex, Spacer, Box, Heading, Button, ButtonGroup } from '@chakra-ui/react'
import { DashNav } from "../../components/dash-nav";
import { Footer } from "../../components/footer";
import './Dashboard.css';
import { UserListing } from "../../components/user-listing/UserListing";

  
  export const DashboardPage = () => {
    return (
        <div id="dash-container">
            <DashNav />
            <UserListing />
            <Footer id="footer-bar"/>
        </div>
    );
};