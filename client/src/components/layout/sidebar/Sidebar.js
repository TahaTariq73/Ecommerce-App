import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import "./sidebar.css";

// MUI icons

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const ListItemm = function ({ text, icon, link }) {
    return (
        <Link to={link} className="list-item-link">
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    <ListItemText>
                        {text}
                    </ListItemText>
                </ListItemButton>
            </ListItem>
        </Link>
    )
}

const Sidebar = ({ open, setOpen }) => {
    return (
        <Drawer 
            open={open} 
            anchor="left" 
            onClose={() => setOpen(false)} 
        >
            <Box width={250}>
                <List>
                    <ListItem disablePadding>
                        <div className="list-logo">
                            <a href="/">
                                <span> SUBKART </span>
                            </a>
                        </div>
                    </ListItem>
                    <Divider />

                    <ListItemm
                        text={"Home"}
                        icon={<HomeOutlinedIcon />}
                        link={"/"}
                    />

                    <ListItemm
                        text={"Products"}
                        icon={<ShoppingBagOutlinedIcon />}
                        link={"/products"}
                    />

                    <ListItemm
                        text={"Contact"}
                        icon={<EmailOutlinedIcon />}
                        link={"/contact"}
                    />

                    <ListItemm
                        text={"About"}
                        icon={<InfoOutlinedIcon />}
                        link={"/about"}
                    />
                </List>
            </Box>
        </Drawer>
    )
}

export default Sidebar;