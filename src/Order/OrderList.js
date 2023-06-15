import React, {useState} from 'react';
import axios from "axios";

import '../style.css'
import AuthServise from "../AuthServise";

function OrderList({productList}) {
    // const [quatity,allQuantity]=useState(0)
    // const [profit,allProfit]=useState(0)
    // const [sellingPrice,allSellingPrice]=useState(0)
    // const [piurchesePrice,allPurchesePrice]=useState(0)
    let quantity=0;
    let profit=0;
    let sellingPrice=0;
    let purchesePrice=0;


    return (
        <div className="container-fluid">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr style={{textAlign:"center"}}>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Purchese price</th>
                        <th scope="col">Selling price</th>
                        <th scope="col">Profit</th>


                    </tr>
                    </thead>
                    <tbody>
                    {productList.map((product) => (

                        <tr>
                            <td>{product.productResponse.name}</td>
                            <td>{product.quantity}</td>
                            <td>{product.productResponse.purchasePrice}</td>
                            <td>{product.productResponse.sellingPrice}</td>
                            <td>{product.profit}</td>


<div style={{display:"none"}}>
                            {quantity=quantity+product.quantity}
                            {profit=profit+product.profit}
                            {sellingPrice=sellingPrice+product.productResponse.sellingPrice}
                            {purchesePrice=purchesePrice+product.productResponse.purchasePrice}
</div>
                        </tr>

                    ))}
                    <tr>
                        <td>All</td>
                        <td>{quantity}</td>
                        <td>{purchesePrice}</td>
                        <td>{sellingPrice}</td>
                        <td>{profit}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderList;