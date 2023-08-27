import React, { Fragment, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { getProductDetails, updateProduct } from "../../../../actions/productAction";
import { setAlert } from "../../../../alert/alertAction";
import { useParams } from "react-router-dom";
import Loader from "../../../layout/loader/Loader";
import "./editProduct.css";

const categories = [
    "laptop",
    "shirt",
    "camera",
    "mobile",
    "watch",
    "drinks"
]

const EditProduct = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const {
        error,
        product,
        loading
    } = useSelector((state) => state.productDetails);

    const {
        error: updateError,
        loading: updateLoading,
        isUpdated
    } = useSelector((state) => state.product);

    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productCategory, setProductCategory] = useState("");
    const [productStock, setProductStock] = useState(0);
    const [productDescription, setProductDescription] = useState("");

    const updateProductHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
    
        myForm.set("name", productName);
        myForm.set("price", productPrice);
        myForm.set("description", productDescription);
        myForm.set("category", productCategory);
        myForm.set("stock", productStock);

        dispatch(updateProduct(id, myForm));
    }

    useEffect(() => {
        function showAlert (alertType, alertMsg) {
            const alert = setAlert(true, alertType, alertMsg); 
            dispatch(alert);
        }

        if (error) {
            return showAlert("error", error);
        }

        if (updateError) {
            return showAlert("error", updateError);
        }

        if (isUpdated) {
            return showAlert("success", "Product Updated Successfully");
        }

        dispatch(getProductDetails(id));
    }, [dispatch, error, isUpdated, updateError, id])

    useEffect(() => {
        setProductName(product.name);
        setProductPrice(product.price);
        setProductCategory(product.category);
        setProductDescription(product.description);
        setProductStock(product.stock);
    }, [product?.name, product?.price, product?.description, product?.stock, product?.category])

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <div className="create-admin-product">
                    <form 
                        onSubmit={updateProductHandler}
                        className="create-product"
                    >
                        <h2> Update Product </h2>

                        <TextField 
                            label="Enter product name"
                            type="text"
                            variant="outlined"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Enter product price"
                            type="number"
                            variant="outlined"
                            value={productPrice}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"> ₹ </InputAdornment>
                            }}
                            onChange={(e) => setProductPrice(e.target.value)}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Enter product stock"
                            variant="outlined"
                            value={productStock}
                            onChange={(e) => setProductStock(e.target.value)}
                            fullWidth
                            required
                        />

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label"> Category </InputLabel>

                            <Select
                                labelId="demo-simple-select-label"
                                label="Category"
                                value={productCategory}
                                onChange={(e) => setProductCategory(e.target.value)}
                                fullWidth
                                required
                            >
                                {categories && categories.map((item, index) => (
                                    <MenuItem
                                        key={index}
                                        className="capitilize"  
                                        value={item}
                                    > 
                                        {item} 
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField 
                            label="Enter product description"
                            type="text"
                            variant="outlined"
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            rows={3}
                            fullWidth
                            multiline
                            required
                        />

                        <Button 
                            type="submit" 
                            variant="contained"
                            disabled={updateLoading ? true : false}
                            fullWidth
                        > 
                            Submit 
                        </Button>
                    </form>
                </div>
            )}
        </Fragment>
    )
}

export default EditProduct;