import React, { useEffect, useState } from "react"
import styled from 'styled-components'
import UserMenu from './userMenu'

const MainContainer = styled.div`
z-index: 1;
position: fixed;
padding: .5em .5em;
background-color: white;
width: 100%;
box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;
display: flex;
justify-content: space-between;
align-items: center;
img {
  height: 30px;
  width: 30px;
  border-radius: 50%;
}
`

const Logo = styled.a`
  color: #43d674;
`
const UserContainer = styled.div`
display: flex;
align-items: center;
span {
  color: ${(props) => props.theme.colors.dark500};
  padding-right: 5px;
}
`

const Children = styled.div`
padding-top: 48px;
`

export default function App(props) {
  return (
    <div>
      <MainContainer>
        <Logo href="/">
          <strong>Todo Map</strong>
        </Logo>
        <UserContainer>
          <UserMenu userName={props.session.user.name} userImage={props.session.user.image} />
        </UserContainer>
      </MainContainer>
      <Children>
        {props.children}
      </Children>
    </div>
  )
}