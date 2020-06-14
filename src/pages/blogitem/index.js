import React, {useEffect, useState} from "react";
import {Container, Row, Col} from "reactstrap";
import Request from "../../utils/request";

function BlogItem(props) {
    const idNews = props.match.params.id;

    const [data, setData] = useState([]);
    const [dataComment, setDataComment] = useState([]);
    const [nameComment, setNameComment] = useState();
    const [email, setEmail] = useState();
    const [comment, setComment] = useState();

    const getNewsId = async () => {
        const {data} = await Request.get('news/' + idNews)
        const dataComment = data.comments
        setDataComment(dataComment)
        setData(data);
    };

    const addComment = e => {
        e.preventDefault()
        Request.put('cmt/' + idNews, {nameComment, email, comment})
        window.location.reload();
    }

    useEffect( () => {
        getNewsId();
    }, []);

    return (
        <Container fluid>
            <Container fluid className="content">
                <div className="product-item">
                    <Col sm={3} className="left-side">
                        <Row className="left-sidebar">
                            <h4 className="title-side">Tin tức liên quan</h4>

                        </Row>
                    </Col>

                    <Col sm={9} className="padding-right">
                        <div className="product-item">
                            <h2 className="title-side text-center">
                                {data.name}
                            </h2>
                            <Row>
                                <Col sm={1}></Col>
                                <Col sm={10}>
                                    <h4>{data.content}</h4>
                                    <Row className="comment">
                                        <h2 className="title-side text-center comment-form">Bình luận</h2>
                                        <Row>
                                            <Col sm={1}></Col>
                                            <Col sm={10}>
                                                {
                                                    dataComment.map((cmt, index) => {
                                                        return (
                                                            <Row key={index}>
                                                                <div className="comment-main-level">
                                                                    <div className="comment-avatar">
                                                                        <img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg"
                                                                             alt=""/>
                                                                    </div>
                                                                    <div className="comment-box">
                                                                        <div className="comment-head">
                                                                            <h6 className="comment-name"><a
                                                                                href="http://creaticode.com/blog">{cmt.nameComment}</a></h6>
                                                                            <h6 className="comment-name">{cmt.email}</h6>
                                                                        </div>
                                                                        <div className="comment-content">
                                                                            {cmt.comment}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Row>
                                                        );
                                                    })
                                                }
                                                <div className="comment-form">
                                                    <h2 className="title-side text-center">Đánh giá</h2>
                                                    <Row className="input-form">
                                                        <Col sm={2}>
                                                            <h3 htmlFor="fname">Họ tên: </h3>
                                                        </Col>
                                                        <Col sm={10}>
                                                            <input type="text" id="name" name="name" placeholder="Họ tên"
                                                                   required={true}
                                                                   value={nameComment}
                                                                   onChange={e => setNameComment(e.target.value)}
                                                            />
                                                        </Col>
                                                    </Row>

                                                    <Row className="input-form">
                                                        <Col sm={2}>
                                                            <h3 htmlFor="email">Email: </h3>
                                                        </Col>
                                                        <Col sm={10}>
                                                            <input type="text" id="email" name="email" placeholder="Email"
                                                                   required={true}
                                                                   value={email}
                                                                   onChange={e => setEmail(e.target.value)}
                                                            />
                                                        </Col>
                                                    </Row>

                                                    <Row className="input-form">
                                                        <Col sm={2}>
                                                            <h3 htmlFor="subject">Comment: </h3>
                                                        </Col>
                                                        <Col sm={10}>
                                                    <textarea id="subject" name="subject" placeholder="Write something.."
                                                              required={true}
                                                              value={comment}
                                                              onChange={e => setComment(e.target.value)}>
                                                    </textarea>
                                                        </Col>
                                                    </Row>
                                                    <button type="submit" className="btn-custom btn-comment-form" onClick={addComment}>
                                                        Submit
                                                    </button>
                                                </div>
                                            </Col>
                                            <Col sm={1}></Col>
                                        </Row>
                                    </Row>
                                </Col>
                                <Col sm={1}></Col>
                            </Row>
                        </div>
                    </Col>
                </div>
            </Container>
        </Container>
    )
}

export default BlogItem;
