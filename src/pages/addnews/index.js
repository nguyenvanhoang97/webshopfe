import React, {useState} from "react";
import {Container, Col} from "reactstrap";
import * as axios from "axios";

function AddNews(props) {
    const idNews = props.match.params.id;

    const [name, setName] = useState();
    const [content, setContent] = useState();

    const addNews = e => {
        e.preventDefault()

        axios({
            method: 'POST',
            url: 'http://localhost:4000/news',
            data: {
                name, content
            },
            headers: {
                'x-access-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            json: true
        })
            .then(function (response) {
                console.log(response);
                if (response) {

                } else {

                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const updateNews = e => {
        e.preventDefault()

        axios({
            method: 'PUT',
            url: 'http://localhost:4000/news/' + idNews,
            data: {
                name, content
            },
            headers: {
                'x-access-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            json: true
        })
            .then(function (response) {
                console.log(response);
                if (response) {

                } else {

                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return(
        <Container fluid>
            <Container fluid>
                <Col sm={2}></Col>
                <Col sm={8}>
                    <h2 className="title-side text-center">Thêm bài viết</h2>
                    <div>
                        <label htmlFor="fname">Tiêu đề bài viết</label>
                        <input type="text" id="name" name="name" placeholder="Tên sản phẩm"
                               required="required"
                               value={name}
                               onChange={e => setName(e.target.value)}/>

                        <label htmlFor="subject">Nội dung bài viết</label>
                        <textarea id="content" name="content" placeholder="Mô tả chi tiết"
                                  required="required"
                                  value={content}
                                  onChange={e => setContent(e.target.value)}>
                        </textarea>
                        <button type="submit" className="" onClick={addNews}>
                            Thêm bài viết
                        </button>
                        <button type="submit" className="" onClick={updateNews}>
                            Sửa bài viết
                        </button>
                    </div>
                </Col>
                <Col sm={2}></Col>
            </Container>
        </Container>
    )
}

export default AddNews;
