import styled from 'styled-components';
import React, { useState, useCallback } from 'react';
import { ButtonMint } from '@/common/ButtonMint';

const StockDealSet = styled.div`
  display: flex;
  align-items: center;
  & > div:nth-child(1) {
    width: 40%;
    & > div:nth-child(1) {
      width: 68%;
      ${(props) => props.theme.flex.flexSpacebetween}
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
      ${(props) => props.theme.flex.flexSpacebetween}
    }
  }
`;

interface btn2 {
  id: number;
  value: string;
}

const StockDeal = ({ StockData }: { StockData: any }) => {
  const [totlStock, getTotalStock] = useState<any>(0);
  const [sellbuy, getSellbuy] = useState<string>('매수');

  //종목 구매량 카운트
  const getCount = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    getTotalStock(e.currentTarget.value);
  }, []);

  //매도매수 카운트
  const getsell = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    getSellbuy(e.currentTarget.value);
  }, []);

  //사이트 이동
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
    <StockDealSet>
      <div>
        <div>
          {btn2.map((value) => {
            return (
              <ButtonMint
                style={{ width: '140px' }}
                key={value.id}
                onClick={getsell}
                value={value.value}
                className={sellbuy === value.value ? 'active' : ''}
              >
                {value.value}
              </ButtonMint>
            );
          })}
        </div>
        <div>
          <input
            type='number'
            onChange={getCount}
            placeholder={'숫자만 입력'}
          ></input>
          <span>주</span>
        </div>
      </div>
      <div>
        {sellbuy === '매도' ? (
          <p>
            총 매도금액{' '}
            <span>{(totlStock * StockData[0].close).toLocaleString()}원</span>
          </p>
        ) : (
          <p>
            총 매수금액{' '}
            <span>{(totlStock * StockData[0].close).toLocaleString()}원</span>
          </p>
        )}
        <div>
          {btn3.map((value) => {
            return (
              <ButtonMint onClick={goSite} key={value.id} value={value.value}>
                {value.value}
              </ButtonMint>
            );
          })}
        </div>
      </div>
    </StockDealSet>
  );
};

export default StockDeal;
