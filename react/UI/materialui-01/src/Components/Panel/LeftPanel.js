import React, {Fragment} from 'react'
import {Paper, Typography, 
        List, 
        ListItem, 
        ListItemText, 
        ListItemIcon, 
        IconButton, 
        ListItemSecondaryAction 
    } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FormDialog from './FormDialog'

export default ({styles, newData, getLeftClickData, onDelete, getEditorData, getEditorId}) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = (id) => {
        getEditorId(id)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Paper style={styles.paper}>
            {newData.map((v, i) => 
                <Fragment key={i}>
                    <Typography variant="h6">
                        {v[0]}
                    </Typography>
                    <List>
                        {
                            v[1].map((v, i) => (
                                <ListItem button onClick={() => getLeftClickData(v.id)} key={'v' + i}>
                                    <ListItemText>{v.title}</ListItemText>
                                    <ListItemSecondaryAction>
                                        <ListItemIcon>
                                            <IconButton edge="end" onClick={() => handleOpen(v.id)}>
                                                <EditOutlinedIcon/>
                                            </IconButton>
                                            <IconButton edge="end" aria-label="delete" onClick={() => onDelete(v.id)}>
                                                <DeleteForeverIcon />
                                            </IconButton>
                                        </ListItemIcon>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))
                        }
                    </List>
                    <FormDialog getInputData={getEditorData} open={open} handleClose={handleClose}/>
                </Fragment>
            )}
        </Paper>
    )
}