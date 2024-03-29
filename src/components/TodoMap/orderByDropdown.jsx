import React, { useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown } from 'react-icons/io'
import useOutsideClick from "../../utils/useOutsideClick";
import { useRef } from "react";

const Main = styled("div")`
`;

const DropDownContainer = styled.div`
text-align: right;
/* padding-right: 30px; */
span {
  padding-top: 2px;
  font-family: 'Roboto';
  font-weight: 400;
  margin: 0 5px 0 0;
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
  font-family: 'Roboto';
  font-weight: 500;
  color: ${(props) => props.theme.colors.dark600};
  /* min-width: 98px; */
  svg {
    vertical-align: middle;
    color: #0099ff;
    font-size: 18px;
    }
`;

const DropDownListContainer = styled("div")`
position: absolute;
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

const options = ["Most done", "Less done", "Older", "Newest"];

export default function App(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen)
  const ref = useRef()

  useOutsideClick(ref, () => {
    setIsOpen(false)
  })

  const orderByCreatedDate = (reverse = false) => {
    let goalsTemp = [...props.goals]
    if (reverse) {
      goalsTemp.sort((a, b) => { return -(new Date(b.createdAt) - new Date(a.createdAt)) })
    } else {
      goalsTemp.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) })
    }
    props.setGoals(goalsTemp);
  }

  const orderByMostDone = (reverse = false) => {
    let goalsTemp = [...props.goals]
    if (reverse) {
      goalsTemp.sort((a, b) => {return a.intensity < b.intensity ? -1 : 1
      });
    } else {
      goalsTemp.sort((a, b) => { return a.intensity > b.intensity ? -1 : 1 });
    }
    props.setGoals(goalsTemp);
  }

  const onOptionClicked = value => () => {
    setSelectedOption(value)

    switch (value) {
      case "Most done":
        orderByMostDone()
        break
      case "Less done":
        orderByMostDone(true)
        break
      case "Older":
        orderByCreatedDate(true)
        break
      case "Newest":
        orderByCreatedDate()
        break
    }
    setIsOpen(false)
  };

  return (
    <Main ref={ref}>
      <DropDownContainer>
        <DropDownHeaderContainer>
          <span>Order by</span>
          <DropDownHeader onClick={toggling}>
            {selectedOption || "Most done"} <IoIosArrowDown />
            {isOpen && (
              <DropDownListContainer>
                <DropDownList>
                  {options.map(option => (
                    <ListItem onClick={onOptionClicked(option)} key={Math.random()}>
                      {option}
                    </ListItem>
                  ))}
                </DropDownList>
              </DropDownListContainer>
            )}
          </DropDownHeader>
        </DropDownHeaderContainer>
      </DropDownContainer>
    </Main>
  );
}