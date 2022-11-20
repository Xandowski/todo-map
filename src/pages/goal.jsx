import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
import {
  Container,
  GoalTitle,
  GoalDoneButton,
  RowBetween,
  Col
} from '../components/TodoMap/style'

const App = () => {
  const [session, loading] = useSession()
  const [goal, setGoal] = useState()
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    fetch(`/api/goals/findOne?id=${router.query.id}`)
      .then((goal) => goal.json())
      .then((goal) => {
        setGoal(goal)
      })
  }, [router.isReady])

  const done = () => {
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
      console.log(response)
    })
  }

  return (
    <>
      <Head>
        <title>Todo Map</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"/>
      </Head>
      {((goal && session) && (
        <>
          <Navbar session={session}>
            <Container>
              <RowBetween>
                <Col>
                  <GoalTitle>{goal.name}</GoalTitle>
                </Col>
                <Col>
                  <GoalDoneButton
                  onClick={done}>
                    Done
                  </GoalDoneButton>
                </Col>
              </RowBetween>
            </Container>
          </Navbar>
        </>
      )) ||
        (loading && <h1>Carregando...</h1>)}
    </>
  )
}

export default App