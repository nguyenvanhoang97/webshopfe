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
        window.location.replace('/news')
    }

    const updateNews = async e => {
        e.preventDefault()
        const data = new FormData()
        data.append('image', image.raw)
        data.append('name', name)
        data.append('content', content)
        await Request.put('news/' + idNews, data)
        window.location.replace('/news')
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
        <Container fluid>
            <div className="slider-area ">
                <div className="single-slider slider-height2" style={{display: 'flex', alignItems: 'center'}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="hero-cap text-center">
                                    {isAdd && <h2>Add news</h2>}
                                    {!isAdd && <h2>Edit news</h2>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="blog_area section-padding" style={{maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto'}}>
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
                    {isAdd && <button type="submit" className="btn" onClick={addNews}>
                        Thêm bài viết
                    </button>}
                    {!isAdd && <button type="submit" className="btn" onClick={updateNews}>
                        Sửa bài viết
                    </button>}
                </div>
            </section>
        </Container>
    )
}

export default AddNews;
