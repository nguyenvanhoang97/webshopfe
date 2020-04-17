import React, {useEffect, useState} from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import "./productitem.css"
import {Container, Row, Col} from "reactstrap"

function ProductItem() {
    return(
        <Container fluid>
            <Header/>
            <Container fluid>
                <Row>
                    <Col sm={1}></Col>
                    <Col sm={10} className="product-details">
                        <Col sm={8} className="product-details-image">
                            Image
                        </Col>
                        <Col sm={4} className="details">
                            <h3 className="product-title">Title</h3>
                            <div className="rating">
                                <div className="stars">
                                </div>
                            </div>
                            <h4 className="price">Giá: <span></span></h4>
                            <h5 className="sizes">sizes:
                            </h5>
                            <h5 className="colors">colors:
                            </h5>
                            <div className="action">
                                <button className="btn btn-default" type="button">add to cart</button>
                                <button className="like btn btn-default" type="button">
                                    <span className="fa fa-heart"></span>
                                </button>
                            </div>
                        </Col>
                    </Col>
                    <Col sm={1}></Col>
                </Row>
                <Row>

                </Row>
            </Container>
            <Footer/>
        </Container>
    )
}

export default ProductItem;
