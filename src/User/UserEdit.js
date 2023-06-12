import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import axios from "axios";
import Input from "antd/es/input/Input";
import AuthServise from "../AuthServise";

function UserEdit({ visible, onOk, onCancel, userInfo }) {
    const [user, setUser] = useState({

    });

    const onOkItSelf = (e) => {
        e.preventDefault();
        console.log(user)


        axios
            .put(`http://localhost:8080/api/user/${userInfo.id}`, user, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            })
            .then((res) => {
                onOk();
                AuthServise.logout();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleInputChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };


    return (
        <>
            <Modal title="Basic Modal" open={visible} onOk={onOkItSelf} onCancel={onCancel}>
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
                    <label>Familiya</label>
                    <div className="form-user">


                        <Input name="lastName" onChange={handleInputChange} type="text" placeholder="lastName"/>
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
            </Modal>
        </>
    );
}

export default UserEdit;
