import React, { Fragment, useEffect } from 'react';
import ProfileBanner from "../../../images/profile-banner.png";
import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../../layout/MetaData';
import Loader from '../../layout/loader/Loader';
import { deleteProfile } from "../../../actions/userAction";
import { Link, useNavigate } from 'react-router-dom';
import "./profile.css";

// MUI icons

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        loading,
        user, 
        isAuthenticated
    } = useSelector((state) => state.user);

    const deleteMyProfile = () => {
        dispatch(deleteProfile());
    }

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate, dispatch])

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${user.name}'s Profile`} />

                    <div className="profile-body">
                        <div className="banner-container">
                            <img src={ProfileBanner} alt="" className="banner-img" />
                            <Link to="/orders">
                                <button className="banner-btn"> 
                                    <ShoppingBagOutlinedIcon /> Orders 
                                </button>
                            </Link>
                        </div>

                        <div className="profile-details">
                            <div className="profile-avatar">
                                <img src={user.avatar.url} alt="" />
                                <Link to="/me/update">
                                    <button style={{ width: "100%" }}> Update Profile </button>
                                </Link>
                            </div> 
                            <div>
                                <div className="profile-name">
                                    <h2> {user.name} </h2>
                                    <span> {user.email} </span>    
                                </div>
                                <div className="profile-btns">
                                    <Link to="/password/update">
                                        <button> Change Password </button>
                                    </Link>
                                    <button onClick={deleteMyProfile}> Delete Profile </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile;