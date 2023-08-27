import React, { Fragment } from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import { Link } from 'react-router-dom';
import "./adminSidebar.css";

// MUI Icons

import DashboardIcon from "@material-ui/icons/Dashboard";
import InventoryIcon from '@mui/icons-material/Inventory';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListAltIcon from "@material-ui/icons/ListAlt";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const AdminSidebar = ({ childrenClassName }) => {
    const currentUrl = window.location.pathname;

    const sidebarItems = [
        {
            text: "Dashboard",
            icon: <DashboardIcon />,
            link: "/admin/dashboard"
        },
        {
            text: "Inventory",
            icon: <InventoryIcon />,
            link: "/admin/products"
        },
        {
            text: "Add Product",
            icon: <AddCircleOutlineIcon />,
            link: "/admin/product"
        },
        {
            text: "Orders",
            icon: <ListAltIcon />,
            link: "/admin/orders"
        },
        {
            text: "Users",
            icon: <PeopleIcon />,
            link: "/admin/users"
        },
        {
            text: "Reviews",
            icon: <RateReviewIcon />,
            link: "/admin/reviews"
        },
    ]

    return (
        <Fragment>
            <div className={childrenClassName ? childrenClassName : "admin-panel-sidebar"}>
                <div className="admin-sidebar-header">
                    <a href="/admin/dashboard">
                        <span> SUBKART DASHBOARD </span>
                    </a>
                </div>
                <Divider />

                {sidebarItems && sidebarItems.map((item, index) => (
                    <Link to={item.link} key={index}
                    className={`admin-sidebar-item ${currentUrl === item.link ? "active-link" : ""}`}>
                        {item.icon}
                        <span> {item.text} </span>
                    </Link>
                ))}
            </div>
        </Fragment>
    )
}

export const ResponsiveAdminSidebar = ({ open, setOpen }) => {
    return (
        <Drawer
            open={open}
            anchor="left"
            onClose={() => setOpen(false)}
        >
            <AdminSidebar childrenClassName={`responsive-admin-panel-sidebar`} />
        </Drawer>
    )
}

export default AdminSidebar;