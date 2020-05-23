import React, {useEffect, useState} from "react";
import {Container, Row, Col} from "reactstrap";
import "./index.css"
import * as axios from "axios";

function BlogContent() {
    const [dataShow, setDataShow] = useState([]);

    const getData = async () => {
        try {
            const {data} = await axios({
                method: 'GET',
                url: "http://localhost:4000/news",
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                json: true
            })
            console.log(data);
            setDataShow(data);
        } catch (e) {
            alert(e.response ? e.response.msg : e.message)
        }
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
                        <div className="features_items">
                            <h2 className="title-side text-center">
                                News
                            </h2>
                            <Row>
                                {dataShow.map((blog, index) => {
                                    return <Col sm={3}>
                                        <a href={"/blog/" + blog._id}>
                                            <div className="card">
                                                <div className="wrapper">
                                                    <div className="header">
                                                        <div className="date">
                                                            {blog.dateCreate}
                                                        </div>
                                                    </div>
                                                    <div className="data">
                                                        <div className="content">
                                                            <img alt="Ảnh tiêu đề" src={blog.image}/>
                                                            <span className="author">{blog.name}</span>
                                                            <p className="text">{blog.content}</p>
                                                            <a href="/news" className="button" >Read more</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </Col>
                                })}
                            </Row>
                        </div>
                    </Col>
                </div>
            </Container>
        </Container>
    )
}

export default BlogContent;
