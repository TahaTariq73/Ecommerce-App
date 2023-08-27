import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@mui/material/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { setAlert } from "../../../alert/alertAction";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        "& > * + *": {
        marginTop: theme.spacing(2)
        }
    }
}))

const CustomizedSnackbars = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const snackbarOpen = useSelector(state => state.alert.snackbarOpen);
    const snackbarType = useSelector(state => state.alert.snackbarType);
    const snackbarMessage = useSelector(state => state.alert.snackbarMessage);
   
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(setAlert(false, snackbarType, snackbarMessage));
    }

    return (
        <div className={classes.root}>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert
                elevation={6}
                variant="outlined"
                onClose={handleClose}
                style={{ zIndex: "2", backgroundColor: "white" }}
                color={snackbarType}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default CustomizedSnackbars;