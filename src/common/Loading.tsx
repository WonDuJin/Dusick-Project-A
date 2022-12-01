import { keyframes } from 'styled-components';
import styled from '@/Theme/theme_set';

const turnning = keyframes`
  0%{
    transform: rotate(0deg);
    }
  100%{
    transform: rotate(360deg);
  }
`;

const SetLoading = styled.section`
  background-color: ${(props) => props.theme.color.white_gray};
  width: 100%;
  height: 100%;
  ${(props) => props.theme.flex.flexCenterColumn}
  & > div {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 4px solid ${(props) => props.theme.color.main};
    margin-bottom: 40px;
    position: relative;
    ${(props) => props.theme.flex.flexCenter}
    &:before {
      content: '';
      border-radius: 5px;
      background: ${(props) => props.theme.color.main};
      width: 4px;
      height: 50px;
      position: absolute;
      top: 10px;
      transform-origin: 50% 94%;
      animation: ${turnning} linear infinite 0.8s;
    }
  }
  & > h1 {
    color: ${(props) => props.theme.color.main};
    font-size: ${(props) => props.theme.fontSize.font_20};
  }
`;

const Loading = () => {
  return (
    <SetLoading>
      <div></div>
      <h1>로딩중 입니다 . . .</h1>
    </SetLoading>
  );
};

export default Loading;
