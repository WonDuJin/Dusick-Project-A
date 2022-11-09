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

const Layout: React.FC = () => {
  const [StockType, setSTockType] = useState<String>('kospi');
  const getStockType = (Type: String) => {
    setSTockType(Type);
  };

  const DummyData: object[] = [
    {
      name: 'Stock1',
      type: 'kospi',
      price: 5000,
      mvprice: 500,
    },
    {
      name: 'Stock2',
      type: 'kosdaq',
      price: 6000,
      mvprice: -600,
    },
    {
      name: 'Stock3',
      type: 'kospi',
      price: 4000,
      mvprice: 400,
    },
    {
      name: 'Stock4',
      type: 'kosdaq',
      price: 8000,
      mvprice: -800,
    },
    {
      name: 'Stock5',
      type: 'kospi',
      price: 9000,
      mvprice: 900,
    },
    {
      name: 'Stock6',
      type: 'kosdaq',
      price: 1000,
      mvprice: 100,
    },
    {
      name: 'Stock7',
      type: 'kospi',
      price: 2000,
      mvprice: -500,
    },
    {
      name: 'Stock8',
      type: 'kosdaq',
      price: 7000,
      mvprice: -800,
    },
    {
      name: 'Stock9',
      type: 'kospi',
      price: 8000,
      mvprice: 500,
    },
    {
      name: 'Stock10',
      type: 'kosdaq',
      price: 3000,
      mvprice: -400,
    },
  ];

  console.log(StockType);
  return (
    <>
      <Main>
        <Header getStockType={getStockType}></Header>
        <div>
          <Section1 data={DummyData} />
        </div>
      </Main>
    </>
  );
};

export default Layout;
