import styled from '../Theme/themed-compoents';
import { useState } from 'react';

const Section1Set = styled.section`
  width: 38%;
  height: 838px;
  background-color: #fff;
  padding: 25px 35px;
  & > div:nth-child(1) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  & > div:nth-child(2) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
`;

interface getData {
  data: object;
}

const Section1: React.FunctionComponent<getData> = ({ data }) => {
  // console.log(data);
  const [active, setActive] = useState<string>('active');
  const menus: string[] = ['거래상위', '상승', '하락'];
  return (
    <Section1Set>
      <div></div>
      <div></div>
    </Section1Set>
  );
};

export default Section1;
