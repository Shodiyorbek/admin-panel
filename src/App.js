import React, {useEffect, useState} from "react";
import './Css/style.css'
import Main from "./Main";
import Login from "./Login";

function App() {
    const [isLoggIn,setIsLoggin]=useState('')




        useEffect(()=>{
            if(localStorage.getItem('accessToken')){
                const decodedToken = JSON.parse(atob(localStorage.getItem("accessToken").split('.')[1]));
                const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
                const currentTime = new Date().getTime();
                if(expirationTime < currentTime ){
                    setIsLoggin(false);
                }
            }

        setIsLoggin(localStorage.getItem('accessToken'))

    }, [])
  return (
     <>
         {isLoggIn?<Main/>:<Login/>}
     </>
  );
}

export default App;
