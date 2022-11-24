import styled from '../Theme/themed-components';
import { useCallback, useRef } from 'react';
import theme from '../Theme/theme';
import axiosSet from '../common/axiosSet';

const ListSet = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  cursor: pointer;
  & > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:hover {
      font-weight: bold;
    }
    & > p {
      text-align: left;
      font-size: ${(props) => props.theme.fontSize.font_15};
      color: ${(props) => props.theme.color.d_gray};
    }
    & > p:nth-child(1) {
      width: 300px;
    }
  }
`;

const List = ({
  value,
  index,
  setData,
}: {
  value: any;
  index: number;
  setData: any;
}) => {
  const getDom = useRef(null);
  const getinfo = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { name } = e.currentTarget.dataset;
    // console.log(name);
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
        return setData(res.data);
      });
  }, []);
  return (
    <ListSet>
      <div data-name={value[0].name} key={index} onClick={getinfo} ref={getDom}>
        {value[0].mid >= Number(value[1].mid) + Number(value[1].medomesu) ? (
          <p style={{ color: `${theme.color.red}` }}>{value[0].name}</p>
        ) : value[0].mid <= Number(value[1].mid) - Number(value[1].medomesu) ? (
          <p style={{ color: `${theme.color.blue}` }}>{value[0].name}</p>
        ) : (
          <p>{value[0].name}</p>
        )}
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
    </ListSet>
  );
};

export default List;
