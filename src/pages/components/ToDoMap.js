import React, { useEffect, useState } from "react";
import Axios from 'axios'

const getLast30days = () => {
  var datesArray = []
  
  for (let i = 0; i < 30; i++){
    let date = new Date(new Date().setDate(new Date().getDate() - i))
    datesArray.push(date)
  }
  
  return datesArray
}

function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

const haveDone =  (parentId,goalsLog,dateArrayItem) => {
  var haveDone = 0
  goalsLog.forEach((goalLogItem)=>{
    if (goalLogItem.parentId == parentId && sameDay(dateArrayItem,new Date(goalLogItem.createdAt))){
      haveDone = 1
    }
  })    
  if (haveDone){
    return <span parentId={parentId} date={dateArrayItem} >🟩</span>
  } else {
    return <span parentId={parentId} data={dateArrayItem}>⬜</span>  
  }                       
}
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

    const [goalsLog,setGoalsLog]=useState([])

    useEffect(() => { fetchGoalsLog() }, [])

    const fetchGoalsLog=async()=>{
      const response=await Axios('/api/goals/log');
      setGoalsLog(response.data)    
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
                      {                          
                      getLast30days().map((dateArrayItem)=>{
                        return (<span>
                          {haveDone(item._id,goalsLog,dateArrayItem)}
                        </span>)
                      })}
                  </div>
                )
              })}
        </div>
        <div>
        </div>
        </>
    )
  }
  
  export default ToDoMap