import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import styled from 'styled-components';
import theme from '../../Theme/theme';
const ChartSet = styled.div`
  width: 70%;
  height: 400px;
`;

const Chart = ({ dayData }: { dayData: any[] | undefined }) => {
  console.log(dayData);
  return (
    <ChartSet>
      {dayData && dayData !== undefined ? (
        <ResponsiveContainer width={'100%'} height={'100%'}>
          <LineChart width={800} height={400} data={dayData}>
            <CartesianGrid strokeDasharray={'3 3'} />
            <XAxis dataKey={'dateonly'} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type={'monotone'}
              dataKey={'high'}
              stroke={`${theme.color.red}`}
              strokeWidth={2}
              name={'고가'}
              activeDot={{ r: 1 }}
            />
            <Line
              type={'monotone'}
              dataKey={'mid'}
              stroke={`${theme.color.main}`}
              strokeWidth={2}
              name={'중심가'}
              activeDot={{ r: 1 }}
            />
            <Line
              type={'monotone'}
              dataKey={'low'}
              name={'저가'}
              stroke={`${theme.color.blue}`}
              strokeWidth={2}
              activeDot={{ r: 1 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>데이터를 불러오는 중 입니다.</p>
      )}
    </ChartSet>
  );
};

export default Chart;
