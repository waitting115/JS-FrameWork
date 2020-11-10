import React, {useEffect} from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

const CourseCom = (coursesItem) => {

    const useStyles = makeStyles({
        media: {
            height: 0,
            paddingTop: '100%'
        },
        content: {
            width: '100%', 
            height: '6rem', 
            lineHeight: '2rem',
            display: '-webkit-box', 
            WebkitLineClamp: 3, 
            webkitBoxOrient:'vertical', 
            overflow:"hidden", 
            textOverflow: 'ellipsis'
        }
    })

    const classes = new useStyles();

    return (
        <div>
            {coursesItem ? (
            <Card>
                <CardMedia
                    className={classes.media}
                    image={coursesItem.coursesItem.img}
                    title={coursesItem.coursesItem.title}
                />
                <CardContent>
                    <Typography className={classes.content} gutterBottom variant="caption" component="h4">
                        {coursesItem.coursesItem.contentText}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" target="_blank">
                        {coursesItem.coursesItem.btnText}
                    </Button>
                </CardActions>
            </Card>
        ) : null}
        </div>
    )
}

export default CourseCom;