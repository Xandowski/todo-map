import React, { useEffect, useState } from "react"
import Axios from 'axios'
import OrderByDropdown from './orderByDropdown'
import GoalModal from './goalModal'
import useWindowSize from "../../utils/useWindowSize"
import NewGoal from '../../components/NewGoal'

import {
  Container,
  GoaldAndCellsContainer,
  GoalRow,
  DailyCell,
  GoalColumn,
  NameColumn,
  Col,
  GoalWapper,
  GoalNameButton,
} from './style'

const getLast30days = () => {
  const datesArray = []

  for (let i = 0; i < 30; i++) {
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

const haveDone = (parentId, goalsLog, dateArrayItem) => {
  let haveDone = 0
  goalsLog.forEach((goalLogItem) => {
    if (goalLogItem.parentId == parentId && sameDay(dateArrayItem, new Date(goalLogItem.createdAt))) {
      haveDone = 1
    }
  })
  if (haveDone) {
    return <DailyCell parentId={parentId} date={dateArrayItem} done />
  }
  return <DailyCell parentId={parentId} date={dateArrayItem} />

}

const getMax = (obj) => {
  if (Object.keys(obj).length) {
    return Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);
  }
  return 1
}

const getMin = (obj) => {
  if (Object.keys(obj).length) {
    return Object.keys(obj).reduce((a, b) => obj[a] < obj[b] ? a : b);
  }
  return 1
}

const getGreenIntensity = (input, max, min) => {
  var percent = ((input - min) * 100) / (max - min)
  return 'rgba(102, 255, 153,' + percent / 100 + ')'
}

const ToDoMap = () => {

  const [width, height] = useWindowSize();

  function truncate(str) {
    if (!width) return ""
    if (width <= 420) {
      var n = 10
      if (str.length <= n) {
        return str;
      }
      return str.substr(0, 6) + "..." + str.substring(str.length - 6);
    } else {
      return str
    }
  };

  const [goals, setGoals] = useState([])
  const [goalsIntensity, setGoalsIntensity] = useState({})
  useEffect(() => { fetchGoals() }, [])
  const fetchGoals = async () => {
    const response = await Axios('/api/goals');
    response.data.forEach((item) => {
      if (!goalsIntensity[item._id]) {
        goalsIntensity[item._id] = 30
      }
    })
    setGoals(response.data)
    fetchGoalsLog(response.data)
  }

  const [goalsLog, setGoalsLog] = useState([])
  const fetchGoalsLog = async (goals) => {
    const response = await Axios('/api/goals/log');
    goals.forEach((goal) => {
      goal.intensity = 29
    })
    setGoals(goals)
    response.data.forEach((item) => {
      goalsIntensity[item.parentId] = goalsIntensity[item.parentId] + -1
      goals.forEach((goal) => {
        if (goal._id === item.parentId) {
          if (!goal.intensity) {
            goal.intensity = 29
          } else {
            goal.intensity = goal.intensity - 1
          }
        }
      })
    })
    setGoals(goals)
    setGoalsIntensity(goalsIntensity)
    setGoalsLog(response.data)
  }

  const doneGoal = async (event) => {
    event.preventDefault()

    const res = await fetch(
      '/api/goals/done',
      {
        body: JSON.stringify({
          parentId: event.target.value,
          offset: -(new Date().getTimezoneOffset() / 60)
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )
    const result = await res.json()
    if (result.message) {
      alert(result.message)
    }
    if (goalsIntensity[result.parentId]) {
      goalsIntensity[result.parentId] = goalsIntensity[result.parentId] - 1
    } else {
      goalsIntensity[result.parentId] = 30
    }
    setGoalsIntensity(goalsIntensity)
    goalsLog.push(result)
    setGoalsLog(goalsLog)
    setGoals([...goals])
    closeModal()
  }

  const [selectedGoal, setSelectedGoal_] = useState(false)
  function setSelectedGoal(goal) {
    setSelectedGoal_(goal)
    if (selectedGoal._id) {
      openModal()
    }
  }
  // useEffect(() => {
  //   if (selectedGoal) {
  //     openModal()
  //   }
  // }, [selectedGoal]);

  const [modalIsOpen, setModal] = useState(false)
  function openModal() {
    setModal(true);
  }
  function closeModal() {
    setModal(false);
  }

  function orderByCreatedDate(reverse = false) {
    function compare(a, b) {
      if (reverse) {
        return -(new Date(b.createdAt) - new Date(a.createdAt));
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

    }
    var goalsTemp = [...goals]
    goalsTemp.sort(compare)
    setGoals(goalsTemp)
  }

  function orderByMostDone(reverse = false) {
    function compare(a, b) {
      if (a.intensity < b.intensity) {
        if (reverse) {
          return 1;
        } else {
          return -1;
        }
      }
      if (a.intensity > b.intensity) {
        if (reverse) {
          return -1;
        } else {
          return 1;
        }
      }
      return 0;
    }
    var goalsTemp = [...goals]
    goalsTemp.sort(compare)
    setGoals(goalsTemp)
  }
  return (
    <div>
      <Container>
        <GoaldAndCellsContainer>
          <Col>
            {goals.map((item, key) => {
              return (
                <GoalRow key={key}>
                  <NameColumn>
                    <GoalNameButton
                      value={item._id}
                      onClick={() => setSelectedGoal(item)}
                      style={{ backgroundColor: getGreenIntensity(goalsIntensity[item._id], goalsIntensity[getMin(goalsIntensity)], goalsIntensity[getMax(goalsIntensity)]) }}>
                      {truncate(item.name)}
                    </GoalNameButton>
                  </NameColumn>
                </GoalRow>
              )
            })}
          </Col>
          <Col>
            <OrderByDropdown orderByMostDone={orderByMostDone} orderByCreatedDate={orderByCreatedDate} />
            <GoalWapper>
              {goals.map((item, key) => {
                return (
                  <GoalRow key={key}>
                    <GoalColumn>
                      <div>
                        {getLast30days().map((dateArrayItem, key) => { return (<span key={key}> {haveDone(item._id, goalsLog, dateArrayItem)} </span>) })}
                      </div>
                    </GoalColumn>
                  </GoalRow>
                )
              })}
            </GoalWapper>
          </Col>
        </GoaldAndCellsContainer>
       <GoalModal modalIsOpen={modalIsOpen} closeModal={closeModal} selectedGoal={selectedGoal} doneGoal={doneGoal}/>
      </Container>
      <NewGoal/>
    </div>
  )
}
export default ToDoMap