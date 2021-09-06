import axios from "axios";
import { requestTwitterAuth } from "../actions/twitter";

// const SERVER_URI =
// "http://ec2-13-232-71-156.ap-south-1.compute.amazonaws.com:8080/connector/twitter";
const SERVER_URI = "http://localhost:8080/connector/twitter";

export const getTwitterInit_API = async (limit, search) => {
  let data = { authType: "oauth", authorize: true };

  let requestOptions = {
    method: "POST",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return fetch(`${SERVER_URI}/${limit}/${search}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return { data: JSON.parse(result), status: 1 };
    })
    .catch((error) => {
      console.log("error", error);
      return { error, status: 0 };
    });
};

export const setCallbackURLDataAPI = async (params) => {
  return axios.get(`http://localhost:8080/connector/twitter/callback${params}`);
};
