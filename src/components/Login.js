import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "space-between",
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

const Login = () => {

const classes = useStyles();

const initialFormState = { userName: '', password: '' }
const [user, setUser] = useState(initialFormState)

const history = useHistory();
    if(localStorage.getItem("userName")){
        history.push("/users");
    }

    const login = (e) => {
        e.preventDefault()
        localStorage.setItem("userName", user.userName)
        history.push("/users");
        console.log(user.userName)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
      }

    return (
            <Grid container>
                <Grid item xs={6} className={classes.root} >
                    <form className={classes.root} onSubmit={login} noValidate autoComplete="on">
                        <TextField id="outlined-basic" variant="outlined" label="User Name"
                            type="text" name="userName" value={user.userName} onChange={handleInputChange} />
                        <TextField id="outlined-basic" variant="outlined" label="password" 
                            type="text" name="password" value={user.password} onChange={handleInputChange}/>
                        <Button type="submit" variant="contained" color="primary" size="medium">Log In</Button>
                    </form>
                </Grid> 
            </Grid>
    );
}

export default Login;
