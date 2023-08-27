import React, { Fragment, useState } from 'react';
import { NavLink } from "react-router-dom";
import Sidebar from '../sidebar/Sidebar';
import { useSelector } from "react-redux";
import UserOptions from './UserOptions';
import "./navbar.css";

// MUI icons

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const {
        cartItems
    } = useSelector((state) => state.cart);

    const { 
        isAuthenticated 
    } = useSelector((state) => state.user);

    return (
        <Fragment>
            <div className="navigation-body">
                <nav className="navigation">
                    <div className="logo">
                        <MenuOutlinedIcon 
                        className="menu-icon"
                        onClick={() => setOpen(true)} />

                        <a href="/">
                            <span> Subkart </span>
                        </a>
                    </div>

                    <div className="navigation-links">
                        <NavLink to="/" className="link"> 
                            Home 
                        </NavLink>
                        <NavLink to="/products" className="link"> 
                            Products 
                        </NavLink>
                        <NavLink to="/contact" className="link"> 
                            Contact 
                        </NavLink>
                        <NavLink to="/about" className="link"> 
                            About 
                        </NavLink>
                    </div>
                    
                    <div className="navigation-icons">
                        <NavLink to="/search" className="icon">
                            <SearchOutlinedIcon />
                        </NavLink>
                        <NavLink to="/cart" className="icon cart-navigation-icon">
                            <ShoppingCartOutlinedIcon />
                            {cartItems.length !== 0 && <span> </span> }
                        </NavLink>

                        {!isAuthenticated &&
                            <NavLink to="/login" className="icon">
                                <AccountCircleOutlinedIcon />
                            </NavLink>
                        }
                        
                        {isAuthenticated && <UserOptions />}
                    </div>
                </nav>
            </div>

            <Sidebar 
                open={open} 
                setOpen={setOpen}
            />
        </Fragment>
    )
}

export default Navbar;