/**
 * 주식 리스트에 들어갈 보라색 버튼입니다.
 * 부모컴포넌트에서 props로 width,height설정 해주시면 됩니다.
 * 폰트사이즈는 고정이기때문에 따로 props로 받지 않습니다.
 * ex)<ButtonPurple width = {'100px'} height={'20px'}>추천종목</ButtonPurple>
 */

import styled from 'styled-components';

export const ButtonSetPurle = styled.button`
  height: 50px;
  background-color: transparent;
  ${(props) => props.theme.border.borderSet}
  font-size: ${(props) => props.theme.fontSize.font_28};
  ${(props) => props.theme.flex.flexCenter.flexCenter}
  padding: 0 10px;
  transition: ease-out 0.3s;
  cursor: pointer;
  color: ${(props) => props.theme.color.black};
  &.active {
    background-color: ${(props) => props.theme.color.main};
    color: rgba(255, 255, 255, 1);
  }
`;
