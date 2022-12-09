import { createRoot } from 'react-dom/client';
import App from './App';
import theme from '@/Theme/theme';
import { ThemeProvider } from './Theme/theme_set';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container as Element);

root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
