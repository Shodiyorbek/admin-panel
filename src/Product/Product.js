import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button} from "antd";
import ProductAdd from "./ProductAdd";
import ProductList from "./ProductList";

function Product({isAdmin}) {

    const [tourList, setTourList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [category,setCategoryList]=useState([]);
    const [ctegoryId,setCategoryId]=useState(0);
    useEffect(() => {
        getCategory();
    }, [])

    const getCategory = () => {
        axios.get("http://localhost:8080/api/category/",{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            },
        }).then((response) => {
            console.log(response.data)
            setCategoryList(response.data)
        })
    }
    const showModal = () => {
        setVisible(true);
    };

   

    const getTourLIst = (id) => {
        axios.get(`http://localhost:8080/api/product/all/${id}`).then((response) => {
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
const handleInputChange=(e)=>{

    getTourLIst(e.target.value);
}
    return (
        <div className={"main"}>
            {isAdmin?
                <Button type="primary" onClick={showModal}>Add Product</Button>:
                <></>
            }
            <select onChange={handleInputChange}  className="form-control" name="categoryId">
                <option  selected disabled>Catgoryni tanlang</option>
                {category.map((category,index) => (
                    <option key={index} value={category.id}>{category.name}</option>
                ))}
            </select>
            <ProductAdd categoryList={tourList} visible={visible} onOk={handleOk} onCancel={handleCancel}/>
            <ProductList tourList={tourList} isAdmin={isAdmin}/>
        </div>
    );
}

export default Product;