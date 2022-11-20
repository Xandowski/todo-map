import React from "react";
import styled from "styled-components";
import Modal from 'react-modal'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { PrimmaryBlockButton } from '../../styles/buttons'
import { BiAddToQueue } from 'react-icons/bi'

Modal.defaultStyles.content = {
  position: "absolute",
  top: '40%',
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
  zIndex: 1,
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.555)"
}

Modal.setAppElement('body');

export const Title = styled.h1`
text-align: center;
margin-bottom: .8em;
font-size: 32px;
font-weight: 400;
`
export const CloseButton = styled.a`
position: absolute;
right: .5em;
top: .5em;
color: #616161;
`

const FormGroup = styled.label`
  position: relative;
  padding: 15px 0 0 0;
  
.form__field {
  margin-bottom: .8em;
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 3px solid #9b9b9b;
  outline: 0;
  font-size: 2.5rem;  
  background: transparent;
  transition: border-color 0.2s;
  font-weight: 300;
  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .form__label {
    font-size: 1.3rem;
    cursor: text;
    top: 15px;
  }
}

.form__label {
  position: absolute;
  top: -25px;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: #9b9b9b;
}

.form__field:focus {
  ~ .form__label {
    position: absolute;
    top: -25px;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: ${(props) => props.theme.colors.green900};
    font-weight:700;    
  }
  border-width: 3px;
  border-color: ${(props) => props.theme.colors.green900};
  border-image-slice: 1;
  font-weight: 300;
}
.form__field{
  &:required,&:invalid { box-shadow:none; }
}
`

export default function App(props) {

  const registerGoal = async event => {
    event.preventDefault()

    const res = await fetch(
      '/api/goals/add',
      {
        body: JSON.stringify({
          name: event.target.name.value,
          type: 1
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    ).then(window.location.reload())

    const result = await res.json()
  }

  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      contentLabel="Goal modal"
    >
      <Title>
        New Goal
      </Title>
      <CloseButton onClick={props.closeModal}>
        <AiOutlineCloseCircle size={26} />
      </CloseButton>
      <form onSubmit={registerGoal}>
        <FormGroup>
          <input type="input" required class="form__field" placeholder="Name" name="name" id='name' required />
          <label htmlFor="name" class="form__label">Name</label>
        </FormGroup>
        <PrimmaryBlockButton type="submit">
          <BiAddToQueue/> Add
        </PrimmaryBlockButton>
      </form>
    </Modal>
  )
}