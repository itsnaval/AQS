import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './MongoData.scss';
import Tablee from "../components/Table";
import TableContent from "../components/TableContent";
import Modal from '@material-ui/core/Modal';
import CreateIcon from '@material-ui/icons/Create';
import { Divider } from '@material-ui/core';
import Loader from "./Loader";
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";

// const useStyles = makeStyles((theme) => ({
//     table: {
//         minWidth: 650,
//     },
//     formControl: {
//         margin: theme.spacing(1),
//         minWidth: 120,
//     },
//     selectEmpty: {
//         marginTop: theme.spacing(2),
//     },
//     custom_select: {
//         backgroundColor: 'transparent',
//         color: '#666',
//         outline: 'none',
//         border: 'none',
//         cursor: 'pointer',
//         padding: "4px 9px",
//     },
//     paper: {
//         position: 'absolute',
//         width: 400,
//         backgroundColor: theme.palette.background.paper,
//         border: '2px solid #000',
//         boxShadow: theme.shadows[5],
//         padding: theme.spacing(2, 4, 3),
//     },
// }));

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class MongoData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            info: " ",
            loading: true
        };
    }

    componentDidMount() {
        // Simple POST request with a JSON body using axios
        const params = {
            "host": "ec2-13-232-71-156.ap-south-1.compute.amazonaws.com",
            "port": 27017,
            "username": "admin",
            "password": "admin",
            "admin_database": "test",
            "database": "testdb",
            "collection": "demoinventory",
            "sslEnabled": false,
            "query": "{}"
        };
        axios.post('http://ec2-13-232-71-156.ap-south-1.compute.amazonaws.com:8080/connector/mongodb', params,
            {
                headers: {
                    'Content-Type': 'Application/json'
                }
            }
        )
            .then(response =>
                this.setState({ info: response.data, loading: false })
                // console.log(response.data.data)
            );


    }
    // componentDidMount(){
    //     setTimeout(()=>{
    //         this.setState({ loading: false })
    //     }, 5000)
    // }
    render() {

        const { info } = this.state;
        console.log("info", info);

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

        const uniqueType = getUnique(info.columnSchemas, "dataType");

        const uniqueName = getUnique(info.columnSchemas, "name");


        return (
            <>
                <TableContainer className="mongo_data" component={Paper}>
                    <div className="ScaleLoader">
                    <ScaleLoader loading={this.state.loading} css={override} size={150} />
                    </div>
                    <Table id="table" className="table" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {uniqueName && uniqueName.map((column) => (
                                    <TableCell key={column.id}>
                                        {/* <span className="top_row">{column.name} <CreateIcon onClick={handleOpen} className="update_icon" /></span> */}
                                        <span className="top_row">{column.name} <CreateIcon className="update_icon" /></span>
                                        <select className="custom_select">
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
                            {info.data && info.data.map((dta) => (
                                <TableRow key={dta.id}>
                                    <TableCell component="th" scope="row">
                                        {dta[0]}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {dta[1]}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {dta[2]}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {dta[3]}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {dta[4]}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {dta[5]}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {dta[6]}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {dta[7]}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {dta[8]}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {dta[9]}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {dta[10]}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {dta[11]}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {dta[12]}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {dta[13]}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {dta[14]}
                                    </TableCell>
                                    {/* <TableCell align="center">{dta.user}</TableCell>
                                    <TableCell align="center">
                                        <select>
                                            {dta.roles && dta.roles.map((dta) =>
                                                <option>{dta}</option>
                                            )}
                                        </select>
                                    </TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <table border="1">
                    <thead>
                        <tr>
                            {info.columnSchemas && info.columnSchemas.map((column) =>
                                <th>
                                    {column.name}
                                </th>
                            )}

                        </tr>
                    </thead>
                    <tbody>
                        {info.data && info.data.map((dta) =>
                            <tr>
                                <td>{dta.id}</td>
                                <td>{dta.pwd}</td>
                                <td>{dta.user}</td>
                                <td>
                                    <select>
                                        {dta.roles && dta.roles.map((dta) =>
                                            <option>{dta}</option>
                                        )}
                                    </select>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table> */}
            </>
        );
    }
}

export default MongoData;