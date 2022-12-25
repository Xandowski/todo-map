import styled from 'styled-components'

export const CustomTooltipWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 5px;
  padding: 1em;
  .content div{
    margin-bottom: 5px;
    font-size: 14px;
    color: ${(props) => props.theme.colors.light500}
  }
  .title {
    font-size: 18px;
    margin-bottom: 10px;
  }
`