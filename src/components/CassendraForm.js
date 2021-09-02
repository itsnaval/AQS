import React, { Component } from 'react';
// import styled from "@emotion/styled";
import axios from "axios";
// import Header from "../../components/Header";
import './MongoForm.scss'

class CassendraForm extends Component {
    state = {
        host: '',
        port: '',
        username: '',
        password: '',
        admin_database: '',
        database: '',
        collection: '',
        // sslEnabled: false,
        // query: "{}",
    };
    /* This is where the magic happens 
    */

    handleSubmit = event => {
        event.preventDefault();
        const user = {
            // host: this.state.host,
            // port: parseInt(this.state.port),
            // username: this.state.username,
            // password: this.state.password,
            // admin_database: this.state.admin_database,
            // database: this.state.database,
            // collection: this.state.collection,
            // sslEnabled: false,
            // query: "{}"
                host:"localhost",
                port: 9042,
                username: "cassandra",
                password: "cassandra",
                keyspace: "qs",
                datacenter: "datacenter1",
                query: "select * from emp;"   
        }
        axios.post('http://localhost:8080/connector/cassandra', user,
            {
                headers: {
                    'Content-Type': 'Application/json'
                }
            })
            .then(res => {
                console.log("res", res);
                console.log("res.data", res.data);
                if (res.data) {
                    alert("Success")
                    window.location.href = 'http://localhost:3001/MongoData'
                }else{
                    alert("Please fill the data")
                }
            })
    }
    handleChange = event => {
        if (this)
            this.setState({ [event.target.name]: event.target.value });
    }
    render() {
        return (
            <>
                <form className="m_form" onSubmit={this.handleSubmit}>
                    <label>Host
                        <input className="m_Input" type="text" name="host" onChange={this.handleChange} />
                    </label>
                    <label>Port
                        <input className="m_Input" type="text" value={this.state.port} name="port" onChange={this.handleChange} />
                    </label>
                    <label>Username
                        <input className="m_Input" type="text" name="username" onChange={this.handleChange} />
                    </label>
                    <label>Password
                        <input className="m_Input" type="text" name="password" onChange={this.handleChange} />
                    </label>
                    <label>Admin database
                        <input className="m_Input" type="text" name="admin_database" onChange={this.handleChange} />
                    </label>
                    <label>Database
                        <input className="m_Input" type="text" name="database" onChange={this.handleChange} />
                    </label>
                    <label>Collection
                        <input className="m_Input" type="text" name="collection" onChange={this.handleChange} />
                    </label>
                    {/* <label> 
            <input type = "text" name = "sslEnabled" onChange= {this.handleChange}/>
          </label>
          <label> 
            <input type = "text" name = "query" onChange= {this.handleChange}/>
          </label> */}

                    <button className="create_btn" type="submit"> Create Data Source </button>
                </form>
                {/* <div>{this.state.host}</div>
                <div>{this.state.port}</div>
                <div>{this.state.username}</div>
                <div>{this.state.password}</div>
                <div>{this.state.admin_database}</div>
                <div>{this.state.database}</div>
                <div>{this.state.collection}</div> */}
                {/* <div>{this.state.sslEnabled}</div>
        <div>{this.state.query}</div> */}
            </>
        );
    }
}
export default CassendraForm;