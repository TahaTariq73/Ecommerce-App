import React, { Fragment, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { createProduct } from "../../../../actions/productAction";
import { setAlert } from "../../../../alert/alertAction";
import "./adminProduct.css";

const categories = [
    "laptop",
    "shirt",
    "camera",
    "mobile",
    "watch",
    "drinks"
]

const AdminProduct = () => {
    const dispatch = useDispatch();

    const {
        loading,
        error,
        success
    } = useSelector((state) => state.newProduct);

    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productCategory, setProductCategory] = useState("");
    const [productStock, setProductStock] = useState(0);
    const [productDescription, setProductDescription] = useState("");
    const [productImages, setProductImages] = useState([]);
    const [productImagesPreview, setProductImagesPreview] = useState([]);

    const createProductHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", productName);
        myForm.set("price", productPrice);
        myForm.set("description", productDescription);
        myForm.set("category", productCategory);
        myForm.set("stock", productStock);

        productImages.forEach((image) => {
            myForm.append("files", image);
        })

        dispatch(createProduct(myForm));
    }

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setProductImages([]);
        setProductImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = () => {
                setProductImages((old) => [...old, file]);
                setProductImagesPreview((old) => [...old, reader.result]);                
            }
        })
    }

    useEffect(() => {
        function showAlert (alertType, alertMsg) {
            const alert = setAlert(true, alertType, alertMsg); 
            dispatch(alert);
        }

        if (error) {
            return showAlert("error", error);
        }

        if (success) {
            return showAlert("success", "Product Created Successfully");
        }
        if (success) {
            dispatch({ type: "NEW_PRODUCT_RESET" });
        }
    }, [dispatch, success, error])

    return (
        <Fragment>            
            <div className="create-admin-product">
                <form 
                    onSubmit={createProductHandler}
                    encType="multipart/form-data"
                    className="create-product"
                >
                    <h2> Create Product </h2>

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

                    <div className="product-preview-images">
                        <input
                            accept="image/*"
                            style={{ display: "none" }}
                            id="raised-button-file"
                            onChange={createProductImagesChange}
                            type="file"
                            multiple
                            required
                        />

                        <label htmlFor="raised-button-file">
                            <Button variant="outlined" color="warning" component="span">
                                Upload
                            </Button>
                        </label>

                        {productImagesPreview && productImagesPreview.map((image, index) => (
                            <img src={image} key={index} alt="" />
                        ))}
                    </div>

                    <Button 
                        type="submit" 
                        variant="contained"
                        disabled={loading ? true : false}
                        fullWidth
                    > 
                        Submit 
                    </Button>
                </form>
            </div>
        </Fragment>
    )
}

export default AdminProduct;