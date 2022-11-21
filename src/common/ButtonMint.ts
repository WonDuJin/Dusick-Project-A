/**
 * 주식 리스트에 들어갈 보라색 버튼입니다.
 * 부모컴포넌트에서 props로 width,height설정 해주시면 됩니다.
 * 폰트사이즈는 고정이기때문에 따로 props로 받지 않습니다.
 * ex)<ButtonPurple width = {'100px'} height={'20px'}>추천종목</ButtonPurple>
 */

import styled from 'styled-components';

export const ButtonMint = styled.button<{ width: String }>`
  width: ${(props: any) => props.width};
  height: 43px;
  height: 50px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.color.mint};
  border-radius: 1rem;
  font-size: ${(props) => props.theme.fontSize.font_18};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ease 0.3s;
  cursor: pointer;
  color: ${(props) => props.theme.color.mint};
  &:hover {
    background-color: ${(props) => props.theme.color.mint};
    color: rgba(255, 255, 255, 1);
  }
`;
