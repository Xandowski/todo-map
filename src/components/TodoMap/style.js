import styled from 'styled-components'

export const Container = styled.div`
background-color: white;
margin: auto;
position: relative;
max-width: 1000px;
`

export const Col = styled.div`
display: inline-block;
vertical-align:top;
`

export const GoalRow = styled.div`
white-space:nowrap;
`

export const GoalColumn = styled.div`
display: inline-block;
`

export const GoalWapper = styled.div`
overflow-x: scroll;
overflow-y: hidden;
max-width: 700px;
@media (max-width: 960px) {
    max-width: calc(100vw - 280px);
    width: auto;
    white-space: nowrap;
  }
/* 
max-width: calc(100vw - 260px);
width: auto;
white-space: nowrap; */

/* &:hover:before {
    top: -12px;
}
&:before{
    content: '';
    position: absolute;
    top: -3px;
    right: 0;
    left: 0;
    margin-bottom: 50px;
    height: 100%;
    background-image: linear-gradient(90deg,rgba(255, 255, 255, 0.0) 85%, rgba(255, 255, 255, 1) 95%);
} */ */

&::-webkit-scrollbar-track {
    box-shadow: inset 0 0 0px rgba(0,0,0,0);
    -webkit-box-shadow: inset 0 0 0px rgba(0,0,0,0);
    background-color: white;
}

&::-webkit-scrollbar{
    height: 3px;
    background-color: white;
}

&:hover::-webkit-scrollbar{
    height: 12px;
    background-color: white;
}

&::-webkit-scrollbar-thumb{
    background-color: #d9d9d9;
}
`

export const DailyCell = styled.div`
border-radius: 0.3em;
display: inline-block;
white-space: normal; /*Prevents child elements from inheriting nowrap.*/
min-height: 28px;
min-width: 30px;
background: ${props => props.done ? "#66ff99" : "#f2f2f2"};
`

export const NameColumn = styled.div`
width: 250px;
margin: 0 5px 0 0;
text-align: right;
display: inline-block;
font-size: 23px;
`

export const GoalNameButton = styled.button`
font-size: 19px;
border: 0;
background: #ccffcc;
border-radius: 15px;
padding: 3px 15px 3px 15px;
cursor: pointer;
float:right;
position:relative;
&:after{
    display: none;
    content: "Done";
    position:absolute;
    width: 100%;
    left: 0;
    top: 0;
    background-color: #80ff80;
    border: 0;
    border-radius: 15px;
    cursor: pointer;
    padding: 3px 0 3px 0;
    /* color: white; */
}
&:hover:after {
    display: block;
}
&:hover {
    background: #b3ffb3;
}

`