import React, { useEffect, useState } from "react";
import Axios from 'axios'

const doneGoal = async event => {
    event.preventDefault()
    
    const res = await fetch(
      '/api/goals/done',
      {
        body: JSON.stringify({
            parentId: event.target.value,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )

    const result = await res.json()
    console.log(result)
}

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
                    <div key={key}>
                        {item.name} 
                        <span>
                            <button value={item._id} onClick={doneGoal}>Complete it</button>
                        </span>
                    </div>
                )
            })}
        </div>
        </>
    )
  }
  
  export default ToDoMap