import React from "react";
import styled from "styled-components";
import Modal from 'react-modal'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FaCheck } from 'react-icons/fa'

Modal.defaultStyles.content = {
  position: "absolute",
  top: '50%',
  left: '50%',
  right: 'auto',
  bottom: 'auto',
  marginRight: '-50%',
  transform: 'translate(-50%, -50%)',
  border: "1px solid #ccc",
  background: "#fff",
  overflow: "auto",
  WebkitOverflowScrolling: "touch",
  borderRadius: "1em",
  outline: "none",
  padding: "20px",
  width: '100%',
  maxWidth: "500px",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
}

Modal.defaultStyles.overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.555)"
}

Modal.setAppElement('body');

export const ModalCompleteTaskTitle = styled.h1`
text-align: center;
margin-bottom: .5em;
`
export const ModalCompleteTaskCloseButton = styled.a`
position: absolute;
right: .5em;
top: .5em;
color: #616161;
`

export const ModalCompleteTaskCompleteItButton = styled.div`
.description, .link {
  font-family: 'Amatic SC', cursive;
  text-align: center;
}

.description {
  font-size: 35px;
  display: "flex";
  justify-content: "center";
}

.btn {
  border: none;
  display: block;
  text-align: center;
  cursor: pointer;
  text-transform: uppercase;
  outline: none;
  overflow: hidden;
  position: relative;
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  background-color: #a5cea6;
  padding: 12px 60px 17px 60px;
  margin: 0 auto;
  box-shadow: 0 5px 15px rgba(0,0,0,0.20);
  border-radius: 0.3em;
}

.btn span {
  position: relative; 
  z-index: 1;
}

.btn:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 630%;
  width: 140%;
  background: #4caf50;
  -webkit-transition: all .3s ease-in-out;
  transition: all .3s ease-in-out;
  -webkit-transform: translateX(-98%) translateY(-25%) rotate(45deg);
  transform: translateX(-98%) translateY(-25%) rotate(45deg);
}

.btn:hover:after {
  -webkit-transform: translateX(-9%) translateY(-25%) rotate(45deg);
  transform: translateX(-9%) translateY(-25%) rotate(45deg);
}

.link {
  font-size: 20px;
  margin-top: 30px;
}

.link a {
  color: #000;
  font-size: 25px; 
}

svg{
  vertical-align: bottom;
  margin-left: 5px;
}
`
export default function App(props) {
  return (
    <Modal
    isOpen={props.modalIsOpen}
    onRequestClose={props.closeModal}
    contentLabel="Goal modal"
  >
    <ModalCompleteTaskTitle>
      {props.selectedGoal.name}
    </ModalCompleteTaskTitle>
    <ModalCompleteTaskCloseButton onClick={props.closeModal}>
      <AiOutlineCloseCircle size={26} />
    </ModalCompleteTaskCloseButton>
    <ModalCompleteTaskCompleteItButton>
      <button className="btn" value={props.selectedGoal._id} onClick={props.doneGoal}><span>Complete It <FaCheck size={22} /></span></button>
    </ModalCompleteTaskCompleteItButton>
    </Modal>
  )
}