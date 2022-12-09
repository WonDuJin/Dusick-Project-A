import styled from 'styled-components';

const Setselect = styled.div`
  ${(props) => props.theme.flex.flexCenterColumn}
  width: 62%;
  background-color: ${(props) => props.theme.color.white_gray};
  & > div {
    ${(props) => props.theme.flex.flexCenterColumn}
    height: 200px !important;
    & > img {
      width: 71px;
      height: 91px;
      margin-bottom: 40px;
    }
    & > p {
      color: ${(props) => props.theme.color.main};
      font-size: ${(props) => props.theme.fontSize.font_36};
    }
  }
`;

const Selectstock = () => {
  return (
    <Setselect>
      <div>
        <img src='/asset/Choice.png' alt='select'></img>
        <p>종목을 선택해 주세요</p>
      </div>
    </Setselect>
  );
};

export default Selectstock;
