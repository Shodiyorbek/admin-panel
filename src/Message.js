import React, {useEffect, useState} from 'react';
import axios from "axios";
import './style.css'

function Message({tourList}) {
    const [message,setMessage] = useState([]);



    const getMessageList = () => {
        axios.get("http://localhost:8080/api/v1/consumer-request" ).then((res) => {
            console.log(res.data)
            setMessage(res.data)
        })
    }

  useEffect(
      getMessageList
  )



    return (
        <div className="container-fluid">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Email</th>
                        <th scope="col">Message</th>
                    </tr>
                    </thead>
                    <tbody>
                    {message.map((message) => (
                        <tr>
                            <td>{message.fullName}</td>
                            <td><a href={"tel:+998942081373"}>{message.phoneNumber}</a> </td>
                            <td> <a href={"mailto:"+message.email}>{message.email}</a> </td>
                            <td>{message.message}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Message;