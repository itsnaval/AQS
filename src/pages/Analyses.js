import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { Divider } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import Button from '@material-ui/core/Button';
import Analsis1 from '../assets/analysis1.png';
import Analsis2 from '../assets/analysis2.png';
import StarOutlineOutlinedIcon from '@material-ui/icons/StarOutlineOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(0, 8, 0, 0),
  },
  col_1: {
    padding: theme.spacing(1, 0, 1, 0),
    textAlign: 'left',
    color: "#666666",
    fontSize: '18px',
    boxShadow: 'none',
  },
  col_2: {
    padding: theme.spacing(2),
    color: "#666666",
    fontSize: '18px',
    boxShadow: 'none',
  },
  pic: {
    width: "75%",
    height: '112px'
  },
  right_content: {
    padding: '10px 0 0 0',
  },
  custom_select: {
    backgroundColor: '#EEE',
    borderColor: '#CCC',
    borderWidth: '1px',
    color: '#444',
    textAlign: 'left',
    padding: '2px',
    height: '32px',
    width: '50%',
    cursor: 'pointer',
    outline: 'none',
  },
  btn_analysis: {
    borderColor: '#177199',
    backgroundColor: '#177199',
    color: '#fff',
    minWidth: '100px',
    padding: '4px 20px 4px 20px',
    fontSize: '14px',
    borderRadius: '2px',
    textTransform: 'capitalize'
  },
  appIcon: {
    backgroundColor: '#BBE8F6',
    margin: '0 3px 0 14px',
    cursor: 'pointer',
  },
  FormatListBulletedIcon: {
    marginRight: '8px',
    cursor: 'pointer',
  },
  card_bottom_content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    span: {
      display: 'flex',
    }
  },
  card_bottom: {
    padding: '6px',
  },
  update_text: {
    fontSize: '10px',
    color: '#999',
  },
  StarOutlineOutlinedIcon: {
    fontSize: '20px',
    cursor: 'pointer',
  },
  MoreVertOutlinedIcon: {
    fontSize: '20px',
    cursor: 'pointer',
  }
}));

function FormRow() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid item xs={3}>
        <Paper className={classes.paper}>
          <Box display="flex" justifyContent="center"><img className={classes.pic} src={Analsis1} /></Box>
          <Divider />
          <Box className={classes.card_bottom}>
            Analysis 1
            <Box className={classes.card_bottom_content}>
              <span className={classes.update_text}>Updated few days ago</span>
              <span className={classes.update_text}><StarOutlineOutlinedIcon className={classes.StarOutlineOutlinedIcon}/> <MoreVertOutlinedIcon className={classes.StarOutlineOutlinedIcon}/></span>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.paper}>
          <Box display="flex" justifyContent="center"><img className={classes.pic} src={Analsis2} /></Box>
          <Divider />
          <Box className={classes.card_bottom}>
            Analysis 2
            <div className={classes.card_bottom_content}>
              <span className={classes.update_text}>Updated few days ago</span>
              <span className={classes.update_text}><StarOutlineOutlinedIcon className={classes.StarOutlineOutlinedIcon}/> <MoreVertOutlinedIcon className={classes.StarOutlineOutlinedIcon}/></span>
            </div>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.paper}>
          <Box display="flex" justifyContent="center"><img className={classes.pic} src={Analsis1} /></Box>
          <Divider />
          <Box className={classes.card_bottom}>
            Analysis 3
            <div className={classes.card_bottom_content}>
              <span className={classes.update_text}>Updated few days ago</span>
              <span className={classes.update_text}><StarOutlineOutlinedIcon className={classes.StarOutlineOutlinedIcon}/> <MoreVertOutlinedIcon className={classes.StarOutlineOutlinedIcon}/></span>
            </div>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.paper}>
          <Box display="flex" justifyContent="center"><img className={classes.pic} src={Analsis2} /></Box>
          <Divider />
          <Box className={classes.card_bottom}>
            Analysis 4
            <div className={classes.card_bottom_content}>
              <span className={classes.update_text}>Updated few days ago</span>
              <span className={classes.update_text}><StarOutlineOutlinedIcon className={classes.StarOutlineOutlinedIcon}/> <MoreVertOutlinedIcon className={classes.StarOutlineOutlinedIcon}/></span>
            </div>
          </Box>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}
function Analyses() {
  const classes = useStyles();

  return (
    <div className='home'>
      <Grid container spacing={3} display="flex" alignItems="center" alignItems="center">
        <Grid item xs={12} sm={6}>
          <Box className={classes.col_1}>Analyses</Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box className={classes.col_2} display="flex" alignItems="center" justifyContent="flex-end">
            <select name="cars" className={classes.custom_select}>
              <option value="volvo">Last updated (newest first)</option>
              <option value="saab">Last updated (older first)</option>
              <option value="mercedes">Analysis name (A-Z)</option>
              <option value="audi">Analysis name (Z-A)</option>
            </select>
            <AppsIcon className={classes.appIcon} />
            <FormatListBulletedIcon className={classes.FormatListBulletedIcon} />
            <Button className={classes.btn_analysis} variant="contained" size="small" color="primary">
              New Analysis
            </Button>

          </Box>
        </Grid>
      </Grid>
      <Divider />

      <div className={classes.root}>
        <Grid className={classes.right_content} container spacing={3}>
          <Grid container item xs={12} spacing={3}>
            <FormRow />
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <FormRow />
          </Grid>
        </Grid>
      </div>

    </div>
  );
}

export default Analyses;
