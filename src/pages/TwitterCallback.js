import React from "react";

function TwitterCallback() {
  if (window.location.search) {
    let searchParams = window.location.search;
    let checkparams = new URLSearchParams(window.location.search);
    let oauth_token = null;
    let oauth_verifier = null;
    oauth_token = checkparams.get("oauth_token").toString();
    oauth_verifier = checkparams.get("oauth_verifier").toString();
    if (oauth_token && oauth_verifier) {
      window.opener.postMessage(
        {
          status: "user_logged_in",
          query: searchParams,
        },
        window.location.origin
      );
      window.close();
    }
  }

  return (
    <>
      <h1>Please wait.</h1>
    </>
  );
}

export default TwitterCallback;
