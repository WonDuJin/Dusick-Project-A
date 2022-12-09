import styled from 'styled-components';
import theme from '@/Theme/theme';
import axiosSet from '@/common/axiosSet';
import { useEffect, useState } from 'react';
import Chart from './Chart';

const StockinfoSet = styled.div`
  & > h1 {
    font-size: ${(props) => props.theme.fontSize.font_36};
    margin-bottom: 40px;
    & > span {
      display: inline-block;
      margin-left: 20px;
      font-weight: ${(props) => props.theme.fontWeight.Bold};
      font-size: ${(props) => props.theme.fontSize.font_28};
    }
  }
  & > div:nth-child(2) {
    display: flex;
    justify-content: space-between;
    & > div:nth-child(2) {
      width: 20%;
      & > div:nth-child(1) {
        width: 100%;
        height: 200px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        row-gap: 20px;
        border-bottom: 1px dashed ${(props) => props.theme.color.m_gray};
        margin-bottom: 20px;
        & > div {
          font-weight: ${(props) => props.theme.fontWeight.Medium};
          & > span:nth-child(1) {
            display: block;
            font-size: ${(props) => props.theme.fontSize.font_20};
            color: ${(props) => props.theme.color.m_gray};
          }
          & > span:nth-child(2) {
            font-size: ${(props) => props.theme.fontSize.font_18};
            color: ${(props) => props.theme.color.black};
          }
        }
      }
      & > p {
        font-size: ${(props) => props.theme.fontSize.font_15};
        color: ${(props) => props.theme.color.m_gray};
        margin-bottom: 80px;
        word-break: keep-all;
      }
    }
  }
  /* 가격,거래량 */
`;

const Stockinfo = ({ StockData }: { StockData: any }) => {
  const [daydata, setDaydata] = useState<any[] | undefined>();
  const StockDatas = {
    Name: StockData[0].name,
    mid_recent: Number(StockData[0].mid),
    mid_after_calc_plus:
      Number(StockData[1].mid) + Number(StockData[1].medomesu),
    mid_after_calc_mius:
      Number(StockData[1].mid) - Number(StockData[1].medomesu),
    Stocks_info: [
      ['종가', StockData[0].close],
      ['고가', StockData[0].high],
      ['저가', StockData[0].low],
      ['거래량', StockData[0].volume],
    ],
  };
  const {
    Name,
    mid_recent,
    mid_after_calc_plus,
    mid_after_calc_mius,
    Stocks_info,
  } = StockDatas;

  useEffect(() => {
    axiosSet.get(`/daydata/${Name}`).then((res) => {
      return setDaydata(res.data[0]);
    });
  }, [Name]);

  return (
    <StockinfoSet>
      {StockData && mid_recent >= mid_after_calc_plus ? (
        <h1>
          {Name}
          <span style={{ color: `${theme.color.red}` }}> 종목추천(매도)</span>
        </h1>
      ) : mid_recent <= mid_after_calc_mius ? (
        <h1>
          {Name}
          <span style={{ color: `${theme.color.blue}` }}>
            종목추천(매수)
            <span />
          </span>
        </h1>
      ) : (
        <h1>{Name}</h1>
      )}
      <div>
        <Chart dayData={daydata}></Chart>
        <div>
          <div>
            {Stocks_info.map((value, index) => {
              return value[0] === '고가' ? (
                <div key={index}>
                  <span>{value[0]}</span>
                  <span style={{ color: `${theme.color.red}` }}>
                    {value[1].toLocaleString()}
                  </span>
                </div>
              ) : (
                <div key={index}>
                  <span>{value[0]}</span>
                  <span>{value[1].toLocaleString()}</span>
                </div>
              );
            })}
          </div>
          <p>
            두식은 본 정보의 정확성에 대해 보증하지 않으며, 본 정보를 이용한
            투자에 대한 책임은 해당 투자자에게 귀속됩니다.
          </p>
        </div>
      </div>
    </StockinfoSet>
  );
};

export default Stockinfo;
