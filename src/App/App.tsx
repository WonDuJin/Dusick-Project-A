/**
 * StyledComponet Provider 사용법(React에서 Styledcomponent 사용해보길 권장)
 * 1.theme.ts에 있는 속성확인할것
 * 2.Style 먹이는방법 ${(props)=>props.theme.color.main}
 * theme를 index에서 Props로 받고 theme라는 객체에 Color 객체에 있는 main 값을 사용
 */
import './App.css';
import Layout from '../components/Layout';

const App = () => {
  return (
    <>
      <Layout></Layout>
    </>
  );
};

export default App;
