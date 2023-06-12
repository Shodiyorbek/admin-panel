import React, {useEffect, useState} from "react";
import {  Modal } from "antd";
import axios from "axios";

function ProductAdd({ visible, onOk, onCancel,info }) {
    const [tour, setTour] = useState({});
    const [category,setCategoryList]=useState([])
    useEffect(() => {
        getTourLIst();
    }, [])

    const getTourLIst = () => {
        axios.get("http://localhost:8080/api/category/",{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            },
        }).then((response) => {
            setCategoryList(response.data)
        })
    }

    const onOkItSelf = (e) => {
        e.preventDefault();
        console.log(category)
        console.log(tour)
        axios
            .put(`http://localhost:8080/api/product/${info.id}`, tour, {
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


    return (
        <>
            <Modal title="Basic Modal" open={visible} onOk={onOkItSelf} onCancel={onCancel}>
                <div className="form-group">
                    <label htmlFor="">Name</label>
                    <input type="text" className="form-control" onChange={handleInputChange} name="name" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Price</label>
                    <input type="double" className="form-control" onChange={handleInputChange} name="price" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Descroption</label>
                    <input type="text" className="form-control" onChange={handleInputChange} name="description" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Quantity</label>
                    <input type="number" className="form-control" onChange={handleInputChange} name="quantity" />
                </div>
                <div className="form-group">
                    <label htmlFor="">ISBN</label>
                    <input type="number" className="form-control" onChange={handleInputChange} name="ISBN" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Category</label>
                    <select onChange={handleInputChange} className="form-control" name="categoryId">
                        <option selected disabled>Catgoryni tanlang</option>
                        {category.map((category,index) => (
                            <option key={index} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>

            </Modal>
        </>
    );
}

export default ProductAdd;
