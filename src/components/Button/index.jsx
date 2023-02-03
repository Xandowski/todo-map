import styled from 'styled-components'

export const Secondary = styled.div`
    font-size: 19px;
    padding: .6em 1em;
    border-radius: .3em;
    background: ${(props) => props.theme.colors.lightGrey};
    &:hover {
        background: #b3ffb3 !important;
    }`

