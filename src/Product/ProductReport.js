import React, {useEffect, useState} from 'react';
import axios from "axios";

import '../style.css'
import AuthServise from "../AuthServise";

function OrderList() {

    let quantity=0;
    let profit=0;
    let sellingPrice=0;
    let purchesePrice=0;
    const [productList, setProductLsit] = useState([]);



    useEffect(() => {
        axios.get(`http://localhost:8080/api/product/all`).then((response) => {
            console.log(response.data)
            setProductLsit(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    }, [])



    return (
        <div className="container-fluid">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr style={{textAlign:"center"}}>
                        <th scope="col">Name</th>
                        <th scope="col">All</th>
                        <th scope="col">Sold</th>
                        <th scope="col">Rest</th>



                    </tr>
                    </thead>
                    <tbody>
                    {productList.map((product) => (

                        <tr>
                            <td>{product.name}</td>
                            <td>{product.allQuantity}</td>
                            <td>{product.allQuantity-product.currentQuantity}</td>
                            <td>{product.currentQuantity}</td>



<div style={{display:"none"}}>
                            {quantity=quantity+product.allQuantity}
                            {profit=profit+(product.allQuantity-product.currentQuantity)}
                            {sellingPrice=sellingPrice+product.currentQuantity}

</div>
                        </tr>

                    ))}
                    <tr>
                        <td>All</td>
                        <td>{quantity}</td>
                        <td>{profit}</td>
                        <td>{sellingPrice}</td>

                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderList;