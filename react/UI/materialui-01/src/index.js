import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createMuiTheme,MuiThemeProvider} from '@material-ui/core'
import {cyan} from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    primary:cyan,
    secondary: {
      main:cyan[100]
    },
    type: 'dark'
  }
})

ReactDOM.render(
  // <React.StrictMode>
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>
  // </React.StrictMode>
  ,
  document.getElementById('root')
);
serviceWorker.unregister();
