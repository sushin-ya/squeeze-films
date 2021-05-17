import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import 'reset-css';
import '@fontsource/roboto';
import '@fontsource/noto-sans-jp';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './app/config/theme';

const rootEl = document.getElementById('root');

function render() {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>,
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
