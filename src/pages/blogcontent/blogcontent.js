import React, {useState} from "react";
import {Container, Row, Col} from "reactstrap";
import "./blogcontent.css"

function BlogContent() {
    const [data, setData] = useState([]);

    const [search, setSearch] = useState([]);

    return (
        <Container fluid>
            <Container fluid className="content">
                <div className="product-item">
                    <Col sm={3} className="left-side">
                        <Row className="left-sidebar">
                            <form className="search">
                                <h4 className="title-side">Tìm kiếm</h4>
                                <div className="search_box ">
                                    <Col sm={9}>
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            onChange={(e) => {
                                                setSearch(e.target.value)
                                            }}
                                        />
                                    </Col>
                                    <Col sm={3}>
                                        <button className="btn-custom" type={"button"} onClick={() => setData(data.filter(i => i.id === Number(search)))}>
                                            Search
                                        </button>
                                    </Col>
                                </div>
                            </form>
                        </Row>
                        <hr  width="100%" align="center" />
                        <br/>
                        <Row className="left-sidebar">
                            <h4 className="title-side">Tin tức liên quan</h4>

                        </Row>
                    </Col>

                    <Col sm={9} className="padding-right">
                        <div className="features_items">
                            <h2 className="title-side text-center">
                                News
                            </h2>
                            <Row>
                                {

                                }
                            </Row>
                        </div>
                    </Col>
                </div>
            </Container>
        </Container>
    )
}

export default BlogContent;
