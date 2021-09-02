import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import LeftSideBar from '../components/LeftSideBar';
import logo from '../assets/aqsLogo.png';
import Divider from '@material-ui/core/Divider';

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

// const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  custom_select: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
  }
}));



function Navbar(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    user: '',
    name: 'hai',
  });
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  return (
    <React.Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography className="logo-container" variant="h6" noWrap>
              <img src={logo} />  QuickSight
            </Typography>
            <select name="cars" className={classes.custom_select}>
              <option value="volvo">023811532463</option>
              <option value="saab">Account name</option>
              <Divider />
              <option value="saab">Manage QuickSight</option>
              <Divider />
              <option value="mercedes">Community</option>
              <option value="audi">Send feedback</option>
            </select>

          </Toolbar>
        </AppBar>
        <LeftSideBar />
      </div>
    </React.Fragment>
  );
}

export default Navbar;