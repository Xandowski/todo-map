import React, { useState } from "react";
import styled from "styled-components";
import useOutsideClick from "../../utils/useOutsideClick";
import { useRef } from "react";
import { signOut } from 'next-auth/client'

const Main = styled("div")`
`;

const DropDownContainer = styled.div`
text-align: right;
/* padding-right: 30px; */
span {
  padding-top: 2px;
  font-family: 'Roboto';
  font-weight: 400;
  display: inline-flex;
  color: ${(props) => props.theme.colors.light500};
}
li {
  text-align: left;
}
`;

const DropDownHeaderContainer = styled.div`
display: inline-flex;
`

const DropDownHeader = styled.button`
display: flex;
align-items: center;
span {
  color: ${(props) => props.theme.colors.dark500};
}
`;

const DropDownListContainer = styled("div")`
position: absolute;
top:48px;
right: 0;
background-color: #fff;
border-radius: 3px;
box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
z-index: 1;
`;

const DropDownList = styled("ul")`
`;

const ListItem = styled("li")`
padding: 10px 25px;
:hover{
  background-color: #e6ffee;
}
`;

export default function App(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen)

  const ref = useRef()
  useOutsideClick(ref, () => {
    setIsOpen(false)
  })

  return (
    <Main ref={ref}>
      <DropDownContainer>
        <DropDownHeaderContainer>
          <DropDownHeader onClick={toggling}>
            <span>{props.userName}</span>
            <img src={props.userImage}></img>
            {isOpen && (
              <DropDownListContainer>
                <DropDownList>
                  <ListItem  onClick={() => signOut()}>Logout</ListItem>
                </DropDownList>
              </DropDownListContainer>
            )}
          </DropDownHeader>
        </DropDownHeaderContainer>
      </DropDownContainer>
    </Main>
  );
}