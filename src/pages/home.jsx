import React, { useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Navbar from '../components/Navbar'
import NewGoal from '../components/NewGoal'
import ToDoMap from '../components/TodoMap'
import Head from 'next/head'
import Router from 'next/router'

const Home = () => {
  const [session, loading] = useSession()

  useEffect(() => {
    if (!session) {
      setTimeout(() => {
        Router.push('/')
      }, 1000)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Todo Map</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
      </Head>
      {(session && (
        <>
          <Navbar session={session}>
            {/* <button onClick={() => signOut()}>Sair</button> */}
            {<NewGoal></NewGoal>}
            {<ToDoMap></ToDoMap>}
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