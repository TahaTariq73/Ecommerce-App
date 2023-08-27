import React, { Fragment, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../layout/loader/Loader';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { setAlert } from "../../../alert/alertAction";
import { loadUser, updatePassword } from "../../../actions/userAction";
import { useNavigate } from 'react-router-dom';
import MetaData from '../../layout/MetaData';
import "./updatePassword.css";

// MUI icons

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const UpdatePassword = () => {    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        error,
        isUpdated,
        loading
    } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(updatePassword({ oldPassword, newPassword, confirmPassword }));
    }
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    useEffect(() => {
        function showAlert (alertType, alertMsg) {
            const alert = setAlert(true, alertType, alertMsg); 
            dispatch(alert);
        }

        if (error) {
            return showAlert("error", error);
        }

        if (isUpdated) {
            dispatch(loadUser());
            dispatch({ type: "UPDATE_PASSWORD_RESET" });
            navigate("/account");

            return showAlert("success", "Password Updated Successfully")
        }
    }, [navigate, error, isUpdated, dispatch])

    return (
        <Fragment>
            <MetaData title="Subkart - Update Password" />

            {loading ? (
                <Loader />
            ) : (
                <div className="login-signup-body">
                    <div className="login-signup-container">
                        <form onSubmit={submitHandler} className="form-container">
                            <h2> Change Your Password </h2>

                            <TextField 
                                label="Enter your old password"
                                value={oldPassword}
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
                                onChange={(e) => setOldPassword(e.target.value)}
                                variant="standard"
                                fullWidth
                            />

                            <TextField 
                                label="Enter your new password"
                                value={newPassword}
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
                                onChange={(e) => setNewPassword(e.target.value)}
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

export default UpdatePassword;