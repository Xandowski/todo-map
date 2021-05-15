import React, { useEffect } from 'react'
import { useSession } from 'next-auth/client'
import { signOut } from 'next-auth/client'

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
      {(session && (
        <>
          <h1>Home page</h1>
          <button onClick={() => signOut()}>Sair</button>
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