import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Rating } from '@mui/material';

const ReviewCard = ({ review }) => {
    const options = {
        precision: 0.5,
        defaultValue: 1,
        value: review.rating,
        size: "small",
        readOnly: true
    }

    return (
        <div className="review-card">
            <div className="review-header">
                <Avatar> {review.name[0]} </Avatar>
                <div className="review-ratings">
                    <h2> {review.name} </h2>
                    <Rating {...options} />
                </div>
            </div>
            <p className="review-comment"> {review.comment} </p>
        </div>
    )
}

export default ReviewCard;