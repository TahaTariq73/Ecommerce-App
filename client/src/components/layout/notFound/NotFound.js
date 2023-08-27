import React from 'react';
import { Link } from "react-router-dom";
import FindInPageIcon from '@mui/icons-material/FindInPage';

const NotFound = () => {
    return (
        <div className="empty-cart">
            <FindInPageIcon className="empty-cart-icon" />

            <h2> Page Not Found </h2>
            <Link to="/"> Go To Home </Link>
        </div>
    )
}

export default NotFound;