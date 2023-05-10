import React, {useState} from 'react';
import axios from "axios";
import TourEdit from "./TourEdit";
import './style.css'

function TourList({tourList}) {
    const [tour,setTour] = useState({});
    const [visible, setVisible] = useState(false);


    const handleDelete = (id) => {
        axios.delete("http://localhost:8080/api/v1/tour/" + id).then((res) => {
            console.log(res.data)
            window.location.reload()
        })
    }

    const showModal = (props) => {
        setTour(props)
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
                        <th scope="col">Price</th>
                        <th scope="col">period</th>
                        <th scope="col">Image</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tourList.map((tour) => (
                        <tr>
                            <td>{tour.name}</td>
                            <td>{tour.price}</td>
                            <td>{tour.period}</td>
                            <td className={"img"} ><img  src={"http://localhost:8080/images/"+tour.imageUrl}/></td>
                            <td><button onClick={()=>handleDelete(tour.imageUrl)} className={"btn btn-danger"}>Delete</button></td>
                            <td><button  onClick={()=>showModal(tour)} className={"btn btn-primary"}>Edit</button></td>

                        </tr>
                    ))}
                    </tbody>
                </table>
                <TourEdit tourInfo={tour} visible={visible} onOk={handleOk} onCancel={handleCancel}/>
            </div>
        </div>
    );
}

export default TourList;