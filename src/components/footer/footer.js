import React from "react";
import {Container} from "reactstrap"
import "./footer.css"

function Footer() {
    return(
        <Container fluid className="footer">
                <div className="container footer-bottom">
                    <div className="row">
                        <p className="pull-left">Copyright © 2013. All rights reserved.</p>
                        <p className="pull-right">Designed by <span><a target="_blank" href="http://www.themeum.com">Themeum</a></span></p>
                    </div>
                </div>
        </Container>
    )
}

export default Footer;
