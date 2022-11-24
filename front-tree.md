### 폴더 구조
```
src
│  index.tsx
│
├─App
│      App.tsx
│
├─common
│      axiosSet.ts
│      ButtonMint.ts
│      ButtonPurple.ts
│      Loading.tsx
│      SelectStock.tsx
│
├─components
│      Headers.tsx
│      Layout.tsx
│      List.tsx
│      Section1.tsx
│
└─Theme
        theme.ts
        themed-components.ts
```

### 컴포넌트 계층 구조
- 1계층 (빨간색)
  - 1) index.tsx : 리액트 컴포넌트와 DOM노드의 접점인 root 엘리먼트가 위치.

- 2계층 (주황색)
  - 1) App
  - App.tsx : 리액트를 통해 실질적으로 조작하는 최상위 컴포넌트.

  - 2) themed-components (export default styled) : theme 컴포넌트를 받아와서 전역으로 뿌려주는 역할 (styled-compoenets 라이브러리)

- 3계층 (초록색)
  - 1) (App <=) Layout : 실질적인 내용이 출력되는 컴포넌트.

  - 2) (themed-components <=) theme : 스타일시트


- 4계층 (하늘색)
  - 1) (Layout <=) themed-components

  - 2) (Layout <=) Loading

  - 3) (Layout <=) Headers

  - 4) (Layout <=) Sections 1

  - 5) (Layout <=) axiosSet


- 5계층 (파란색)
  - 1) (Loading <=) themed-components

  - 2) (Sections 1 <=) themed-components

  - 3) (Sections 1 <=) List

  - 4) (Sections 1 <=) ButtonMint

  - 5) (Sections 1 <=) ButtonPurple

  - 6) (Sections 1 <=) SelectStock

  - 7) (Sections 1 <=) theme


- 6계층 (보라색)
  - 1) (List <=) themed-components

  - 2) (List <=) theme

  - 3) (List <=) axiosSet
