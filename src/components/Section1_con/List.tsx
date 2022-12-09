import styled from 'styled-components';
import { useCallback, useRef } from 'react';
import theme from '../../Theme/theme';
import axiosSet from '../../common/axiosSet';

const ListSet = styled.div`
  width: 100%;
  ${(props) => props.theme.flex.flexCenter.flexCenterColumn}
  padding: 10px 0;
  cursor: pointer;
  & > div {
    width: 100%;
    align-items: center;
    ${(props) => props.theme.flex.flexSpacebetween}
    &:hover {
      font-weight: bold;
    }
    & > p {
      text-align: right;
      font-size: ${(props) => props.theme.fontSize.font_15};
      color: ${(props) => props.theme.color.d_gray};
    }
    & > p:nth-child(1) {
      width: 300px;
      text-align: left;
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
  setData: (names: any) => void;
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

  const valueDatas = {
    Name: value[0].name,
    close_recent: value[0].close.toLocaleString(),
    gap: value[1].gap,
    mid_recent: Number(value[0].mid),
    mid_after_calc_plus: Number(value[1].mid) + Number(value[1].medomesu),
    mid_after_calc_mius: Number(value[1].mid) - Number(value[1].medomesu),
    Changerate: Number(value[1].gap / (value[0].close / 100)).toFixed(1),
  };
  const {
    Name,
    mid_recent,
    mid_after_calc_plus,
    mid_after_calc_mius,
    Changerate,
    close_recent,
    gap,
  } = valueDatas;

  return (
    <ListSet>
      <div data-name={Name} key={index} onClick={getinfo} ref={getDom}>
        {mid_recent >= mid_after_calc_plus ? (
          <p style={{ color: `${theme.color.red}` }}>{Name}</p>
        ) : mid_recent <= mid_after_calc_mius ? (
          <p style={{ color: `${theme.color.blue}` }}>{Name}</p>
        ) : (
          <p>{Name}</p>
        )}
        <p>{close_recent}</p>
        {gap > 0 ? (
          <p style={{ color: `${theme.color.red}` }}>▲{gap.toLocaleString()}</p>
        ) : (
          <p style={{ color: `${theme.color.blue}` }}>
            ▼{gap.toLocaleString()}
          </p>
        )}
        <p>{Changerate}%</p>
      </div>
    </ListSet>
  );
};

export default List;
