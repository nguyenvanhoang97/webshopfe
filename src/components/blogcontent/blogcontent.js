import React, {useEffect, useState} from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import {Container, Row, Col} from "reactstrap"
import "./blogcontent.css"

function BlogContent() {
    const [data, setData] = useState([]);
    useEffect(async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        setData(data);
        console.log(data);
    }, []);

    let blogItems = data.slice(0, 8);

    const [search, setSearch] = useState([]);

    return (
        <Container fluid>
            <Header/>
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
                                        <button className="btn-custom" type={"button"} onClick={() => setData(data.filter(i => i.id == search))}>
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
                                {blogItems.map((blog, index) => {
                                    return <Col sm={3}>
                                        <div className="example-2 card">
                                            <div className="wrapper">
                                                <div className="header">
                                                    <div className="date">
                                                        <span className="day">12</span>
                                                        <span className="month">Aug</span>
                                                        <span className="year">2016</span>
                                                    </div>
                                                    <ul className="menu-content">
                                                        <li>
                                                            <a href="#" className="fa fa-bookmark-o"></a>
                                                        </li>
                                                        <li><a href="#" className="fa fa-heart-o"><span>18</span></a>
                                                        </li>
                                                        <li><a href="#" className="fa fa-comment-o"><span>3</span></a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="data">
                                                    <div className="content">
                                                        <span className="author">{blog.title}</span>
                                                        <p className="text">{blog.body}</p>
                                                        <a href="#" className="button">Read more</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                })}
                            </Row>
                        </div>
                    </Col>
                </div>
            </Container>
            <Footer/>
        </Container>
    )
}

export default BlogContent;
