const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  //공통파일과 다른파일을 연동시키기위한 모듈 common의 설정값을 dev,prod에게 merge하게 됨
  mode: 'development', //개발 모드를 의미 코드가 압축되지 않은 상태이며 난독화가 되지 않은 상태
  devtool: 'inline-source-map', //소스 맵 생성 여부와 생성 방법을 제어 : 단일 파일 게시 시 가능한 선택
  devServer: {
    //webpack-dev-server는 빠른 실시간 리로드 기능을 갖춘 개발 서버
    //서버 실행 시 소스 파일들을 번들링하여 메모리에 저장소스 파일을 감시
    //소스 파일이 변경되면 변경된 모듈만 새로 번들링
    //변경된 모듈 정보를 브라우저에 전송
    //브라우저는 변경을 인지하고 새로고침되어 변경사항이 반영된 페이지를 로드
    open: true, //dev server 구동 후 브라우저 열기
    hot: true, //webpack의 HMR기능활성화
    compress: true, //모든 항목에 대해 gzip압축 사용
    port: 3000, //접속 포트 설정
    historyApiFallback: true,
    liveReload: true,
  },
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
});
