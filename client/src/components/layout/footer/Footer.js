import React from 'react';
import "./footer.css";

// MUI icons

import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer = () => {
    return (
        <div className="footer">
            <span className="copy-right-subkart"> © 2023 Copyright by Subkart </span>

            <div className="footer-icons">
                <span>
                    <FacebookOutlinedIcon />
                </span>
                <span>
                    <InstagramIcon />
                </span>
                <span>
                    <TwitterIcon />
                </span>
                <span>
                    <WhatsAppIcon />
                </span>
            </div>
        </div>
    )
}

export default Footer;