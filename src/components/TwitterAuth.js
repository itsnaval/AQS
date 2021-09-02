// import { Button, Dialog, DialogContentText, DialogTitle, DialogContent, useMediaQuery, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTwitterData } from '../actions/twitter';
import { setCallbackURLDataAPI } from '../api/auth';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './TwitterAuth.scss';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #CCC',
        borderRadius: '2px',
        boxShadow: '0 5px 15px rgb(0 0 0 / 50%)',
        padding: theme.spacing(2, 4, 3),
        width: '600px',
        height: '380px'
    },
}));

const TwitterAuth = () => {
    const dispatch = useDispatch()
    // const theme = useTheme();
    // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    // const [openTwitterDialog, setOpenTwitterDialog] = useState(false)
    const tableColumns = useSelector((state) => state.auth.tableColumns)
    const tableData = useSelector((state) => state.auth.tableData)
    const [isSetURL, setIsSetURL] = useState(true)
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    // const handleClickOpen = () => {

    //     setOpenTwitterDialog(true);
    // };

    // const handleClose = () => {
    //     setOpenTwitterDialog(false);
    // };

    const handleLoadData = () => {
        dispatch(getTwitterData())
        if (window.opener != null && !window.opener.closed) {
            window.opener.focus()
            window.opener.location.href = "/App"
            window.opener.location.reload()
            window.opener.location.reload()
            window.close()
        }
        // if (tableColumns.length > 0) {
        //     window.location.href = "/list"
        // }
    }

    useEffect(() => {
        handleLoadData(true)
        dispatch(getTwitterData())
    }, [])

    if (window.location.search) {
        let searchParams = window.location.search
        let checkparams = new URLSearchParams(window.location.search)
        let oauth_token = null
        let oauth_verifier = null
        oauth_token = checkparams.get("oauth_token").toString()
        oauth_verifier = checkparams.get("oauth_verifier").toString()
        if (oauth_token && oauth_verifier) {
            setCallbackURLDataAPI(searchParams)
        }
        oauth_token = null
        oauth_verifier = null
        if (isSetURL) {
            var loadButton = window.opener.document.getElementById("loadmoreButton");
            loadButton.click()
            setIsSetURL(false)
        }
    }

    // const handleclickTwitterRequest = () => {
    //     // handleClose()
    //     dispatch(getTwitterData(true))
    // }

    console.info('---------------------------------')
    console.info('tableData =>', tableData)
    console.info('---------------------------------')
    if (tableData.length > 0) {
        window.location.href = "/App"
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        // alert(JSON.stringify(data));
        console.log("data",data)
        dispatch(getTwitterData(true))
    };
    const intialValues = {
        sourcename: '',
        query: '',
        maxrows: ''
    };

    return (
        <>
            {/* <a onClick={handleClickOpen}>Twitter</a> */}

            <a onClick={handleOpen}>
                Twitter
            </a>
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

                            <label htmlFor="sourcename">Data source name
                                <input className="m_Input"
                                    defaultValue={intialValues.sourcename}
                                    placeholder="Enter a name for data source name"
                                    {...register('sourcename', {
                                        validate: (value) => value.length != value,
                                    })} name="sourcename"
                                />
                                {errors.sourcename && <p className="error">Data source name is required</p>}
                            </label>

                            <label>Query
                                <input className="m_Input" defaultValue={intialValues.query} {...register('query', {
                                    validate: (value) => value.length != value,
                                })} name="query" placeholder="Enter a query string to search for" />
                                {errors.query && <p className="error">Query is required</p>}
                            </label>
                            <label>Maximum rows
                                <input className="m_Input" defaultValue={intialValues.maxrows} {...register('maxrows', {
                                    validate: (value) => value.length != value,
                                })} name="maxrows" placeholder="Enter a maximum rows to fetch, 1-700000" />
                                {errors.maxrows && <p className="error">Maximum rows is required</p>}
                            </label>
                            <input className="create_btn_T" type="submit" value="Create Data Source" />
                            {/* <a className="create_btn_T" onClick={handleclickTwitterRequest}> Create Data Source </a> */}
                            <a id="loadmoreButton" hidden={true} onClick={handleLoadData} style={{ display: "contents", color: "#ffffff" }}>Twitter</a>
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
    )
}

export default TwitterAuth