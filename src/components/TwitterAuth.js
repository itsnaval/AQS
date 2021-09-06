// import { Button, Dialog, DialogContentText, DialogTitle, DialogContent, useMediaQuery, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTwitterData, setTwitterData } from "../actions/twitter";
import { getTwitterInit_API, setCallbackURLDataAPI } from "../api/auth";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "./TwitterAuth.scss";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #CCC",
    borderRadius: "2px",
    boxShadow: "0 5px 15px rgb(0 0 0 / 50%)",
    padding: theme.spacing(2, 4, 3),
    width: "600px",
    height: "380px",
  },
}));

const TwitterAuth = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  let popWindow = null;

  useEffect(() => {
    window.addEventListener(
      "message",
      function (event) {
        if (
          event.origin === window.location.origin &&
          event.data.status === "user_logged_in"
        ) {
          setCallbackURLDataAPI(event.data.query).then(() => {
            console.log(event.data.query, "jsdfjbh");
            let checkparams = new URLSearchParams(event.data.query);
            const searchKey = checkparams.get("searchKey").toString();
            const maxResults = checkparams.get("maxResults").toString();
            getDataFromServer(maxResults, searchKey);
          });
        }
      },
      true
    );
  }, []);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLoadData = () => {
    if (window.opener != null && !window.opener.closed) {
      window.opener.focus();
      window.opener.location.reload();
      window.close();
    }
  };

  const navigateToHome = () => {
    history.push("/App");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    getDataFromServer(data.maxrows, data.query);
  };
  const intialValues = {
    sourcename: "",
    query: "",
    maxrows: "",
  };

  const getDataFromServer = async (maxrows, query) => {
    const response = await getTwitterInit_API(maxrows, query);

    if (response.status) {
      if (response.data.location) {
        popWindow = window.open(
          response.data.location,
          "popwindow",
          "width=600,height=600"
        );
        popWindow.focus();
      }
      if (response.data.data && response.data.columnSchemas) {
        props.setTableColumn(response.data.columnSchemas);
        props.setTableData(response.data.data);
        navigateToHome();
      }
    }
  };

  return (
    <>
      {/* <a onClick={handleClickOpen}>Twitter</a> */}

      <a onClick={handleOpen}>Twitter</a>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2>New Twitter data source</h2>
            <form className="m_form" onSubmit={handleSubmit(onSubmit)}>
              {/* <form onSubmit={handleSubmit(onSubmit)}> */}
              {/* <input {...register('lastName', { required: true })} />
                                {errors.lastName && <p>Last name is required.</p>}
                                <input type="submit" /> */}
              {/* </form> */}

              <label htmlFor="sourcename">
                Data source name
                <input
                  className="m_Input"
                  defaultValue={intialValues.sourcename}
                  placeholder="Enter a name for data source name"
                  {...register("sourcename", {
                    validate: (value) => value.length != value,
                  })}
                  name="sourcename"
                />
                {errors.sourcename && (
                  <p className="error">Data source name is required</p>
                )}
              </label>

              <label>
                Query
                <input
                  className="m_Input"
                  defaultValue={intialValues.query}
                  {...register("query", {
                    validate: (value) => value.length != value,
                  })}
                  name="query"
                  placeholder="Enter a query string to search for"
                />
                {errors.query && <p className="error">Query is required</p>}
              </label>
              <label>
                Maximum rows
                <input
                  className="m_Input"
                  defaultValue={intialValues.maxrows}
                  {...register("maxrows", {
                    validate: (value) => value.length != value,
                  })}
                  name="maxrows"
                  placeholder="Enter a maximum rows to fetch, 1-700000"
                />
                {errors.maxrows && (
                  <p className="error">Maximum rows is required</p>
                )}
              </label>
              <input
                className="create_btn_T"
                type="submit"
                value="Create Data Source"
              />
              {/* <a className="create_btn_T" onClick={handleclickTwitterRequest}> Create Data Source </a> */}
              <a
                id="loadmoreButton"
                hidden={true}
                onClick={handleLoadData}
                style={{ display: "contents", color: "#ffffff" }}
              >
                Twitter
              </a>
            </form>
            {/* <button className="create_btn" type="submit" onClick={handleclickTwitterRequest}> Create Data Source </button> */}

            {/* <button onClick={handleclickTwitterRequest}>
                                Twitter
                            </button> */}
          </div>
        </Fade>
      </Modal>

      {/* <Dialog
                fullWidth="sm"
                fullScreen={fullScreen}
                open={openTwitterDialog}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">Sign In With Twitter</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Table List
                    </DialogContentText>
                    <div className="button-container">
                        <Button variant="contained" size="small" color="primary" onClick={handleclickTwitterRequest}>
                            Twitter
                        </Button>
                    </div>
                </DialogContent>
            </Dialog> */}
    </>
  );
};

export default TwitterAuth;
