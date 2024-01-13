import CsLineIcons from 'cs-line-icons/CsLineIcons'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Dropdown, Form, OverlayTrigger, Pagination, Row, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';
import Rating from 'react-rating-stars-component';
import Select from 'react-select';
import { StoreProductViewURL } from 'Redux/CashierRedux/Feedback/storefeedback';



const storeproductreview = () => {
    const title = 'Product View'
    const history = useHistory('');
    const dispatch = useDispatch('');
    const location = useLocation('')
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('')
    const { currentUser } = useSelector((state) => state.auth);
    console.log(location, 'hbvhsfh')
    const [ratingval, setRatingVal] = useState('');

    const { storeProductView } = useSelector((state) => state.storefeedback);
    console.log(storeProductView, 'storeProductView')

    useEffect(() => {
        setTimeout(() => {
            dispatch(StoreProductViewURL(page, search, currentUser.token, limit, location?.state?.product_uuid, ratingval))
        },2000)
    }, [])

    const searchfunction = (type, pages) => {
        if (type === "search") {
            console.log(pages, "ghjkvbnm")
            setSearch(pages)
            setPage(0)
            dispatch(StoreProductViewURL(0, pages, currentUser.token, limit, location?.state?.product_uuid, ratingval))
        }
        if (type === "prev") {
            setPage(page - 1)
            dispatch(StoreProductViewURL(page - 1, search, currentUser.token, limit, location?.state?.product_uuid, ratingval))
        }
        else if (type === "next") {
            setPage(page + 1)
            dispatch(StoreProductViewURL(page + 1, search, currentUser.token, limit, location?.state?.product_uuid, ratingval))
        }
        else if (type === "page") {
            setPage(page)
            dispatch(StoreProductViewURL(page, search, currentUser.token, limit, location?.state?.product_uuid, ratingval))
        }
        else if (type === "page+1") {
            setPage(page + 1)
            dispatch(StoreProductViewURL(page + 1, search, currentUser.token, limit, location?.state?.product_uuid, ratingval))
        }
        else if (type === "page+2") {
            setPage(page + 2)
            dispatch(StoreProductViewURL(page + 2, search, currentUser.token, limit, location?.state?.product_uuid, ratingval))
        }
        else if (type === "limit") {
            setLimit(pages)
            setPage(0)
            dispatch(StoreProductViewURL(0, search, currentUser.token, pages, location?.state?.product_uuid, ratingval))
        }
    }

    const rating = [
        { label: 5, value: 5 },
        { label: 4, value: 4 },
        { label: 3, value: 3 },
        { label: 2, value: 2 },
        { label: 1, value: 1 }
    ]

    const ratingChange = (value) => {
        console.log(value, 'dbvhsdv')
        setRatingVal(value?.value)
        setTimeout(() => {
            dispatch(StoreProductViewURL(page, search, currentUser.token, limit, location?.state?.product_uuid, value?.value))
        }, 1000)
    }
    return (

        <div>
            <div className="page-title-container">
                <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back mb-2" to="/feedback">
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

                <Col lg="2">
                    {/* <Form.Label>Company</Form.Label> */}
                    <Select classNamePrefix="react-select"
                        options={rating}
                        // value={ratingval}
                        onChange={ratingChange}
                        placeholder="Pick Rating"
                    //  disabled={eventType} 
                    />
                </Col>

                {/* <Col lg="2"  className='mb-1'>
            <Form.Label>Company</Form.Label>
            <Select
                className="basic-single"
                classNamePrefix="select company"
                // isClearable={isClearable}
                // defaultValue={colourOptions[0]}
                // onChange={selectedCompany}
                name="color"
                border="none"
                // options={CompanyDropDown}
                placeholder='Select Company'
                styles={{
                    control: provided => ({
                        ...provided,
                        borderRadius: '12px',
                    }),
                }}
            />
        </Col> */}
                {/* <Col lg="2" className='mb-1'>
            <Form.Label>Category</Form.Label>
            <Select
                className="basic-single"
                classNamePrefix="select Store"
                // options={StoredropdownValues}
                // isClearable={isRemove}
                // value={categoryId}
                // onChange={selectdropdown}
                placeholder="Select Store"
                styles={{
                    control: provided => ({
                        ...provided,
                        borderRadius: '12px',
                    }),
                }}
            // disabled={eventType}
            />
        </Col> */}
                {/* <Col md="2" lg="2" className='mb-1'>
            <Select
                classNamePrefix="react-select"
                // options={OrderStatus}
                // value={selectorderstatus}
                // onChange={OrderStatusFunction}
                placeholder="Order Status" />
        </Col> */}
                {/* <Col lg="2" className='mb-1'>
            <Button xs="4" variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto"
                onClick={() => setQROpen(true)}>
                <CsLineIcons icon="scanner" /><span>Scan QR Code </span>
            </Button>
        </Col> */}
                {/* <Col lg="1"className='mb-1'>
            <Button xs="4" variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto"
               onClick={handleRefresh} >
              Refresh  <CsLineIcons icon="scanner" /><span>Scan QR Code </span>
            </Button>
        </Col> */}
                <Col lg="7" className="mb-1 text-end">
                    {/* Print Button Start */}
                    {/* <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Print</Tooltip>}>
                <Button variant="foreground-alternate" className="btn-icon btn-icon-only shadow">
                    <CsLineIcons icon="print" />
                </Button>
            </OverlayTrigger> */}
                    {/* Print Button End */}

                    {/* Export Dropdown Start */}
                    {/* <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1">
                <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Export</Tooltip>}>
                    <Dropdown.Toggle variant="foreground-alternate" className="dropdown-toggle-no-arrow btn btn-icon btn-icon-only shadow">
                        <CsLineIcons icon="download" />
                    </Dropdown.Toggle>
                </OverlayTrigger>
                <Dropdown.Menu className="shadow dropdown-menu-end">
                    <Dropdown.Item href="#">Copy</Dropdown.Item>
                    <Dropdown.Item href="#">Excel</Dropdown.Item>
                    <Dropdown.Item href="#">Cvs</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown> */}
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
                    <div className="text-muted text-small cursor-pointer ">Name</div>
                </Col>
                {/* <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
                    <div className="text-muted text-small cursor-pointer ">Name</div>
                </Col>
                <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
                    <div className="text-muted text-small cursor-pointer ">Email</div>
                </Col>
                <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
                    <div className="text-muted text-small cursor-pointer ">Mobile</div>
                </Col> */}
                <Col md="4" className="d-flex flex-column pe-1 justify-content-center">
                    <div className="text-muted text-small cursor-pointer ">Rating</div>
                </Col>
                <Col md="6" className="d-flex flex-column pe-1 justify-content-center">
                    <div className="text-muted text-small cursor-pointer ">Review</div>
                </Col>
                {/* <Col md="1" className="d-flex flex-column pe-1 justify-content-center">
            <div className="text-muted text-small cursor-pointer ">TOKEN NO</div>
        </Col>
        <Col md="1" className="d-flex flex-column pe-1 justify-content-center">
            <div className="text-muted text-small cursor-pointer ">PRICE</div>
        </Col>
        <Col md="1" className="d-flex flex-column pe-1 justify-content-center">
            <div className="text-muted text-small cursor-pointer ">ORDER DATE</div>
        </Col>
        <Col md="1" className="d-flex flex-column pe-1 justify-content-center">
            <div className="text-muted text-small cursor-pointer "> PAYMENT STATUS</div>
        </Col>
        <Col md="1" className="d-flex flex-column pe-1 justify-content-center">
            <div className="text-muted text-small cursor-pointer ">ORDER STATUS</div>
        </Col> */}
            </Row>
            {/* List Header End */}

            {/* List Items Start */}
            {storeProductView?.data?.length > 0 && storeProductView?.data?.map((text, index) => {
                console.log(text, 'bsdkkhbhf')
                return (
                    <Card className="mb-2" key={index}>
                        <Card.Body className="pt-0 pb-0 sh-40 sh-md-8">
                            <Row className="g-0 h-100 align-content-center cursor-default">
                                <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                                    <div className="text-muted text-small d-md-none">Name</div>
                                    {/* <NavLink to="/orders/detail" className="text-truncate h-100 d-flex align-items-center"> */}
                                    <div className="text-alternate">{text?.users[0]?.name}</div>
                                    {/* </NavLink> */}
                                    {/* <Button variant="link" className="p-0 text-truncate h-100 d-flex align-items-center" title="click" >
                                        {text?.feedback[0]?.order_uuid}
                                    </Button> */}
                                </Col>
                                {/* <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
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
                                </Col> */}
                                <Col xs="6" md="4" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                                    <div className="text-muted text-small d-md-none">Rating</div>
                                    {/* {text?.feedback?.length > 0 ? */}
                                    <Rating
                                        count={5}
                                        value={text?.rating}
                                        // onChange={handleRatingChange}
                                        size={25}
                                        activeColor="#ffd700"
                                        edit={false}
                                        className="lh-1 text-alternate  mt-2"
                                    />
                                    {/* :
                                        <span className="lh-1 text-alternate">No Rating</span>
                                    } */}
                                </Col>
                                <Col xs="6" md="6" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                                    <div className="text-muted text-small d-md-none">Review</div>
                                    <div className="text-alternate">{text?.reviews?.length > 0 ? text?.reviews[0]?.review : "No Review Available"}</div>
                                </Col>
                                {/* <Col xs="6" md="1" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                            <div className="text-muted text-small d-md-none">Token No</div>
                            <div className="text-alternate">{text?.token_no}</div>
                        </Col>
                        <Col xs="6" md="1" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                            <div className="text-muted text-small d-md-none">Price</div>
                            <div className="text-alternate">
                                <span>
                                    <span className="text-small">₹</span>
                                    {text?.amount}
                                </span>
                            </div>
                        </Col> */}
                                {/* <Col xs="6" md="1" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-5 order-md-4">
                            <div className="text-muted text-small d-md-none">Order Date</div>
                            <div className="text-alternate"> {moment(text?.createdAt).format("YYYY-MM-DD HH:mm:ss")}</div>
                        </Col>
                        <Col xs="6" md="1" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                            <div className="text-muted text-small d-md-none">Payment Status</div>
                            <div>
                                <Badge bg="outline-primary">{text?.payment_status}</Badge>
                            </div>
                        </Col> */}
                                {/* <Col xs="1" md="1" className="d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-2 text-end order-md-last">
                    <Form.Check className="form-check mt-2 ps-5 ps-md-2" type="checkbox" checked={selectedItems.includes(1)} onChange={() => { }} />
                </Col> */}
                                {/* <Col xs="6" md="1" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                            <div className="text-muted text-small d-md-none">Order Status</div>
                            <div className="text-alternate">
                                {text?.order_status}
                            </div>
                        </Col> */}
                                {/* <Col xs="6" md="1" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                                    <div className="text-muted text-small d-md-none">View</div>
                                    <div className="lh-1 text-alternate"> <Button title="VIEW" variant="outline-primary" className="btn px-2 py-2"
                                        onClick={() => redirectReview(text)}>
                                        <CsLineIcons icon="eye" />
                                    </Button>
                                    </div>
                                </Col> */}
                            </Row>
                        </Card.Body>
                    </Card>
                )
            })}



            {/* Pagination Start */}
            <div className="d-flex justify-content-center mt-5">
                <Pagination>
                    <Pagination.Prev className="shadow" disabled={page === 0} onClick={() => searchfunction("prev")}>
                        <CsLineIcons icon="chevron-left" />
                    </Pagination.Prev>
                    <Pagination.Item className="shadow" active onClick={() => searchfunction("page")} >
                        {page + 1}
                    </Pagination.Item>
                    <Pagination.Item className="shadow" disabled={Math.ceil(storeProductView && storeProductView.count / limit) <= page + 1} onClick={() => searchfunction("page+1", page + 1)}>{page + 2}</Pagination.Item>
                    <Pagination.Item className="shadow" disabled={Math.ceil(storeProductView && storeProductView.count / limit) <= page + 2} onClick={() => searchfunction("page+2", page + 2)}>{page + 3}</Pagination.Item>

                    {Math.ceil(storeProductView && storeProductView.count / limit) > page + 3 &&
                        <>
                            <Pagination.Item className="shadow" >...</Pagination.Item>
                        </>

                    }
                    <Pagination.Next className="shadow" disabled={Math.ceil(storeProductView && storeProductView.count / limit) <= page + 1} onClick={() => searchfunction("next")}>
                        <CsLineIcons icon="chevron-right" />
                    </Pagination.Next>
                </Pagination>
            </div>
            {/* Pagination End */}
        </div>

    )
}

export default storeproductreview;
