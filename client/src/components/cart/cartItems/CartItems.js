import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../cartItem/CartItem';
import { useNavigate, Link } from 'react-router-dom';
import "./cartItems.css";

// MUI icons

import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import MetaData from '../../layout/MetaData';

const CartItems = () => {
    const navigate = useNavigate();

    const {
        cartItems
    } = useSelector((state) => state.cart);

    const checkOutHandler = () => {
        navigate("/shipping");
    }

    return (
        <Fragment>
            <MetaData title={"Subkart - Your Cart"} />
            
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <RemoveShoppingCartIcon className="empty-cart-icon" />

                    <h2> No Products In Your Cart </h2>
                    <Link to="/products"> View Products </Link>
                </div>
            ) : (
                <div className="cart-page">
                    <div className="cart-container">
                        <table cellSpacing={0}>
                            <thead>
                                <tr>
                                    <th> Products </th>
                                    <th> Quantity </th>
                                    <th> Subtotal </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems && cartItems.map((item, i) => (
                                    <CartItem 
                                        item={item} 
                                        key={i}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="cart-gross-container">
                        <div className="cart-gross-profit">
                            <div className="gross-total">
                                <h3> Gross Total: </h3>
                                <h3 className="gross-total-span"> ₹{cartItems.reduce(
                                    (acc, item) => acc + item.quantity * item.price, 0
                                )} </h3>
                            </div>

                            <div className="chk-out-btn">
                                <button onClick={checkOutHandler}> Check Out </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default CartItems;