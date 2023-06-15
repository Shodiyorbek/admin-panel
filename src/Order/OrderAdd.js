import React, {useEffect, useState} from "react";
import {Button, Modal} from "antd";
import axios from "axios";

function OrderAdd({product}) {
    const [tour, setTour] = useState({});
    const [productLIst, setProductLsit] = useState([]);
    const [supplier, setSupplier] = useState([]);
    const [visible, setVisible] = useState(false);



    const handleOk = () => {
        console.log("clicked ok")
        setVisible(false)

    }

    const handleCancel = () => {
        console.log("clicked cancel")
        setVisible(false)
    }
    const onOkItSelf = (e) => {
        e.preventDefault();
console.log(tour)
        axios
            .post("http://localhost:8080/api/order/", tour, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                },
            })
            .then((res) => {
                handleOk();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleInputChange = (e) => {

        setTour({
            ...tour,
            [e.target.name]: e.target.value,
            productId:product.id,
            purchasePrice:product.purchasePrice

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
    const showModal = () => {
        setVisible(true);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>Order</Button>

            <Modal title="Basic Modal" open={visible} onOk={onOkItSelf} onCancel={handleCancel}>


                <div className="form-group">
                    <label htmlFor="">Amout (max:{product.currentQuantity})</label>
                    <input type="number" className="form-control" onChange={handleInputChange} name="quantity" />
                </div><div className="form-group">
                    <label htmlFor="">Price (suggested:{product.sellingPrice})</label>
                    <input type="number" className="form-control" onChange={handleInputChange} name="sellingPrice" />
                </div>





            </Modal>
        </>
    );
}

export default OrderAdd;
