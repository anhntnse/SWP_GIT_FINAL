import React from 'react';
import './Footer.css'; // Import CSS for footer
import { faFacebook, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h4>Connect with FUE E-commerce</h4>
                    <div className="social-icons">
                        <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
                        <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
                        <a href="#"><FontAwesomeIcon icon={faTiktok} /></a>
                    </div>
                    <p>Free Hotline</p>
                    <ul>
                        <li>Sales Consultation: <b>1800.6601</b> (Option 1)</li>
                        <li>Technical Support: <b>1800.6601</b> (Option 2)</li>
                        <li>Feedback and Complaints: <b>1800.6616</b> (8 AM - 10 PM)</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>About Us</h4>
                    <ul>
                        <li>Company Introduction</li>
                        <li>Operating Regulations</li>
                        <li>F.Friends - Your Companion</li>
                        <li>Promotion News</li>
                        <li>Returned Products Introduction</li>
                        <li>Shopping & Online Payment Guide</li>
                        <li>Authorized Apple Dealer</li>
                        <li>E-Invoice Lookup</li>
                        <li>Warranty Lookup</li>
                        <li>Frequently Asked Questions</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Policies</h4>
                    <ul>
                        <li>Warranty Policy</li>
                        <li>Return Policy</li>
                        <li>Privacy Policy</li>
                        <li>Installment Payment Policy</li>
                        <li>Shipping & Installation Policy</li>
                        <li>FUE Mobile Network Policy</li>
                        <li>Personal Data Processing Policy</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
