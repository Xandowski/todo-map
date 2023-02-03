import styled from "styled-components";

export const DropDownContainer = styled.div`
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

export const DropDownHeaderContainer = styled.div`
display: inline-flex;
`

export const DropDownHeader = styled.button`
  font-family: 'Roboto';
  font-weight: 500;
  color: ${(props) => props.theme.colors.dark600};
  /* min-width: 98px; */
  svg {
    vertical-align: middle;
    font-size: 18px;
    }
`;

export const DropDownListContainer = styled("div")`
position: absolute;
right: 0;
background-color: #fff;
border-radius: 0.3em;
box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
z-index: 1;
`;

export const DropDownList = styled("ul")`
`;

export const ListItem = styled("li")`
padding: 10px 25px;
:hover{
  background-color: #e6ffee;
}
`;