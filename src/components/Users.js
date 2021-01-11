import React, { useState } from "react";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: theme.spacing(1),

      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      
    },
  }));

const Users = () => {

    const history = useHistory();
    if(!localStorage.getItem("userName") ) {
        history.push("/login");
    }

    const classes = useStyles();

    const usersData  = [
        {
            "id": "1",
            "name": "Sara Cohen",
            "userName": "SC",
            "scheduledDate": "05-01-2021",
            "password" : "aaa"
        },
        {
            "id": "2",
            "name": "Yael Levi",
            "userName": "YL",
            "scheduledDate": "03-01-2021",
            "password" : "yyy"
        },
        {
            "id": "3",
            "name": "Lea Moshe",
            "userName": "LM",
            "scheduledDate": "04-01-2021",
            "password" : "mmm"

        },
    ]

    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState(usersData);
    const [filtered, setFiltered] = useState(users);
    const initialFormState = { id: null, name: '', userName: '', scheduledDate: '' }
    const [user, setUser] = useState(initialFormState)

    const handleSearch = (event) => {
        const { value } = event.target
        setSearch(value)
        const newData = users.filter(o => o.name.includes(value));
        setFiltered(newData)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
      }

      const handleEditClick = (data) => {
        setUser(data)
        setOpen(true)
      }

      

      const handleDeleteClick = (index) => {
        users.splice(index, 1)
        setUser(initialFormState)
        setFiltered([...users])
        console.log(users)
      }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleLogOut = () => {
        localStorage.removeItem("userName")
        history.push("/login");
    }

    const addUser = (user) => {
        if(user.id === null) {
            user.id = users.length + 1
            user.userName = localStorage.getItem("userName")
            setFiltered([...users, user])
            setUsers([...users, user])
        } else {
            const userIndex = users.findIndex(o => o.id === user.id)
            users[userIndex] = user;
            setFiltered([...users])
        }
        setSearch('')
        setOpen(false);
      }

      const submit = (event) => {
        event.preventDefault()
        console.log(JSON.stringify(user))
        if (!user.name || !user.scheduledDate) {
            console.log(JSON.stringify(user))
            return 
        } 
        addUser(user)
        setUser(initialFormState)
    }
 
    return (
        <Paper>
            <ButtonGroup size="large" color="primary" aria-label="large primary outlined button group"> 
                <Button onClick={handleClickOpen} variant="outlined" color="primary">Add New</Button>
                <TextField id="outlined-basic" value={search} onChange={handleSearch} 
                variant="outlined" label="Search" type="text" name="search"  />
                <Button onClick={handleLogOut} variant="outlined" color="primary">LogOut</Button>   
            </ButtonGroup>
            <form className={classes.root}>
                <Grid container>
                    <Grid item xs={6}>                   
                        <Dialog  open={open} maxWidth="md">
                            <DialogTitle>{user.id ? user.id : "New User"}</DialogTitle>
                            <form onSubmit={submit} className={classes.root} noValidate autoComplete="off">
                                <TextField id="outlined-basic" value={user.name} onChange={handleInputChange} 
                                    variant="outlined" label="Name" type="text" name="name"  />
                                <TextField
                                    id="datetime-local" label="Next appointment"
                                    onChange={handleInputChange}
                                    name="scheduledDate"
                                    type="datetime-local" defaultValue={user.scheduledDate}
                                    className={classes.textField} variant="outlined"
                                    InputLabelProps={{ shrink: true, }} />
                                    <DialogActions justify-content="space-around">
                                        <Button type="submit" autoFocus variant="contained" color="primary" size="large">
                                            Save changes
                                        </Button>
                                    </DialogActions>
                            </form>
                        </Dialog>
                    </Grid>
                </Grid>
            </form>
            <Grid container>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Scheduled Date</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filtered.map((record, index) => {
                                    return(
                                        <TableRow key={index}>
                                            <TableCell>{record.name}</TableCell>
                                            <TableCell>{record.scheduledDate}</TableCell>
                                            <TableCell>{(localStorage.getItem("userName") === record.userName ?
                                                <DialogActions>
                                                    <Button onClick={() => handleEditClick(record)} 
                                                    variant="outlined" color="primary">Edit</Button>
                                                    <Button onClick={() => handleDeleteClick(index)}
                                                    variant="outlined" color="primary">Delete</Button> 
                                                 </DialogActions> 
                                            : <div></div> )}
                                            </TableCell>
                                        </TableRow>) }) }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
      </Paper>
    );
}

export default Users;
