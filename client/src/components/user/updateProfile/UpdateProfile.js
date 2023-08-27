import React, { Fragment, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../layout/loader/Loader';
import { setAlert } from "../../../alert/alertAction";
import { loadUser, updateProfile } from "../../../actions/userAction";
import { useNavigate } from 'react-router-dom';
import MetaData from '../../layout/MetaData';
import "./updateProfile.css";

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);
    const {
        error,
        isUpdated,
        loading
    } = useSelector((state) => state.profile);

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(updateProfile({ name, email }));
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
            dispatch({ type: "UPDATE_PROFILE_RESET" });
            navigate("/account");

            return showAlert("success", "Profile Updated Successfully")
        }
    }, [navigate, error, isUpdated, dispatch])

    return (
        <Fragment>
            <MetaData title="Subkart - Update Profile" />

            {loading ? (
                <Loader />
            ) : (
                <div className="login-signup-body">
                    <div className="login-signup-container">
                        <form onSubmit={submitHandler} className="form-container">
                            <h2> Edit Your Profile </h2>

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
                                fullWidth
                            />

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

export default UpdateProfile;