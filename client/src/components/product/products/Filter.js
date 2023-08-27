import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import "./products.css";

const categories = [
    "laptop",
    "shirt",
    "camera",
    "mobile",
    "watch",
    "drinks"
]

const Filter = ({ 
    open, 
    setOpen, 
    price, 
    setPrice, 
    ratings, 
    setRatings, 
    category, 
    setCategory 
}) => {
    const [fakePrice, setFakePrice] = useState(price);

    const handlePriceRangeChange = (event, newValue) => {
        setFakePrice(newValue);
    }

    const handleRangeDrop = () => {
        setPrice(fakePrice);
    }

    return (        
        <Drawer 
            open={open} 
            anchor="right" 
            onClose={() => setOpen(false)} 
        >
            <div className="filters-sidebar-header"> 
                <span> Filter products </span>
            </div> <Divider />

            <div className="filters-sidebar-container">
                <div className="filter-container-1">
                    <h2 className="filter-headline"> Price </h2>
                    <Slider 
                        size="small"
                        color="warning"
                        value={fakePrice}
                        valueLabelFormat={(vale) => `₹${vale}`}
                        onChangeCommitted={handleRangeDrop}
                        onChange={handlePriceRangeChange}
                        aria-labelledby="range-slider"
                        valueLabelDisplay="auto"
                        min={0}
                        max={200000}
                    />
                </div>
                
                <div className="filter-container-2">
                    <h2 className="filter-headline"> Categories </h2>
                    <ul className="filter-categories">
                        {categories.map((category, index) => (
                            <li key={index} onClick={() => setCategory(category)}>
                                {category}
                            </li>
                        ))}
                    </ul> 
                </div>

                <fieldset className="filter-conatiner-3">
                    <Typography className="filter-headline e-e" component="legend"> 
                        Ratings Above 
                    </Typography>
                    <Rating 
                        value={ratings}
                        onChange={(e, value) => setRatings(value)}
                    />
                </fieldset>
            </div>
        </Drawer>
    )
}

export default Filter;