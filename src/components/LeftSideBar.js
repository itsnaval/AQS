import React from "react";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link
} from "react-router-dom";
import { SidebarData } from './SidebarData';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
}));
const drawerWidth = 240;


function Home() {
    
    const classes = useStyles();
    return (
        <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
            <div className="search-container">
            <input type="search" placeholder="Find Analyses & more" className="left-panel-searchbar"/>
      <SearchIcon className="search-icon" />
            </div>
        
          <List>
            {SidebarData.map((item, index) => (
              <ListItem button key={item}>
                <Link className="left-menu-item" to={item.path}>
                    {/* <span >{item.icon}</span> */}
                    <img className="menu-icons" src={item.icon} />
                    <span>{item.title}</span>
                  </Link>
              </ListItem>
            ))}
            </List>
        </div>
      </Drawer>
    );
  }

  export default Home;