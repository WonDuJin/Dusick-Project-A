import styled from 'styled-components';

const HeaderSet = styled.header`
  width: 100%;
  height: 127px;
  padding: 0 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.color.l_gray};
  & > img {
    width: 161px;
    height: 66.4px;
  }
  & > div {
    position: relative;
    display: flex;
    align-items: center;
    & > span {
      width: 11px;
      height: 6.5px;
      background: url('./assets/Direction.png') center/cover no-repeat;
      position: absolute;
      right: 42px;
      top: 22px;
    }
    & > input[type='text'] {
      background: ${(props) => props.theme.color.white_gray};
      border: 1px solid ${(props) => props.theme.color.l_gray};
      border-radius: 30px;
      width: 463px;
      height: 50px;
    }
    & > select {
      width: 113px;
      height: 50px;
      margin-right: 30px;
      padding: 0 15px;
      border-radius: 30px;
      color: ${(props) => props.theme.color.gray};
      font-size: ${(props) => props.theme.fontSize.font_18};
      font-weight: ${(props) => props.theme.fontWeight.DemiLight};
      border: 1px solid ${(props) => props.theme.color.m_gray};
      appearance: none;
      &:active,
      &:focus {
        outline: none;
      }
      & > option {
        font-size: ${(props) => props.theme.fontSize.font_18};
        font-weight: ${(props) => props.theme.fontWeight.DemiLight};
      }
    }
  }
`;

interface outProps {
  getStockType: (Type: string) => void;
}
//부모한테 받을 props를 정의함(자식에서 정의를 해놓아야 부모한테서 받을수 있나봄)

const Header: React.FunctionComponent<outProps> = ({ getStockType }) => {
  const Typeget = (e: React.ChangeEvent<HTMLSelectElement>) => {
    getStockType(e.target.value);
  };
  // select에 onChange가 일어날 때 select value  값을 부모 컴포넌트에 보냄

  return (
    <>
      <HeaderSet>
        <img src='/asset/Logo.png' alt='logo'></img>
        <div>
          <select onChange={Typeget}>
            <option value={'kospi'}>KOSPI</option>
            <option value={'kosdak'}>KOSDAQ</option>
          </select>
          <span></span>
          {/* <input type='text' onBlur={getName}></input> */}
        </div>
      </HeaderSet>
    </>
  );
};

export default Header;
