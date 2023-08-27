import React, { Fragment, useEffect } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteOrder, getAllOrders } from "../../../actions/orderAction";
import { setAlert } from "../../../alert/alertAction";
import Loader from "../../layout/loader/Loader";
import "./adminOrders.css";

// MUI Icons

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const AdminOrders = () => {
    const dispatch = useDispatch();

    const { 
        error, 
        loading,
        orders 
    } = useSelector((state) => state.allOrders);

    const { 
        error: deleteError, 
        isDeleted 
    } = useSelector((state) => state.order);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
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
            return showAlert("success", "Order Deleted Successfully");
        }
        if (isDeleted) {
            dispatch({ type: "DELETE_ORDER_RESET" });
        }

        dispatch(getAllOrders());
    }, [dispatch, error, deleteError, isDeleted])

    const columns = [
        { 
            field: "id", 
            headerName: "Order Id", 
            minWidth: 300, 
            flex: 1 
        },
        { 
            field: "status", 
            headerName: "Status", 
            minWidth: 150, 
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status").toLowerCase() === "delivered" ? "green-color" : "red-color"
            }
        },
        { 
            field: "itemsQty", 
            headerName: "Item Quantity", 
            minWidth: 150,
            type: "number", 
            flex: 0.4 
        },
        { 
            field: "amount", 
            headerName: "Amount", 
            minWidth: 270,
            type: "number",
            flex: 0.5
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                            <IconButton>
                                <EditIcon />
                            </IconButton>
                        </Link>
      
                        <IconButton onClick={() => deleteOrderHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon />
                        </IconButton>
                    </Fragment>
                )
            }
        }
    ]

    const rows = [];

    orders && orders.forEach((item) => {
        rows.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            amount: item.totalPrice,
            status: item.orderStatus,
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

export default AdminOrders;