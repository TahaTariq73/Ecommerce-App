import React, { Fragment, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../layout/loader/Loader';
import { setAlert } from "../../../alert/alertAction";
import MetaData from '../../layout/MetaData';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../../actions/userAction";
import "./resetPassword.css";

// MUI icons

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ResetPassword = () => {
    const { token } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        error,
        loading,
        success
    } = useSelector((state) => state.forgotPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(resetPassword(token, { password, confirmPassword }));
    }

    useEffect(() => {
        function showAlert (alertType, alertMsg) {
            const alert = setAlert(true, alertType, alertMsg); 
            dispatch(alert);
        }

        if (error) {
            return showAlert("error", error);
        }

        if (success) {
            navigate("/login");
            return showAlert("success", "Password Updated Successfully");
        }
    }, [dispatch, error, success, navigate])


    return (
        <Fragment>
            <MetaData title="Subkart - Reset Password" />

            {loading ? (
                <Loader />
            ) : (
                <div className="login-signup-body">
                    <div className="login-signup-container">
                        <form onSubmit={submitHandler} className="form-container">
                            <h2> Reset Your Password </h2>

                            <TextField 
                                label="Enter your password"
                                value={password}
                                InputLabelProps={{
                                    style : {
                                        color: "#212322"
                                    }
                                }}
                                type={showPassword ? "text" : "password"}
                                InputProps={{
                                    endAdornment: 
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }}
                                onChange={(e) => setPassword(e.target.value)}
                                variant="standard"
                                fullWidth
                            />

                            <TextField 
                                label="Confirm your password"
                                value={confirmPassword}
                                InputLabelProps={{
                                    style : {
                                        color: "#212322"
                                    }
                                }}
                                
                                type={showPassword ? "text" : "password"}
                                InputProps={{
                                    endAdornment: 
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ResetPassword;