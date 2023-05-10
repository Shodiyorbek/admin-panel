import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button} from "antd";
import TourAdd from "./TourAdd";
import TourList from "./TourList";

function Tour() {

    const [tourList, setTourList] = useState([]);
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    useEffect(() => {
        getTourLIst();
    }, [])

    const getTourLIst = () => {
        axios.get("http://localhost:8080/api/v1/tour").then((response) => {
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
            <Button type="primary" onClick={showModal}>Add Tour</Button>
            <TourAdd visible={visible} onOk={handleOk} onCancel={handleCancel}/>
            <TourList tourList={tourList}/>
        </div>
    );
}

export default Tour;