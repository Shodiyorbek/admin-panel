import React, {useState} from 'react';
import axios from "axios";
import CategoryEdit from "./CategoryEdit";
import '../style.css'

function CategoryList({tourList}) {
    const [product,setProduct] = useState({});
    const [visible, setVisible] = useState(false);


    const handleDelete = (id) => {
        axios.delete("http://localhost:8080/api/category/" + id).then((res) => {
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



    return (
        <div className="container-fluid">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Action</th>
                        <th scope="col">Action</th>

                    </tr>
                    </thead>
                    <tbody>
                    {tourList.map((tour) => (
                        <tr>
                            <td>{tour.name}</td>

                            <td><button onClick={()=>handleDelete(tour.id)} className={"btn btn-danger"}>Delete</button></td>
                            <td><button  onClick={()=>showModal(tour)} className={"btn btn-primary"}>Edit</button></td>

                        </tr>
                    ))}
                    </tbody>
                </table>
                <CategoryEdit tourInfo={product} visible={visible} onOk={handleOk} onCancel={handleCancel}/>
            </div>
        </div>
    );
}

export default CategoryList;