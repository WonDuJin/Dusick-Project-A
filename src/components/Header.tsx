import React from "react";
import styled from "styled-components"

const HeaderSet = styled.header`
  width: 100%;
  height: 127px;
  padding: 0 35px;
  display: flex;
  align-items:center;
  justify-content: space-between;
  border-bottom: 1px solid ${(props)=>props.theme.color.l_gray}
  & > img {
    width : 161px;
    height: 66px;
  }
  & > div{
    position: relative;
    display: flex;
    align-items: center;
    & > span{
      width: 11px;
      height: 6.5px;
      background: url('./assets/Direction.png') center/cover no-repeat;
      position: absolute;
      right: 42px;
      top: 22px;
    }
    & > input[type='text'] {
      background: ${(props)=> props.theme.color.white_gray};
      border: 1px solid ${(props)=> props.theme.color.l_gray};
      border-radius: 30px;
      width: 463px;
      height: 50px;
    }
    & > select {
      width: 113px;
      height: 50px;
      margin-right: 0 15px;
      border-radius: 30px;
      color: ${(props)=>props.theme.color.gray};
      font-szie: ${(props)=>props.theme.fontSize.font_18};
      font-weight: ${(props)=>props.theme.fontWeight.DemiLight};
      border: 1px solid ${(props)=>props.theme.color.m_gray};
      appearance: none;
      &:active,
      &:focus {
        outline: none;
      }
      & > option {
        font-size: ${(props)=>props.theme.fontSize.font_18};
        font-weight: ${(props)=>props.theme.fontWeight.DemiLight};
      }
    }
  }
`;

const Header = ({getStockType}:{getStockType:(Type:string)=>void})=>{
  const Typeget = (e: React.ChangeEvent<HTMLSelectElement>) => {
    getStockType(e.target.value);
  };

  return (
    <>
    <HeaderSet>
        <img src="./assets/Logo.png" alt="logo"></img>
        <div>
          <select onChange={Typeget}>
            <option value={'kospi'}>KOSPI</option>
            <option value={'kosdak'}>KOSDAQ</option>
          </select>
          <span></span>
        </div>
      </HeaderSet>
    </>
  );
};

export default Header