import React, {useEffect, useState} from "react";
import {Container} from "reactstrap";
import Request from "../../utils/request";
import "./index.css"

function BlogItem(props) {
    const idNews = props.match.params.id;

    const [data, setData] = useState([]);
    const [dataComment, setDataComment] = useState([]);
    const [nameComment, setNameComment] = useState();
    const [email, setEmail] = useState();
    const [comment, setComment] = useState();

    const getNewsId = async () => {
        const {data} = await Request.getNoToken('news/' + idNews)
        setData(data);
        const dataComment = data.comments
        setDataComment(dataComment)
    };

    const addComment = async (e) => {
        e.preventDefault()
        await Request.putNoToken('cmt/' + idNews, {nameComment, email, comment})
        window.location.reload();
    }

    useEffect( () => {
        getNewsId();
    }, []);

    return (
        <Container fluid>
            <div className="slider-area ">
                <div className="single-slider slider-height2" style={{display: 'flex', alignItems: 'center'}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="hero-cap text-center">
                                    <h2>Blog details</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="blog_area single-post-area section-padding">
                <div className="container">
                    <div className="row" style={{display: 'flex'}}>
                        <div className="col-sm-8 posts-list" style={{maxWidth: '67%'}}>
                            <div className="single-post">
                                <div className="feature-img">
                                    <img alt={data.name} key={data._id}
                                         className="img-comment"
                                         src={data.image === 0 ? data.image : `http://localhost:4000/file/${data.image}`}/>
                                </div>
                                <div className="blog_details">
                                    <h2>
                                        {data.name}
                                    </h2>
                                    <p className="excert">
                                        {data.content}
                                    </p>
                                </div>
                            </div>
                            <div className="comments-area">
                                <h4>Comments review</h4>
                                <div className="comment-list">
                                    <div className="single-comment justify-content-between d-flex">
                                        {
                                            dataComment.map((cmt, index) => {
                                                return(
                                                    <div className="user" style={{display: 'flex', justifyContent: 'between', marginTop: '30px'}}>
                                                        <div style={{display: 'flex'}}>
                                                            <div className="thumb" style={{textAlign: 'center', minWidth: '100px'}}>
                                                                <img src="/assets/img/comment/comment_1.png"/>
                                                            </div>
                                                            <div className="justify-content-between" style={{justifyContent: 'between'}}>
                                                                <div className="d-flex align-items-center" style={{alignItems: 'center'}}>
                                                                    <span style={{marginLeft: '30px'}}>{cmt.nameComment}</span>

                                                                    <span style={{marginLeft: '30px'}}>{cmt.email} </span>
                                                                </div>
                                                                <div className="desc" style={{marginLeft: '30px'}}>
                                                                    <p className="comment">
                                                                        {cmt.comment}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="comment-form">
                                <h4>Comments</h4>
                                <form className="form-contact comment_form" action="#" id="commentForm">
                                    <div className="row">
                                        <div className="row" style={{display: 'flex'}}>
                                            <div style={{width: '50%'}}>
                                                <div className="form-group">
                                                    <input type="text" id="name" name="name" placeholder="Họ tên"
                                                           className="form-control"
                                                           required={true}
                                                           value={nameComment}
                                                           onChange={e => setNameComment(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div style={{width: '50%'}}>
                                                <div className="form-group">
                                                    <input type="text" id="email" name="email" placeholder="Email"
                                                           cols="30" rows="9"
                                                           className="form-control"
                                                           required={true}
                                                           value={email}
                                                           onChange={e => setEmail(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <textarea id="subject" name="subject" placeholder="Write something.."
                                                          cols="30" rows="9"
                                                          className="form-control"
                                                          required={true}
                                                          value={comment}
                                                          onChange={e => setComment(e.target.value)}>
                                                </textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="button button-contactForm btn_1 boxed-btn" onClick={addComment}>
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-sm-4" style={{marginLeft: '5%', minWidth: '27%'}}>
                            <div className="blog_right_sidebar">
                                <aside className="single_sidebar_widget search_widget">
                                    <form action="#">
                                        <div className="form-group">
                                            <div className="input-group mb-3">
                                                <input type="text" id="search" name="search" placeholder="Tên bài viết"
                                                       className="form-control"
                                                       required="required"/>
                                            </div>
                                        </div>
                                        <button className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn" style={{width: '100%'}}
                                                type="submit" >Search
                                        </button>
                                    </form>
                                </aside>

                                <aside className="single_sidebar_widget popular_post_widget">
                                    <h3 className="widget_title">Recent Post</h3>
                                    {

                                    }
                                </aside>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    )
}

export default BlogItem;
