import React, { Fragment, useState } from 'react';
import MetaData from '../../layout/MetaData';
import { useNavigate } from 'react-router-dom';
import "./search.css";

// MUI icons

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate("/products");
        }
    }

    return (
        <Fragment>
            <MetaData title={"Subkart - Search for Products"} />

            <div className="search-body">
                <form className="search-box" onSubmit={searchSubmitHandler}>
                    <input 
                        type="text" 
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Search a product" 
                    />
                    <button type="submit"> 
                        <SearchOutlinedIcon />
                    </button>
                </form>
            </div>
        </Fragment>
    )
}

export default Search;