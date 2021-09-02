import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './UserList.scss';
import Tablee from "../components/Table";
import TableContent from "../components/TableContent";
import Modal from '@material-ui/core/Modal';
import CreateIcon from '@material-ui/icons/Create';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  custom_select: {
    backgroundColor: 'transparent',
    color: '#666',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: "4px 9px",
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

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

const UsersList = ({ users }, props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Edit field</h2>
      <p id="simple-modal-description">
        <form>
          <label>
            Name
            <input type="text" placeholder="Enter field name" />
          </label>
          <button className="apply_btn_modal">Apply</button>
        </form>
      </p>
      {/* <SimpleModal /> */}
    </div>
  );


  const [usrs, setUsrs] = React.useState({ usrs: [], eusr: 5 });

  useEffect(() => {
    setUsrs({ usrs: users })
  }, [users]);

  function getUnique(arr, comp) {
    if (arr) {
      const unique = arr
        .map(e => e[comp])

        .map((e, i, final) => final.indexOf(e) === i && i)

        .filter(e => arr[e])

        .map(e => arr[e]);

      return unique;
    }
  }

  const uniqueType = getUnique(usrs.usrs.columnSchemas, "dataType");

  return (
    <>
      <h1>{console.log("props",props)}</h1>
      {/* <table>
        <tr>
          {props ? props.columnSchemas.map((column) =>
            <th>{column.name}</th>
          ) : null}
        </tr>
      </table>
      {props ? props.data.map((data) =>
        <table>
          <tr>
            <td>{data[0]}</td>
            <td>{data[1]}</td>
            <td>{data[2]}</td>
          </tr>
        </table>
      ) : null} */}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>

        <TableContainer component={Paper}>
          <Table id="table" className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {users.columnSchemas && users.columnSchemas.map((user) => (
                  <TableCell key={user.columnId}>
                    <span className="top_row">{user.name} <CreateIcon onClick={handleOpen} className="update_icon" /></span>
                    <select className={classes.custom_select}>
                      {uniqueType && uniqueType.map((usr) => {
                        return (
                          <option value="usr.dataType" key={usr.name}>{usr.dataType}</option>
                        )
                      })}

                    </select>


                  </TableCell>

                ))}
              </TableRow>
            </TableHead>
            <Divider />
            <TableBody>
              {users.data && users.data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    {user[0]}
                  </TableCell>
                  <TableCell align="center">{user[1]}</TableCell>
                  <TableCell align="center">{user[2]}</TableCell>
                  <TableCell align="center">{user[3]}</TableCell>
                  <TableCell align="center">{user[4]}</TableCell>
                  <TableCell align="center">{user[5]}</TableCell>
                  <TableCell align="center">{user[6]}</TableCell>
                  <TableCell align="center">{user[7]}</TableCell>
                  <TableCell align="center">{user[8]}</TableCell>
                  <TableCell align="center">{user[9]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default UsersList;
