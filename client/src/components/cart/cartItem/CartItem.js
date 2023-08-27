import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from "../../../actions/cartAction";
import "./cartItem.css";

// MUI icons

import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const increaseQuantity = (id, quantity, stock) => {
        if (stock <= quantity) return;
    
        const newQty = quantity + 1;
        dispatch(addItemsToCart(id, newQty));
    }
    
    const decreaseQuantity = (id, quantity) => {
        if (1 >= quantity) return;

        const newQty = quantity - 1;
        dispatch(addItemsToCart(id, newQty));
    }

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    }

    return (
        <tr className="cart-item">
            <td className="cart-item-card">
                <img src={item.image} alt="" />
                
                <div className="card-details">
                    <Link to={`/product/${item.product}`} className="card-details-link"> 
                        {item.name} 
                    </Link>

                    <h3> ₹{item.price} </h3>
                    
                    <Button 
                        variant="outlined" 
                        size="small"
                        className="card-remove-btn"
                        onClick={() => deleteCartItems(item.product)}
                    >
                        Remove 
                    </Button>
                </div>
            </td>

            <td className="qty-option">
                <div className="cart-qty-option">
                    <button 
                        onClick={() => decreaseQuantity(item.product, item.quantity)}
                    > 
                        <RemoveOutlinedIcon className="qty-icon" /> 
                    </button>
                                        
                    <span className="cart-qty-span"> {item.quantity} </span>
                                        
                    <button 
                        onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}
                    > 
                        <AddOutlinedIcon className="qty-icon" /> 
                    </button>
                </div>
            </td>

            <td className="cart-subtotal">    
                <h2> ₹{item.price * item.quantity} </h2>
            </td>
        </tr>
    )
}

export default CartItem;