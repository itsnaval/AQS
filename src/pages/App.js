import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUsersRequest } from '../actions/users';
import { Header } from './Header';
import UsersList from './UserList';
import './App.scss';

const App = props => {
  const { getUsersRequest, users } = props;

  useEffect(() => {
    getUsersRequest();
  }, [getUsersRequest]);

  return (
    <>
      <Header />
      <UsersList users={users.items} />
    </>
  );
};

const mapDispatchToProps = state => {
  return{
    users:state.users
  }
}
export default connect(
  mapDispatchToProps,
  {
    getUsersRequest
  }
)(App);
