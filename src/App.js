import React from "react";
import Analyses from './pages/Analyses';
import Dashboards from './pages/Dashboards';
import Datasets from './pages/Datasets';
import Navbar from "./components/Navbar";
import Recent from './pages/Recent';
import Favorites from './pages/Favorites';
import App from './pages/App';
import Prepare from './pages/Prepare'
import MongoData from './pages/MongoData'
import MongoForm from '././components/MongoForm'
import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// import { BrowserRouter } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TableList from "./pages/TableList";
const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(0, 1, 0, 34),
  },
}));

export default function BasicExample() {
  const classes = useStyles();

  return (
    <>
      <main className={classes.content}>
        <Toolbar />
        <Router>
          <Navbar />
          <Switch>
            <Route path='/Favorites' component={Favorites} />
            <Route path='/Recent' component={Recent} />
            <Route path='/' exact component={Analyses} />
            <Route path='/Dashboards' component={Dashboards} />
            <Route path='/Datasets' component={Datasets} />
            <Route path='/App' component={App} />
            <Route path='/Prepare' component={Prepare} />
            <Route path='/list' component={TableList} />
            <Route path='/MongoData' component={MongoData} />
            <Route path='/MongoForm' component={MongoForm} />
          </Switch>
        </Router>
      </main>
    </>
  );
}
