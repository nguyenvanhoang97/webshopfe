import React, {useEffect, useState} from "react";
import {Container, Col, Table, Button} from "reactstrap";
import Request from "../../utils/request";
import Moment from 'react-moment';
import 'moment-timezone';

function NewsContent() {
    const [data, setData] = useState([]);

    const getData = async () => {
        const {data} = await Request.get("http://localhost:4000/news")
        console.log(data);
        setData(data)
    };

    useEffect( () => {
        getData();
    }, []);

    const removeNews = async (idNews) => {
        Request.delete('http://localhost:4000/news/' + idNews)
        window.location.reload();
    };

    const editNews = async (idNews) => {
        window.location.replace('http://localhost:3000/edit/news/'+ idNews);
    };

    const dataNews = (news, index) => {
        return (
            <tr key={index}>
                <td className="text-center">{news._id}</td>
                <td className="text-center">{news.name}</td>
                <td><img className="image-table" src={news.image.indexOf('http')===0?news.image:`http://localhost:4000/file/${news.image}`}/></td>
                <td className="text-center"><Moment>{news.dateCreate}</Moment></td>
                <td className="text-center"><Moment>{news.dateUpdate}</Moment></td>
                <td>{news.content}</td>
                <td className="text-center">
                    <button className="btn-custom" onClick={() => editNews(news._id)}>Edit</button>
                    <button className="btn-custom" onClick={() => removeNews(news._id)}>Delete</button>
                </td>
            </tr>
        )
    }

    return(
        <Container fluid>
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
                            <input />
                            <button className="btn-custom">Search</button>
                        </th>
                        </thead>
                        <tbody>
                        {data.map(dataNews)}
                        </tbody>
                    </Table>
                    <Button className="btn-custom btn-comment-form" href="/add/user">Thêm người dùng</Button>
                </Col>
                <Col sm={1}></Col>
            </Container>
        </Container>
    )
}

export default NewsContent;
