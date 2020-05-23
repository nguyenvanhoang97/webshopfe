import React, {useEffect, useState} from "react";
import {Container, Col, Table, Button} from "reactstrap";
import * as axios from "axios";

function NewsContent() {
    const [data, setData] = useState([]);

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
            setData(data)
        } catch (e) {
            alert(e.response ? e.response.msg : e.message)
        }
    };

    useEffect( () => {
        getData();
    }, []);

    const removeNews = async (idNews) => {
        axios({
            method: 'DELETE',
            url: 'http://localhost:4000/news/' + idNews,
            headers: {
                'x-access-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            json: true
        })
        window.location.reload();
    };

    const editNews = async (idNews) => {
        window.location.replace('http://localhost:3000/edit/news/'+ idNews);
    };

    const dataNews = (news, index) => {
        return (
            <tr key={index}>
                <td>{news._id}</td>
                <td>{news.name}</td>
                <td>{news.dateCreate}</td>
                <td>{news.dateUpdate}</td>
                <td>{news.content}</td>
                <td>
                    <button className="btn-custom" onClick={() => editNews(news._id)}>Edit</button>
                    <button className="btn-custom" onClick={() => removeNews(news._id)}>Delete</button>
                </td>
            </tr>
        )
    }

    return(
        <Container fluid>
            <Container fluid className="">
                <h2 className="title-side text-center">Danh mục người dùng</h2>
                <Col sm={2}></Col>
                <Col sm={8}>
                    <Table className="table">
                        <thead>
                        <th className="text-center">ID</th>
                        <th className="text-center">Title</th>
                        <th className="text-center">Image</th>
                        <th className="text-center">Image</th>
                        <th></th>
                        </thead>
                        <tbody>
                        {data.map(dataNews)}
                        </tbody>
                    </Table>
                    <Button className="btn-custom" href="/add/user">Thêm người dùng</Button>
                </Col>
                <Col sm={2}></Col>
            </Container>
        </Container>
    )
}

export default NewsContent;
