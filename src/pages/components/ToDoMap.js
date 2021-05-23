import React, { useEffect, useState } from "react";
import Axios from 'axios'

const ToDoMap = () => {
    const [goals,setGoals]=useState([])

    useEffect(() => { fetchGoals() }, [])

    const fetchGoals=async()=>{
      const response=await Axios('/api/goals');
      setGoals(response.data)    
    }

    return (
        <>
        <h2>To-Do Map</h2>
        <div>
            {goals.map((item,key)=>{
                return (
                    <div key={key}>{item.name}</div>
                )
            })}
        </div>
        </>
    )
  }
  
  export default ToDoMap