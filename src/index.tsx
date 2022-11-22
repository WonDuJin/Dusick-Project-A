import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/App';
import theme from './Theme/theme';
import { ThemeProvider } from './Theme/themed-components';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
