import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button} from "antd";
import OrderAdd from "./OrderAdd";
import OrderList from "./OrderList";
import AuthServise from "../AuthServise";

function Order({user}) {

    const [tourList, setTourList] = useState([]);
    const [visible, setVisible] = useState(false);


    const showModal = () => {
        setVisible(true);
    };

    useEffect(() => {
            axios.get(`http://localhost:8080/api/order/all/${user.id}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                },
            }).then((response) => {
                console.log(response.data)
                setTourList(response.data)

            })


    }, [])




    const handleOk = () => {
        console.log("clicked ok")
        setVisible(false)

    }

    const handleCancel = () => {
        console.log("clicked cancel")
        setVisible(false)
    }

    return (
        <div className={"main"}>
            <Button type="primary" onClick={showModal}>Add Tour</Button>
            <OrderAdd visible={visible} onOk={handleOk} onCancel={handleCancel}/>
            <OrderList tourList={tourList}/>
        </div>
    );
}

export default Order;