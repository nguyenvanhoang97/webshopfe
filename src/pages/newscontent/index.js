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
        window.location.replace('http://localhost:3000/edit/news/'+ idNews);
    };

    const dataNews = (news, index) => {
        return (
            <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{news.name}</td>
                <td><img className="image-table" src={news.image.indexOf('http')===0?news.image:`http://localhost:4000/file/${news.image}`}/></td>
                <td className="text-center"><Moment>{news.dateCreate}</Moment></td>
                <td className="text-center"><Moment>{news.dateUpdate}</Moment></td>
                <td>{((news.content || '').length > 500 ? `${news.content.slice(0, 500)} ...`:news.content)}</td>
                <td className="text-center">
                    <button className="btn-custom" onClick={() => editNews(news._id)}>Edit</button>
                    <button className="btn-custom" onClick={() => removeNews(news._id)}>Delete</button>
                </td>
            </tr>
        )
    }

    return(
        <Container fluid className="container-body">
            <Container fluid className="comment-form">
                <h2 className="title-side text-center">Danh mục người dùng</h2>
                <Col sm={1}></Col>
                <Col sm={10}>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <th style={{width: '5%'}} className="text-center">STT</th>
                        <th style={{width: '15%'}} className="text-center">Tiêu đề</th>
                        <th style={{width: '20%'}} className="text-center">Hình ảnh</th>
                        <th style={{width: '10%'}} className="text-center">Ngày tạo</th>
                        <th style={{width: '10%'}} className="text-center">Ngày cập nhật</th>
                        <th style={{width: '25%'}} className="text-center">Nội dung</th>
                        <th style={{width: 'auto'}} className="table-search text-center">
                            <input type="text" id="search" name="search" placeholder="Tên sản phẩm"
                                   required="required"
                                   value={search}
                                   onChange={e => setSearch(e.target.value)}/>
                            <button className="btn-custom" type={"button"}
                                    onClick={() => searchNews(search)}>
                                Search
                            </button>
                        </th>
                        </thead>
                        <tbody>
                        {currentData.map(dataNews)}
                        <Paginator
                            totalRecords={dataShow.length}
                            pageLimit={pageLimit}
                            pageNeighbours={2}
                            setOffset={setOffset}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                        </tbody>
                    </Table>
                    <Button className="btn-custom btn-comment-form" href="/add/news">Thêm bài viết</Button>
                </Col>
                <Col sm={1}></Col>
            </Container>
        </Container>
    )
}

export default NewsContent;
