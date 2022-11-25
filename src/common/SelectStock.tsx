import styled from 'styled-components';
import Select from '../../public/asset/Choice.png'


const Setselect = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 62%;
  background-color: ${(props) => props.theme.color.white_gray};
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
        <img src={Select} alt='select'></img>
        <p>종목을 선택해 주세요</p>
      </div>
    </Setselect>
  );
};

export default Selectstock;
