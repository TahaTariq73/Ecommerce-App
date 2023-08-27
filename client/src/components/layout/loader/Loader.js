import React from 'react';
import "./loader.css";

import { CircularProgress } from "@mui/material";

const loader = () => {
    return (
        <div className="loader-container"> 
            <CircularProgress className="loader" color="warning" />
        </div>
    )
}

export default loader;