import React, {useEffect, useState} from "react";
import {Container, Col} from "reactstrap";
import Request from "../../utils/request";
import FormData from "form-data";

function AddNews(props) {
    const isAdd = props.match.path === '/add/news'
    const idNews = props.match.params.id;

    const [data, setData] = useState([])
    const [name, setName] = useState('');
    const [image, setImage] = useState({ preview: "", raw: "" });
    const [content, setContent] = useState('');

    const addNews = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('image', image.raw)
        data.append('name', name)
        data.append('content', content)
        await Request.post('news', data)
        window.location.replace('http://localhost:3000/news')
    }

    const updateNews = async e => {
        e.preventDefault()
        const data = new FormData()
        data.append('image', image.raw)
        data.append('name', name)
        data.append('content', content)
        await Request.put('news/' + idNews, data)
        window.location.replace('http://localhost:3000/news')
    }

    const getNewsId = async () => {
        const {data} = await Request.get('news/' + idNews)
        setImage({
            raw: data.image,
            preview: data.image.indexOf('http')===0?data.image:`http://localhost:4000/file/${data.image}`
        })
        setName(data.name)
        setContent(data.content)
        setData(data);
    };

    useEffect(() => {
        getNewsId()
    }, []);

    const handleChange = e => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    };

    return (
        <Container fluid className="container-body">
            <Container fluid className="comment-form">
                <Col sm={2}></Col>
                <Col sm={8}>
                    {isAdd && <h2 className="title-side text-center">Thêm bài viết</h2>}
                    {!isAdd && <h2 className="title-side text-center">Sửa bài viết</h2>}
                    <div>
                        <label htmlFor="">Tiêu đề bài viết</label>
                        <input type="text" id="name" name="name" placeholder="Tên sản phẩm"
                               required={true}
                               value={name}
                               onChange={e => setName(e.target.value)}/>

                        <label htmlFor="">Hình ảnh</label>

                        <div>
                            <label htmlFor="upload-button">
                                {image.preview ? (
                                    <img src={image.preview} alt="dummy" width="300" height="300" />
                                ) : (
                                    <>
                                        <h5 className="text-center">Upload your photo</h5>
                                    </>
                                )}
                            </label>
                            <input
                                type="file"
                                id="upload-button"
                                style={{ display: "none" }}
                                onChange={handleChange}
                            />
                        </div>

                        <label htmlFor="subject">Nội dung bài viết</label>
                        <textarea style={{height: '400px'}} id="content" name="content" placeholder="Mô tả chi tiết"
                                  required={true}
                                  value={content}
                                  onChange={e => setContent(e.target.value)}>
                        </textarea>
                        {isAdd && <button type="submit" className="btn-custom btn-comment-form" onClick={addNews}>
                            Thêm bài viết
                        </button>}
                        {!isAdd && <button type="submit" className="btn-custom btn-comment-form" onClick={updateNews}>
                            Sửa bài viết
                        </button>}
                    </div>
                </Col>
                <Col sm={2}></Col>
            </Container>
        </Container>
    )
}

export default AddNews;
