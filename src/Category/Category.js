import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button} from "antd";
import CategoryAdd from "./CategoryAdd";
import CategoryList from "./CategoryList";

function Category({isAdmin}) {

    const [tourList, setTourList] = useState([]);
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    useEffect(() => {
        getTourLIst();
    }, [])

    const getTourLIst = () => {
        axios.get("http://localhost:8080/api/category/").then((response) => {
            console.log(response.data)
            setTourList(response.data)
        })
    }

    const handleOk = () => {
        console.log("clicked ok")
        setVisible(false)
        getTourLIst()
    }

    const handleCancel = () => {
        console.log("clicked cancel")
        setVisible(false)
    }

    return (
        <div className={"main"}>
            <Button type="primary" onClick={showModal}>Add Category</Button>
            <CategoryAdd visible={visible} onOk={handleOk} onCancel={handleCancel}/>
            <CategoryList tourList={tourList} isAdmin={isAdmin}/>
        </div>
    );
}

export default Category;