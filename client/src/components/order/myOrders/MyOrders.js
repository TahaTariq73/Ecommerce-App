import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { myOrders } from "../../../actions/orderAction";
import { DataGrid } from "@material-ui/data-grid";
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import Loader from '../../layout/loader/Loader';
import { setAlert } from "../../../alert/alertAction";
import MetaData from '../../layout/MetaData';
import "./myOrders.css";

// MUI Icons

import LaunchIcon from "@material-ui/icons/Launch";

const MyOrders = () => {
    const dispatch = useDispatch();

    const {
        loading,
        error,
        orders
    } = useSelector((state) => state.myOrders);

    const columns = [
        {
            field: "id",
            headerName: "Order Id",
            minWidth: 200,
            flex: 1
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                let status = params.getValue(params.id, "status").toLowerCase();
                return status === "delivered" ? "green-color" : "red-color";
            }
        },
        {
            field: "itemsQty",
            headerName: "Items Quantity",
            type: "number",
            minWidth: 150,
            flex: 0.3
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 200,
            flex: 0.5,
            cellClassName: "mui-table-price"
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            type: "number",
            sortable: false,
            minWidth: 150,
            renderCell: (params) => {
                return (
                    <Link to={`/orders/${params.getValue(params.id, "id")}`} className="mui-table-icon">
                        <IconButton>
                            <LaunchIcon />
                        </IconButton>
                    </Link>
                )
            }
        }
    ]

    const rows = [];

    orders && orders.forEach((item) => {
        rows.push({
            itemsQty: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount: `₹${item.totalPrice}`
        })
    })

    useEffect(() => {
        if (error) {
            function showAlert () {
                const alert = setAlert(true, "error", error); 
                dispatch(alert);
            }
            
            return showAlert();
        }

        dispatch(myOrders());
    }, [dispatch, error])

    return (
        <Fragment>
            <MetaData title="Subkart - Your Orders" />

            {loading ? (
                <Loader />
            ) : (
                <div className="my-orders-body">
                    <DataGrid
                        className="my-orders"
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                    />
                </div>
            )}
        </Fragment>
    )
}

export default MyOrders;