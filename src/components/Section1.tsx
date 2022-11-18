import styled from '../Theme/themed-compoents';
import React, { useState, useRef, useEffect } from 'react';
import { ButtonSetPurle } from '../common/ButtonPurple';
import { DataObject } from './Layout';
import axios from 'axios';
import theme from '../Theme/theme';

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
    padding: 14px 0;
    cursor: pointer;
    & > div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      & > p {
        text-align: left;
        font-size: ${(props) => props.theme.fontSize.font_15};
        color: ${(props) => props.theme.color.d_gray};
      }
      & > p:nth-child(1) {
        width: 300px;
      }
    }
  }
`;

const Section1 = ({
  high,
  low,
  volume,
  stocks,
}: {
  volume: object[];
  high: object[];
  low: object[];
  stocks: string;
}) => {
  // const [data, getData] = useState<DataObject[]>([]);
  // useEffect(() => {
  //   const getDatas = async () => {
  //     try {
  //       let response = await axios.get(
  //         `http://127.0.0.1:5000/${stocks}/${names}`
  //       );
  //       getData(response.data);
  //       console.log(data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   getDatas();
  // }, [names]);
  const infosDom = useRef(null);
  const getinfo = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { name } = e.currentTarget.dataset;
    console.log(name);
  };
  //클릭시 이름 가져옴
  console.log(volume);
  return (
    <>
      <Section1Set>
        <div>
          <ButtonSetPurle className={'active'}>거래상위</ButtonSetPurle>
          <ButtonSetPurle>고가</ButtonSetPurle>
          <ButtonSetPurle>저가</ButtonSetPurle>
        </div>
        <div>
          {/* {datas &&
            volume.map((value: any, index: number) => {
              return (
                <div
                  key={index}
                  data-name={value[0].name}
                  onClick={getinfo}
                  ref={infosDom}>
                  <p>{value[0].name}</p>
                  <p>{value[0].close.toLocaleString()}</p>
                  {value[0].close - value[1].close > 0 ? (
                    <>
                      <p style={{ color: `${theme.color.red}` }}>
                        ▲{(value[0].close - value[1].close).toLocaleString()}
                      </p>
                    </>
                  ) : (
                    <p style={{ color: `${theme.color.blue}` }}>
                      ▼{(value[0].close - value[1].close).toLocaleString()}
                    </p>
                  )}
                  <p>
                    {(
                      (value[0].close - value[1].close) /
                      (value[0].close / 100)
                    ).toFixed(1)}
                    %
                  </p>
                </div>
              );
            })} */}
        </div>
      </Section1Set>
    </>
  );
};

export default Section1;
