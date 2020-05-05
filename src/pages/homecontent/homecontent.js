import React, {useEffect, useState} from "react";
import {Container, Row, Col} from "reactstrap"
import * as axios from 'axios'
import "./homecontent.css"

function HomeContent() {
    const [dataShow, setDataShow] = useState([]);
    const [dataFull, setDataFull] = useState([]);
    const [search, setSearch] = useState([]);

    const getData = async () => {
        const {data} = await axios("http://localhost:4000/product");
        setDataShow(data);
        console.log(data);
        setDataFull(data);
    };

    useEffect(() => {
        getData();
    }, []);

    const searchProduct = text => {
        if (text && text.length) {
            const newData = dataFull.filter(i => i._id === text);
            setDataShow(newData);
        } else {
            setDataShow(dataFull);
        }
    };

    return (
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
                                    <button className="btn-custom" type={"button"}
                                            onClick={() => searchProduct(search)}>
                                        Search
                                    </button>
                                </Col>
                            </div>
                        </form>
                    </Row>
                    <hr width="100%" align="center"/>
                    <br/>
                    <Row className="left-sidebar">
                        <form>
                            <h4 className="title-side">Lọc theo ID</h4>
                            <ul>
                                <li>
                                    <input type="radio" name="radio-btn"/>Từ 0 đến 10
                                </li>
                                <li>
                                    <input type="radio" name="radio-btn"/>Từ 11 đến 20
                                </li>
                            </ul>
                        </form>
                    </Row>
                    <hr width="100%" align="center"/>
                    <br/>
                    <Row className="left-sidebar">
                        <h4 className="title-side">Sản phẩm bán chạy</h4>
                        <Col sm={2}></Col>
                        <Col sm={10}>
                            {

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
                                dataShow.map((product, index) => {
                                    return (
                                        <Col sm={4}>
                                            <div className="product-img">
                                                <a href={"/product/" + product._id}>

                                                    <img alt={product.name} key={product._id}
                                                         className="img-product"
                                                         src={product.image}/>

                                                    <h3 className="title-side text-center">{product.name}</h3>
                                                </a>
                                                <h3 className="text-center">Giá: {product.price} vnđ</h3>
                                                <button className="btn-custom product-btn">Add to cart</button>
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
    )
}

export default HomeContent;
