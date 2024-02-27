import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import {Link,useNavigate} from "react-router-dom";
import axios from "axios";


function Login() {
  let emailInputref = useRef();
  let passwordInputref = useRef();
  let navigate = useNavigate();
  let dispatch = useDispatch();




  useEffect(()=>{
    axios.defaults.baseURL ="";
    axios.defaults.headers.common["authorization"] = 
    localStorage.getItem("token");
  validateToken();
  },[]);


  let validateLogin = async()=>{
  };
    let validateLoginThruAxios = async ()=>{
      let dataToSend = new FormData();
      dataToSend.append ("email", emailInputref.current.value);
      dataToSend.append ("password", emailInputref.current.value);
      
   let response =   await axios.post("/Login",dataToSend);
   //dispatch({type:"Login", data:response.data.data});
   if(response.data.data.status =="failure"){
    alert(response.data.data.msg);
  }else{
    localStorage.setItem("token",response.data.data.token);
    dispatch ({type:"login", data :response.data.data});
    navigate("/home");

  }

   console.log(response);
  };

let validateCredentials = ()=>{
  
return async()=>{


  let dataToSend = new FormData();
  dataToSend.append("email", emailInputref.current.value);
  dataToSend.append("password", passwordInputref.current.value);

  let reqOptions= {
    method :"POST",
  body: dataToSend,
};
  let JSONData = await fetch("/Login",reqOptions)
  let JsoData = await JSONData.json();
  if(JsoData.status =="failure"){
    alert(JsoData.msg);
  }else{
    localStorage.setItem("token",JsoData.data.token);
    dispatch ({type:"login", data :JsoData.data});
    navigate("/home");

  }
  console.log(JsoData);

}



};

  let validateToken = async()=>{


    if (localStorage.getItem("token")){}
    
  
  };
  return (
    <div>
        <form>
          <h2> Login page</h2>
            <div>
                <label>Email</label>
                <input ref ={emailInputref} placeholder='email id please'></input>
            </div>
            <div>
                <label>Password</label>
                <input ref={passwordInputref} placeholder='password here'></input>
            </div>
           <button type="button" onClick={()=>{
            //validateLogin();
          // dispatch(validateCredentials());
           validateLoginThruAxios();
           }}>Login here</button>
        </form>
        <br></br>
        <Link to ="/Signup">sign up</Link>
    </div>
  );
}

export default Login