import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography';

const NavBar = () => {

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h5" color="inherit" >
                    React & Material-UI Sample Application
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;