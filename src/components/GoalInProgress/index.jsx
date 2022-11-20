import React, { useEffect, useState } from "react"
import styled from 'styled-components'
import { Container } from '../../styles/base'

const GoalContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2em 0;
`
const GoalWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 1em 1em;
  background-color: #4eafff;
  border-radius: 0.3em;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
`
const ComponentTag = styled.div`
  color:#fff;
  font-size: 12px;
  padding-left: 1em;
  padding-bottom: .3em;
  font-weight: 500;
`

const GoalTitle = styled.div`
  color:#fff;
  font-size: 23px;
  padding-left: .5em;
  font-weight: 600;
`

const clockWidth = '3rem'
const clockColor = '#ffffff'
const clockRadius = 'calc(' + clockWidth + ' / 2)'
const clockMinuteLength = 'calc(' + clockWidth + ' * 0.4)'
const clockHourLength = 'calc(' + clockWidth + ' * 0.2)'
const clockThickness = '0.1rem'
const Clock = styled.div`
.clock-loader {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${clockWidth};
  height: ${clockWidth};
  border: 3px solid ${clockColor};
  border-radius: 50%;

  &::before,
  &::after {
    position: absolute;
    content: "";
    top: calc(${clockRadius} * 0.14);
    width: ${clockThickness};
    background: ${clockColor};
    border-radius: 10px;
    transform-origin: center calc(100% - calc(${clockThickness} / 2));
    animation: spin infinite linear;
  }

  &::before {
    height: ${clockMinuteLength};
    animation-duration: 15s;
  }

  &::after {
    top: calc(${clockRadius} * 0.14 + ${clockHourLength});
    height: ${clockHourLength};
    animation-duration: 90s;
  }
}

@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}
`

function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
}

const App = (props) => {
  const [goalInProgress, setGoalInProgress] = useState()
  useEffect(() => {
    if (props.goals.length > 0) {
      var goalsTemp = [...props.goals]
      goalsTemp.sort((a, b) => a.name.localeCompare(b.name))
      goalsTemp.sort((a, b) => a.intensity < b.intensity ? -1 : 0)
      var lessDoneGoal = undefined
      var alreadyDoneToday = true
      while (alreadyDoneToday) {
        alreadyDoneToday = false
        lessDoneGoal = goalsTemp[0]
        props.goalsLog.forEach((log) => {
          if (log.parentId === lessDoneGoal._id) {
            if (sameDay(new Date(log.createdAt), new Date())) {
              alreadyDoneToday = true
            }
          }
        })
      }
      setGoalInProgress(lessDoneGoal);
    }
  }, [props.goals])
  return (
    <div>
      <Container>
        <GoalContainer>
          <GoalWrap>
            <Clock>
              <div className="clock-loader"></div>
            </Clock>
            <div>
              <ComponentTag>
                Your next goal
              </ComponentTag>
              <GoalTitle>
                {goalInProgress ? goalInProgress.name : "No goals in progress"}
              </GoalTitle>
            </div>
          </GoalWrap>
        </GoalContainer>
      </Container>
    </div>
  )
}
export default App