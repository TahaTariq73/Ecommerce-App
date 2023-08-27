import React, { Fragment, useEffect, useRef } from 'react';
import MetaData from '../../layout/MetaData';
import CheckOutSteps from '../checkOutSteps/CheckOutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { 
    useElements, 
    useStripe,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement 
} from '@stripe/react-stripe-js';
import { createOrder } from "../../../actions/orderAction";
import { setAlert } from "../../../alert/alertAction";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./payment.css";

const Payment = () => {    
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef();
    const navigate = useNavigate();

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const {
        shippingInfo,
        cartItems
    } = useSelector((state) => state.cart);

    const {
        user
    } = useSelector((state) => state.user);

    const {
        error
    } = useSelector((state) => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const myOrder = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const { data } = await axios.post(
                "/api/v1/payment/process",
                paymentData,
                config
            )

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        }
                    }
                }
            })

            if (result.error) {
                payBtn.current.disabled = false;
                return dispatch(setAlert(true, "error", result.error.message));        
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    myOrder.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    }
        
                    dispatch(createOrder(myOrder));
                    navigate("/order/success");
                } else {
                    const msg = "There's Some Issue While Processing Payment";
                    return dispatch(setAlert(true, "error", msg));        
                }
            }
        } catch (err) {
            payBtn.current.disabled = false;
            return dispatch(setAlert(true, "error", err.response.data.message));        
        }
    }

    useEffect(() => {
        if (error) {
            return dispatch(setAlert(true, "error", error));        
        }
    }, [dispatch, error])

    return (
        <Fragment>
            <MetaData title={"Subkart - Proceed Payment"} />

            <div className="proceed-payment-body">
                <CheckOutSteps activeStep={2} />

                <div className="proceed-payment-container">
                    <form onSubmit={(e) => submitHandler(e)}>
                        <h2> Card Info </h2> <br />

                        <CardNumberElement className="card-input" />

                        <CardExpiryElement className="card-input" />
                        
                        <CardCvcElement className="card-input" />

                        <div className="chk-out-btn">
                            <button 
                                type="submit" 
                                ref={payBtn}
                                style={{
                                    width: "100%",
                                    padding: "1.2rem 0"
                                }}
                            > 
                                Pay - ₹{orderInfo && orderInfo.totalPrice} 
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Payment;