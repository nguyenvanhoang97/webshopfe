import React, {useEffect, useState} from "react";
import {Container, Row, Col} from "reactstrap"
import "./index.css"
import Request from "../../utils/request";
import Paginator from "react-hooks-paginator";

function HomeContent() {
    const [dataShow, setDataShow] = useState([]);
    const [dataFull, setDataFull] = useState([]);
    const [search, setSearch] = useState([]);
    const pageLimit = 12;

    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);

    const getData = async () => {
        const {data} = await Request.getNoToken("product")
        setDataShow(data);
        setDataFull(data);
    };

    const searchProduct = async (search) => {
        if (search && search.length) {
            const {data} = await Request.getNoToken("search/product/?q=" + search)
            console.log(data)
            setDataShow(data)
        } else {
            setDataShow(dataFull);
        }
    };

    useEffect(() => {
        setCurrentData(dataShow.slice(offset, offset + pageLimit));
    }, [offset, dataShow]);

    const addToCart = async (idProduct) => {
        await Request.put('cart', {idProduct, amount: 1})
            .then( function (response) {
                alert("Da them vao gio hang")
            }).catch(err => {
            alert("Da co trong gio hang hoac chua dang nhap")
        })
    };

    useEffect(() => {
        getData();
        searchProduct();
    }, []);

    return (
        <Container fluid className="container-body">
            <section className="content">
                <Col className="left-sidebar" sm={3}>
                    <Row className="left-sidebar">
                        <form className="search">
                            <h4 className="title-side">Tìm kiếm</h4>
                            <div className="search_box ">
                                <Col sm={9}>
                                    <input className="input_search" type="text" id="search" name="search" placeholder="Tên sản phẩm"
                                           required="required"
                                           value={search}
                                           onChange={e => setSearch(e.target.value)}/>
                                </Col>
                                <Col sm={3}>
                                    <button className="btn-custom btn-search" type={"button"}
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
                                currentData.map((product, index) => {
                                    return (
                                        <Col sm={4}>
                                            <div className="product-img">
                                                <a href={"/product/" + product._id}>

                                                    <img alt={product.name} key={product._id}
                                                         className="img-product-content"
                                                         src={product.image.indexOf('http')===0?product.image:`http://localhost:4000/file/${product.image}`}/>

                                                    <h3 className="title-side text-center">{product.name}</h3>
                                                </a>
                                                <h3 className="text-center">Giá: {product.price} vnđ</h3>
                                                <button className="btn-custom product-btn" onClick={() => addToCart(product._id)}>Add to cart</button>
                                            </div>
                                        </Col>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <Paginator
                        totalRecords={dataShow.length}
                        pageLimit={pageLimit}
                        pageNeighbours={2}
                        setOffset={setOffset}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </Col>
            </section>
        </Container>
    )
}

export default HomeContent;
