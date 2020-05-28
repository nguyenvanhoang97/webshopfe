import React, {useEffect, useState} from "react";
import {Container, Row, Col} from "reactstrap";
import "./index.css"
import Request from "../../utils/request";

function BlogContent() {
    const [dataShow, setDataShow] = useState([]);

    const getData = async () => {
        const {data}= await Request.get("http://localhost:4000/news")
        console.log(data);
        setDataShow(data);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Container fluid>
            <Container fluid className="content">
                <div className="product-item">
                    <Col sm={3} className="left-side">
                        <Row className="left-sidebar">
                            <form className="search">
                                <h4 className="title-side">Tìm kiếm</h4>
                                <div className="search_box ">

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
                        <div className="product-item">
                            <h2 className="title-side text-center">
                                News
                            </h2>
                                {
                                    dataShow.map((blog, index) => {
                                        return (
                                            <Row className="card">
                                                <Col sm={4}>
                                                    <img alt="Ảnh tiêu đề" src={blog.image}/>
                                                </Col>
                                                <Col sm={8}>
                                                    <h4 className="title-side text-center">{blog.name}</h4>
                                                    <div className="">
                                                        <div className="data">
                                                            <div className="content">
                                                                <p className="text">{blog.content}</p>
                                                            </div>
                                                            <div className="text-center">
                                                                <a href={"/blog/" + blog._id} className="button" >Read more</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        );
                                    })
                                }
                        </div>
                    </Col>
                </div>
            </Container>
        </Container>
    )
}

export default BlogContent;
