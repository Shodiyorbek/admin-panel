import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";

const Auth = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Auth;