import styled from '../Theme/themed-compoents';
import { useState, useEffect } from 'react';
import Header from './Headers';
import Section1 from './Section1';
import axiosSet from '../common/axiosSet';

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

export interface DataObject {
  close: string;
  day: string;
  high: string;
  low: string;
  market: string;
  name: string;
  open: string;
  volume: string;
  [index: number]: any; // Index Signature
} // 배열안에있는 객체 프로퍼티 타입 선언

// export interface Datalist extends Array<DataArr> {}
//DummyData라는 객체를 배열로 확장

const Layout = () => {
  const [StockType, setSTockType] = useState<string>('kospi');
  const [loading, setLoading] = useState<boolean>(false);
  const [data, getData] = useState<DataObject[]>([]);

  const getStockType = (Type: string) => {
    setSTockType(Type);
  };

  useEffect(() => {
    const getDatas = async () => {
      setLoading(true);
      try {
        let response = await axiosSet.get(`/${StockType}`);
        getData(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getDatas();
    setLoading(false);
  }, [StockType]);
  //header에서 받아오는 셀렉트값에 따른 다른 데이터 송출

  let volumearr: any = [];
  data.forEach((value) => {
    volumearr.push([
      value[0],
      {
        gap: value[0].close - value[1].close,
        percent: (value[0].close - value[1].close) / (value[0].close / 100),
      },
    ]);
  });
  const setvolume = volumearr.sort(
    (a: any, b: any) => b[0].volume - a[0].volume
  );
  return (
    <>
      <Main>
        <Header getStockType={getStockType}></Header>
        <div>
          {StockType === 'kospi' ? (
            <Section1 volume={setvolume}></Section1>
          ) : (
            <Section1 volume={setvolume}></Section1>
          )}
        </div>
      </Main>
    </>
  );
};

export default Layout;
