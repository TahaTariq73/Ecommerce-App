import React, { Fragment } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { StepLabel } from '@mui/material';
import "./checkOutSteps.css";

// MUI Icons

import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

const CheckOutSteps = ({ activeStep }) => {
    const steps = [
        {
            label: <h5> Shipping Details </h5>,
            icon: <LocalShippingIcon />
        },
        {
            label: <h5> Confirm Order </h5>,
            icon: <LibraryAddCheckIcon />
        },  
        {
            label: <h5> Items Payment </h5>,
            icon: <AccountBalanceIcon />
        }
    ]
    
    const style = {
        boxSizing: "border-box"
    }

    return (
        <Fragment>
            <div className="check-out-steps">
                <Stepper alternativeLabel activeStep={activeStep} style={style}>
                    {steps.map((item, index) => (
                        <Step
                            key={index}
                            active={activeStep === index ? true : false}
                            completed={activeStep >= index ? true : false}
                        >
                            <StepLabel
                                style={{
                                    color: activeStep >= index ? "#d86526" : "#212322",
                                }}
                                icon={item.icon}
                            >
                                {item.label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
        </Fragment>
    )
}

export default CheckOutSteps;