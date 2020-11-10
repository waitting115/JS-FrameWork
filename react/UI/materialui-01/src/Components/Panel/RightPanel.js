import React, { Fragment } from 'react'
import {Paper, Typography} from '@material-ui/core'

export default ({styles, rightContent}) => {
    return (
        <Paper style={styles.paper}>
            {
                Object.keys(rightContent).length !== 0
                    ?
                    <Fragment>
                        <Typography variant='h6'>{rightContent.title}</Typography>
                        <Typography variant='h6'>{rightContent.id}</Typography>
                        <Typography variant='h6'>{rightContent.detail}</Typography>
                    </Fragment>
                    :
                    <Fragment>
                        <Typography variant='h6'>欢迎使用！</Typography>
                    </Fragment>
            }   
        </Paper>
    )
}
    