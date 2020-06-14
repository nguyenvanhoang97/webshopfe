import React, {} from "react";
import {Container, Col} from "reactstrap"
import "./header.css";

function Header() {
    const isAdmin = +localStorage.getItem("isAdmin")
    return (
        <Container fluid className="header">
            <Container fluid className="header-middle">
                <div className="container">
                    <div>
                        <Col sm={1}></Col>
                        <Col sm={4}>
                            <div className="mainmenu pull-left">
                                <ul className="nav navbar-nav collapse navbar-collapse">
                                    {isAdmin===0 && <li><a href="/" className="active">TRANG CHỦ</a></li>}
                                    {isAdmin===0 && <li><a href="/blogs">TIN TỨC</a></li>}

                                    {isAdmin===1 && <li><a href="/home" className="active">TRANG CHỦ</a></li>}
                                    {isAdmin===1 && <li><a href="/user">NGƯỜI DÙNG</a></li>}
                                    {isAdmin===1 && <li><a href="/news">BÀI VIẾT</a></li>}
                                    {isAdmin===1 && <li><a href="/order">ĐƠN HÀNG</a></li>}
                                </ul>
                            </div>
                        </Col>
                        <Col sm={2}>
                            <div className="logo-chinh">
                                <a href="/">
                                    <img src="/assets/images/home/logo.png" alt=""/>
                                </a>
                            </div>
                        </Col>
                        <Col sm={4}>
                            <div className="shop-menu pull-right">
                                <ul className="nav navbar-nav">
                                    <li>
                                        <a href="/login">
                                            <i className="fa fa-crosshairs"/> LOGIN
                                        </a>
                                    </li>
                                    {isAdmin===0 && <li>
                                        <a href="/register">
                                            <i className="fa fa-crosshairs"/> REGISTER
                                        </a>
                                    </li>}
                                    <li>
                                        <a>
                                            <i className="fa fa-crosshairs"/> LOGOUT
                                        </a>
                                    </li>
                                    {isAdmin===0 && <li>
                                        <a href="/cart">
                                            <i className="fa fa-crosshairs"/> CART
                                        </a>
                                    </li>}
                                </ul>
                            </div>
                        </Col>
                    </div>
                </div>
            </Container>
        </Container>
    )
}

export default Header;
