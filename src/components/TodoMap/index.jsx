import React, { useEffect, useState } from "react"
import OrderByDropdown from './orderByDropdown'
import useWindowSize from "../../utils/useWindowSize"
import NewGoal from '../../components/NewGoal'
import YourNextGoal from '../../components/YourNextGoal'
import Link from 'next/link'

import {
  Container,
  GoaldAndCellsContainer,
  GoalRow,
  DailyCell,
  GoalColumn,
  NameColumn,
  Col,
  GoalsWapper,
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

const getDailyCell = (parentId, goalsLog, dateArrayItem) => {
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

const getGreenIntensity = (input, goals) => {
  let max = Math.max(...goals.map(goal => goal.intensity))
  let min = Math.min(...goals.map(goal => goal.intensity))
  var percent = ((input - min) * 100) / (max - min)
  return 'rgba(102, 255, 153,' + percent / 100 + ')'
}

const truncate = (str, width) => {
  if (!width) return ""
  if (width <= 500) {
    var n = 10
    if (str.length <= n) {
      return str;
    }
    return str.substr(0, 6) + "..." + str.substring(str.length - 6);
  } else {
    return str
  }
};

const treatGoals = (goals, goalsLog) => {
  goals.forEach((goal) => {
    goal.intensity = goalsLog.filter(log => { return log.parentId == goal._id }).length
  })
  goals.sort((a, b) => { return a.intensity > b.intensity ? -1 : 1 });
  return goals
}

const App = () => {
  const [width, height] = useWindowSize()
  const [goals, setGoals] = useState([])
  const [goalsLog, setGoalsLog] = useState([])
  useEffect(() => {
    fetch('/api/goals')
      .then((goals) => goals.json())
      .then((goals) => {
        setGoals(goals)
        fetch('/api/goals/log')
          .then((goalLogs) => goalLogs.json())
          .then((goalLogs) => {
            setGoalsLog(goalLogs)
            const treatedGoals = treatGoals(goals, goalLogs)
            setGoals([...treatedGoals])
          })
      })
  }, [])
  return (
    <div>
      <YourNextGoal goals={goals} goalsLog={goalsLog}></YourNextGoal>
      <Container>
        <GoaldAndCellsContainer>
          <Col>
            {goals.map((item, key) => {
              return (
                <GoalRow key={key}>
                  <NameColumn>
                    <Link
                      href={{ pathname: '/goal', query: { id: item._id } }}
                    >
                    <GoalNameButton
                      value={item._id}
                      style={{ backgroundColor: getGreenIntensity(item.intensity, goals) }}>
                      {truncate(item.name, width)}
                    </GoalNameButton>
                    </Link>
                  </NameColumn>
                </GoalRow>
              )
            })}
          </Col>
          <Col>
            <OrderByDropdown goals={goals} setGoals={setGoals} />
            <GoalsWapper>
              {goals.map((item, key) => {
                return (
                  <GoalRow key={key}>
                    <GoalColumn>
                      <div>
                        {getLast30days().map((dateArrayItem, key) => {
                          return (
                            <span key={key}>
                              {getDailyCell(item._id, goalsLog, dateArrayItem)}
                            </span>)
                        })}
                      </div>
                    </GoalColumn>
                  </GoalRow>
                )
              })}
            </GoalsWapper>
          </Col>
        </GoaldAndCellsContainer>
      </Container>
      <NewGoal />
    </div>
  )
}
export default App