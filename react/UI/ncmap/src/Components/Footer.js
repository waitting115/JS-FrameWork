import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

const styles = makeStyles(theme => ({
    Footer: {
        position:'fixed',
        width: '100%',
        bottom: 0,
        backgroundColor: theme.palette.success.main,
        color: '#fff'
    }
}))


export default () => {
    const classes = styles();
    return (
        <div className={classes.Footer}>我在吃柚子</div>
    )
}