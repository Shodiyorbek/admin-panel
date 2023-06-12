import React, { useState } from "react";
import {  Modal } from "antd";
import axios from "axios";

function CategoryAdd({ visible, onOk, onCancel }) {
    const [tour, setTour] = useState({});

    const onOkItSelf = (e) => {
        e.preventDefault();

console.log(tour)
        axios
            .post("http://localhost:8080/api/category/", tour, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            })
            .then((res) => {
                onOk();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleInputChange = (e) => {

        setTour({
            ...tour,
            [e.target.name]: e.target.value,
        });
    };


    return (
        <>
            <Modal title="Basic Modal" open={visible} onOk={onOkItSelf} onCancel={onCancel}>
                <div className="form-group">
                    <label htmlFor="">Name</label>
                    <input type="text" className="form-control" onChange={handleInputChange} name="name" />
                </div>

            </Modal>
        </>
    );
}

export default CategoryAdd;
