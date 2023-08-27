import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails } from "../../../actions/orderAction";
import { setAlert } from "../../../alert/alertAction";
import Loader from '../../layout/loader/Loader';
import { useParams } from "react-router-dom";
import MetaData from '../../layout/MetaData';
import "./orderDetails.css";

const OrderDetails = () => {
    const {
        order,
        error,
        loading
    } = useSelector((state) => state.orderDetails);

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if (error) {
            function showAlert () {
                const alert = setAlert(true, "error", error); 
                dispatch(alert);
            }
            
            return showAlert();
        }

        dispatch(getOrderDetails(id));
    }, [dispatch, error, id]) 

    return (
        <Fragment>
            <MetaData title="Subkart - Order Details" />

            {loading ? (
                <Loader />
            ) : (
                <div className="order-details-page">
                    <div className="order-details-container">
                        <div className="order-info">
                            <div className="order-details">
                                <h3> Order Details: </h3>

                                <div>
                                    <span className="sub-heading"> Name: </span>
                                    <span> {order.createdBy && order.createdBy.name} </span>
                                </div>

                                <div>
                                    <span className="sub-heading"> Phone No: </span>
                                    <span> {order.shippingInfo && order.shippingInfo.phoneNo} </span>
                                </div>

                                <div>
                                    <span className="sub-heading"> Address: </span>
                                    <span> {order.shippingInfo && 
                                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`
                                    } </span>
                                </div>

                                <div>
                                    <span className="sub-heading"> Amount: </span>
                                    <span style={{ color: "#E65100" }}> 
                                        {order.totalPrice && `₹${order.totalPrice}`} 
                                    </span>
                                </div>

                                <div>
                                    <span className="sub-heading"> Order Status: </span>
                                    <span className={String(order.orderStatus).toLowerCase() === "delivered" ? "green-color" : "red-color"}> 
                                        {order.orderStatus && order.orderStatus} 
                                    </span>
                                </div>

                                <div>
                                    <span className="sub-heading"> Order Id: </span>
                                    <span> {order && `#${order._id}`} </span>
                                </div>
                            </div>
                        </div>

                        <div className="order-items">
                            <h3> Order Items: </h3>

                            {order.orderItems && order.orderItems.map((item, index) => (
                                <div className="order-item" key={index}>
                                    <img src={item.image} alt="" />
                                    <div>
                                        <h5> {item.name} </h5>
                                        <span className="confirm-price"> 
                                            ₹{item.price} x {item.quantity} =
                                            ₹{item.quantity * item.price}  
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>                   
                </div>
            )}
        </Fragment>
    )
}

export default OrderDetails;