import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
import {
  Container,
  GoalTitle,
  GoalDoneButton,
  Wrapper,
  AlreadyDoneButton
} from '../components/TodoMap/style'
import ConfettiExplosion from 'react-confetti-explosion';
import Chart from '../components/Goal/Chart';

function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
}

const App = () => {
  const [session, loading] = useSession()
  const [goal, setGoal] = useState()
  const [log, setLog] = useState()
  const [chartData, setChartData] = useState()
  const [haveDone, setHaveDone] = useState(false)
  const router = useRouter();
  const [isExploding, setIsExploding] = React.useState(false);

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    fetch(`/api/goals/findOne?id=${router.query.id}`)
      .then((goal) => goal.json())
      .then((goal) => {
        setGoal(goal)
      })

    fetch(`/api/goals/logFindOne?id=${router.query.id}`)
      .then((log) => log.json())
      .then((log) => {
        setLog(log)
        setChartData(JSON.parse(JSON.stringify(log)))
        const today = new Date()
        log.forEach((goalLogItem) => {
          if (sameDay(today, new Date(goalLogItem.createdAt))) {
            setHaveDone(true)
          }
        })
      })

  }, [router.isReady])

  const done = () => {
    setHaveDone(true)
    setIsExploding(true)
    fetch(`/api/goals/done`, {
      method: "POST",
      body: JSON.stringify({
        parentId: goal._id,
        offset: -(new Date().getTimezoneOffset() / 60)
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((response) => {
      })
  }

  const littleExplodeProps = {
    force: 0.4,
    duration: 3000,
    particleCount: 50,
    height: 500,
    width: 450
  };

  return (
    <>
      <Head>
        <title>Todo Map</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" />
      </Head>
      {((goal && session) && (
        <>
          <Navbar session={session}>
            <Wrapper>
              <Container>
                <GoalTitle>{goal.name}</GoalTitle>
                {haveDone ?
                  <AlreadyDoneButton>
                    Already done! 🥳
                    {isExploding && <ConfettiExplosion {...littleExplodeProps} />}
                  </AlreadyDoneButton>
                  :
                  <GoalDoneButton onClick={done}>
                    Done ✔️
                  </GoalDoneButton>
                }
              </Container>
            </Wrapper>
            <Container>
              <Chart log={chartData} />
            </Container>
          </Navbar>
        </>
      )) ||
        (loading && <h1>Carregando...</h1>)}
    </>
  )
}

export default App