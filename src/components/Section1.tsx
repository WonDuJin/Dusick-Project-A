import styled from '../Theme/themed-compoents';
import { useState } from 'react';
import { ButtonSetPurle } from '../common/ButtonPurple';
import { DummyArr } from './Layout';
import theme, { Theme } from '../Theme/theme';

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
    padding: 40px 0;
    & > div {
      width: 95%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 35px;
      & > span {
        font-size: ${(props) => props.theme.fontSize.font_20};
        color: ${(props) => props.theme.color.d_gray};
      }
    }
  }
`;

const Section1 = ({ data }: { data: DummyArr }) => {
  const [active, setActive] = useState<string>('active');
  const menus: string[] = ['거래상위', '상승', '하락', '👍추천종목'];
  return (
    <>
      <Section1Set>
        <div>
          {menus.map((value, index) => {
            return <ButtonSetPurle key={index}>{value}</ButtonSetPurle>;
          })}
        </div>
        <div>
          {data.map((value, index) => {
            return (
              <div key={index}>
                <span>{value.name}</span>
                <span>{value.price.toLocaleString()}</span>
                {value.state === 'up' ? (
                  <>
                    <span
                      style={{
                        color: `${theme.color.red}`,
                      }}>
                      ▲{value.mvprice.toLocaleString()}
                    </span>
                    <span>
                      {(value.mvprice / (value.price / 100)).toFixed(1)}%
                    </span>
                  </>
                ) : (
                  <>
                    <span
                      style={{
                        color: `${theme.color.blue}`,
                      }}>
                      ▼{value.mvprice.toLocaleString()}
                    </span>
                    <span>
                      -{(value.mvprice / (value.price / 100)).toFixed(1)}%
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </Section1Set>
    </>
  );
};

export default Section1;
