import React, {useEffect, useState} from "react";
import {Container, Row, Col} from "reactstrap";
import "./index.css"
import Request from "../../utils/request";
import Paginator from 'react-hooks-paginator';

function BlogContent() {

    const [dataShow, setDataShow] = useState([]);
    const [dataFull, setDataFull] = useState([]);
    const [search, setSearch] = useState([]);
    const pageLimit = 5;

    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);

    const getData = async () => {
        const {data} = await Request.getNoToken("news")
        setDataShow(data);
        setDataFull(data);
    };

    const searchBlog = async (search) => {
        if (search && search.length) {
            const {data} = await Request.getNoToken("news/?q=" + search)
            console.log(data)
            setDataShow(data)
        } else {
            setDataShow(dataFull);
        }
    };

    useEffect(() => {
        getData();
        searchBlog();
    }, []);

    useEffect(() => {
        setCurrentData(dataShow.slice(offset, offset + pageLimit));
    }, [offset, dataShow]);

    return (
        <Container fluid className="container-body">
            <Container fluid className="content">
                <div className="product-item">
                    <Col sm={3} className="left-side">
                        <Row className="left-sidebar">
                            <form className="search">
                                <h4 className="title-side">Tìm kiếm</h4>
                                <div className="search_box ">
                                    <Col sm={9}>
                                        <input type="text" id="search" name="search" placeholder="Tên sản phẩm"
                                               required="required"
                                               value={search}
                                               onChange={e => setSearch(e.target.value)}/>
                                    </Col>
                                    <Col sm={3}>
                                        <button className="btn-custom btn-search" type={"button"}
                                                onClick={() => searchBlog(search)}>
                                            Search
                                        </button>
                                    </Col>
                                </div>
                            </form>
                        </Row>
                        <hr width="100%" align="center"/>
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
                                currentData.map((blog, index) => {
                                    return (
                                        <Row className="card">
                                            <Col sm={4}>
                                                <img className="image-table"
                                                     src={blog.image.indexOf('http') === 0 ? blog.image : `http://localhost:4000/file/${blog.image}`}/>
                                            </Col>
                                            <Col sm={8}>
                                                <h4 className="title-side text-center">{blog.name}</h4>
                                                <div className="">
                                                    <div className="data">
                                                        <div className="content">
                                                            <p className="text">{((blog.content || '').length > 500 ? `${blog.content.slice(0, 500)} ...`:blog.content)}</p>
                                                        </div>
                                                        <div className="text-center">
                                                            <a href={"/blog/" + blog._id} className="button">Read
                                                                more</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    );
                                })
                            }
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
                </div>
            </Container>
        </Container>
    )
}

export default BlogContent;
