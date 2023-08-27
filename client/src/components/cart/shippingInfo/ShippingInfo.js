import React, { Fragment, useState } from 'react';
import MetaData from '../../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import CheckOutSteps from '../checkOutSteps/CheckOutSteps';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Country, State } from "country-state-city";
import { setAlert } from "../../../alert/alertAction";
import { saveShippingInfo } from "../../../actions/cartAction";
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import "./shippingInfo.css";

// MUI Icons

import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PhoneIcon from "@material-ui/icons/Phone";

const ShippingInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        shippingInfo
    } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address || "");
    const [city, setCity] = useState(shippingInfo.city || "");
    const [state, setState] = useState(shippingInfo.state || "");
    const [country, setCountry] = useState(shippingInfo.country || "");
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");

    const submitHandler = (event) => {
        event.preventDefault();

        if (phoneNo.length < 10 || phoneNo.length > 10) {
            function showAlert () {
                const alert = setAlert(true, "error", "Phone Number should be 10 digits Long"); 
                dispatch(alert);
            }
            
            return showAlert();
        }

        dispatch(saveShippingInfo({ address, city, state, country, pinCode, phoneNo }));
        navigate("/order/confirm");
    }

    return (
        <Fragment>
            <MetaData title="Subkart - Shipping Details" />
            
            <div className="shipping-info-body">
                <CheckOutSteps activeStep={0} />

                <form 
                    className="shipping-form"
                    encType="multipart/form-data"
                    onSubmit={submitHandler}
                >
                    <h2> Shipping Details </h2>

                    <TextField
                        type="text"
                        label="Address"
                        InputProps={{
                            startAdornment: 
                                <InputAdornment position="start">
                                    <HomeIcon />
                                </InputAdornment>
                        }}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        fullWidth
                        required
                    />

                    <div className="attached-textfields">
                        <TextField
                            type="text"
                            label="City"
                            InputProps={{
                                startAdornment: 
                                    <InputAdornment position="start">
                                        <LocationCityIcon />
                                    </InputAdornment>
                            }}
                            className="attached-one"
                            value={city}
                            required
                            onChange={(e) => setCity(e.target.value)}
                        />

                        <TextField
                            type="number"
                            label="Pin Code"
                            required
                            InputProps={{
                                startAdornment: 
                                    <InputAdornment position="start">
                                        <PinDropIcon />
                                    </InputAdornment>
                            }}
                            className="attached-one"
                            value={pinCode}
                            onChange={(e) => setPinCode(e.target.value)}
                        />
                    </div>

                    <TextField
                        type="number"
                        label="Phone Number"
                        InputProps={{
                            startAdornment: 
                                <InputAdornment position="start">
                                    <PhoneIcon />
                                </InputAdornment>
                        }}
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        fullWidth
                        required
                    />

                    <div className="attached-textfields">
                        <FormControl fullWidth>
                            <InputLabel> Country </InputLabel>
                            <Select
                                value={country}
                                label="Country"
                                required
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                {Country && Country.getAllCountries().map((item) => (
                                    <MenuItem key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel> State </InputLabel>
                            <Select
                                value={state}
                                label="State"
                                required
                                disabled={country === "" ? true : false}
                                onChange={(e) => setState(e.target.value)}
                            >
                                {State && State.getStatesOfCountry(country).map((item) => (
                                    <MenuItem key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    <div className="chk-out-btn">
                        <button type="submit" disabled={state === "" ? true : false}> Submit </button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default ShippingInfo;