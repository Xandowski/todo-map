import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import Head from 'next/head'
import Router from 'next/router'

import Axios from 'axios'
import Navbar from '../components/Navbar'
import ToDoMap from '../components/TodoMap'

const Home = () => {
  const [session, loading] = useSession()

  useEffect(() => {
    if (!loading && !session) {
      Router.push('/')
    }
  }, [loading])

  const [goals, setGoals] = useState([])
  useEffect(() => { fetchGoals() }, [])
  const fetchGoals = async () => {
    const response = await Axios('/api/goals');
    setGoals(response.data)
  }

  return (
    <>
      <Head>
        <title>Todo Map</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"/>
      </Head>
      {(session && (
        <>
          <Navbar session={session}>
            <ToDoMap></ToDoMap>
          </Navbar>
        </>
      )) ||
        (loading && <h1>Carregando...</h1>)}
    </>
  )
}

export default Home

export const getServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  }
}