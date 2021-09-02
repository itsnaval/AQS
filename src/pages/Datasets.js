import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {
  Link
} from "react-router-dom";
import Modal from '@material-ui/core/Modal';
import './Datasets.scss';
// import { NONAME } from 'dns';
import CloseIcon from '@material-ui/icons/Close';


function createData(name, owner, lModified) {
  return { name, owner, lModified };
}

const rows = [
  createData('Dataset1', 305, 3.7, 67, 4.3),
  createData('Dataset2', 452, 25.0, 51, 4.9),
  createData('Dataset3', 262, 16.0, 24, 6.0),
  createData('Dataset4', 452, 25.0, 51, 4.9),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'owner', numeric: true, disablePadding: false, label: 'Owner' },
  { id: 'lastmodified', numeric: true, disablePadding: false, label: 'Last Modified' },
];

function Datasets(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell className="th_left"
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

Datasets.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
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
  btn_dataset: {
    borderColor: '#177199',
    backgroundColor: '#177199',
    color: '#fff',
    minWidth: '100px',
    padding: '4px 20px 4px 20px',
    fontSize: '14px',
    borderRadius: '2px',
    textTransform: 'capitalize'
  },
  // paper: {
  //   position: 'absolute',
  //   width: 600,
  //   border: 'none',
  //   outline: NONAME,
  //   boxShadow: theme.shadows[5],
  //   padding: theme.spacing(2, 4, 3),
  // },

}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('lModified');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} id="Modal_parent" className={classes.paper}>
      <Box display="flex" alignItems="center" justifyContent="space-between"><h2 id="simple-modal-title">File Name</h2>
        <CloseIcon className="CloseIcon" onClick={handleClose} />
      </Box>
      <p id="simple-modal-description">
        <h3>Dataset</h3>
        <p>Import complete:</p>
        <p>100% success</p>
        <p>51 rows were imported to SPICE</p>
        <p>0 rows were skipped </p>
        <br />
        <Divider />
        <h4>Data source name: <small>fileName</small></h4>
      </p>
      <Box display="flex" justifyContent="space-between">
        <button>Delete dataset</button>
        <button>Share</button>
      </Box>
      <Box mt={2} display="flex" justifyContent="space-between">
        <span><button>Edit dataset</button><button mt={2}>Duplicate dataset</button></span>
        <span>
          <button>Create Analysis</button>
        </span>
      </Box>

    </div>
  );

  return (
    <div className={classes.root}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>

      <Grid container spacing={3} display="flex" alignItems="center" alignItems="center">
        <Grid item xs={12} sm={6}>
          <Box className={classes.col_1}>Datasets</Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box className={classes.col_2} display="flex" alignItems="center" justifyContent="flex-end">
            <Button className={classes.btn_dataset} variant="contained" size="small" color="primary">
              <Link to="/prepare" className="new_dataset_btn">New Dataset</Link>
            </Button>

          </Box>
        </Grid>
      </Grid>
      <Divider />

      {/* <Box>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <Datasets
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody className="d_tb_row">
              {stableSort(rows, getComparator(order, orderBy))
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      key={row.name}
                    >
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        <Link onClick={handleOpen}>{row.name}</Link>
                        <Link to="/App">{row.name}</Link>
                      </TableCell>
                      <TableCell align="right">{row.owner}</TableCell>
                      <TableCell align="right">{row.lModified}</TableCell>
                    </TableRow>
                  );
                })}

            </TableBody>
          </Table>
        </TableContainer>
      </Box> */}
      <Box className="datasets">
        <Box display="flex" alignItems="center">
          <p><strong>Name</strong></p>
          <p><strong>Owner</strong></p>
          <p><strong>Last modified</strong></p>
        </Box>
        <Box display="flex" alignItems="center">
          <Link className="dLink" to="/App">Twitter</Link>
          <p>Naval</p>
          <p>23/8/2021</p>
        </Box>
        <Box display="flex" alignItems="center">
          <Link className="dLink" to="/MongoData">Mongo</Link>
          <p>Naval</p>
          <p>23/8/2021</p>
        </Box>
      </Box>
      {/* <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Owner</th>
            <th>Last modified</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Link to="/App">Twitter</Link></td>
            <td>Mongo</td>
            <td>Mongo</td>
          </tr>
        </tbody>
      </table> */}

    </div>
  );
}