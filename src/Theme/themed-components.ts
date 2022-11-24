import * as styledComponents from 'styled-components';

import { Theme } from './theme';

const {
  default: styled,
  css,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<Theme>;

export { css, ThemeProvider };

export default styled;
