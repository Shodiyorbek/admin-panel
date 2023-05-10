import React, { useState } from "react";
import {  Modal } from "antd";
import axios from "axios";

function TourAdd({ visible, onOk, onCancel }) {
    const [tour, setTour] = useState({
        name: "",
        price: 2.2,
        period: 2,
        image: null,
    });

    const onOkItSelf = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", tour.name);
        formData.append("price", tour.price);
        formData.append("period", tour.period);
        formData.append("image", tour.image);

        axios
            .post("http://localhost:8080/api/v1/tour", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
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
        const name = e.target.name;
        const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
        setTour({
            ...tour,
            [name]: value,
        });
    };


    return (
        <>
            <Modal title="Basic Modal" open={visible} onOk={onOkItSelf} onCancel={onCancel}>
                <div className="form-group">
                    <label htmlFor="">Image</label>
                    <input type="file" className="form-control" onChange={handleInputChange} name="image" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Tour name</label>
                    <input type="text" className="form-control" onChange={handleInputChange} name="name" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Price(UZS)</label>
                    <input type="text" className="form-control" onChange={handleInputChange} name="price" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Period</label>
                    <input type="text" className="form-control" onChange={handleInputChange} name="period" />
                </div>
            </Modal>
        </>
    );
}

export default TourAdd;
