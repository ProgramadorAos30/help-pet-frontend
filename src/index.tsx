import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';
import GlobalStyle from './components/style/GlobalStyle';
import colors from './components/style/theme/colors';
import { Provider } from 'react-redux';
import { Store } from './stores';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <ThemeProvider theme={colors}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
