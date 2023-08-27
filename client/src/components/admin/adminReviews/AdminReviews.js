import React, { Fragment, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from "react-redux";
import IconButton from '@mui/material/IconButton';
import { DataGrid } from "@material-ui/data-grid";
import { getAllReviews, deleteReviews } from "../../../actions/productAction";
import { setAlert } from "../../../alert/alertAction";
import DeleteIcon from "@material-ui/icons/Delete";
import Loader from '../../layout/loader/Loader';
import "./adminReviews.css";

const AdminReviews = () => {
    const dispatch = useDispatch();

    const { 
        error: deleteError, 
        isDeleted 
    } = useSelector((state) => state.review);

    const {
        error,
        reviews,
        loading
    } = useSelector((state) => state.productReviews);

    const [productId, setProductId] = useState("");

    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReviews(productId, reviewId));
    }

    useEffect(() => {
        function showAlert (alertType, alertMsg) {
            const alert = setAlert(true, alertType, alertMsg); 
            dispatch(alert);
        }

        if (productId.length === 24) {
            dispatch(getAllReviews(productId));
        }

        if (error) {
            return showAlert("error", error);
        }

        if (deleteError) {
            return showAlert("error", deleteError);
        }

        if (isDeleted) {
            return showAlert("success", "Review Deleted Successfully");
        }
        if (isDeleted) {
            dispatch({ type: "DELETE_REVIEW_RESET" });
        }
    }, [dispatch, error, deleteError, isDeleted, productId]);

    const columns = [
        {
            field: "id",
            headerName: "Review Id",
            minWidth: 200,
            flex: 0.5
        },
        {
            field: "user",
            headerName: "User",
            minWidth: 200,
            flex: 0.6
        },
        {
            field: "comment",
            headerName: "Comment",
            minWidth: 350,
            flex: 1
        },
        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 180,
            flex: 0.4,
            cellClassName: (params) => {
                return params.getValue(params.id, "rating") >= 3 ? "green-color" : "red-color";
            }
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 200,
            flex: 0.5,
            type: "number",
            sortable: false,
            renderCell: (params) => (
                <IconButton onClick={() => deleteReviewHandler(params.getValue(params.id, "id"))}>
                    <DeleteIcon />
                </IconButton>
            )
        }
    ]

    const rows = [];

    reviews && reviews.forEach((item) => {
        rows.push({
            id: item._id,
            rating: item.rating,
            comment: item.comment,
            user: item.createdBy
        })
    })

    return (
        <Fragment>  
            <TextField 
                label="Enter product id" 
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                variant="outlined"
                disabled={loading === true ? true : false}
                style={{ marginBottom: "1rem" }}
                fullWidth
            />

            {loading ? (
                <Loader />
            ) : (
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={15}
                    className="products-list-table"
                    disableSelectionOnClick
                    autoHeight
                /> 
            )}
        </Fragment>
    )
}

export default AdminReviews;