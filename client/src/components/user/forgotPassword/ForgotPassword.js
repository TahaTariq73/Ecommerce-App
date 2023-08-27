import React, { Fragment, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../layout/loader/Loader';
import { setAlert } from "../../../alert/alertAction";
import MetaData from '../../layout/MetaData';
import { forgotPassword } from "../../../actions/userAction";
import "./forgotPassword.css";

const ForgotPassword = () => {
    const dispatch = useDispatch();

    const {
        error,
        loading,
        message
    } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("");

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(forgotPassword({ email }));
    }

    useEffect(() => {
        if (error) {
            function showAlert () {
                const alert = setAlert(true, "error", error); 
                dispatch(alert);
            }

            console.log("a");
            return showAlert();
        }

        if (message) {
            function showAlert (alertType, alertMsg) {
                const alert = setAlert(true, alertType, alertMsg); 
                dispatch(alert);
            }
            console.log("b");

            return showAlert("success", message);
        }
    }, [dispatch, error, message])

    return (
        <Fragment>
            <MetaData title="Subkart - Forgot Password" />

            {loading ? (
                <Loader />
            ) : (
                <div className="login-signup-body">
                    <div className="login-signup-container">
                        <form onSubmit={submitHandler} className="form-container">
                            <h2> Forgot Password ? </h2>

                            <TextField 
                                label="Enter your email"
                                value={email}
                                InputLabelProps={{
                                    style : {
                                        color: "#212322"
                                    }
                                }}
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                variant="standard"
                                fullWidth
                            />
                                        
                            <Button 
                                type="submit" 
                                variant="contained" 
                                fullWidth
                            > 
                                Submit 
                            </Button>
                        </form>
                    </div>    
                </div>
            )}
        </Fragment>
    )
}

export default ForgotPassword;