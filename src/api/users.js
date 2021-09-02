import axios from 'axios';

export const getUsers = () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
};

  // return axios.get('http://ec2-65-0-87-153.ap-south-1.compute.amazonaws.com:8080/connector/twitter/300/namo/', {
    // return axios.get('http://ec2-13-232-71-156.ap-south-1.compute.amazonaws.com:8080/connector/twitter/300/namo');
    return axios.get('http://localhost:3001/connector/twitter/300/covid', requestOptions);
};
