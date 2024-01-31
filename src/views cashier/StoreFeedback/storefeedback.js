import React, { useEffect, useState } from 'react'

import { Button, Card, Col, Dropdown, Form, Modal, OverlayTrigger, Pagination, Row, Tab, Tabs, Tooltip } from 'react-bootstrap';
import './storefeedback.css'
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { ExportExcel } from 'views/ExportData';
import Rating from 'react-rating-stars-component';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
// import {  CompanyProductNameURL,StoreProductList } from 'Redux/AdminRedux/Feedback/feedbackRedux';
import { StoreFeedbackListURL, StoreProductList, StoreProductNameURL } from 'Redux/CashierRedux/Feedback/storefeedback';


const storefeedback = () => {
    const title = "Feedbacks"
    const review = "Review"
    const productReview = "Product Wise Review"
    const history = useHistory('');
    const dispatch = useDispatch('');
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('')
    const [page1, setPage1] = useState(0);
    const [limit1, setLimit1] = useState(10);
    const [search1, setSearch1] = useState('')
    const [discountModal, setDiscountModal] = useState(false);
    const [view, setView] = useState('');
    console.log(view, 'hsbdvhgbfberu')

    const [modal, setModal] = useState(false);
    const [viewProduct, setViewProduct] = useState('');
    console.log(viewProduct, 'hsbdvhgbfhgthberu')

    const { currentUser } = useSelector((state) => state.auth);
    console.log(currentUser, 'hbvhsfh')
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // const {storeProductList ,ProductView} = useSelector((state) => state.adminfeedback);
    // const { storeProductList} = useSelector((state) => state.companyfeedback);

    const { storeFeedback, storeProductName, storeProductList } = useSelector((state) => state.storefeedback);
    console.log(storeFeedback, 'storeFeedback')

    const [tab, setTab] = useState("tab1")
    useEffect(() => {
        console.log(window.location.pathname, "feedbackbyproduct")
        if (window.location.pathname === "/feedbackbyproduct") {
            setTab("tab2")
        }
        else {
            setTab("tab1")
        }
    }, [])


    useEffect(() => {
        if (window.location.pathname === '/feedback') {
            dispatch(StoreFeedbackListURL(page, search, currentUser?.token, limit, currentUser?.data?.uuid, startDate, endDate))
        }
        else {
            dispatch(StoreProductList(page1, search1, currentUser?.token, limit1, currentUser?.data?.uuid))
        }
    }, [])

    const searchfunction = (type, pages) => {
        if (type === "search") {
            console.log(pages, "ghjkvbnm")
            setSearch(pages)
            setPage(0)
            dispatch(StoreFeedbackListURL(0, pages, currentUser.token, limit, currentUser?.data?.uuid, startDate, endDate))
        }
        if (type === "prev") {
            setPage(page - 1)
            dispatch(StoreFeedbackListURL(page - 1, search, currentUser.token, limit, currentUser?.data?.uuid, startDate, endDate))
        }
        else if (type === "next") {
            setPage(page + 1)
            dispatch(StoreFeedbackListURL(page + 1, search, currentUser.token, limit, currentUser?.data?.uuid, startDate, endDate))
        }
        else if (type === "page") {
            setPage(page)
            dispatch(StoreFeedbackListURL(page, search, currentUser.token, limit, currentUser?.data?.uuid, startDate, endDate))
        }
        else if (type === "page+1") {
            setPage(page + 1)
            dispatch(StoreFeedbackListURL(page + 1, search, currentUser.token, limit, currentUser?.data?.uuid, startDate, endDate))
        }
        else if (type === "page+2") {
            setPage(page + 2)
            dispatch(StoreFeedbackListURL(page + 2, search, currentUser.token, limit, currentUser?.data?.uuid, startDate, endDate))
        }
        else if (type === "limit") {
            setLimit(pages)
            setPage(0)
            dispatch(StoreFeedbackListURL(0, search, currentUser.token, pages, currentUser?.data?.uuid, startDate, endDate))
        }
    }



    const searchfun = (type1, pages1) => {
        if (type1 === "search") {
            console.log(pages1, "ghjkvbnm")
            setSearch1(pages1)
            setPage1(0)
            dispatch(StoreProductList(0, pages1, currentUser.token, limit1, currentUser?.data?.uuid))
        }
        if (type1 === "prev") {
            setPage1(page1 - 1)
            dispatch(StoreProductList(page1 - 1, search1, currentUser.token, limit1, currentUser?.data?.uuid))
        }
        else if (type1 === "next") {
            setPage1(page1 + 1)
            dispatch(StoreProductList(page1 + 1, search1, currentUser.token, limit1, currentUser?.data?.uuid))
        }
        else if (type1 === "page") {
            setPage1(page1)
            dispatch(StoreProductList(page1, search1, currentUser.token, limit1, currentUser?.data?.uuid))
        }
        else if (type1 === "page+1") {
            setPage1(page1 + 1)
            dispatch(StoreProductList(page1 + 1, search1, currentUser.token, limit1, currentUser?.data?.uuid))
        }
        else if (type1 === "page+2") {
            setPage1(page1 + 2)
            dispatch(StoreProductList(page1 + 2, search1, currentUser.token, limit1, currentUser?.data?.uuid))
        }
        else if (type1 === "limit") {
            setLimit1(pages1)
            setPage1(0)
            dispatch(StoreProductList(0, search1, currentUser.token, pages1, currentUser?.data?.uuid))
        }
    }

    // const redirectReview = (value) => {
    //     history.push({
    //         pathname: '/view_review',
    //         state: value
    //     })
    // }

    const viewEventHandlerSamePage = (event) => {
        console.log(event, 'vdshdgfv')

        // dispatch(ConsumerOrderView(currentUser?.token, event?.uuid))
        setView(event);

        dispatch(StoreProductNameURL(event?.feedback?.length > 0 ? event?.feedback[0]?.order_uuid : '', currentUser?.token))
        setTimeout(() => {
            setDiscountModal(true);
        }, 1200)

    }

    const viewEventHandler = (value) => {
        console.log(value, 'dvchdsvc')
        history.push({
            pathname: '/product_view',
            state: {
                data: value,
                url: window.location.pathname
            }
        })
        // console.log(value, 'vdshdgfvhbjh')
        // setModal(true)
        // setViewProduct(value)
        // dispatch(ICafeAdminProductViewURL(value?.product_uuid,currentUser.token))
    }

    const ChangeStartData = (e) => {
        console.log("ChangeStartData: ", e.target.value);
        setStartDate(e.target.value);
        dispatch(StoreFeedbackListURL(page, search, currentUser?.token, limit, currentUser?.data?.uuid, e.target.value, endDate))
    };
    const ChangeEndData = (e) => {
        console.log("ChangeStartData: ", e.target.value);
        setEndDate(e.target.value);
        dispatch(StoreFeedbackListURL(page, search, currentUser?.token, limit, currentUser?.data?.uuid, startDate, e.target.value))
    };


    const TabChange = (tabData) => {
        console.log(tabData, "sdsa")

        if (tabData === "tab1") {
            setTab("tab1")
            history.push('/feedback')
            // setTimeout(() => {
            //     window.location.reload(false);
            // }, 1000)
        }
        else {
            setTab("tab2")
            history.push('/feedbackbyproduct')
            // setTimeout(() => {
            //     window.location.reload(false);
            // }, 1000)
        }
        // window.location.reload(false);
    }

    const storeexportfunction = async () => {
        await ExportExcel(`/feedback/export?company_uuid=${currentUser?.data?.company_uuid}&store_uuid=${currentUser?.data?.uuid}&start_date=${startDate}&end_date=${endDate}`, "StoreFeedbackReport", currentUser.token)
    }

    return (

        <div>
            <div className="page-title-container">
                <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back mb-2" to="/Storedashboard">
                    <CsLineIcons icon="chevron-left" size="20" />
                    <span className="align-middle text-medium ms-1">Back</span>
                </NavLink>
                <h1 className="mb-0 pb-0 display-4" id="title">
                    {title}
                </h1>
            </div>
            <Tabs className='mt-2' id="tabs-example" defaultActiveKey="tab1" activeKey={tab}
                onSelect={(k) => TabChange(k)}>
                <Tab eventKey="tab1" title={review} >
                    <Row className="mb-3 mt-5">
                        <Col lg="3" className="mb-1 mt-5">
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
                        <Col md="2" lg="2" xxl="2" className="mb-1" >
                            {/* <div className="mb-3"> */}
                            <Form.Label>Start date</Form.Label>
                            <Form.Control type="date" onChange={ChangeStartData} placeholder="Start date" />
                        </Col>
                        <Col md="2" lg="2" xxl="2" className="mb-1" >
                            <Form.Label>End date</Form.Label>
                            <Form.Control type="date" onChange={ChangeEndData} placeholder="End date" />
                            {/* </div> */}
                        </Col>
                        <Col md="2" lg="2" xxl="2" className="mb-1 mt-5 text-start" >



                            <Button onClick={storeexportfunction}>
                                Export
                            </Button>

                        </Col>
                        <Col lg="3" className="mb-1 text-end mt-5">

                            {/* Export Dropdown End */}

                            {/* Length Start */}
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

                    {/* List Header Start */}
                    <Row className="g-0 h-100 align-content-center d-none d-lg-flex ps-5 pe-5 mb-2 custom-sort">
                        <Col md="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                            <div className="text-muted text-small cursor-pointer ">Order ID</div>
                        </Col>
                        <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
                            <div className="text-muted text-small cursor-pointer ">Name</div>
                        </Col>
                        <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
                            <div className="text-muted text-small cursor-pointer ">Email</div>
                        </Col>
                        <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
                            <div className="text-muted text-small cursor-pointer ">Mobile</div>
                        </Col>
                        <Col md="1" className="d-flex flex-column pe-1 justify-content-center">
                            <div className="text-muted text-small cursor-pointer ">Rating</div>
                        </Col>
                        <Col md="3" className="d-flex flex-column pe-1 justify-content-center">
                            <div className="text-muted text-small cursor-pointer ">Review</div>
                        </Col>

                    </Row>
                    {/* List Header End */}

                    {/* List Items Start */}
                    {storeFeedback?.data?.length > 0 && storeFeedback?.data?.map((text, index) => {
                        console.log(text, 'bsdhbhfvfdv')
                        return (
                            <Card className="mb-2" key={index}>
                                <Card.Body className="pt-0 pb-0 sh-40 sh-md-8">
                                    <Row className="g-0 h-100 align-content-center cursor-default">
                                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                                            <div className="text-muted text-small d-md-none">Order Id</div>
                                            {/* <NavLink to="/orders/detail" className="text-truncate h-100 d-flex align-items-center"> */}
                                            {/* <div className="text-alternate"></div> */}
                                            {/* </NavLink> */}
                                            <Button variant="link" className="p-0 text-truncate h-100 d-flex align-items-center" title="click" onClick={() => viewEventHandlerSamePage(text)}>
                                                {text?.feedback[0]?.order_uuid}
                                            </Button>
                                        </Col>
                                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                                            <div className="text-muted text-small d-md-none">Name</div>
                                            <div className="text-alternate">{text?.users[0]?.name}</div>
                                        </Col>
                                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                                            <div className="text-muted text-small d-md-none">Email</div>
                                            <div className="text-alternate">{text?.users[0]?.email}</div>
                                        </Col>
                                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                                            <div className="text-muted text-small d-md-none">Mobile</div>
                                            <div className="text-alternate">{text?.users[0]?.mobile}</div>
                                        </Col>
                                        <Col xs="6" md="1" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                                            <div className="text-muted text-small d-md-none">Rating</div>
                                            {text?.feedback?.length > 0 ?
                                                <Rating
                                                    count={5}
                                                    value={text?.feedback[0]?.rating}
                                                    // onChange={handleRatingChange}
                                                    size={15}
                                                    activeColor="#ffd700"
                                                    edit={false}
                                                    className="lh-1 text-alternate  mt-2"
                                                />
                                                :
                                                <span className="lh-1 text-alternate">No Rating</span>
                                            }
                                        </Col>
                                        <Col xs="6" md="3" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                                            <div className="text-muted text-small d-md-none">Review</div>
                                            <div className="text-alternate">{text?.reviews[0]?.review?.length > 40 ? text?.reviews[0]?.review?.slice(0, 40) : text?.reviews[0]?.review || "No reviews available"}</div>
                                        </Col>

                                    </Row>
                                </Card.Body>
                            </Card>
                        )
                    })}

                    <Modal className="modal-right scroll-out-negative" show={discountModal} onHide={() => setDiscountModal(false)} scrollable dialogClassName="full">
                        <Modal.Header closeButton>
                            <Modal.Title as="h5">Review View</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <OverlayScrollbarsComponent options={{ overflowBehavior: { x: 'hidden', y: 'scroll' } }} className="scroll-track-visible">



                                <Form >


                                    <Row className="g-2">
                                        <Col xs="8" lg="8" className="d-flex flex-column mb-lg-0 pe-3 d-flex mb-5">
                                            <div className="text-muted text-medium cursor-pointer">Product Name</div>
                                            {storeProductName?.data?.map((text, ind) => {
                                                console.log(text, 'sdhbvhjdsv')
                                                return (
                                                    <div key={ind} className='mb-3'>{text?.products?.length > 0 ? text?.products[0]?.name : ''}</div>
                                                )
                                            })}
                                        </Col>
                                        <Col xs="4" lg="4" className="d-flex flex-column mb-lg-0 pe-3 d-flex mb-5">
                                            <div className="text-muted text-medium cursor-pointer">Rating</div>
                                            {storeProductName?.data?.map((text, ind) => {
                                                console.log(text, 'sdhbvhjdsv')
                                                return (
                                                    <div className="mb-3" key=''>
                                                        {text?.rating > 0 ? (
                                                            <Rating
                                                                count={5}
                                                                value={text?.rating}
                                                                // onChange={handleRatingChange}
                                                                size={15}
                                                                activeColor="#ffd700"
                                                                edit={false}
                                                                className="mb-3"
                                                            />
                                                        ) : (
                                                            <span key={ind} className="lh-1 text-alternate">No Rating</span>
                                                        )
                                                        }
                                                    </div>
                                                );
                                            })}
                                        </Col>
                                    </Row>
                                    <Row>
                                        {/* <Col xs='12' lg="12">
                                            <Form.Label>Review</Form.Label>
                                            <Form.Control type="text">{ view?.reviews[0]?.review}</Form.Control>
                                        </Col> */}
                                        <Col xs='12' lg="12">
                                            <Form.Label>Review</Form.Label>
                                            {view?.reviews && view.reviews.length > 0 ? (
                                                <Form.Control type="text" as='textarea' value={view.reviews[0].review} readOnly />
                                            ) : (
                                                <p>No reviews available</p>
                                            )}
                                        </Col>
                                    </Row>

                                </Form>

                            </OverlayScrollbarsComponent>
                        </Modal.Body>

                    </Modal>
                    {/* Discount Detail Modal End */}
                    {/* Pagination Start */}
                    <div className="d-flex justify-content-center mt-5">
                        <Pagination>
                            <Pagination.Prev className="shadow" disabled={page === 0} onClick={() => searchfunction("prev")}>
                                <CsLineIcons icon="chevron-left" />
                            </Pagination.Prev>
                            <Pagination.Item className="shadow" active onClick={() => searchfunction("page")} >
                                {page + 1}
                            </Pagination.Item>
                            <Pagination.Item className="shadow" disabled={Math.ceil(storeFeedback && storeFeedback.count / limit) <= page + 1} onClick={() => searchfunction("page+1", page + 1)}>{page + 2}</Pagination.Item>
                            <Pagination.Item className="shadow" disabled={Math.ceil(storeFeedback && storeFeedback.count / limit) <= page + 2} onClick={() => searchfunction("page+2", page + 2)}>{page + 3}</Pagination.Item>

                            {Math.ceil(storeFeedback && storeFeedback.count / limit) > page + 3 &&
                                <>
                                    <Pagination.Item className="shadow" >...</Pagination.Item>
                                </>

                            }
                            <Pagination.Next className="shadow" disabled={Math.ceil(storeFeedback && storeFeedback.count / limit) <= page + 1} onClick={() => searchfunction("next")}>
                                <CsLineIcons icon="chevron-right" />
                            </Pagination.Next>
                        </Pagination>
                    </div>
                    {/* Pagination End */}


                </Tab>
                <Tab eventKey="tab2" title={productReview} >
                    <Row className="mb-3 mt-5">
                        <Col lg="3" className="mb-1">
                            {/* Search Start */}
                            {/* <Form.Label/> */}
                            <div className="d-inline-block float-md-start me-1 mb-1 search-input-container w-100 shadow bg-foreground">

                                <Form.Control type="text" onChange={(event) => searchfun("search", event.target.value)} placeholder="Search" />
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


                            {/* Length Start */}
                            <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1">
                                <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Item Count</Tooltip>}>
                                    <Dropdown.Toggle variant="foreground-alternate" className="shadow sw-13">
                                        {limit1} Items
                                    </Dropdown.Toggle>
                                </OverlayTrigger>
                                <Dropdown.Menu className="shadow dropdown-menu-center">
                                    <Dropdown.Item onClick={() => searchfun("limit", 5)}>5 Items</Dropdown.Item>
                                    <Dropdown.Item onClick={() => searchfun("limit", 10)}>10 Items</Dropdown.Item>
                                    <Dropdown.Item onClick={() => searchfun("limit", 20)}>20 Items</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            {/* Length End */}
                        </Col>

                    </Row>

                    {/* List Header Start */}
                    <Row className="g-0 h-100 align-content-center d-none d-lg-flex ps-5 pe-5 mb-2 custom-sort">
                        <Col md="3" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                            <div className="text-muted text-small cursor-pointer ">Product ID</div>
                        </Col>
                        <Col md="3" className="d-flex flex-column pe-1 justify-content-center">
                            <div className="text-muted text-small cursor-pointer ">Item Name</div>
                        </Col>
                        <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
                            <div className="text-muted text-small cursor-pointer ">Type</div>
                        </Col>

                        <Col md="3" className="d-flex flex-column pe-1 justify-content-center">
                            <div className="text-muted text-small cursor-pointer ">Average Rating</div>
                        </Col>

                    </Row>
                    {/* List Header End */}

                    {/* List Items Start */}
                    {storeProductList?.data?.length > 0 && storeProductList?.data?.map((text, index) => {
                        console.log(text, 'bsdhbhf')
                        return (
                            <Card className="mb-2" key={index}>
                                <Card.Body className="pt-0 pb-0 sh-40 sh-md-8">
                                    <Row className="g-0 h-100 align-content-center cursor-default">
                                        <Col xs="6" md="3" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                                            <div className="text-muted text-small d-md-none">Product Id</div>
                                            {/* <NavLink to="/orders/detail" className="text-truncate h-100 d-flex align-items-center"> */}
                                            <div className="text-alternate"> {text?.product_uuid}</div>
                                            {/* </NavLink> */}

                                        </Col>
                                        <Col xs="6" md="3" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                                            <div className="text-muted text-small d-md-none">Item Name</div>
                                            <div className="text-alternate">{text?.name}</div>
                                        </Col>
                                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                                            <div className="text-muted text-small d-md-none">Type</div>
                                            <div className="text-alternate">{text?.type?.charAt(0).toLowerCase() ? text?.type?.charAt(0).toUpperCase() + text?.type.slice(1) : text?.type}</div>
                                        </Col>

                                        <Col xs="6" md="3" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                                            <div className="text-muted text-small d-md-none">Average Rating</div>
                                            <div className="text-alternate">{text?.avg_rating}</div>
                                        </Col>
                                        <Col xs="6" md="1" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                                            <div className="text-muted text-small d-md-none">View</div>
                                            <div className="lh-1 text-alternate"> <Button title="VIEW" variant="outline-primary" className="btn px-2 py-2"
                                                onClick={() => viewEventHandler(text)}
                                            >
                                                <CsLineIcons icon="eye" />
                                            </Button>
                                            </div>
                                        </Col>

                                    </Row>
                                </Card.Body>
                            </Card>
                        )
                    })}


                    {/* Pagination Start */}
                    <div className="d-flex justify-content-center mt-5">
                        <Pagination>
                            <Pagination.Prev className="shadow" disabled={page1 === 0} onClick={() => searchfun("prev")}>
                                <CsLineIcons icon="chevron-left" />
                            </Pagination.Prev>
                            <Pagination.Item className="shadow" active onClick={() => searchfun("page")} >
                                {page1 + 1}
                            </Pagination.Item>
                            <Pagination.Item className="shadow" disabled={Math.ceil(storeProductList && storeProductList.count / limit1) <= page1 + 1} onClick={() => searchfun("page+1", page1 + 1)}>{page1 + 2}</Pagination.Item>
                            <Pagination.Item className="shadow" disabled={Math.ceil(storeProductList && storeProductList.count / limit1) <= page1 + 2} onClick={() => searchfun("page+2", page1 + 2)}>{page1 + 3}</Pagination.Item>

                            {Math.ceil(storeProductList && storeProductList.count / limit1) > page1 + 3 &&
                                <>
                                    <Pagination.Item className="shadow" >...</Pagination.Item>
                                </>

                            }
                            <Pagination.Next className="shadow" disabled={Math.ceil(storeProductList && storeProductList.count / limit1) <= page1 + 1} onClick={() => searchfun("next")}>
                                <CsLineIcons icon="chevron-right" />
                            </Pagination.Next>
                        </Pagination>
                    </div>
                    {/* Pagination End */}
                </Tab>
            </Tabs>
        </div >
    )
}
export default storefeedback
