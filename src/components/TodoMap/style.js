import styled from 'styled-components'

export const GoaldAndCellsContainer = styled.div`
display: flex;
justify-content: center;
`

export const Container = styled.div`
background-color: white;
margin: auto;
position: relative;
max-width: 1000px;
`

export const Col = styled.div`
display: inline-block;
vertical-align:top;
padding: 0.5em .2em;
`

export const GoalRow = styled.div`
white-space:nowrap;
margin-bottom: 3px;
height: 28px;
line-height: 28px;
`

export const GoalColumn = styled.div`
display: inline-block;
`

export const GoalWapper = styled.div`
overflow-x: scroll;
overflow-y: hidden;
max-width: 700px;
@media (max-width: 960px) {
  max-width: calc(100vw - 195px);
  width: auto;
  white-space: nowrap;
}
@media (max-width: 420px) {
  max-width: calc(100vw - 150px);
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
} */ 

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
min-height: 15px;
min-width: 16px;
margin-top: 7px;
background: ${props => props.done ? props.theme.colors.green : props.theme.colors.lightGrey};
@media (max-width: 980px) {
  margin-top:0;
}
`

export const NameColumn = styled.div`
/* width: 180px; */
width: 100%;
margin: 0 5px 0 0;
text-align: right;
display: inline-block;
font-size: 23px;
padding-top: 19px;
`

export const GoalNameButton = styled.button`
font-size: 19px;
border: 0;
background: ${(props) => props.theme.colors.lightGrey};
border: 2px solid transparent;
border-radius: .3em;
padding: 1px 15px 1px 15px;
margin: 0;
cursor: pointer;
float:right;
position:relative;
&:hover {
  background: #b3ffb3 !important;
}
@media (max-width: 960px) {
  font-size: 14px;
  padding: 1px 1px 1px 1px;
}
`