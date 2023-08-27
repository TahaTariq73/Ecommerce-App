import React, { Fragment, useState } from 'react';
import Popover from '@mui/material/Popover';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useSelector, useDispatch } from "react-redux";
import { logout as loggout } from "../../../actions/userAction";
import { setAlert } from "../../../alert/alertAction";
import { useNavigate } from "react-router-dom";

// MUI icons

import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

const ListItemm = function ({ text, icon, func }) {
    return (
        <Fragment>
            {text === "Logout" && <Divider />}

            <ListItem onClick={func} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    <ListItemText>
                        {text}
                    </ListItemText>
                </ListItemButton>
            </ListItem>
        </Fragment>
    )
}

const UserOptions = () => {
    const [anchorEl, setAnchorEl] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const {
        user
    } = useSelector((state) => state.user);

    const options = [
        { icon: <LocalShippingIcon />, name: "Orders", func: orders },
        { icon: <AccountCircleOutlinedIcon />, name: "Account", func: account },
        { icon: <LogoutIcon />, name: "Logout", func: logout },
    ]

    if (user.role === "admin") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard
        })
    }

    function dashboard () {
        navigate("/admin/dashboard");
    }

    function orders () {
        navigate("/orders");
    }

    function account () {
        navigate("/account");
    }

    function logout () {
        dispatch(loggout());
        dispatch(setAlert(true, "success", "Logout Successfully"))
    }

    return (
        <Fragment>
            <Avatar 
                src={user.avatar.url} 
                sx={{ 
                    width: "32px", 
                    height: "32px", 
                    cursor: "pointer", 
                    border: "1px solid #E9E7E4" 
                }} 
                alt=""
                onClick={handleClick}
            />

            <Popover 
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
            >
                <Box width={"200px"}>
                    <List sx={{
                        padding: "0px"
                    }}>
                        {options.map((item) => (
                            <ListItemm 
                                key={item.name}
                                icon={item.icon}
                                text={item.name}
                                func={item.func}
                            />
                        ))}
                    </List>
                </Box>
            </Popover>
        </Fragment>
    )
}

export default UserOptions;