import styled from "styled-components";

export const PrimmaryButton = styled.button`
font-size: 19px;
border: 0;
background: #b3ffb3;
border: 2px solid transparent;
border-radius: .3em;
padding: 1px 25px 1px 25px;
margin: 0;
cursor: pointer;
position:relative;
&:hover {
  background: #b3ffb3 !important;
}
@media (max-width: 960px) {
  font-size: 14px;
  padding: 1px 1px 1px 1px;
}
`

export const PrimmaryBlockButton = styled.button`
font-size: 19px;
border: 0;
color: #fff;
border: 2px solid transparent;
border-radius: .3em;
padding: .5em;
cursor: pointer;
position:relative;
display: block;
width: 100%;
border: none;
background-color: ${(props) => props.theme.colors.green800};
font-size: 1.5em;
cursor: pointer;
text-align: center;
&:hover {
  background:${(props) => props.theme.colors.green900};
}
@media (max-width: 960px) {
  font-size: 1.2em;
  padding: .5em;
}
`