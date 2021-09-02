import React, { useEffect, useState, useRef } from 'react';
// import axios from "axios";
import OauthPopup from 'react-oauth-popup';
// import { useLocation } from 'react-router-dom'
import Child from './Child'

const SubmitForm = () => {



  // const [state, setState] = React.useState();
  // React.useEffect(() => {
  //   handleSubmit();
  // }, [])
  const onCode = (code, params) => {
    window.close();
    console.log("alright! the URLSearchParams interface from the popup url", params);
  }
  const onClose = () => console.log("closed!");

  // const handleSubmit = async () => {
  //   const requestOptions = {
  //     method: 'GET',
  //   };
  //   try {
  //     const res = await fetch('http://localhost:8080/connector/twitter/300/covid', requestOptions);
  //     const response = await res.json();
  //     if (response) {
  //       if (response) {
  //         window.location.href = response.location;
  //         // setState(response)
  //         // window.open(`${response.location}`, "myWindow", "width=500,height=auto");
  //       }
  //       // alert("Success")
  //       console.log('responses: ', response.location);
  //     }
  //     else {
  //       alert("Fail");
  //     }
  //   } catch (error) {
  //     return ({ error });
  //   }
  // }
  const [state, setstate] = React.useState()
  // const location = useLocation();
  console.log("state", state)

  useEffect(() => {
    // console.log("Naval")
    // console.log('Location Changed')

    (function () {
      console.log("Yes Init")
      const queryParams = new URLSearchParams(window.location.search);
      if (queryParams.has("oauth_token")) {
        callback(queryParams.get("oauth_token"), queryParams.get("oauth_verifier"), queryParams.get("maxResults"), queryParams.get("searchKey"));
      }
      // search();
    })();

  }, [])
  const authenticate = async () => {

    var req = { "authType": "oauth" };
    var data = JSON.stringify(req);

    try {
      const res = await fetch('http://localhost:3001/connector/twitter/300/covid',
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            data: data
          })
        });
      const response = await res.json();
      if (response) {
        if (response) {
          window.location.href = response.location;
        }
        console.log('responses: ', response.data);
      }
      else {
        alert("Fail");
      }
    } catch (error) {
      return ({ error });
    }

  }
  const callback = async (oauthToken, oauth_verifier) => {
    const requestOptions = {
      method: 'GET',
    };

    try {
      const res = await fetch('http://localhost:3001/connector/twitter/callback?oauth_token=' + oauthToken + '&oauth_verifier=' + oauth_verifier, requestOptions);
      if (res) {
        search(100, "covid");
        console.log('responses: ', res);
      }
      res.then((responses) => {
        console.log('callback responses: ', responses);

      })
    } catch (error) {
      return ({ error });
    }
  }

  const search = async (limit, searchKey) => {
    console.log('responses: ', limit, searchKey);
    const requestOptions = {
      method: 'GET',
    };
    try {
      const res = await fetch('http://localhost:3001/connector/twitter/' + limit + '/' + searchKey, requestOptions);
      const response = await res.json();
      if (response) {
        if (response) {
          console.log("res.data1", response)
          setstate(response)
        }
      }
      else {
        alert("Fail");
      }
    } catch (error) {
      return ({ error });
    }
  }
  console.log("state", state)

  return (
    <>
      {/* {state ?
        <OauthPopup url={state.location ? state.location : state}
          onCode={onCode}
          onClose={onClose}
        >
          <div>Twitter</div>
        </OauthPopup> : <p>TwitterD</p>
      } */}
      <a onClick={authenticate}>Twitter</a>
      {/* {<Child data={search}/>} */}

      <table>
        <tr>
          {state ? state.columnSchemas.map((column) =>
            <th>{column.name}</th>
          ) : null}
        </tr>
      </table>
      {state ? state.data.map((data) =>
        <table>
          <tr>
            <td>{data[0]}</td>
            <td>{data[1]}</td>
            <td>{data[2]}</td>
          </tr>
        </table>
      ) : null}

      {/* <a onClick={handleSubmit}> Twitter </a> */}
    </>
  );

}
export default SubmitForm;