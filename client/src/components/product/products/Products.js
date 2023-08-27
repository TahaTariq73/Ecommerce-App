import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../../alert/alertAction";
import { getProducts } from "../../../actions/productAction";
import MetaData from "../../layout/MetaData";
import Loader from "../../layout/loader/Loader";
import ProductCard from '../../home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Filter from './Filter';
import "./products.css";

// MUI icons

import TuneSharpIcon from '@mui/icons-material/TuneSharp';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

const Products = () => {
    const { keyword } = useParams();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, (20 * 10000)]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const [open, setOpen] = useState(false);

    const pageChangeHandler = (event, pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const dispatch = useDispatch();
    const {
        loading,
        error,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount
    } = useSelector((state) => state.products);    

    useEffect(() => {
        if (error) {
            function showAlert () {
                const alert = setAlert(true, "error", error); 
                dispatch(alert);
            }
            
            return showAlert();
        }
        let properKeyword = keyword === undefined ? "" : String(keyword);
        dispatch(getProducts(properKeyword, currentPage, price, category, ratings));
    }, [dispatch, error, currentPage, keyword, price, category, ratings]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={"Subkart - Products"} />

                    <div className="home-layout" style={{ paddingTop: "64px" }}>
                        <h1 className="headline" style={{ marginTop: "24px" }}>
                            <ShoppingBagOutlinedIcon />
                            Filtered Products 
                        </h1>
                        <h2 className="sub-headline"> Filter ? </h2>   

                        <div className="filters-alt-container">
                            <hr />
                            <button 
                                className="filters-alt-btn" 
                                onClick={() => setOpen(true)}
                            > 
                                <TuneSharpIcon style={{ width: "18px" }} />
                            </button>
                        </div>
                        
                        <div className="products-container">
                            {products && products.map((product) => (
                                <ProductCard product={product} key={product._id} />
                            ))}
                        </div>
                    </div>

                    <div className="products-pagination">
                        <Pagination 
                            count={
                                filteredProductsCount ? 
                                    Math.ceil(filteredProductsCount / resultPerPage) : 
                                    Math.ceil(productsCount / resultPerPage)
                            } 
                            shape="rounded"
                            size="large"
                            page={currentPage}
                            onChange={
                                (event, pageNumber) => pageChangeHandler(event, pageNumber)
                            }
                            color="warning"
                            siblingCount={0}
                        />
                    </div>

                    <Filter 
                        open={open} 
                        setOpen={setOpen}
                        price={price}
                        setPrice={setPrice}
                        ratings={ratings}
                        setRatings={setRatings}
                        category={category}
                        setCategory={setCategory}
                    />
                </Fragment>
            )}
        </Fragment>
    )
}

export default Products;