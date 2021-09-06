import React, { useState } from "react";
import "./Prepare.scss";
import upload from ".././assets/dataset_upload_icon.svg";
import twitter from ".././assets/dataset_twitter_icon.svg";
import mongoDB from ".././assets/MongoDB_Logo.png";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { DropzoneArea } from "material-ui-dropzone";
import MongoForm from "../components/MongoForm";
// import TwitterSource from '../components/TwitterSource'
import CassendraPopup from "../components/CassendraPopup";
import TwitterAuth from "../components/TwitterAuth";

function Prepare(props) {
  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: "500px",
    },
  }));

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <>
      <button type="button" onClick={handleOpen}>
        react-transition-group
      </button>
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
            <MongoForm />
          </div>
        </Fade>
      </Modal>

      {/* <div style={modalStyle} id="Modal_P" className={classes.paper}>
        <h2 id="simple-modal-title">New MongoDB data source</h2>
        <p id="simple-modal-description">
        <form className="twitter_form">
          <label>Data source name
            <input className="input_field" type="text" placeholder="Enter a name for the data source" />
          </label>
          <label>Query
            <input className="input_field" type="text" placeholder="Enter a query string to search for" />
          </label>
          <label>Maximum rows
            <input className="input_field" type="text" placeholder="Enter maximum rows to fetch, 1-700000" />
          </label>
          <button className="create_btn">Create data source</button>
        </form>
      </p>
        <MongoForm />
      </div> */}
    </>
  );

  const [files, setFile] = useState([]);

  function handleChange(files) {
    setFile({
      files: files,
    });
  }

  return (
    <>
      <Modal
        className="Modal_Pop"
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>

      <div className="prepare">
        <h2>Create a Dataset</h2>
        <h3>FROM NEW DATA SOURCES</h3>

        <div class="container">
          <main class="grid">
            <article>
              <img
                className="uplaod"
                src={upload}
                alt="Sample photo"
                onChange={handleChange.bind(this)}
              />
              <DropzoneArea
                acceptedFiles={["image/*", "video/*", "application/*"]}
                onChange={handleChange.bind(this)}
                showFileNames
                dropzoneText={
                  <div className="text">
                    <h2>Upload a file</h2>
                    <p>(.csv, .tsv, .clf, .elf, .xlsx, .json)</p>
                  </div>
                }
                showAlerts={false}
                filesLimit={20}
              />
            </article>
            {/* <article>
              <img className="uplaod" src={upload} alt="Sample photo" />
              <div className="text">
                <h2>Upload a file</h2>
                <p>(.csv, .tsv, .clf, .elf, .xlsx, .json)</p>
              </div>
            </article> */}
            <article>
              <img classname="twitter" src={twitter} alt="Sample photo" />
              <div className="text">
                {/* <h2>Twitter</h2> */}
                {/* <h2><TwitterSource /></h2> */}
                <h2>
                  <TwitterAuth
                    setTableColumn={props.setTableColumn}
                    setTableData={props.setTableData}
                  />
                </h2>
              </div>
            </article>
            <article onClick={handleOpen}>
              <img classname="twitter" src={mongoDB} alt="Sample photo" />
              <div className="text">
                <h2>MongoDB</h2>
              </div>
            </article>

            {/*<article>
              <img classname="twitter" src={twitter} alt="Sample photo" />
              <div className="text">
                <h2>Twitter</h2>
              </div>
            </article> */}
          </main>
        </div>
      </div>
    </>
  );
}

export default Prepare;
