import React from 'react'
import Topnavigation from './Topnavigation'
import { useDispatch } from 'react-redux'

function Tasks() {
  let dispatch = useDispatch();
  return (
    <div>
        <Topnavigation></Topnavigation>
        <h1>Tasks page</h1>
        <button onClick={()=>{
         
          dispatch({type :"addTask", data :"something"});
        }}>Add tasks</button>
    </div>
  )
}

export default Tasks