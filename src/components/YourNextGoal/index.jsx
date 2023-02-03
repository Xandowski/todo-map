import React, { useEffect, useState } from "react"
import styled from 'styled-components'
import { Container } from '../../styles/base'
import Link from 'next/link'

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
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  cursor: pointer;
`
const ComponentTag = styled.div`
  color:#fff;
  font-size: 12px;
  padding-bottom: .5em;
  font-weight: 500;
`

const GoalTitle = styled.div`
  color:#fff;
  font-size: 23px;
  font-weight: 600;
`
const GenerateRandomGoalButton = styled.button`
  @keyframes horizontal-shaking {
    0% { transform: rotate(0deg) }
    100% { transform: rotate(360deg)}
  }

  display: flex;
  justify-content: center;
  align-items:center;
  padding: 0 .5em;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  background-color: #4eafff;
  border-radius: 0.15em;
  margin-right: .5em;
  font-size: 2.5em;
  span{
    margin-top: -3px;
  }
  &:hover {
    background-color: #7cc4ff;
  }
  &.shake{
    span {
      -webkit-animation: horizontal-shaking .2s;
      animation: horizontal-shaking .2s;
      animation-iteration-count: infinite;
    }
  }
  &.disabled{
    cursor: default;
    background-color: #4eafff;
    opacity: 0.5;
  }
`

function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
}

const App = (props) => {
  const [goalInProgress, setGoalInProgress] = useState(null)
  const [randomGoal, setRandomGoal] = useState()
  const [alreadyDoneRandomGoal, setAlreadyDoneRandomGoal] = useState(false)
  const [generatingRandomGoal, setGeneratingRandomGoal] = useState(false)

  const getRandomGoal = () => {
    return fetch('/api/randomGoal')
      .then((data) => data.json())
      .then((data) => {
        setRandomGoal(data)

        if (data.name) {
          setGoalInProgress(data)
        }

        if (data.alreadyDone) {
          setAlreadyDoneRandomGoal(true)
        }

        return data
      })
  }

  const generateRandomGoal = () => {
    setGeneratingRandomGoal(true)
    setTimeout(() => {
      setGeneratingRandomGoal(false)
    }, 1000)
    return fetch('/api/randomGoal/generate')
      .then((data) => data.json())
      .then((data) => {
        setRandomGoal(data)

        if (data.name) {
          setGoalInProgress(data)
        }

        return data
      })
  }

  useEffect(async () => {
    getRandomGoal().then((data) => {
      if (!data.name) {
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
        setGoalInProgress(lessDoneGoal)
      }
    })

  }, [props.goals])

  if (!goalInProgress || !randomGoal) {
    return null
  }

  return (
    <div>
      <Container>
        <GoalContainer>
          <GenerateRandomGoalButton
            className={`${randomGoal.name || alreadyDoneRandomGoal ? "disabled" : ""} ${!randomGoal.name && generatingRandomGoal ? "shake" : ""}`}
            onClick={() => generateRandomGoal()}
          >
            <span>🎲</span>
          </GenerateRandomGoalButton>
          <Link href={{ pathname: '/goal', query: { id: goalInProgress._id } }}>
            <GoalWrap>
              <div>
                <ComponentTag>
                  Your next goal
                </ComponentTag>
                <GoalTitle>
                  {goalInProgress ? goalInProgress.name : "No goals in progress"}
                </GoalTitle>
              </div>
            </GoalWrap>
          </Link>
        </GoalContainer>
      </Container>
    </div>
  )
}
export default App