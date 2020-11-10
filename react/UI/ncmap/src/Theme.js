import React from 'react';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {cyan} from '@material-ui/core/colors';

const defaultTheme = createMuiTheme({
    palette:{
        success: {
            main:cyan[500]
        },
        text: {
            primary: '#fff'
        },
        background:'#222'
    }
})

export default ({App}) => (
    <MuiThemeProvider theme={defaultTheme}>{App}</MuiThemeProvider>
)
    