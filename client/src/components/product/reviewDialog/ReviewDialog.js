import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { newReview } from "../../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../../alert/alertAction";
import "./reviewDialog.css";

const ReviewDialog = ({ open, setOpen, producttId }) => {
    const dispatch = useDispatch();

    const {
        error,
        success
    } = useSelector((state) => state.newReview);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    
    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    }

    const submitReviewHandler = () => {
        dispatch(newReview({ 
            rating, 
            comment,
            productId: producttId
        }))
        setOpen(false);
    }

    useEffect(() => {
        function showAlert (alertType, alertMsg) {
            const alert = setAlert(true, alertType, alertMsg); 
            dispatch(alert);
        }

        if (error) {
            return showAlert("error", error);
        }

        if (success) {
            return showAlert("success", "Review Submitted Successfully")
        }
    }, [dispatch, error, success])

    return (
        <Dialog open={open} onClose={submitReviewToggle}>
            <DialogTitle> Submit Your Review </DialogTitle>

            <DialogContent>
                <div className="review-dialog-content">
                    <Rating 
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                    />
                    <TextField
                        label="Your Comment"
                        variant="outlined"
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        multiline
                        rows={4}
                    />
                </div>
            </DialogContent>

            <DialogActions>
                <Button onClick={submitReviewToggle} color="secondary">
                    Cancel
                </Button>

                <Button onClick={submitReviewHandler} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ReviewDialog;