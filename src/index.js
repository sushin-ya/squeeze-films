import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import 'reset-css';
import '@fontsource/roboto';
import '@fontsource/noto-sans-jp';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './app/config/theme';
import { BrowserRouter } from 'react-router-dom';

const rootEl = document.getElementById('root');

function render() {
  ReactDOM.render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>,
    rootEl
  );
}

if (module.hot) {
  module.hot.accept('./app/layout/App', function () {
    setTimeout(render);
  });
}

render();

reportWebVitals();
