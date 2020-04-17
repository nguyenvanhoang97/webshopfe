import React from "react";
import {Container, Row, Col} from "reactstrap"
import "./footer.css"

function Footer() {
    return(
        <Container fluid className="footer">
            <Container fluid className="footer-top">
                <div className="container">
                    <div className="row">
                        <Col sm={2}>
                            <div className="companyinfo">
                                <h2><span>e</span>-shopper</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,sed do eiusmod tempor</p>
                            </div>
                        </Col>
                        <Col sm={7}>
                        </Col>
                        <Col sm={3}>
                            <div className="address">
                                <img src="assets/images/home/map.png" alt="" />
                                <p>505 S Atlantic Ave Virginia Beach, VA(Virginia)</p>
                            </div>
                        </Col>
                    </div>
                </div>
            </Container>
            <Container fluid className="footer-bottom">
                <div className="container">
                    <div className="row">
                        <p className="pull-left">Copyright © 2013. All rights reserved.</p>
                        <p className="pull-right">Designed by <span><a target="_blank" href="http://www.themeum.com">Themeum</a></span></p>
                    </div>
                </div>
            </Container>
        </Container>
    )
}

export default Footer;
