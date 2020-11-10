import React  from 'react'
import {AppBar, Toolbar, Typography, Fab} from '@material-ui/core'
import FormDialog from './Panel/FormDialog'
import AddIcon from '@material-ui/icons/Add';


export default ({getInputData}) => {

    const handleOpen = () => {
        setOpen(true)
    }

    const [open, setOpen] = React.useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <AppBar position='static'>
            <Toolbar style={{display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant='h5'>
                    Header
                </Typography>
                <Fab color="default"  edge="end" size="small" onClick={handleOpen}>
                    <AddIcon />
                </Fab>
            </Toolbar>
            <FormDialog getInputData={getInputData} open={open} handleClose={handleClose}/>
        </AppBar>
    )
}