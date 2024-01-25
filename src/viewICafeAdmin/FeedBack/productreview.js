import CsLineIcons from 'cs-line-icons/CsLineIcons'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Dropdown, Form, OverlayTrigger, Pagination, Row, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';
import Rating from 'react-rating-stars-component';
// import Select from 'react-select';
import './feedback.css'
// import { CompanyProductViewURL } from 'Redux/AdminRedux/Feedback/feedbackRedux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const productview = () => {
    const title = 'Product View'
    const history = useHistory('');
    const dispatch = useDispatch('');
    const location = useLocation('')
    const [page, setPage] = useState(0);
    console.log(page, 'sdjhbhsf')
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')
    const { currentUser } = useSelector((state) => state.auth);
    console.log(location, 'hbvhsfhbgfb')
    const [ratingval, setRatingVal] = useState(null);

    // const { companyProductView } = useSelector((state) => state.companyfeedback);
    // console.log(companyProductView, 'companyProductView')

    const [productreviewdata, setProductReviewData] = useState('');
    console.log(productreviewdata, 'productreviewdata')


    const CompanyProductReview = (pageNum, searchItem, limitCount, rating) => {
        console.log(rating, "rating123")

        let pageNumber;
        if (pageNum === undefined) {
            pageNumber = 0;
        }
        else {
            pageNumber = pageNum
        }

        axios.get(`${process.env.REACT_APP_URL}/feedback/user/product?pagenum=${pageNumber}&limit=${limitCount}&search=${searchItem}&product_uuid=${location?.state?.data?.product_uuid}&rating=${rating}`, {
            headers: {
                "x-auth-token": currentUser.token
            }
        })
            .then((res) => {
                console.log(res, "fndvhdsjfhdsj")
                setProductReviewData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        CompanyProductReview(page, limit, search, filter)
    }, [])

    const handleRatingChange = () => {
        productreviewdata?.data?.map((text, index) => {
            return text.rating;
        })
    }

    const searchfunction = (type, pages) => {
        if (type === "search") {
            console.log(pages, "ghjkvbnm")
            setSearch(pages)
            setPage(0)
            // dispatch(CompanyProductViewURL(0, pages, currentUser.token, limit, location?.state?.product_uuid, filter))
            CompanyProductReview(0, limit, pages, filter)
        }
        if (type === "prev") {
            setPage(page - 1)
            // dispatch(CompanyProductViewURL(page - 1, search, currentUser.token, limit, location?.state?.product_uuid, filter))
            CompanyProductReview(page - 1, limit, search, filter)

        }
        else if (type === "next") {
            setPage(page + 1)
            // dispatch(CompanyProductViewURL(page + 1, search, currentUser.token, limit, location?.state?.product_uuid, filter))
            CompanyProductReview(page + 1, limit, search, filter)

        }
        else if (type === "page") {
            setPage(page)
            // dispatch(CompanyProductViewURL(page, search, currentUser.token, limit, location?.state?.product_uuid, filter))
            CompanyProductReview(page, limit, search, filter)

        }
        else if (type === "page+1") {
            setPage(page + 1)
            // dispatch(CompanyProductViewURL(page + 1, search, currentUser.token, limit, location?.state?.product_uuid, filter))
            CompanyProductReview(page + 1, limit, search, filter)

        }
        else if (type === "page+2") {
            setPage(page + 2)
            // dispatch(CompanyProductViewURL(page + 2, search, currentUser.token, limit, location?.state?.product_uuid, filter))
            CompanyProductReview(page + 2, limit, search, filter)

        }
        else if (type === "limit") {
            setLimit(pages)
            setPage(0)
            // dispatch(CompanyProductViewURL(0, search, currentUser.token, pages, location?.state?.product_uuid, filter))
            CompanyProductReview(0, pages, search, filter)

        }
        else if (type === "filter") {
            setFilter(pages);
            setPage(0);
            // dispatch(CompanyProductViewURL(0, search, currentUser.token, limit, location?.state?.product_uuid, pages));
            CompanyProductReview(0, limit, search, pages)
        }
    }


    const ratings = productreviewdata?.ratings || [];
    console.log(ratings, 'dvhgf')

    // Function to calculate percentage
    const calculatePercentage = (count, totalCount) => {
        return totalCount !== 0 ? (count / totalCount) * 100 : 0;
    };

    const renderStars = (rating) => {
        console.log(rating,'fdbvhgvf')
        const stars = [];

        for (let i = 0; i < 5; i += 1) {
            stars.push(
                // <CsLineIcons icon="star" size="20" fill={i < Number(rating) ? 'gold' : ''} />
                <FontAwesomeIcon icon={faStar}  color={i < Number(rating) ? 'gold' : ''} style={{size:"25"}} />
            );
        }

        return stars;
    };

    return (

        <div>
            <div className="page-title-container">
                <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back mb-2" to={location?.state?.url}>
                    <CsLineIcons icon="chevron-left" size="20" />
                    <span className="align-middle text-medium ms-1">Back</span>
                </NavLink>
                <h1 className="mb-0 pb-0 display-4" id="title">
                    {title}
                </h1>
            </div>
            <Row className="mb-3 mt-5">
                <Col lg="3" className="mb-1">
                    {/* Search Start */}
                    {/* <Form.Label/> */}
                    <div className="d-inline-block float-md-start me-1 mb-1 search-input-container w-100 shadow bg-foreground">

                        <Form.Control type="text" onChange={(event) => searchfunction("search", event.target.value)} placeholder="Search" />
                        <span className="search-magnifier-icon">
                            <CsLineIcons icon="search" />
                        </span>
                        <span className="search-delete-icon d-none">
                            <CsLineIcons icon="close" />
                        </span>
                    </div>
                    {/* Search End */}
                </Col>

                <Col lg="9" className="mb-1 text-end">

                    <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1">
                        <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Item Count</Tooltip>}>
                            <Dropdown.Toggle variant="foreground-alternate" className="shadow sw-13">
                                {limit} Items
                            </Dropdown.Toggle>
                        </OverlayTrigger>
                        <Dropdown.Menu className="shadow dropdown-menu-center">
                            <Dropdown.Item onClick={() => searchfunction("limit", 5)}>5 Items</Dropdown.Item>
                            <Dropdown.Item onClick={() => searchfunction("limit", 10)}>10 Items</Dropdown.Item>
                            <Dropdown.Item onClick={() => searchfunction("limit", 20)}>20 Items</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    {/* Length End */}
                </Col>

            </Row>
            <h3>Product Ratings</h3>
            <div className="mb-5">
                <div className="row">
                    <div className="col-xs-12 col-md-2 ">
                        <span className="rating-num ">{location?.state?.avg_rating}</span>
                        <span><FontAwesomeIcon icon={faStar} className='star1' /></span>
                        <div>
                            <span className="fa fa-user" />{productreviewdata?.total} total votes
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-3">
                        <div className="row rating-desc">
                            {ratings.slice().reverse().map((rating, index) => {
                                console.log(rating, 'bhdfvbvbhv')
                                return (
                                    <div key={index} className="row rating-desc" style={{ cursor: "pointer" }} onClick={() => { searchfunction("filter", 5 - index) }} >
                                        <div className="col-xs-3 col-md-3">
                                            <span className="fa fa-star">{5 - index}</span>
                                            <FontAwesomeIcon icon={faStar} />
                                        </div>
                                        <div className="col-xs-7 col-md-7">
                                            <div className="progress">
                                                <div
                                                    className="progress-bar progress-bar-success"
                                                    role="progressbar"
                                                    aria-valuenow="20"
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                    style={{ width: `${rating?.count !== 0 ? (rating?.count / productreviewdata?.total) * 100 : 0}%` }}
                                                >
                                                    <span className="sr-only">{calculatePercentage(rating.count, productreviewdata?.total)}%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-2 col-md-2">
                                            <span className="sr-only">{rating.count}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6">
                        &nbsp;
                    </div>
                </div>
            </div>


            <Row className="g-0 h-100 align-content-center d-none d-lg-flex ps-5 pe-5 mb-2 custom-sort">
                <Col md="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                    <div className="text-muted text-small cursor-pointer ">Name</div>
                </Col>
                <Col md="3" className="d-flex flex-column pe-1 justify-content-center">
                    <div className="text-muted text-small cursor-pointer ">Rating</div>
                </Col>
                <Col md="7" className="d-flex flex-column pe-1 justify-content-center">
                    <div className="text-muted text-small cursor-pointer ">Review</div>
                </Col>

            </Row>
            {
                productreviewdata?.data?.length > 0 && productreviewdata?.data?.map((text, index) => {
                    console.log(text?.rating, 'bsdkkhbhf')
                    return (
                        <Card className="mb-2" key={index}>
                            <Card.Body className="pt-0 pb-0 sh-40 sh-md-8">
                                <Row className="g-0 h-100 align-content-center cursor-default">
                                    <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                                        <div className="text-muted text-small d-md-none">Name</div>
                                        {/* <NavLink to="/orders/detail" className="text-truncate h-100 d-flex align-items-center"> */}
                                        <div className="text-alternate">{text?.users[0]?.name}</div>
                                    </Col>

                                    <Col xs="6" md="3" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                                        <div className="text-muted text-small d-md-none">Rating</div>
                                        <div>{renderStars(text.rating)}</div>
                                    </Col>
                                    <Col xs="6" md="7" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                                        <div className="text-muted text-small d-md-none">Review</div>
                                        <div className="text-alternate">{text?.reviews?.length > 0 ? text?.reviews[0]?.review : "No Review Available"}</div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    )
                })
            }
            {/* Pagination Start */}
            <div className="d-flex justify-content-center mt-5">
                <Pagination>
                    <Pagination.Prev className="shadow" disabled={page === 0} onClick={() => searchfunction("prev")}>
                        <CsLineIcons icon="chevron-left" />
                    </Pagination.Prev>
                    <Pagination.Item className="shadow" active onClick={() => searchfunction("page")} >
                        {page + 1}
                    </Pagination.Item>
                    <Pagination.Item className="shadow" disabled={Math.ceil(productreviewdata && productreviewdata.count / limit) <= page + 1} onClick={() => searchfunction("page+1", page + 1)}>{page + 2}</Pagination.Item>
                    <Pagination.Item className="shadow" disabled={Math.ceil(productreviewdata && productreviewdata.count / limit) <= page + 2} onClick={() => searchfunction("page+2", page + 2)}>{page + 3}</Pagination.Item>

                    {Math.ceil(productreviewdata && productreviewdata.count / limit) > page + 3 &&
                        <>
                            <Pagination.Item className="shadow" >...</Pagination.Item>
                        </>

                    }
                    <Pagination.Next className="shadow" disabled={Math.ceil(productreviewdata && productreviewdata.count / limit) <= page + 1} onClick={() => searchfunction("next")}>
                        <CsLineIcons icon="chevron-right" />
                    </Pagination.Next>
                </Pagination>
            </div>
            {/* Pagination End */}
        </div >

    )
}

export default productview;
