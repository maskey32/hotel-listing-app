import React from "react";
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";

import { HomePage } from "../pages/home";
import { SignUpPage } from "../pages/signup";
import { SignInPage } from "../pages/signin";
import { DashboardPage } from "../pages/dashboard";
import { NotFoundPage  } from "../pages/home/not-found";

const BaseRoute = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />}>
                    {/* <Route path="/overview" element={<OverviewPage />} /> */}
                {/* <Route path="profile" element={<ProfilePage />} /> */}
                {/* <Route path="transactions" element={<TransactionsPage />} /> */}
                </Route>
            </Route>

            {/* Catch all */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default BaseRoute;