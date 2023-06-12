import React, {useEffect, useState} from 'react';
import axios from "axios";
import AuthServise from "../AuthServise";
import UserEdit from "./UserEdit";
import '../Css/Cabinent.css'
import '../Css/style.css'




function User() {

    const [user, setUser] = useState([]);
    const [visable,setVisable]=useState(false)


const showModal=()=>{
    setVisable(true)
}
    const onCancel=()=>{
        setVisable(false)
    }
    const onOk=()=>{
        setVisable(false)
    }

    useEffect(() => {
        AuthServise.getUser().then((user)=>{
            setUser(user)
            console.log(user)
        })
    }, [])







    return (
        <div className={"main"}>
            <div className="card sm">
                <div style={{display:'flex',alignItems:'center', justifyContent:'space-between', width:'90%', textAlign:'start'}} className={"card-header-text"}>
                    <div style={{display:'flex',alignItems:'center'}} className="left">
                        <div style={{width:'60px', height:'60px',marginRight:'10px'}} className="avatar">
                        </div>
                        <div className='employee-name'>
                            <span> {user.firstName} {user.lastName} </span>
                            <h6>{user.status}</h6>
                        </div>
                    </div>
                    <div className="right">

                        <button onClick={showModal} className="btn btn-outline-primary">
                            <i className='bx bx-edit'></i></button>

                        <button onClick={AuthServise.logout} className={"btn btn-outline-danger"}><i
                            className='bx bx-exit'></i></button>

                    </div>
                </div>

                <div style={{display:'flex', flexDirection:'column', alignItems:'start'}} className="card-main-chart third">
                    <h6>User :</h6>
                    <li>1.Tolliq ismi sharifi - <span>{user.firstName} {user.lastName}</span>  </li>
                    <li>2.Address  - <span>{user.address}</span>  </li>
                    <li>3.Username - <span>{user.username} </span>  </li>
                    <li>4.Password -  <span>{user.password}</span>  </li>
                    <li>5.PostalCode -   <span>{user.postalCode}</span>  </li>
                    <li>6.Tel raqami -  <span>{user.phoneNumber}</span>  </li>



                </div>

            </div>
<UserEdit visible={visable} onCancel={onCancel} userInfo={user} onOk={onOk} />
        </div>
    );
}

export default User;