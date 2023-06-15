import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button} from "antd";
import InputAdd from "./InputAdd";
import InputList from "./InputList";

function Input({isAdmin}) {

    const [productLIst, setProductLsit] = useState([]);
    const [visible, setVisible] = useState(false);
    const showModal = () => {
        setVisible(true);
    };

    useEffect(() => {
        getProductList();
    }, [])

    const getProductList = () => {
        axios.get(`http://localhost:8080/api/input/all`).then((response) => {
            console.log(response.data)
            setProductLsit(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    }

    const handleOk = () => {
        console.log("clicked ok")
        setVisible(false)
        getProductList()
    }

    const handleCancel = () => {
        console.log("clicked cancel")
        setVisible(false)
    }

    return (
        <div className={"main"}>

                <Button type="primary" onClick={showModal}>Add Input</Button>

            <InputAdd categoryList={productLIst} visible={visible} onOk={handleOk} onCancel={handleCancel}/>
            <InputList productList={productLIst} />
        </div>
    );
}

export default Input;