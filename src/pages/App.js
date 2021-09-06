import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { getUsersRequest } from "../actions/users";
import { Header } from "./Header";
import UsersList from "./UserList";
import "./App.scss";

const App = (props) => {
  const { getUsersRequest, users } = props;

  useEffect(() => {
    getUsersRequest();
  }, [getUsersRequest]);

  //get the current data state
  return (
    <>
      <Header />
      <table>
        {JSON.stringify(props.tableColumns)}
        {JSON.stringify(props.tableData)}
      </table>
      <UsersList users={users.items} />
    </>
  );
};

const mapDispatchToProps = (state) => {
  return {
    users: state.users,
  };
};
export default connect(mapDispatchToProps, {
  getUsersRequest,
})(App);
