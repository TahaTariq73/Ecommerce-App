import React, { Fragment, useEffect, useState } from 'react';
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from '../../../alert/alertAction';
import { getProductDetails } from "../../../actions/productAction";
import { useParams } from 'react-router-dom';
import { addItemsToCart } from "../../../actions/cartAction";
import MetaData from '../../layout/MetaData';
import Loader from "../../layout/loader/Loader";
import { Rating } from '@mui/material';
import "./product.css";

// MUI icons

import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ReviewCard from './ReviewCard';
import ReviewDialog from '../reviewDialog/ReviewDialog';

const Product = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [open, setOpen] = useState(false);

    const [quantity, setQuantity] = useState(1);

    const {
        product,
        loading,
        error
    } = useSelector((state) => state.productDetails);

    const options = {
        precision: 0.5,
        defaultValue: 1,
        value: product.rating,
        size: "medium",
        readOnly: true
    }

    const increaseQuantity = () => {
        if (product.stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    }

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));

        function showAlert () {
            const alert = setAlert(true, "success", "Items Added To Cart"); 
            dispatch(alert);
        }
        
        return showAlert();
    }

    useEffect(() => {
        if (error) {
            function showAlert () {
                const alert = setAlert(true, "error", error); 
                dispatch(alert);
            }
            
            return showAlert();
        }

        dispatch(getProductDetails(id));
    }, [dispatch, error, id]);

    return (
        <Fragment>
            <MetaData title={`Subkart - ${product.name}`} />

            {loading ? (
                <Loader />
            ) : (
                <div className="product-details-container">        
                    <div className="product-details">
                        <div className="carousel-container">
                            <Carousel>
                                {product.images && product.images.map((item, i) => (
                                    <img 
                                        className="carousel-image"
                                        key={i}
                                        src={item.url}
                                        alt={`${i} slide`}
                                    />
                                ))}
                            </Carousel>
                        </div>

                        <div>
                            <div className="details-block-1">
                                <h1> {product.name} </h1>
                                <p> #{product._id} </p>
                            </div>

                            <div className="details-block-2">
                                <Rating {...options} />
                                <span> ({product.numOfReviews} Reviews) </span>
                            </div>
                            
                            <div className="details-block-3">
                                <h1> ₹{product.price} </h1>

                                <div className="qty-option">
                                    <button onClick={decreaseQuantity}> 
                                        <RemoveOutlinedIcon className="qty-icon" /> 
                                    </button>
                                    
                                    <span> {quantity} </span>
                                    
                                    <button onClick={increaseQuantity}> 
                                        <AddOutlinedIcon className="qty-icon" /> 
                                    </button>
                                </div>

                                <button 
                                    className="cart-btn" 
                                    disabled={product.stock < 1 ? true : false}
                                    onClick={addToCartHandler}
                                >
                                    Add to Cart
                                </button>

                                <p> Status: 
                                    <b className={product.stock < 1 ? "red-color" : "green-color"}>
                                        {product.stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>

                            <div className="details-block-4">
                                Description: <p> { product.description } </p>
                            </div>

                            <button className="submit-review-btn" onClick={() => setOpen(true)}>
                                Submit Review
                            </button>
                        </div>
                    </div>

                    <ReviewDialog
                        open={open}
                        setOpen={setOpen}
                        producttId={id}
                    />

                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews && product.reviews.map((review) => (
                                <ReviewCard key={review._id} review={review} />
                            ))}
                        </div>
                    ) : (
                        <p className="no-reviews"> No Reviews Yet </p> 
                    )}
                </div>
            )}
        </Fragment>
    )
}

export default Product;