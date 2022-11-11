import styled from '../Theme/themed-compoents';
import { useState, useEffect } from 'react';
import Header from './Headers';
import Section1 from './Section1';

const Main = styled.main`
  width: 100%;
  height: 964px;
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
  & > div {
    display: flex;
    justify-content: space-between;
  }
`;

interface DummyData {
  name: string;
  type: string;
  price: number;
  state: string;
  mvprice: number;
} // 배열안에있는 객체 프로퍼티 타입 선언

export interface DummyArr extends Array<DummyData> {}
//DummyData라는 객체를 배열로 확장

const Layout = () => {
  const [StockType, setSTockType] = useState<String>('kospi');
  const getStockType = (Type: String) => {
    setSTockType(Type);
  };

  console.log(StockType);
  // const datalist: = DummyData.filter((value: any) => {
  //   if (value.type === 'kospi') {
  //     return <h1>코스피</h1>;
  //   }
  // });

  const Dummys: DummyArr = [
    {
      name: 'Stock1',
      type: 'kospi',
      state: 'up',
      price: 5000,
      mvprice: 500,
    },
    {
      name: 'Stock3',
      type: 'kospi',
      state: 'up',
      price: 4000,
      mvprice: 380,
    },
    {
      name: 'Stock5',
      type: 'kospi',
      state: 'up',
      price: 9000,
      mvprice: 520,
    },
    {
      name: 'Stock7',
      type: 'kospi',
      state: 'down',
      price: 2000,
      mvprice: 130,
    },
    {
      name: 'Stock9',
      type: 'kospi',
      state: 'up',
      price: 8000,
      mvprice: 121,
    },
  ];

  const Dummys2: DummyArr = [
    {
      name: 'Stock2',
      type: 'kosdaq',
      price: 6000,
      state: 'down',
      mvprice: 600,
    },
    {
      name: 'Stock3',
      type: 'kosdaq',
      state: 'up',
      price: 13257,
      mvprice: 1224,
    },
    {
      name: 'Stock4',
      type: 'kosdaq',
      state: 'down',
      price: 8000,
      mvprice: 800,
    },
    {
      name: 'Stock5',
      type: 'kosdaq',
      state: 'up',
      price: 9000,
      mvprice: 900,
    },
    {
      name: 'Stock6',
      type: 'kosdaq',
      state: 'up',
      price: 1000,
      mvprice: 100,
    },
  ];
  return (
    <>
      <Main>
        <Header getStockType={getStockType}></Header>
        <div>
          {StockType === 'kospi' ? (
            <Section1 data={Dummys}></Section1>
          ) : (
            <Section1 data={Dummys2}></Section1>
          )}
        </div>
      </Main>
    </>
  );
};

export default Layout;
