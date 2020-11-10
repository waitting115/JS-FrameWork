import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Courses from '../store';
import CourseCom from './CourseCom';
import makeStyles from '@material-ui/core/styles/makeStyles';


const CourseList = () => {

    const [courses, setCourses] = React.useState(Courses);

    const useStyles = makeStyles({
        textFiled: {
            padding: 24
        },
        gridCon: {
            padding: 24
        }
    })

    const searchInputOnChange = (event) => {
        event.target.value === '' ? (
            setCourses(Courses)
        ) : (
            setCourses(
                Courses.filter((v, i) => (
                    v.title === event.target.value
                ))
            )
        )
    }

    const classes = useStyles();

    return (
        <div>
            <TextField 
                className={classes.textFiled}
                placeholder="Search for Course"
                id="searchInput"
                margin="normal"
                onChange={searchInputOnChange} />
            {courses.length !== 0 ? (
                <Grid container spacing={10} className={classes.gridCon}>
                    {
                        courses.map((item, i) => (
                            <Grid key={i} item xs={12} sm={6} lg={4} xl={3}>
                                <CourseCom coursesItem={item}></CourseCom>
                            </Grid>
                        ))
                    }
                </Grid>
            ) : (
                <Grid>
                    'No found courses!'
                </Grid>
            )}
        </div>
    )
}

export default CourseList;
