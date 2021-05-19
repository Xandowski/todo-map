import React, { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { useSession, getSession } from 'next-auth/client'
import { signIn } from 'next-auth/client'


const LoginPage = () => {
  const [session, loading] = useSession()

  const handleLogin = () => {


  }

  useEffect(() => {
    if (session) {
      Router.push('/home')
    }
  }, [session])

  return (
    <>
      <Head>
        <title>Faça o login | todo.map</title>
      </Head>
      {(!session && <div>
        <div>
          <header>
            <img src="/images/Logo.svg" alt="" />
          </header>

          <main>
            <strong>Bem-vindo</strong>
            <p>Faça login para continuar</p>
          </main>

          <div>
            <button onClick={() => signIn('auth0')}>SignIn</button>
          </div>
        </div>
      </div>) || (loading && <h1>Carregando...</h1>)}
    </>
  )
}

export default LoginPage

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  return {
    props: { session },
  }
}
