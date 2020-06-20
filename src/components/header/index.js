import React from "react";
import "./index.css"
import { FaCartPlus, FaUsers } from 'react-icons/fa';

function Header() {
    const isAdmin = +localStorage.getItem("isAdmin")
    const logOut = async (e) => {
        localStorage.removeItem('token')
        localStorage.removeItem('isAdmin')
        window.location.replace('/')
    }
    return (
        <div className="container-fluid">
            <div className="header-area">
                <div className="main-header header-sticky">
                    <div className="container-fluid">
                        <div className="menu-wrapper">

                            <div className="logo">
                                <a href="#"><img src="/assets/img/logo/logo.png" /></a>
                            </div>

                            <div className="main-menu d-none d-lg-block">
                                <nav>
                                    <ul id="navigation" style={{listStyle: 'none'}}>
                                        {!isAdmin && <li><a href="/">Home</a></li>}
                                        {!isAdmin && <li><a href="/shop">Shop</a></li>}
                                        {!isAdmin && <li><a href="/about">About</a></li>}
                                        {!isAdmin && <li><a href="/blogs">Blog</a></li>}
                                        {!isAdmin && <li><a href="#">Pages</a>
                                            <ul className="submenu">
                                                <li><a href="/login">Login</a></li>
                                                <li><a href="/cart">Cart</a></li>
                                                <li><a href="/checkout">Product Checkout</a></li>
                                            </ul>
                                        </li>}
                                        {!isAdmin && <li><a href="/contact">Contact</a></li>}
                                        {isAdmin === 1 && <li><a href="/home">Home</a></li>}
                                        {isAdmin ===1 && <li><a href="/user">User</a></li>}
                                        {isAdmin ===1 && <li><a href="/order">Order</a></li>}
                                        {isAdmin ===1 && <li><a href="/news">News</a></li>}
                                    </ul>
                                </nav>
                            </div>
                            <div className="header-right">
                                <ul style={{listStyle: 'none'}}>
                                    <li><a href="/login"><span className=""><FaUsers color='black' style={{width: '30px'}}/></span></a></li>
                                    {!isAdmin && <li><a href="/cart"><span className=""><FaCartPlus color='black' style={{width: '30px'}}/></span></a></li>}
                                </ul>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="mobile_menu d-block d-lg-none"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;
