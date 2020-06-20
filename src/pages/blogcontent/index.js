import React, {useEffect, useState} from "react";
import {Container} from "reactstrap";
import "./index.css"
import Request from "../../utils/request";
import Paginator from 'react-hooks-paginator';
import Moment from "react-moment";

function BlogContent() {

    const [dataShow, setDataShow] = useState([]);
    const [dataFull, setDataFull] = useState([]);
    const [search, setSearch] = useState([]);
    const pageLimit = 5;

    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);

    const getData = async () => {
        const {data} = await Request.getNoToken("news")
        console.log(data)
        setDataShow(data);
        setDataFull(data);
    };

    const searchBlog = async (search) => {
        if (search && search.length) {
            const {data} = await Request.getNoToken("news/?q=" + search)
            setDataShow(data)
        } else {
            setDataShow(dataFull);
        }
    };

    useEffect(() => {
        getData();
        searchBlog();
    }, []);

    useEffect(() => {
        setCurrentData(dataShow.slice(offset, offset + pageLimit));
    }, [offset, dataShow]);

    return (
        <Container fluid>
            <div className="slider-area ">
                <div className="single-slider slider-height2 d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="hero-cap text-center">
                                    <h2>Blog</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="blog_area section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mb-5 mb-lg-0">
                            {
                                currentData.map((blog, index) => {
                                    return(
                                        <article className="blog_item">
                                            <div className="blog_item_img">
                                                <img className="card-img rounded-0"
                                                     src={blog.image.indexOf('http')===0?blog.image:`http://localhost:4000/file/${blog.image}`}/>
                                                    <a href="#" className="blog_item_date">
                                                        <h3><Moment format="YYYY/MM/DD">{(blog.dateCreate)}</Moment></h3>
                                                    </a>
                                            </div>

                                            <div className="blog_details">
                                                <a className="d-inline-block" href={"/blog/" + blog._id}>
                                                    <h2>{blog.name}</h2>
                                                </a>

                                                <p className="text">{((blog.content || '').length > 500 ? `${blog.content.slice(0, 500)} ...`:blog.content)}</p>
                                                <ul className="blog-info-link">
                                                    <li><a href=""><i className="fa fa-comments"></i>{blog.comments.length}</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </article>
                                    )
                                })
                            }
                        </div>
                        <div className="col-lg-4">
                            <div className="blog_right_sidebar">
                                <aside className="single_sidebar_widget search_widget">
                                    <div>
                                        <div className="form-group">
                                            <div className="input-group mb-3">
                                                <input type="text" id="search" name="search" placeholder="Tên bài viết"
                                                       className="form-control"
                                                       required="required"
                                                       value={search}
                                                       onChange={e => setSearch(e.target.value)}/>
                                            </div>
                                        </div>
                                        <button className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn"
                                                type="submit" onClick={() => searchBlog(search)} >Search
                                        </button>
                                    </div>
                                </aside>

                                <aside className="single_sidebar_widget popular_post_widget">
                                    <h3 className="widget_title">Recent Post</h3>
                                        {
                                            currentData.map((blog, index) =>{
                                                return(
                                                    <div className="media post_item">
                                                        <img className="image_blog_rencent" src={blog.image.indexOf('http')===0?blog.image:`http://localhost:4000/file/${blog.image}`}/>
                                                            <div className="media-body">
                                                                <a href={"/blog/" + blog._id}>
                                                                    <h3>{blog.name}</h3>
                                                                </a>
                                                                <p><Moment format="YYYY/MM/DD">{(blog.dateCreate)}</Moment></p>
                                                            </div>
                                                    </div>
                                                )
                                            })
                                        }
                                </aside>
                            </div>
                        </div>
                    </div>
                </div>
                <Paginator
                    totalRecords={dataShow.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </section>
        </Container>
    )
}

export default BlogContent;
