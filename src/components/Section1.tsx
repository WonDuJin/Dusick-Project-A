import styled from 'styled-components';
import { useState, useCallback, useEffect } from 'react';
import Selectstock from '@/common/SelectStock';
import { ButtonSetPurle } from '@/common/ButtonPurple';
import List from './Section1_con/List';
import Stockinfo from './Section1_con/StockInfo';
import StockDeal from './Section1_con/StockDeal';

const Section1Set = styled.section`
  width: 100%;
  height: 840px;
  background-color: #fff;
  ${(props) => props.theme.flex.flexSpacebetween}
  & > div:nth-child(1) {
    width: 31%;
    background-color: #fff;
    padding: 25px 35px;
    overflow-y: scroll;
    ${(props) => props.theme.flex.flexColumn}
    & > div:nth-child(1) {
      width: 100%;
      ${(props) => props.theme.flex.flexSpacebetween}
      align-items: center;
      margin-bottom: 20px;
    }
  }
  & > div:nth-child(2) {
    width: 69%;
    background-color: ${(props) => props.theme.color.white_gray};
    & > div {
      padding: 50px 86px;
      height: 100%;
      ${(props) => props.theme.flex.flexColumn}
      justify-content: space-between;
    }
  }
`;

interface btn1 {
  id: number;
  value: string;
  con: string;
}

const Section1 = ({ volume, data }: { volume: any; data: any }) => {
  const [sorting, getSorting] = useState<string>('volume');
  const [index, getIndex] = useState<number>(0);
  const [nameData, getNameData] = useState<any[]>();
  volume.sort((a: any, b: any) => b[index][sorting] - a[index][sorting]);

  useEffect(() => {
    getNameData(undefined);
  }, [data]);

  // 리스트 버튼 클릭시 버튼의 value값을 받아서 sort
  const setSort = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      switch (e.currentTarget.value) {
        case 'volume':
          getSorting('volume');
          getIndex(0);
          break;
        //거래량
        case 'gap':
          getSorting('gap');
          getIndex(1);
          break;
        //상승
        case 'percent':
          getSorting('percent');
          getIndex(1);
          break;
        //증감률
      }
    },
    [sorting, index]
  );
  // 종목 클릭시 종목 data-set 을 통해 서버로부터 종목 정보 요청
  const setData = (names: any) => {
    getNameData(names);
  };
  // 리스트 sort btn
  const btn: btn1[] = [
    { id: 1, value: 'volume', con: '거래량 순' },
    { id: 2, value: 'gap', con: '상승 순' },
    { id: 3, value: 'percent', con: '증감률 순' },
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
                  onClick={setSort}
                >
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
                    key={index}
                  ></List>
                );
              })
            ) : (
              <p>데이터 불러오는 중입니다.</p>
            )}
          </div>
        </div>
        {nameData !== undefined || data !== null ? (
          <div>
            <div>
              <Stockinfo StockData={nameData || data} />
              <StockDeal StockData={nameData || data} />
            </div>
          </div>
        ) : (
          <Selectstock></Selectstock>
        )}
      </Section1Set>
    </>
  );
};

export default Section1;
