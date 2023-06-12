import React, {useState} from 'react';
import Input from "antd/es/input/Input";
import '../Css/Reagister.css'
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
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
            .post("http://localhost:8080/api/auth/register",user)
            .then((res) => {
                localStorage.setItem("access_token",res.data.access)
                localStorage.setItem("refresh_token",res.data.access)
                window.location.href='/'

                console.log(res)


            }).catch((error)=>{
            toast.error('Something went wrong!', {
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
                                <label>Username</label>
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
                            <div className={"form"}>
                                <label>Ism</label>
                                <div className="form-user">


                                    <Input name="firstName" onChange={handleInputChange} type="text" placeholder="Ism"/>
                                </div>

                            </div>
                            <div className={"form"}>
                                <label>Tel</label>
                                <div className="form-user">


                                    <Input name="phoneNumber" onChange={handleInputChange} type="phone" placeholder="Tel"/>
                                </div>

                            </div>
                            <div className={"form"}>
                                <label>Manzil</label>
                                <div className="form-user">


                                    <Input name="address" onChange={handleInputChange} type="address" placeholder="Manzil"/>
                                </div>

                            </div>
                            <div className={"form"}>
                                <label>Postal kod</label>
                                <div className="form-user">


                                    <Input name="postalCode" onChange={handleInputChange} type="postalcode" placeholder="Postalcode"/>
                                </div>

                            </div>



                        </div>


                    </div>
                    <div className="buttons">
                        <button onClick={handleSubmit} className="btn btn-primary">Tizimga kirish</button>
                        <a href="/">Login</a>

                    </div>
                </div>
            </div>

        </>
    );
};

export default Register;