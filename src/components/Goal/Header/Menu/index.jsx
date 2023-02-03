import React, { useState, useRef } from "react"
import useOutsideClick from "../../../../utils/useOutsideClick"
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Secondary as SecondaryButton } from "../../../Button"
import { FaTrashAlt } from 'react-icons/fa'
import {
    DropDownContainer,
    DropDownHeaderContainer,
    DropDownHeader,
    DropDownListContainer,
    DropDownList,
    ListItem
} from '../../../Dropdown'

const Menu = (props) => {
    const { goal } = props

    const ref = useRef()
    const [isOpen, setIsOpen] = useState(false)

    useOutsideClick(ref, () => {
        setIsOpen(false)
    })

    const toggling = () => setIsOpen(!isOpen)

    const deleteGoal = () => {
        return fetch('/api/goals/remove', {
            method: 'POST',
            body: JSON.stringify({ parentId: goal._id }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(() => {
            window.location.href = "/";
        })
    }

    return (
        <DropDownContainer ref={ref}>
            <DropDownHeaderContainer>
                <DropDownHeader onClick={toggling}>
                    <SecondaryButton>
                        <BsThreeDotsVertical />
                    </SecondaryButton>
                    {isOpen && (
                        <DropDownListContainer>
                            <DropDownList>
                                <ListItem onClick={deleteGoal}>
                                    <FaTrashAlt /> Delete
                                </ListItem>
                            </DropDownList>
                        </DropDownListContainer>
                    )}
                </DropDownHeader>
            </DropDownHeaderContainer>
        </DropDownContainer>
    )
}

export default Menu