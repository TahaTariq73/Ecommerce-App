import React, { Fragment, useState } from 'react';
import MetaData from '../layout/MetaData';
import AdminSidebar from './adminSidebar/AdminSidebar';
import Dashboard from './dashboard/Dashboard';
import AdminUsers from "./adminUsers/AdminUsers";
import AdminProduct from './adminProduct/createProduct/AdminProduct';
import EditProduct from './adminProduct/editProduct/EditProduct';
import AdminProducts from './adminProducts/AdminProducts';
import IconButton from '@mui/material/IconButton';
import AdminOrder from './adminOrders/adminOrder/AdminOrder';
import AdminReviews from "./adminReviews/AdminReviews";
import AdminOrders from './adminOrders/AdminOrders'; 
import MenuIcon from '@mui/icons-material/Menu';

import {
    ResponsiveAdminSidebar
} from "./adminSidebar/AdminSidebar";

const Admin = ({ headerName, metaTitle, children }) => {
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <MetaData title={`Subkart Admin - ${metaTitle}`} />

            <div className="admin-panel-body">
                <AdminSidebar />
                <ResponsiveAdminSidebar open={open} setOpen={setOpen} />

                <div className="admin-panel">
                    <div className="admin-panel-header">
                        <h2> { headerName } </h2>

                        <IconButton
                            className="responsive-sidebar-trigger-btn"
                            onClick={() => setOpen(true)} 
                            style={{ color: "white" }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </div>

                    <div className="admin-panel-comp">
                        {children}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export const DashboardPanel = () => (
    <Admin metaTitle={"Dashboard"} headerName={"DASHBOARD"} children={<Dashboard />} />
)

export const CreateProductPanel = () => (
    <Admin metaTitle={"Create Product"} headerName={"CREATE PRODUCT"} children={<AdminProduct />} />
)

export const EditProductPanel = () => (
    <Admin metaTitle={"Edit Product"} headerName={"EDIT PRODUCT"} children={<EditProduct />} />
)

export const AdminProductsPanel = () => (
    <Admin metaTitle={"Admin Products"} headerName={"ALL PRODUCTS"} children={<AdminProducts />} />
)

export const AdminUsersPanel = () => (
    <Admin metaTitle={"Admin Users"} headerName={"ALL USERS"} children={<AdminUsers />} />
)

export const AdminReviewsPanel = () => (
    <Admin metaTitle={"Admin Product Reviews"} headerName={"PRODUCT REVIEWS"} children={<AdminReviews />} />   
)

export const AdminOrdersPanel = () => (
    <Admin metaTitle={"Admin Orders"} headerName={"ALL ORDERS"} children={<AdminOrders />} />   
)

export const AdminProcessOrder = () => (
    <Admin metaTitle={"Admin Process Order"} headerName={"PROCESS ORDER"} children={<AdminOrder />} />   
)