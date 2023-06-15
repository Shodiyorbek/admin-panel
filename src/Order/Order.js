import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button} from "antd";
import OrderAdd from "./OrderAdd";
import OrderList from "./OrderList";

function Order({isAdmin}) {

    const [productLIst, setProductLsit] = useState([]);
    const [visible, setVisible] = useState(false);


    useEffect(() => {
        getProductList();
    }, [])

    const getProductList = () => {
        axios.get(`http://localhost:8080/api/order/all`).then((response) => {
            console.log(response.data)
            setProductLsit(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    }



    return (
        <div className={"main"}>


            <OrderList productList={productLIst} />
        </div>
    );
}

export default Order;