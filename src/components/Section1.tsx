import styled from '../Theme/themed-compoents';
import React, { useState, useCallback } from 'react';
import Selectstock from '../common/SelectStock';
import { ButtonSetPurle } from '../common/ButtonPurple';
import { ButtonMint } from '../common/ButtonMint';
import List from '../components/List';

import theme from '../Theme/theme';

const Section1Set = styled.section`
  width: 100%;
  height: 838px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  & > div:nth-child(1) {
    width: 38%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding: 25px 35px;
    overflow-y: scroll;
    & > div:nth-child(1) {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }
  }
  & > div:nth-child(2) {
    width: 62%;
    background-color: ${(props) => props.theme.color.white_gray};
    & > div {
      padding: 78px 86px;
      & > h1 {
        font-size: ${(props) => props.theme.fontSize.font_36};
      }
      & > div:nth-child(2) {
        width: 100%;
        padding: 76px 0;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        row-gap: 46px;
        border-bottom: 1px dashed ${(props) => props.theme.color.m_gray};
        margin-bottom: 15px;
        & > div {
          font-weight: ${(props) => props.theme.fontWeight.Medium};
          & > span:nth-child(1) {
            display: block;
            font-size: ${(props) => props.theme.fontSize.font_20};
            color: ${(props) => props.theme.color.m_gray};
          }
          & > span:nth-child(2) {
            font-size: ${(props) => props.theme.fontSize.font_28};
            color: ${(props) => props.theme.color.black};
          }
        }
      }
      & > p:nth-child(3) {
        font-size: ${(props) => props.theme.fontSize.font_15};
        color: ${(props) => props.theme.color.m_gray};
        margin-bottom: 80px;
      }
      & > div:nth-child(4) {
        display: flex;
        align-items: center;
        & > div:nth-child(1) {
          width: 40%;
          & > div:nth-child(1) {
            width: 68%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 70px;
          }
          & > div:nth-child(2) {
            display: flex;
            align-items: center;
            input[type='number'] {
              background-color: transparent;
              -webkit-appearance: none;
              -moz-appearance: textfield;
              width: 246px;
              height: 68px;
              font-size: ${(props) => props.theme.fontSize.font_50};
              color: ${(props) => props.theme.color.black};
              border-bottom: 1px solid ${(props) => props.theme.color.m_gray};
              &::placeholder {
                font-size: ${(props) => props.theme.fontSize.font_36};
              }
            }
            & > span {
              font-size: ${(props) => props.theme.fontSize.font_50};
              color: ${(props) => props.theme.color.black};
            }
          }
        }
        & > div:nth-child(2) {
          & > p {
            font-weight: ${(props) => props.theme.fontWeight.Medium};
            font-size: ${(props) => props.theme.fontSize.font_28};
            color: ${(props) => props.theme.color.black};
            margin-bottom: 34px;
            & > span {
              margin-left: 20px;
              display: inline-block;
              font-size: ${(props) => props.theme.fontSize.font_50};
              font-weight: bold;
            }
          }
          & > div:nth-child(2) {
            width: 420px;
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }
`;

interface btn1 {
  id: number;
  value: string;
  con: string;
}
interface btn2 {
  id: number;
  value: string;
}

const Section1 = ({ volume }: { volume: any }) => {
  const [sorting, getSorting] = useState<string>('volume');
  const [index, getIndex] = useState<number>(0);
  const [nameData, getNameData] = useState<any[]>();
  const [totlStock, getTotalStock] = useState<any>(0);
  const [sellbuy, getSellbuy] = useState<string>('매수');

  volume.sort((a: any, b: any) => b[index][sorting] - a[index][sorting]);
  const setSort = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      switch (e.currentTarget.value) {
        case 'volume':
          getSorting('volume');
          getIndex(0);
          break;
        case 'gap':
          getSorting('gap');
          getIndex(1);
          break;
        case 'percent':
          getSorting('percent');
          getIndex(1);
          break;
      }
    },
    [sorting, index]
  );
  // const bestButton = () => {
  //   volume = volume((value: any) => {
  //     if (value.close > value.MID) {
  //       return value;
  //     }
  //   });
  //   getSorting('best');
  //   getIndex(0);
  // };

  // bestButton();
  // 탭 버튼 클릭시 종목 정렬

  // 종목 클릭시 종목 data-set 을 통해 서버로부터 종목 정보 요청
  const setData = (names: any) => {
    getNameData(names);
  };

  console.log(nameData);
  const getCount = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    getTotalStock(e.currentTarget.value);
  }, []);
  //종목 구매량 카운트

  const getsell = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    getSellbuy(e.currentTarget.value);
  }, []);

  //매도매수 카운트

  const goSite = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    switch (e.currentTarget.value) {
      case '한국투자증권':
        window.location.href =
          'https://securities.koreainvestment.com/main/Main.jsp';
        break;
      case '키움증권':
        window.location.href =
          'https://www.kiwoom.com/h/common/event/VEventMainView?eventCode=20220074&from=138';
        break;
      case '미래에셋증권':
        window.location.href = 'https://securities.miraeasset.com/';
        break;
    }
  }, []);

  // e.target.value값에 따른 사이트 이동
  const btn: btn1[] = [
    { id: 1, value: 'volume', con: '거래량 순' },
    { id: 2, value: 'gap', con: '상승 순' },
    { id: 3, value: 'percent', con: '증감률 순' },
    { id: 4, value: 'best', con: '추천 순' },
  ];
  const btn2: btn2[] = [
    { id: 1, value: '매수' },
    { id: 2, value: '매도' },
  ];
  const btn3: btn2[] = [
    { id: 1, value: '한국투자증권' },
    { id: 2, value: '키움증권' },
    { id: 3, value: '미래에셋증권' },
  ];

  return (
    <>
      <Section1Set>
        <div>
          <div>
            {btn.map((value) => {
              return (
                <ButtonSetPurle
                  key={value.id}
                  value={value.value}
                  className={sorting === value.value ? 'active' : ''}
                  onClick={setSort}>
                  {value.con}
                </ButtonSetPurle>
              );
            })}
          </div>
          <div>
            {volume && volume !== undefined ? (
              volume.map((value: any, index: number) => {
                return (
                  <List
                    value={value}
                    index={index}
                    setData={setData}
                    key={index}></List>
                );
              })
            ) : (
              <p>데이터 불러오는 중입니다.</p>
            )}
          </div>
        </div>
        {nameData !== undefined ? (
          <div>
            <div>
              <h1>{nameData[0].name}</h1>
              <div>
                <div>
                  <span>종가</span>
                  <span>{nameData[0].close.toLocaleString()}</span>
                </div>
                <div>
                  <span>고가</span>
                  <span style={{ color: `${theme.color.red}` }}>
                    {nameData[0].high.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span>저가</span>
                  <span>{nameData[0].low.toLocaleString()}</span>
                </div>
                <div>
                  <span>거래량</span>
                  <span>{nameData[0].volume.toLocaleString()}</span>
                </div>
              </div>
              <p>
                두식은 본 정보의 정확성에 대해 보증하지 않으며, 본 정보를 이용한
                투자에 대한 책임은 해당 투자자에게 귀속됩니다.
              </p>
              <div>
                <div>
                  <div>
                    {btn2.map((value) => {
                      return (
                        <ButtonMint
                          key={value.id}
                          onClick={getsell}
                          value={value.value}
                          className={sellbuy === value.value ? 'active' : ''}>
                          {value.value}
                        </ButtonMint>
                      );
                    })}
                  </div>
                  <div>
                    <input
                      type='number'
                      onChange={getCount}
                      placeholder={'숫자만 입력'}></input>
                    <span>주</span>
                  </div>
                </div>
                <div>
                  {sellbuy === '매도' ? (
                    <p>
                      총 매도금액{' '}
                      <span>
                        {(totlStock * nameData[0].close).toLocaleString()}원
                      </span>
                    </p>
                  ) : (
                    <p>
                      총 매수금액{' '}
                      <span>
                        {(totlStock * nameData[0].close).toLocaleString()}원
                      </span>
                    </p>
                  )}
                  <div>
                    {btn3.map((value) => {
                      return (
                        <ButtonMint
                          onClick={goSite}
                          key={value.id}
                          value={value.value}>
                          {value.value}
                        </ButtonMint>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Selectstock></Selectstock>
        )}
      </Section1Set>
    </>
  );
};

export default React.memo(Section1);
