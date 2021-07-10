import React, { useEffect, useState } from "react"
import Axios from 'axios'
import Modal from 'react-modal'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FaCheck } from 'react-icons/fa'
import * as OrderBy from './components/OrderByDropdown'
import useWindowSize from "./components/UseWindowSize"

import {
  Container,
  GoalRow,
  DailyCell,
  GoalColumn,
  NameColumn,
  Col,
  GoalWapper,
  GoalNameButton,
  ModalCompleteTaskTitle,
  ModalCompleteTaskCloseButton,
  ModalCompleteTaskCompleteItButton
} from './style'

Modal.defaultStyles.content = {
  position: "absolute",
  top: '50%',
  left: '50%',
  right: 'auto',
  bottom: 'auto',
  marginRight: '-50%',
  transform: 'translate(-50%, -50%)',
  border: "1px solid #ccc",
  background: "#fff",
  overflow: "auto",
  WebkitOverflowScrolling: "touch",
  borderRadius: "1em",
  outline: "none",
  padding: "20px",
  width: '100%',
  maxWidth: "500px",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
}

Modal.defaultStyles.overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.555)"
}

Modal.setAppElement('body');

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
          clientTimestamp: new Date().getTime()
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )
    const result = await res.json()
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
  }

  useEffect(() => {
    if (selectedGoal) {
      openModal()
    }
  }, [selectedGoal]);

  const [modalIsOpen, setModal] = useState(false)
  function openModal() {
    setModal(true);
  }
  function closeModal() {
    setModal(false);
  }

  function revertGoalsOrder() {
    var goalsTemp = [...goals].reverse();
    console.log(goalsTemp)
    setGoals(goalsTemp);
  }

  function OrderByCreatedDate() {
    function compare(a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    var goalsTemp = [...goals]
    goalsTemp.sort(compare)
    setGoals(goalsTemp)
  }

  function orderByMostDone() {
    function compare(a, b) {
      if (a.intensity < b.intensity) {
        return -1;
      }
      if (a.intensity > b.intensity) {
        return 1;
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
        <button onClick={revertGoalsOrder}>Reverse</button>
        <button onClick={orderByMostDone}>MostDone</button>
        <button onClick={OrderByCreatedDate}>OrderByCreatedDate</button>
      </Container>
      <Container>
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
          <GoalWapper>
            {goals.map((item, key) => {
              return (
                <GoalRow key={key}>
                  <GoalColumn>
                    <div>
                      {getLast30days().map((dateArrayItem, key) => { return (<span key={key}> {haveDone(item._id, goalsLog, dateArrayItem)} </span>) })}
                    </div>
                    {/* <button value={item._id} onClick={removeGoal}>Remove</button> */}
                  </GoalColumn>
                </GoalRow>
              )
            })}
          </GoalWapper>
        </Col>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
          <ModalCompleteTaskTitle>
            {selectedGoal.name}
          </ModalCompleteTaskTitle>
          <ModalCompleteTaskCloseButton onClick={closeModal}>
            <AiOutlineCloseCircle size={26} />
          </ModalCompleteTaskCloseButton>
          <ModalCompleteTaskCompleteItButton>
            <button className="btn" value={selectedGoal._id} onClick={doneGoal}><span>Complete It <FaCheck size={22} /></span></button>
          </ModalCompleteTaskCompleteItButton>
        </Modal>
      </Container>
    </div>
  )
}
export default ToDoMap