import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "../../../../alert/alertAction";
import { getOrderDetails, updateOrder } from "../../../../actions/orderAction";
import { useParams } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Loader from "../../../layout/loader/Loader";
import Select from '@mui/material/Select';
import "./adminOrder.css";

const AdminOrder = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const {
        order,
        error,
        loading
    } = useSelector((state) => state.orderDetails);

    const {
        error: updateError,
        isUpdated
    } = useSelector((state) => state.order);

    const [status, setStatus] = useState("");

    const updateOrderSubmitHandler = () => {
        dispatch(updateOrder(id, { status: status }));
    }

    useEffect(() => {
        function showAlert (alertType, alertMsg) {
            const alert = setAlert(true, alertType, alertMsg); 
            dispatch(alert);
        }

        if (error) {
            return showAlert("error", error);
        }

        if (updateError) {
            return showAlert("error", updateError);
        }

        if (isUpdated) {
            return showAlert("success", "Order Status Updated Successfully");
        }
        if (isUpdated) {
            dispatch({ type: "UPDATE_ORDER_RESET" });
        }

        dispatch(getOrderDetails(id));
    }, [dispatch, error, isUpdated, updateError, id])

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <div className="order-details-admin">
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
                    
                    <div className="order-status-admin">
                        <h3> Order Status: </h3>

                        <Select 
                            size="small"
                            onChange={(e) => setStatus(e.target.value)}
                            disabled={loading === true ? true : false}
                            value={status}
                        >
                            {order.orderStatus === "Processing" && (
                                <MenuItem value="Shipped"> Shipped </MenuItem>
                            )}

                            {order.orderStatus === "Shipped" && (
                                <MenuItem value="Delivered"> Delivered </MenuItem>
                            )}
                        </Select>

                        <div className="chk-out-btn">
                            <button 
                                type="submit" 
                                style={{
                                    width: "100%"
                                }}
                                onClick={updateOrderSubmitHandler}
                            > 
                                Update
                            </button>
                        </div>
                    </div>  
                </div>
                )
            }
        </Fragment>
    )
}

export default AdminOrder;