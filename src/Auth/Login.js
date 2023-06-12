import React, {useState} from 'react';
import Input from "antd/es/input/Input";
import '../Css/Reagister.css'
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import Main from "../Main";
import {render} from "react-dom";

const Login = () => {
    const [user,setUser]=useState({});


    const handleInputChange = (e)=>{
        setUser({
                ...user,
                [e.target.name]:e.target.value,
            }
        )
    }

    function handleSubmit() {
        axios
            .post("http://localhost:8080/api/auth/login",user)
            .then((res) => {

localStorage.setItem("accessToken", res.data.accessToken);
localStorage.setItem("refreshToken", res.data.refreshToken);
                window.location.reload()


            }).catch((error)=>{
            toast.error('Username or password incorrect!', {
                position: toast.POSITION.TOP_RIGHT
            });
        })
    }
    return (
        <>
            <ToastContainer/>
            <div className="register">
                <div className="container">

                    <div className="main-form">
                        <div>
                            <div className={"form"}>
                                <label>Ismingiz</label>
                                <div className="form-user">

                                    <Input name="username" onChange={handleInputChange}  type="text" placeholder="Username"/>
                                </div>

                            </div>
                            <div className={"form"}>
                                <label>Parolingiz</label>
                                <div className="form-user">


                                    <Input name="password" onChange={handleInputChange} type="password" placeholder="Password"/>
                                </div>

                            </div>

                        </div>


                    </div>
                    <div className="buttons">
                        <button onClick={handleSubmit} className="btn btn-primary">Tizimga kirish</button>
                        <a href="/register">Register</a>

                    </div>
                </div>
            </div>

        </>
    );
};

export default Login;