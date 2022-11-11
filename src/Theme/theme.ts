import baseStyled, { ThemedStyledInterface } from 'styled-components';

const color = {
  main: '#9A8AFF',
  red: '#FF005C',
  blue: '#0008CB',
  black: '#090015',
  white_gray: '#FBFAFC',
  gray: '#959595',
  d_gray: '#505050',
  l_gray: '#D1D1D1',
  m_gray: '#848484',
  mint: '#5FC6AD',
};

const fontSize = {
  font_18: '1.8rem',
  font_20: '2rem',
  font_28: '2.8rem',
  font_36: '3.6rem',
  font_50: '5rem',
};

const fontWeight = {
  DemiLight: '300',
  Regular: '400',
  Medium: '500',
  Bold: '700',
};

const theme = {
  color,
  fontSize,
  fontWeight,
};

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
export default theme;
