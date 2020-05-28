import React, {useEffect, useState} from "react";
import {Container, Col} from "reactstrap";
import Request from "../../utils/request";
import FormData from "form-data";

function AddNews(props) {
    const idNews = props.match.params.id;

    const [data, setData] = useState([])
    const [name, setName] = useState();
    const [image, setImage] = useState();
    const [content, setContent] = useState();

    const addNews = e => {
        e.preventDefault()
        const data=new FormData()
        data.append('image',image)
        data.append('name',name)
        data.append('content',content)
        Request.post('http://localhost:4000/news', data)
        window.location.replace('http://localhost:3000/news')
    }

    const updateNews = e => {
        e.preventDefault()
        const data=new FormData()
        data.append('image',image)
        data.append('name',name)
        data.append('content',content)
        Request.put('http://localhost:4000/news' + idNews, data)
        window.location.replace('http://localhost:3000/news')
    }

    const getNewsId = async () => {
        const {data} = await Request.get('http://localhost:4000/news/' + idNews)
        setData(data);
    };

    useEffect( () => {
        getNewsId();
    }, []);

    const handleChange = e => {
        if (e.target.files.length) {
            setImage(
                e.target.files[0]
            );
        }
    };

    return(
        <Container fluid>
            <Container fluid className="comment-form">
                <Col sm={2}></Col>
                <Col sm={8}>
                    <h2 className="title-side text-center">Thêm bài viết</h2>
                    <div>
                        <label htmlFor="">Tiêu đề bài viết</label>
                        <input type="text" id="name" name="name" placeholder="Tên sản phẩm"
                               required="required"
                               value={data.name}
                               onChange={e => setName(e.target.value)}/>

                        <label htmlFor="">Hình ảnh sản phẩm</label>
                        <input type="file" name="image" id="image" onChange={handleChange}/>

                        <label htmlFor="subject">Nội dung bài viết</label>
                        <textarea id="content" name="content" placeholder="Mô tả chi tiết"
                                  required="required"
                                  value={data.content}
                                  onChange={e => setContent(e.target.value)}>
                        </textarea>
                        <button type="submit" className="btn-custom btn-comment-form" onClick={addNews}>
                            Thêm bài viết
                        </button>
                        <button type="submit" className="btn-custom btn-comment-form" onClick={updateNews}>
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
