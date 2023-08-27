import React, { Fragment, useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';
import { setAlert } from "../../../alert/alertAction";
import { login, register } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../../layout/loader/Loader';
import MetaData from '../../layout/MetaData';
import "./loginSignUp.css";

// MUI icons

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const TabPanel = ({ children, tabIndex, originalIndex }) => (
    <div hidden={tabIndex !== originalIndex}>
        {tabIndex === originalIndex && (
            <div className="tabpanel-content">
                {children}
            </div>
        )}
    </div>
) 

const LoginSignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [tabIndex, setTabIndex] = useState(0);
    const [name, setName] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [avatar, setAvatar] = useState();

    const {
        error,
        loading,
        isAuthenticated
    } = useSelector((state) => state.user);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const tabHandleChange = (event, newIndex) => {
        setTabIndex(newIndex);
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const avatarChangeHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setAvatar(file);
        }
    }

    const loginSubmitHandler = (event) => {
        event.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    }

    const registerSubmitHandler = (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.set("name", name);
        formData.set("email", registerEmail);
        formData.set("password", registerPassword);
        formData.set("file", avatar);

        dispatch(register(formData));
    }

    useEffect(() => {
        if (
            error && 
            error !== "Please login to access this resource" && 
            error !== "Cannot read properties of null (reading '_id')"
        ) {
            function showAlert () {
                const alert = setAlert(true, "error", error); 
                dispatch(alert);
            }

            return showAlert();
        }

        if (isAuthenticated) {
            navigate("/account");
        }
    }, [dispatch, error, navigate, isAuthenticated])

    return (
        <Fragment>
            <MetaData title={"Subkart - Login/Register"} />

            {loading ? (
                <Loader />
            ) : (
                <div className="login-signup-body">
                    <div className="login-signup-container">
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs 
                                value={tabIndex}
                                TabIndicatorProps={{
                                    style: {
                                        backgroundColor: "#212322"
                                    }
                                }} 
                                onChange={tabHandleChange}
                            >
                                <Tab label="LOGIN" />
                                <Tab label="REGISTER" />
                            </Tabs>
                        </Box>

                        <TabPanel tabIndex={tabIndex} originalIndex={0}>
                            <form onSubmit={loginSubmitHandler}>
                                <TextField 
                                    label="Enter your email"
                                    value={loginEmail}
                                    InputLabelProps={{
                                        style : {
                                            color: "#212322"
                                        }
                                    }}
                                    type="email"
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    variant="standard"
                                    required
                                    fullWidth
                                />

                                <TextField 
                                    label="Enter your password"
                                    value={loginPassword}
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
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    variant="standard"
                                    required
                                    fullWidth 
                                />

                                <Link className="form-link" to="/password/forgot"> Forget Password ? </Link>

                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    fullWidth
                                > 
                                    Submit 
                                </Button>
                            </form>
                        </TabPanel>

                        <TabPanel tabIndex={tabIndex} originalIndex={1}>
                            <form onSubmit={registerSubmitHandler} encType="multipart/form-data">
                                <TextField 
                                    label="Enter your name"
                                    value={name}
                                    InputLabelProps={{
                                        style : {
                                            color: "#212322"
                                        }
                                    }}
                                    type="text"
                                    onChange={(e) => setName(e.target.value)} 
                                    variant="standard"
                                    required
                                    fullWidth
                                />
                                
                                <TextField 
                                    label="Enter your email"
                                    value={registerEmail}
                                    InputLabelProps={{
                                        style : {
                                            color: "#212322"
                                        }
                                    }}
                                    type="email"
                                    onChange={(e) => setRegisterEmail(e.target.value)} 
                                    variant="standard"
                                    required
                                    fullWidth 
                                />

                                <TextField 
                                    label="Enter your password"
                                    value={registerPassword}
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
                                    onChange={(e) => setRegisterPassword(e.target.value)}
                                    variant="standard"
                                    required
                                    fullWidth 
                                />

                                <div className="file-uploading-container">
                                    <input
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        id="raised-button-file"
                                        onChange={avatarChangeHandler}
                                        type="file"
                                        required
                                    />

                                    <label htmlFor="raised-button-file">
                                        <Button variant="outlined" color="warning" component="span">
                                            Upload
                                        </Button>
                                    </label>

                                    <span className="file-name"> 
                                        {avatar && avatar.name.slice(0, 30)} 
                                    </span>
                                </div>

                                <Button 
                                    type="submit" 
                                    variant="contained"
                                    fullWidth
                                > 
                                    Submit 
                                </Button>
                            </form>
                        </TabPanel>
                    </div>            
                </div>
            )}
        </Fragment>
    )
}

export default LoginSignUp;