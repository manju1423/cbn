import React, { useRef, useState } from 'react'
import {Link} from "react-router-dom";
function Signup() {
    let firstNameInputref =useRef();
    let lastNameInputref =useRef();
    let ageInputref =useRef();
    let emailInputref =useRef();
    let passwordInputref =useRef();
    let mobileNoInputref =useRef();
    let profilePicInputref =useRef();
    let [profilePic, setprofilePic]= useState("./images/noimag.png");



    let onSignupUsingJson =async()=>{
        let dataToSend ={
            fn:firstNameInputref.current.value,
            ln:lastNameInputref.current.value,
            age:ageInputref.current.value,
            email:emailInputref.current.value,
            password:passwordInputref.current.value,
            mobileNo:mobileNoInputref.current.value,
            profilePic:profilePicInputref.current.value,
        };
        let JSONDataTosend = JSON.stringify(dataToSend);
        let myHeader = new Headers();
        myHeader.append("content-type","application/json"); 
        let reqOptions ={
            method:"POST",
            body:JSONDataTosend,
            headers: myHeader,
        };
        let JSONData = await fetch("http://localhost:3741/Signup",reqOptions);
        let JSOdata= await JSONData.json();
        console.log(JSOdata);
    
    };
    let onSignupusingURLE = async()=>{
        let myHeader = new Headers();
        myHeader.append("Content-type","application/x-www-form-urlencoded")
       let dataToSend = new URLSearchParams();
      
        dataToSend.append("fn",firstNameInputref.current.value);
        dataToSend.append("ln",lastNameInputref.current.value);
        dataToSend.append("age",ageInputref.current.value);
        dataToSend.append( "email",emailInputref.current.value,);
        dataToSend.append("password",passwordInputref.current.value);
        dataToSend.append("mobileNo",mobileNoInputref.current.value);
        dataToSend.append( "profilePic",profilePicInputref.current.files[0]);

       
        let reqOptions={
            method:"POST",
            header: myHeader,
            body: dataToSend
        }
        let JSONData= await fetch("http://localhost:3741/Signup",reqOptions);
        let JsoData = await JSONData.json();
        console.log(JsoData);
    }
    let onSignupusingFormData= async()=>{
        let dataToSend = new FormData();
      
        dataToSend.append("fn",firstNameInputref.current.value);
        dataToSend.append("ln",lastNameInputref.current.value);
        dataToSend.append("age",ageInputref.current.value);
        dataToSend.append( "email",emailInputref.current.value,);
        dataToSend.append("password",passwordInputref.current.value);
        dataToSend.append("mobileNo",mobileNoInputref.current.value);
        
        for (let i=0;i<profilePicInputref.current.files.length; i++){
            dataToSend.append( "profilePic",profilePicInputref.current.files[i]);
        }

       
        let reqOptions={
            method:"POST",
            
            body: dataToSend
        };
        let JSONData= await fetch("http://localhost:3741/Signup",reqOptions);
        let JsoData = await JSONData.json();
        if (JsoData.status == "success"){
           
            alert(JsoData.msg);
        }
       
        console.log(JsoData);
    }
       
  return (
    <div><form>
       <h2>Sign Up</h2>
       <div>
            <label>First Name</label>
            <input ref={firstNameInputref}></input>
        </div>
        <div>
            <label>Last Name</label>
            <input ref={lastNameInputref}></input>
        </div>
        <div>
            <label>Age</label>
            <input ref={ageInputref}></input>
        </div>
        <div>
            <label>Email</label>
            <input ref={emailInputref}></input>
        </div>
        <div>
            <label>Password</label>
            <input ref={passwordInputref}></input>
        </div>
        <div>
            <label>Mobile</label>
            <input ref={mobileNoInputref}></input>
        </div>
        <div>
            <label>Profile Pic</label>
            <input ref={profilePicInputref} type= "file"  onChange={(e)=>{
                let selectedImage =URL.createObjectURL(e.target.files[0]);
                setprofilePic(selectedImage);
            }}></input>
            <br></br>
            <img src={profilePic} className='profilePic'></img>
        </div>
{/*    
        <button type = "button" onClick={()=>{
                onSignupUsingJson();
        }}>Login(JSON FORMAT DATA)</button>
        <button type = "button" onClick={()=>{
               onSignupusingURLE();
        }}>Login(URLE)</button> */}
        <button type = "button" onClick={()=>{
               onSignupusingFormData();
        }}>sign up through form data</button>
        <br></br>
    <Link to ="/">login</Link>
        </form>
       
        
        </div>
  );
}

export default Signup