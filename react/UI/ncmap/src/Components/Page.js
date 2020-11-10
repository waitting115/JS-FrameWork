import React, {Fragment, useEffect} from 'react';
import {Collapse, Grid,List, ListItem, ListItemText, ListSubheader,Paper, makeStyles} from '@material-ui/core';
import {useTheme} from '@material-ui/core/styles';
import ChinaMap from './map/ChinaMap';
import Bar from './bar/Bar';
import Fnc from './fnc/fnc'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {ChinaProvinces, ChinaProvincesMsg, ChinaProvincesEng} from './store'

export default function Page() {
    const theme = useTheme();

    const [pro, setPro] = React.useState(false);
    const [ar, setAr] = React.useState(false);
    const [city, setCity] = React.useState(false);
    const [spe, setSpe] = React.useState(false);

    let arr = [pro, ar, city, spe];

    const handleClick = (i) => {
        console.log(ChinaProvincesEng[i])
        switch(ChinaProvincesEng[i]) {
            case 'pro': 
                setPro(!pro);
                break;
            case 'ar':
                setAr(!ar);
                break;
            case 'city':
                setCity(!city);
                break;
            case 'spe':
                setSpe(!spe);
                break;
        }
    }

    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          maxWidth: 360,
          backgroundColor: theme.palette.background.paper,
        },
        nested: {
          paddingLeft: theme.spacing(4),
        },
      }));

      const classes = useStyles();

    return (
        <div style={{backgroundColor: theme.palette.background, flexGrow: 1, color: theme.palette.text.primary}}>
            <Grid container>
                <Grid item xs={2}>
                    <Paper elevation={3}>
                        <List
                            subheader={
                                <ListSubheader style={{color: '#fff'}}>
                                    中国
                                </ListSubheader>
                            }
                            className={classes.root}
                        >
                            {ChinaProvinces.map((v, i) => (
                                <Fragment>
                                    <ListItem button key={i} onClick={() => handleClick(i)}>
                                        <ListItemText primary={v}/>
                                        {arr[i] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={arr[i]}>
                                    <List>
                                        {ChinaProvincesMsg[i].map((v1, i1) => (
                                            <ListItem className={classes.nested} button key={i1}>
                                                <ListItemText primary={v1} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                                </Fragment>
                            ))}
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={6.5}>
                    <Paper  elevation={3}>
                        <ChinaMap></ChinaMap>
                    </Paper>
                </Grid>
                <Grid item xs={4.5}>
                    <Paper xs={6} elevation={3}>
                        <Bar></Bar>
                    </Paper>
                    <Paper xs={6}>
                        <Fnc />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}