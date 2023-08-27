import React, { Fragment, useEffect } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts, deleteProduct } from "../../../actions/productAction";
import { setAlert } from "../../../alert/alertAction";
import Loader from "../../layout/loader/Loader";
import "./adminProducts.css";

// MUI Icons

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const AdminProducts = () => {
    const dispatch = useDispatch();

    const {
        error,
        loading,
        products
    } = useSelector((state) => state.products);

    const {
        error: deleteError,
        isDeleted
    } = useSelector((state) => state.product);
    
    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    }

    useEffect(() => {
        function showAlert (alertType, alertMsg) {
            const alert = setAlert(true, alertType, alertMsg); 
            dispatch(alert);
        }

        if (error) {
            return showAlert("error", error);
        }

        if (deleteError) {
            return showAlert("error", deleteError);
        }

        if (isDeleted) {
            return showAlert("success", "Product Deleted Successfully");
        }
        if (isDeleted) {
            dispatch({ type: "DELETE_PRODUCT_RESET" });
        }

        dispatch(getAdminProducts());
    }, [dispatch, deleteError, error, isDeleted])

    const columns = [
        {
            field: "id",
            headerName: "Product Id",
            minWidth: 200,
            flex: 0.5
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 300,
            flex: 1
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 200,
            cellClassName: "mui-product-stock",
            flex: 0.5
        },
        {
            field: "actions",
            headerName: "Actions",
            type: "number",
            minWidth: 200,
            flex: 0.5,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                            <IconButton>
                                <EditIcon />
                            </IconButton>
                        </Link>

                        <IconButton onClick={
                            () => deleteProductHandler(params.getValue(params.id, "id"))
                        }>
                            <DeleteIcon />
                        </IconButton>
                    </Fragment>
                )
            }
        }
    ]

    const rows = [];

    products && products.forEach((item) => {
        rows.push({
            id: item._id,
            stock: item.stock,
            price: item.price,
            name: item.name
        })
    })

    return (
        <Fragment>
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

export default AdminProducts;