import React, { useEffect, useState } from "react";
import Axios from 'axios'
import {
    Container,
    GoalRow,
    DailyCell,
    GoalColumn,
    NameColumn,
    Col,
    GoalWapper,
    GoalNameButton
  } from './style'

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
    return <DailyCell parentId={parentId} date={dateArrayItem} done></DailyCell>
  } else {
    return <DailyCell parentId={parentId} date={dateArrayItem}></DailyCell>
  }                       
}

const removeGoal = async event => {
  event.preventDefault()
  
  const res = await fetch(
    '/api/goals/remove',
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
        <Container>
            <Col>
              {goals.map((item,key)=>{
                  return (
                    <GoalRow>
                      <NameColumn  key={key}>
                        <GoalNameButton value={item._id} onClick={doneGoal}>
                          {item.name} 
                        </GoalNameButton>
                        {/* <button value={item._id} onClick={doneGoal}>
                        {item.name}  */}
                        {/* </button> */}
                      </NameColumn>
                    </GoalRow>
                  )
                })}
            </Col>
              <Col>
              <GoalWapper>
              {goals.map((item,key)=>{
                  return (
                    <GoalRow key={key}>
                      <GoalColumn  key={key}>
                      <div>
                        {getLast30days().map((dateArrayItem)=>{ return (<> {haveDone(item._id,goalsLog,dateArrayItem)} </>) })}
                        </div>
                        {/* <button value={item._id} onClick={removeGoal}>Remove</button> */}
                      </GoalColumn>
                    </GoalRow>
                  )
                })}
              </GoalWapper>
              </Col>
        </Container>
    )
  }
  
  export default ToDoMap