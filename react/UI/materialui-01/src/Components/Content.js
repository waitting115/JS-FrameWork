import React from 'react'
import {Grid} from '@material-ui/core'
import LeftPanel from './Panel/LeftPanel'
import RightPanel from './Panel/RightPanel'

const styles = {
    paper: {
        marginTop: 10,
        marginBottom: 10,
        padding:20,
        height: '100%'
    }
}

export default ({newData, getLeftClickData, rightContent, onDelete, getEditorData, getEditorId}) =>
    <Grid container>
        <Grid item sm>
            <LeftPanel 
                getLeftClickData={getLeftClickData} 
                newData={newData} 
                styles={styles}
                onDelete={onDelete}
                getEditorData={getEditorData}
                getEditorId={getEditorId}
                />
        </Grid>
        <Grid item sm>
            <RightPanel rightContent={rightContent} styles={styles}/>
        </Grid>
    </Grid>