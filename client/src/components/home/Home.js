import React, { Fragment, useEffect } from 'react';
import { setAlert } from '../../alert/alertAction';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from "../../actions/productAction";
import Carousel from "react-material-ui-carousel";
import MetaData from "../layout/MetaData";
import ProductCard from './ProductCard';
import Loader from "../layout/loader/Loader";
import "./home.css";

// Banner Images

import Banner1 from "../../images/banner-1.png";
import Banner2 from "../../images/banner-2.png";
import Banner3 from "../../images/banner-3.png";

// MUI icons

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

const Home = () => {
    const dispatch = useDispatch();
    const {
        loading,
        error,
        products
    } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            function showAlert () {
                const alert = setAlert(true, "error", error); 
                dispatch(alert);
            }
            
            return showAlert();
        }

        dispatch(getProducts());
    }, [dispatch, error]);

    return (
        <Fragment>
            <MetaData title={"Subkart - Home"} />

            {loading ? (
                <Loader />
            ) : (
                <div className="home-page">
                    <Carousel className="banner-images">
                        <img src={Banner1} alt="" />
                        <img src={Banner2} alt="" />
                        <img src={Banner3} alt="" />
                    </Carousel>

                    <div className="home-layout">
                        <h1 className="headline"> 
                            <ShoppingBagOutlinedIcon />
                            Featured Products 
                        </h1>
                        <h2 className="sub-headline"> New Ones </h2>

                        <div className="products-container">
                            {products && products.map((product) => (
                                <ProductCard product={product} key={product._id} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default Home;