import React from 'react';
import { Link } from "react-router-dom";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const OrderSuccess = () => {
    return (
        <div className="empty-cart">
            <CheckCircleIcon className="empty-cart-icon" />

            <h2> Your Order Has Been Placed Successfully </h2>
            <Link to="/orders"> View Orders </Link>
        </div>
    )
}

export default OrderSuccess;