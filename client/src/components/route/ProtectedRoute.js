import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Loader from '../layout/loader/Loader';

const ProtectedRoute = ({ isAdmin, Component }) => {
    const navigate = useNavigate();

    const {
        user,
        loading,
        isAuthenticated
    } = useSelector((state) => state.user);

    useEffect(() => {
        if (!loading && isAuthenticated === false) {
            navigate("/login");
        }

        if (!loading && isAuthenticated === true && isAdmin === true && user.role !== "admin") {
            navigate("/login");
        }
    }, [isAuthenticated, navigate, isAdmin, loading, user?.role ])

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    {isAuthenticated && <Component />}
                </Fragment>   
            )}
        </Fragment>
    )
}

export default ProtectedRoute;