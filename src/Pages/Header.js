import React from 'react'
import { AppBar, Toolbar, Grid, makeStyles } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fff',
        
    },
}))

export default function Header() {

    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Grid container
                    alignItems="center">
                    <Grid item>
                    </Grid>
                    <Grid item sm></Grid>
                    
                </Grid>
            </Toolbar>
        </AppBar>
    )
}