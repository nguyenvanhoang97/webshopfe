import React, {useEffect, useState} from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import {Container, Row, Col} from "reactstrap"
import "./homecontent.css"

function HomeContent() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState([]);

    useEffect(async () => {
        window.addEventListener('mousemove', async () => {
            const res = await fetch("https://jsonplaceholder.typicode.com/albums/1/photos");
            const data = await res.json();
            setData(data);
            console.log(data);
        });
    }, []);

    let productItems = data.slice(0,12);

    let products = data.slice(0, 3);

    const searchProduct = text => {
        const newData = data.filter(i => i.id == search);
        setData(newData);
    };

    return (
        <Container fluid>
            <Header/>
            <Container fluid className="content">
                <div className="content">
                    <Col className="left-sidebar" sm={3}>
                        <Row className="left-sidebar">
                            <form className="search">
                                <h4 className="title-side">Tìm kiếm</h4>
                                <div className="search_box ">
                                    <Col sm={9}>
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            onChange={(e) => {
                                                setSearch(e.target.value);
                                            }}
                                        />
                                    </Col>
                                    <Col sm={3}>
                                        <button className="btn-custom" type={"button"} onClick={() => searchProduct()}>
                                            Search
                                        </button>
                                    </Col>
                                </div>
                            </form>
                        </Row>
                        <hr  width="100%" align="center" />
                        <br/>
                        <Row className="left-sidebar">
                            <form>
                                <h4 className="title-side">Lọc theo ID</h4>
                                <ul>
                                    <li>
                                        <input type="radio" name="radio-btn" />Từ 0 đến 10</li>
                                    <li>
                                        <input type="radio" name="radio-btn" />Từ 11 đến 20</li>
                                </ul>
                            </form>
                        </Row>
                        <hr  width="100%" align="center" />
                        <br/>
                        <Row className="left-sidebar">
                            <h4 className="title-side">Sản phẩm bán chạy</h4>
                            <Col sm={2}></Col>
                            <Col sm={10}>
                                {
                                    products.map((product, i) => {
                                        return (
                                            <Row>
                                                <div className="">
                                                    <img alt={product.title} key={product.id}
                                                         className=""
                                                         src={product.thumbnailUrl}/>
                                                </div>
                                                <div className="">
                                                    <h6 className="">{product.title}</h6>
                                                    <h5>30000</h5>
                                                </div>
                                            </Row>
                                        );
                                    })
                                }
                            </Col>
                        </Row>
                    </Col>

                    <Col sm={9} className="">
                        <div className="productlist">

                            <h2 className="title-side text-center">
                                Danh mục sản phẩm
                            </h2>
                            <div>
                                {
                                    productItems.map((product, i) => {
                                        return (
                                            <Col className="w-20" sm={2}>
                                                <div className="">
                                                    <img alt={product.title} key={product.id}
                                                         className="img-product"
                                                         src={product.thumbnailUrl}/>
                                                    <h6 className="">{product.title}</h6>
                                                    <h5>30000</h5>
                                                </div>
                                            </Col>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </Col>
                </div>
            </Container>
            <Footer/>
        </Container>
    )
}

export default HomeContent;
