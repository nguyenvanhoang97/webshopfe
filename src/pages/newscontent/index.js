import React, {useEffect, useState} from "react";
import {Container, Col, Table, Button} from "reactstrap";
import Request from "../../utils/request";
import Moment from 'react-moment';
import 'moment-timezone';
import Paginator from "react-hooks-paginator";

function NewsContent() {
    const [dataShow, setDataShow] = useState([]);
    const [dataFull, setDataFull] = useState([]);
    const [search, setSearch] = useState([]);
    const pageLimit = 10;

    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);

    const getData = async () => {
        const {data} = await Request.get("news")
        setDataShow(data);
        setDataFull(data);
    };

    const searchNews = async (search) => {
        if (search && search.length) {
            const {data} = await Request.get("search/news/?q=" + search)
            setDataShow(data)
        } else {
            setDataShow(dataFull);
        }
    };

    useEffect( () => {
        getData();
        searchNews()
    }, []);

    useEffect(() => {
        setCurrentData(dataShow.slice(offset, offset + pageLimit));
    }, [offset, dataShow]);

    const removeNews = async (idNews) => {
        await Request.delete('news/' + idNews)
        window.location.reload();
    };

    const editNews = async (idNews) => {
        window.location.replace('/edit/news/'+ idNews);
    };

    const dataNews = (news, index) => {
        return (
            <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{news.name}</td>
                <td className="text-center"><img style={{width: '150px', height: '150px'}} src={news.image.indexOf('http')===0?news.image:`http://localhost:4000/file/${news.image}`}/></td>
                <td className="text-center"><Moment>{news.dateCreate}</Moment></td>
                <td className="text-center"><Moment>{news.dateUpdate}</Moment></td>
                <td>{((news.content || '').length > 500 ? `${news.content.slice(0, 500)} ...`:news.content)}</td>
                <td className="text-center">
                    <button className="btn_3" style={{padding: '9px'}} onClick={() => editNews(news._id)}>Edit</button>
                    <button className="btn_3" style={{padding: '9px'}} onClick={() => removeNews(news._id)}>Delete</button>
                </td>
            </tr>
        )
    }

    return(
        <Container fluid>
            <div className="slider-area ">
                <div className="single-slider slider-height2 d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="hero-cap text-center">
                                    <h2>News List</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="cart_area section_padding">
                <div className="container_table">
                    <div className="cart_inner">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th style={{width: '5%', fontSize: '16px', verticalAlign: 'middle'}} className="text-center" scope="col">STT</th>
                                    <th style={{width: '20%', fontSize: '16px', verticalAlign: 'middle'}} className="text-center" scope="col">Tiêu đề bài viết</th>
                                    <th style={{width: '10%', fontSize: '16px', verticalAlign: 'middle'}} className="text-center" scope="col">Hình ảnh</th>
                                    <th style={{width: '12%', fontSize: '16px', verticalAlign: 'middle'}} className="text-center" scope="col">Ngày tạo</th>
                                    <th style={{width: '12%', fontSize: '16px', verticalAlign: 'middle'}} className="text-center" scope="col">Ngày cập nhật</th>
                                    <th style={{width: '25%', fontSize: '16px', verticalAlign: 'middle'}} className="text-center" scope="col">Nội dung</th>
                                    <th style={{width: 'auto'}} className="text-center" scope="col">
                                        <input style={{width: 'auto'}} type="text" id="search" name="search" placeholder="Tiêu đề bài viết"
                                               required="required"
                                               value={search}
                                               onChange={e => setSearch(e.target.value)}/>
                                        <button className="btn_3" style={{padding: '9px'}} type={"button"}
                                                onClick={() => searchNews(search)}>
                                            Search
                                        </button>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentData.map(dataNews)}
                                </tbody>
                            </table>
                            <Paginator
                                totalRecords={dataShow.length}
                                pageLimit={pageLimit}
                                pageNeighbours={2}
                                setOffset={setOffset}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                            <div className="checkout_btn_inner float-right">
                                <button href="/add/news" className="btn">Thêm bài viết</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    )
}

export default NewsContent;
