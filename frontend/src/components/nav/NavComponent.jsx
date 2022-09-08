import React from "react";
import { Logo } from '../logo';
import { RegisterButton } from '../register';
import './NavComponent.css'

export const NavComponent = () => {
    return (
        <>
            <div id="nav-container">
                <Logo />
                <RegisterButton />
            </div>
        </>
    );
}