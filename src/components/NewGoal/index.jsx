import React, { useEffect, useState } from "react"
import styled from 'styled-components'
import { BiAddToQueue } from 'react-icons/bi'
import Modal from './newGoalModal'

const MainContainer = styled.button`
z-index: 1;
position: fixed;
bottom: 0;
right: 0;
padding: .5em .5em;
background-color: white;
box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;
display: flex;
justify-content: space-between;
align-items: center;
border-radius: 50%;
height: 80px;
width: 80px;
box-shadow: rgba(50, 50, 93, 0.15) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
text-align: center;
display: flex;
justify-content: center;
align-items: center;
margin: 1em;
:hover{
  background-color: #e6ffee;
}
svg {
  font-size: 30px;

}
`

export default function App(props) {

  const [modalIsOpen, setModal] = useState(false)

  function openModal() {
    setModal(true);
  }

  function closeModal() {
    setModal(false);
  }

  return (
    <>
      <MainContainer onClick={openModal}>
        <BiAddToQueue/>
      </MainContainer>
      <Modal modalIsOpen={modalIsOpen} closeModal={closeModal}/>
    </>
  )
}