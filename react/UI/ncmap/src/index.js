import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import DefTheme from './Theme';

ReactDOM.render(
  // <React.StrictMode>
    // <App />
    <DefTheme App={App()}></DefTheme>
  // </React.StrictMode>
  ,
  document.getElementById('root')
);
serviceWorker.unregister();
