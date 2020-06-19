import React from "react";
import "./index.css"

function Footer() {

    const isAdmin = +localStorage.getItem("isAdmin")

    return(
        <div className="container-fluid">
            {!isAdmin && <div className="footer-area footer-padding">
                <div className="container">
                    <div className="row" style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div className="col-sm-3">
                            <div className=" mb-50">
                                <div className=" mb-30">
                                    <div className="footer-logo">
                                        <a href="/"><img src="/assets/img/logo/logo2_footer.png"/></a>
                                    </div>
                                    <div className="footer-tittle">
                                        <div className="footer-pera">
                                            <p></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className=" mb-50">
                                <div className="footer-tittle">
                                    <h4>Quick Links</h4>
                                    <ul style={{listStyle: 'none', margin: '0px', padding: '0px'}}>
                                        <li><a href="#">About</a></li>
                                        <li><a href="#"> Offers & Discounts</a></li>
                                        <li><a href="#"> Get Coupon</a></li>
                                        <li><a href="#"> Contact Us</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className=" mb-50">
                                <div className="footer-tittle">
                                    <h4>New Products</h4>
                                    <ul style={{listStyle: 'none', margin: '0px', padding: '0px'}}>
                                        <li><a href="#">Woman Cloth</a></li>
                                        <li><a href="#">Fashion Accessories</a></li>
                                        <li><a href="#"> Man Accessories</a></li>
                                        <li><a href="#"> Rubber made Toys</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className=" mb-50">
                                <div className="footer-tittle">
                                    <h4>Support</h4>
                                    <ul style={{listStyle: 'none', margin: '0px', padding: '0px'}}>
                                        <li><a href="#">Frequently Asked Questions</a></li>
                                        <li><a href="#">Terms & Conditions</a></li>
                                        <li><a href="#">Privacy Policy</a></li>
                                        <li><a href="#">Report a Payment Issue</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row" style={{alignItems: 'center', display: 'flex'}}>
                        <div className="col-xl-7 col-lg-8 col-md-7">
                            <div className="footer-copy-right">
                                <p>
                                    Copyright &copy;
                                    <script>document.write(new Date().getFullYear());</script>
                                    All rights reserved | This template is made with <i className="fa fa-heart"
                                                                                        aria-hidden="true"></i> by <a
                                    href="https://colorlib.com" target="_blank">Colorlib</a>

                                </p>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-4 col-md-5">
                            <div className="footer-copy-right" style={{flexWrap: 'right'}}>

                                <div className="footer-social">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Footer;
