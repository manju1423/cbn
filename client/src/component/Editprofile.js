import React, { useEffect, useRef, useState } from 'react'
import {Link} from "react-router-dom";
import Topnavigation from './Topnavigation';
import { useSelector } from 'react-redux';
function Editprofile() {
    let firstNameInputref =useRef();
    let lastNameInputref =useRef();
    let ageInputref =useRef();
    let emailInputref =useRef();
    let passwordInputref =useRef();
    let mobileNoInputref =useRef();
    let profilePicInputref =useRef();
    let [profilePic, setprofilePic]= useState("./images/noimag.png");
    let storeObj = useSelector((store)=>{
        console.log(store);
       return store});
       useEffect(()=>{
        firstNameInputref.current.value = storeObj.loginReducer.userDetails.firstName;
        lastNameInputref.current.value = storeObj.loginReducer.userDetails.lastName;
         ageInputref.current.value = storeObj.loginReducer.userDetails.age;
         emailInputref.current.value = storeObj.loginReducer.userDetails.email;
       
        mobileNoInputref.current.value = storeObj.loginReducer.userDetails.mobileNo;
        let profilePicpath = `/${storeObj.loginReducer.userDetails.profilePic}`
        setprofilePic(profilePicpath);
       
       },[]);


    let UpdatedProfile= async()=>{
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
            method:"PUT",
            
            body: dataToSend
        };
        let JSONData= await fetch("/updateProfile",reqOptions);
        let JsoData = await JSONData.json();
        if (JsoData.status == "success"){
            alert(JsoData.msg);
        
        }
       
        console.log(JsoData);
    }
       
  return (
    <div>
        <Topnavigation/>
        <form className='edit'>
       <h2>EDIT USER PROFILE</h2>
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
            <input ref={ageInputref} type ="number"></input>
        </div>
        <div>
            <label>Email</label>
            <input ref={emailInputref} readOnly></input>
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
               UpdatedProfile();
        }}>Update Profile</button>
        <br></br>
    <Link to ="/">login</Link>
        </form>
       
        
        </div>
  );
}

export default Editprofile