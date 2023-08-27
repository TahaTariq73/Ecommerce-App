import React, { Fragment } from 'react';
import MetaData from '../../layout/MetaData';
import CheckOutSteps from '../checkOutSteps/CheckOutSteps';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./confirmOrder.css";

const ConfirmOrder = () => {
    const navigate = useNavigate();

    const {
        shippingInfo,
        cartItems
    } = useSelector((state) => state.cart);

    const { 
        user 
    } = useSelector((state) => state.user);

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price, 0
    )

    // Shipping Charges and Tax Can Be Edit

    const shippingCharges = subtotal > 1439 ? 0 : 200;
    const tax = subtotal * 0.18;

    // 

    const totalPrice = subtotal + tax + shippingCharges;

    const proceedToPaymentHandler = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice
        }

        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        navigate("/process/payment");
    }

    return (
        <Fragment>
            <MetaData title={"Subkart - Confirm Order"} />

            <div className="confirm-order-body">
                <CheckOutSteps activeStep={1} />

                <div className="confirm-order-page">
                    <div className="order-details">
                        <div className="confirm-shipping-info">
                            <h3> Shipping Info: </h3>

                            <div>
                                <span className="sub-heading"> Name: </span>
                                <span> {user.name} </span>
                            </div>

                            <div>
                                <span className="sub-heading"> Phone No: </span>
                                <span> {shippingInfo.phoneNo} </span>
                            </div>

                            <div>
                                <span className="sub-heading"> Address: </span>
                                <span> {address} </span>
                            </div>
                        </div>

                        <div className="confirm-cart-items">
                            <h3> Your Cart Items: </h3>

                            {cartItems && cartItems.map((item, index) => (
                                <div className="confirm-cart-item" key={index}>
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

                    <div className="order-summary-body">
                        <div className="order-summary">
                            <h3> Order Summary: </h3>

                            <div>
                                <span className="sub-heading"> Subtotal: </span>
                                <span className="sub-price"> ₹{subtotal} </span>
                            </div>

                            <div>
                                <span className="sub-heading"> Shipping Charges: </span>
                                <span className="sub-price"> ₹{shippingCharges} </span>
                            </div>

                            <div>
                                <span className="sub-heading"> GST: </span>
                                <span className="sub-price"> ₹{tax} </span>
                            </div>

                            <div className="total-price-confirm">
                                <span className="sub-heading"> Total: </span>
                                <span className="sub-price"> ₹{totalPrice} </span>
                            </div>

                            <div className="chk-out-btn">
                                <button onClick={proceedToPaymentHandler} type="submit" style={{ 
                                    width: "100%"
                                }}> 
                                    Proceed To Payment 
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ConfirmOrder;