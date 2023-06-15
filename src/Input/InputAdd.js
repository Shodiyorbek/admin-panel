import React, {useEffect, useState} from "react";
import {  Modal } from "antd";
import axios from "axios";

function InputAdd({ visible, onOk, onCancel }) {
    const [tour, setTour] = useState({});
    const [productLIst, setProductLsit] = useState([]);
    const [supplier, setSupplier] = useState([]);



    const onOkItSelf = (e) => {
        e.preventDefault();
console.log(tour)
        axios
            .post("http://localhost:8080/api/input/", tour, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
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

    useEffect(() => {
        axios.get(`http://localhost:8080/api/product/all`).then((response) => {
            console.log(response.data)
            setProductLsit(response.data)
        }).catch((error)=>{
            console.log(error)
        })
        axios.get(`http://localhost:8080/api/supplier/all`).then((response) => {
            console.log(response.data)
            setSupplier(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    }, [])


    return (
        <>
            <Modal title="Basic Modal" open={visible} onOk={onOkItSelf} onCancel={onCancel}>
                <div className="form-group">
                    <label htmlFor="">Price</label>
                    <input type="number" className="form-control" onChange={handleInputChange} name="price" />
                </div>

                <div className="form-group">
                    <label htmlFor="">Amout</label>
                    <input type="number" className="form-control" onChange={handleInputChange} name="quantity" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Suppliers</label>
                    <select name={"supplierId"} onChange={handleInputChange} className={"form-control"}>
                        <option selected disabled></option>
                        {supplier.map((supplier, index) => (
                            <option key={index} value={supplier.id}>{supplier.fullName}</option>
                        ))}
                    </select>
                 </div>
                <div className="form-group">
                    <label htmlFor="">Product</label>
                    <select name={"productId"} onChange={handleInputChange} className={"form-control"}>
                        <option selected disabled></option>

                        {productLIst.map((product, index) => (
                            <option key={index} value={product.id}>{product.name}</option>
                        ))}
                    </select>

                </div>



            </Modal>
        </>
    );
}

export default InputAdd;
