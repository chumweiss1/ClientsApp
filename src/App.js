import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import Users from './components/Users';
import Login from "./components/Login";
import SideMenu from "./Pages/SideMenu"; 
import Header from "./Pages/Header";
import PageHeader from "./Pages/PageHeader";
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})

const useStyles = makeStyles({
  appMain: {
    paddingLeft: '320px',
    width: '100%'
  }
})

function App() {
  const classes = useStyles();

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <SideMenu />
        <div className={classes.appMain}>
          <Header />
          <PageHeader
          title="Clients App"
          subTitle="My Awesome APP"
          icon={<PeopleOutlineTwoToneIcon fontSize="large" />} />
        <Switch>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
