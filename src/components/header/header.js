import React, {} from "react";
import {Container, Row, Col} from "reactstrap"
import "./header.css";

function Header(props) {

    return(
        <Container fluid className="header">
            <Container fluid className="header-top">
                <div className="header_top">
                    <div className="container">
                        <div>
                            <Col sm={6}>
                                <Row className="contactinfo">
                                    <ul className="nav nav-pills">
                                        {/*<li><a><i className="fa fa-phone"></i> +2 95 01 88 821</a></li>*/}
                                        {/*<li><a><i className="fa fa-envelope"></i> info@domain.com</a></li>*/}
                                    </ul>
                                </Row>
                            </Col>
                            <Col sm={6}>
                                <Row className="social-icons pull-right">
                                    <ul className="nav navbar-nav">
                                        {/*<li><a><i className="fa fa-facebook"></i></a></li>*/}
                                        {/*<li><a><i className="fa fa-twitter"></i></a></li>*/}
                                        {/*<li><a><i className="fa fa-linkedin"></i></a></li>*/}
                                        {/*<li><a><i className="fa fa-dribbble"></i></a></li>*/}
                                        {/*<li><a><i className="fa fa-google-plus"></i></a></li>*/}
                                    </ul>
                                </Row>
                            </Col>
                        </div>
                    </div>
                </div>
            </Container>
            <Container fluid className="header-middle">
                <div className="container">
                    <div>
                        <Col sm={1}></Col>
                        <Col sm={4}>
                            <div className="mainmenu pull-left">
                                <ul className="nav navbar-nav collapse navbar-collapse">
                                    <li><a href="/" className="active">TRANG CHỦ</a></li>
                                    <li><a href="/user">NGƯỜI DÙNG</a></li>
                                    <li><a href="/news">BÀI VIẾT</a></li>
                                    <li><a href="/order">ĐƠN HÀNG</a></li>
                                    <li><a href="/blogs">TIN TỨC</a></li>
                                </ul>
                            </div>
                        </Col>
                        <Col sm={2}>
                            <div className="logo-chinh">
                                <a href="/">
                                    <img src="/assets/images/home/logo.png" alt="" />
                                </a>
                            </div>
                        </Col>
                        <Col sm={4}>

                            <div className="shop-menu pull-right">
                                <ul className="nav navbar-nav">
                                    <li>
                                        <a href="/login">
                                            <i className="fa fa-crosshairs" /> LOGIN
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <i className="fa fa-crosshairs"/> LOGOUT
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/cart">
                                            <i className="fa fa-crosshairs" /> CART
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </div>
                </div>
            </Container>
            <Container fluid className="header-middle hidden">
                <Col sm={1}></Col>
                <Col sm={4}>
                    <div className="mainmenu pull-left">
                        <ul className="nav navbar-nav collapse navbar-collapse">
                            <li><a href="/" className="active">TRANG CHỦ</a></li>
                            <li><a href="/blog">BÀI VIẾT<i></i></a></li>
                        </ul>
                    </div>
                </Col>
                <Col sm={2}>
                    <div className="logo-chinh">
                        <a href="/">
                            <img src="/assets/images/home/logo.png" alt="" />
                        </a>
                    </div>
                </Col>
                <Col sm={5}></Col>
            </Container>
        </Container>
    )
}

export default Header;
