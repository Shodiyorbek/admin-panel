import React, {useState} from 'react';
import axios from "axios";
import ProductEdit from "./ProductEdit";
import '../style.css'
import AuthServise from "../AuthServise";

function ProductList({tourList,isAdmin}) {
    const [product,setProduct] = useState({});
    const [visible, setVisible] = useState(false);
    const[order,setOrder]=useState({});
    const [user, userId]= useState('')



    const handleDelete = (id) => {
        axios.delete("http://localhost:8080/api/product/" + id).then((res) => {
            console.log(res.data)
            window.location.reload()
        })
    }

    const showModal = (props) => {
        setProduct(props)
        setVisible(true);
    };
    const handleOk = () => {
        console.log("clicked ok")
        setVisible(false)
        window.location.reload()
    }

    const handleCancel = () => {
        console.log("clicked cancel")
        setVisible(false)
    }


    function addBucket(tour) {

        AuthServise.getUser().then((user)=>{
            userId(user.id)
        })
        setOrder({
            customerId:user,
            orderItems:[
                {
                    productId:tour.id,
                    quantity:1
                }

            ]
        })
        axios
            .post("http://localhost:8080/api/order/", order, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                },
            })
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="container-fluid">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Description</th>
                        <th scope="col">ISBN</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tourList.map((tour) => (
                        <tr>
                            <td>{tour.name}</td>
                            <td>{tour.price}</td>
                            <td>{tour.quantity}</td>
                            <td>{tour.description}</td>
                            <td>{tour.ISBN}</td>
                            {isAdmin?
                                <>
                                    <td><button onClick={()=>handleDelete(tour.id)} className={"btn btn-danger"}>Delete</button></td>
                                    <td><button  onClick={()=>showModal(tour)} className={"btn btn-primary"}>Edit</button></td></>:<></>
                            }
                            <td><button  onClick={()=>addBucket(tour)} className={"btn btn-primary"}>Add to bucket</button></td>

                        </tr>
                    ))}
                    </tbody>
                </table>
                <ProductEdit info={product} visible={visible} onOk={handleOk} onCancel={handleCancel}/>
            </div>
        </div>
    );
}

export default ProductList;