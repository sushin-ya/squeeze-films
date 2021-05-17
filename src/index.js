import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import 'reset-css';
import '@fontsource/roboto';
import '@fontsource/noto-sans-jp';

const rootEl = document.getElementById('root');

function render() {
  ReactDOM.render(<App />, rootEl);
}

if (module.hot) {
  module.hot.accept('./app/layout/App', function () {
    setTimeout(render);
  });
}

render();

reportWebVitals();
