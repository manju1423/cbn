import React from 'react'
import Topnavigation from './Topnavigation'
import { useSelector } from 'react-redux'

function Home() {
    let storeObj =useSelector((store)=>{
        console.log(store);
   return store;
    });
  return (
    <div>
        <Topnavigation></Topnavigation>
        <h1>hi this is manjunath home page <br></br>
            {storeObj.loginReducer.userDetails.firstName}
            <br></br>
            {storeObj.loginReducer.userDetails.lastName}
        </h1>
        <img src={`/${storeObj.loginReducer.userDetails.profilePic}`}></img>
    </div>
  )
}

export default Home