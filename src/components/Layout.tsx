import styled from '../Theme/themed-compoents';
import { useState, useEffect } from 'react';
import Header from './Headers';
import Section1 from './Section1';
import axios from 'axios';

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

export interface DataArr {
  market: string;
  name: string;
  code: string;
} // 배열안에있는 객체 프로퍼티 타입 선언

// export interface Datalist extends Array<DataArr> {}
//DummyData라는 객체를 배열로 확장

const Layout = () => {
  const [StockType, setSTockType] = useState<String>('kospi');
  const [loading, setLoading] = useState<boolean>(false);
  const [data, getData] = useState<DataArr[]>([]);

  const getStockType = (Type: String) => {
    setSTockType(Type);
  };

  useEffect(() => {
    setLoading(true);
    const getDatas = async () => {
      try {
        let response = await axios.get(`http://127.0.0.1:5000/${StockType}`);
        getData(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getDatas();
    setLoading(false);
  }, [StockType]);
  console.log(StockType);
//header에서 받아오는 셀렉트값에 따른 다른 데이터 송출

  return (
    <>
      <Main>
        <Header getStockType={getStockType}></Header>
        <div>
          {StockType === 'kospi' ? (
            <Section1 data={data}></Section1>
          ) : (
            <Section1 data={data}></Section1>
          )}
        </div>
      </Main>
    </>
  );
};

export default Layout;
