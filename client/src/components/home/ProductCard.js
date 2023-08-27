import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import React from 'react';

const ProductCard = ({ product }) => {
    const options = {
        precision: 0.5,
        defaultValue: 1,
        value: product.rating,
        size: "small",
        readOnly: true
    }

    return (
        <Link to={`/product/${product._id}`} className="product-card">
            <img src={product.images[0].url} alt="Loading..." />
            <p className="product-name"> {product.name} </p>

            <div className="product-card-stats">
                <Rating {...options} />
                <span> ({product.numOfReviews}) Reviews </span>
            </div>

            <h2 className="product-price"> {`₹${product.price}`} </h2>
        </Link>
    )
}

export default ProductCard;