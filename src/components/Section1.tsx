import styled from '../Theme/themed-compoents';
import React, { useState, useRef, useCallback } from 'react';
import { ButtonSetPurle } from '../common/ButtonPurple';
import axiosSet from '../common/axiosSet';
import theme from '../Theme/theme';
import { getImpliedNodeFormatForFile } from 'typescript';

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

const Section1 = ({ volume }: { volume: any }) => {
  const [sorting, getSorting] = useState<string>('volume');
  const [index, getIndex] = useState<number>(0);

  volume.sort((a: any, b: any) => b[index][sorting] - a[index][sorting]);
  const setVolume = () => {
    getSorting('volume');
    getIndex(0);
  };
  const setprice = () => {
    getSorting('gap');
    getIndex(1);
  };
  const setlowprice = () => {
    getSorting('percent');
    getIndex(1);
  };

  // 1. 리턴확인
  // 2.애니를 안썻을때 상황 파악

  const infosDom = useRef(null);
  const getinfo = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { name } = e.currentTarget.dataset;
    axiosSet
      .post(
        '/getnames',
        {
          name,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
      });
  }, []);

  // console.log(Postdata);
  return (
    <>
      <Section1Set>
        <div>
          <ButtonSetPurle onClick={setVolume}>거래량 순</ButtonSetPurle>
          <ButtonSetPurle onClick={setprice}>상승 순</ButtonSetPurle>
          <ButtonSetPurle onClick={setlowprice}>증감률 순</ButtonSetPurle>
        </div>
        <div>
          {volume.map((value: any, index: number) => {
            return (
              <div
                key={index}
                data-name={value[0].name}
                onClick={getinfo}
                ref={infosDom}>
                <p>{value[0].name}</p>
                <p>{value[0].close.toLocaleString()}</p>
                {value[1].gap > 0 ? (
                  <>
                    <p style={{ color: `${theme.color.red}` }}>
                      ▲{value[1].gap.toLocaleString()}
                    </p>
                  </>
                ) : (
                  <p style={{ color: `${theme.color.blue}` }}>
                    ▼{value[1].gap.toLocaleString()}
                  </p>
                )}
                <p>{(value[1].gap / (value[0].close / 100)).toFixed(1)}%</p>
              </div>
            );
          })}
        </div>
      </Section1Set>
    </>
  );
};

export default React.memo(Section1);
