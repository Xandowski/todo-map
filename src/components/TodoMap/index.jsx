import React, { useEffect, useState } from "react"
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
  const datesArray = []
  
  for (let i = 0; i < 30; i++){
    const date = new Date(new Date().setDate(new Date().getDate() - i))
    datesArray.push(date)
  }
  
  return datesArray
}

function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
}

const haveDone =  (parentId,goalsLog,dateArrayItem) => {
  let haveDone = 0
  goalsLog.forEach((goalLogItem)=>{
    if (goalLogItem.parentId == parentId && sameDay(dateArrayItem,new Date(goalLogItem.createdAt))){
      haveDone = 1
    }
  })    
  if (haveDone){
    return <DailyCell parentId={parentId} date={dateArrayItem} done />
  } 
  return <DailyCell parentId={parentId} date={dateArrayItem} />
                         
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

var percentColors = [
  { pct: 0.0, color: { r: 0xff, g: 0xff, b: 0xff } },
  { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
  { pct: 1.0, color: { r: 0, g: 0xff, b: 0 } } ];

const getMax = (obj) =>{
  if (Object.keys(obj).length){
    return Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);
  }
  return 1
}

const getMin = (obj) =>{
  if (Object.keys(obj).length){
    return Object.keys(obj).reduce((a, b) => obj[a] < obj[b] ? a : b);
  }
  return 1
}

const getGreenIntensity = (input, max, min) => {
  var percent = ((input - min) * 100) / (max - min)
  return 'rgba(102, 255, 153,'+percent/100+')'

  // if (percent < 50) {
  //   percent = ((input - max) * 100) / (min - max)
  //   return 'rgba(102, 255, 153,'+percent/100+')'
  // }
  // else if (percent < 75) {
  //   var percent = ((input - min) * 100) / (max - min)
  //   return 'rgba(255, 255, 153,'+percent/100+')'
  // }
  // return 'rgba(255, 50, 50,'+percent/100+')'
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
    const [goalsIntensity,setGoalsIntensity]=useState({})
    useEffect(() => { fetchGoals() }, [])
    const fetchGoals=async()=>{
      const response=await Axios('/api/goals');

      response.data.forEach((item)=>{
        if (!goalsIntensity[item._id]){
          goalsIntensity[item._id] = 30
        }
      })

      setGoals(response.data)    
    }

    

    const [goalsLog,setGoalsLog]=useState([])
    useEffect(() => { fetchGoalsLog() }, [])
    const fetchGoalsLog=async()=>{
      const response=await Axios('/api/goals/log');

      response.data.forEach((item)=>{
          goalsIntensity[item.parentId] = goalsIntensity[item.parentId] + -1
      })

      setGoalsIntensity(goalsIntensity)
      setGoalsLog(response.data)    
    }
    // useEffect(()=>console.log(goals))
    return (
        <Container>
            <Col>
              {goals.map((item,key)=>{
                  return (
                    <GoalRow>
                      <NameColumn  key={key}>
                        <GoalNameButton value={item._id} onClick={doneGoal} style={{backgroundColor:getGreenIntensity(goalsIntensity[item._id],goalsIntensity[getMin(goalsIntensity)],goalsIntensity[getMax(goalsIntensity)])}}>
                          {item.name}
                        </GoalNameButton>
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