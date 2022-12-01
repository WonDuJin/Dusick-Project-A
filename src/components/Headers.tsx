import axiosSet from '@/common/axiosSet';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SearchItem from './searchItem';

const HeaderSet = styled.header`
  width: 100%;
  height: 127px;
  padding: 0 35px;
  align-items: center;
  position: relative;
  ${(props) => props.theme.flex.flexSpacebetween}
  border-bottom: 1px solid ${(props) => props.theme.color.l_gray};
  & > img {
    width: 161px;
    height: 66.4px;
  }
  & > div:nth-child(2) {
    position: relative;
    display: flex;
    align-items: center;
    & > span {
      width: 11px;
      height: 6.5px;
      background: url('/asset/Direction.png') center/cover no-repeat;
      position: absolute;
      left: 90px;
      top: 22px;
    }
    & > input[type='text'] {
      background: ${(props) => props.theme.color.white_gray};
      border: 1px solid ${(props) => props.theme.color.l_gray};
      border-radius: 30px;
      width: 463px;
      height: 50px;
      font-size: ${(props) => props.theme.fontSize.font_18};
      color: ${(props) => props.theme.color.gray};
      padding-left: 20px;
      &::placeholder {
        color: ${(props) => props.theme.color.l_gray};
      }
    }
    & > select {
      width: 113px;
      height: 50px;
      margin-right: 30px;
      padding: 0 15px;
      border-radius: 30px;
      color: ${(props) => props.theme.color.gray};
      font-size: ${(props) => props.theme.fontSize.font_18};
      font-weight: ${(props) => props.theme.fontWeight.DemiLight};
      border: 1px solid ${(props) => props.theme.color.m_gray};
      appearance: none;
      &:active,
      &:focus {
        outline: none;
      }
      & > option {
        font-size: ${(props) => props.theme.fontSize.font_18};
        font-weight: ${(props) => props.theme.fontWeight.DemiLight};
      }
    }
  }
  & > div:nth-child(3) {
    border: 1px solid red;
    border-radius: 10px;
    width: 463px;
    height: 200px;
    position: absolute;
    right: 34px;
    bottom: -160px;
  }
`;

const Header = ({
  getStockType,
  setSearchData,
}: {
  getStockType: (Type: string) => void;
  setSearchData: any;
}) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setSearchData(null);
  }, [data]);

  const Typeget = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    getStockType(e.target.value);
  };

  const DataGet = useCallback((e: any): void => {
    if (e.key === 'Enter') {
      new Promise<void>((resolve) => {
        resolve(e.target.value);
      }).then((value) => {
        axiosSet
          .get(`/getsearch/${value}`)
          .then((res) => {
            setSearchData(res.data);
          })
          .catch(() => {
            alert('시장에 종목이 존재하지 않습니다.');
          });
      });
    }
  }, []);
  // select에 onChange가 일어날 때 select value  값을 부모 컴포넌트에 보냄

  // const search = useCallback((e: any): void => {
  //   new Promise<void>((resolve) => {
  //     resolve(e.target.value);
  //   }).then((value) => {
  //     if (data === null) {
  //       axiosSet.get(`/getsearchinput/${value}`).then((res) => {
  //         console.log(res.data);
  //         setData(res.data);
  //       });
  //     } else {
  //       setData(null);
  //     }
  //   });
  // }, []);

  // const clickItem = useCallback((target: any): void => {
  //   new Promise<void>((resolve) => {
  //     resolve(target);
  //   }).then((value) => {
  //     axiosSet.get(`/getsearch/${value}`).then((res) => {
  //       setSearchData(res.data);
  //     });
  //   });
  // }, []);

  return (
    <>
      <HeaderSet>
        <img src='/asset/Logo.png' alt='logo'></img>
        <div>
          <select onChange={Typeget}>
            <option value={'kospi'}>KOSPI</option>
            <option value={'kosdak'}>KOSDAQ</option>
          </select>
          <span></span>
          <input
            type='text'
            placeholder='Search'
            id='search'
            onKeyDown={DataGet}
            // onKeyUp={search}
          ></input>
        </div>
        {/* {data && data !== null ? (
          <div>
            {data.map((value: any, index: number) => {
              return (
                <SearchItem
                  key={index}
                  data={value}
                  setData={setData}
                  clickItem={clickItem}
                ></SearchItem>
              );
            })}
          </div>
        ) : null} */}
      </HeaderSet>
    </>
  );
};

export default Header;
