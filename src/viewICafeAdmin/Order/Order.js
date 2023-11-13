import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import moment from "moment";
import { AdminOrderListURL } from "Redux/IcafeAdminRedux/Orders/orderredux";
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { ICafeAdminCategoryDropDownListURL, ICafeAdminCategoryStoreDropDownListURL } from "Redux/IcafeAdminRedux/CategoryManagement/admincategorymanagementredux";

const Order = () => {
    const title = 'Orders List';
    const description = 'Ecommerce Orders List Page';

    const allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [selectedItems, setSelectedItems] = useState([]);
    const checkItem = (item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((x) => x !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };
    const toggleCheckAll = (allSelect) => {
        if (allSelect) {
            setSelectedItems(allItems);
        } else {
            setSelectedItems([]);
        }
    };
    const dispatch = useDispatch('');
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('')
    const[comapanyOption,setComapanyOption]=useState('')
    const[option,setOption]=useState('');
    const { currentUser } = useSelector((state) => state.auth);
    console.log(currentUser,'bdvgsvf')
    const { OrderData,notification } = useSelector((state) => state.adminorder)
    console.log(OrderData, 'hgdvgsahef')

    const { AdmincategoryDropdown, storeDropdown } = useSelector((state) => state.admincategory)
    // const { AdmincategoryDropdown,storeDropdown } = useSelector(
    //     ({ adminCategorySlice }) => adminCategorySlice
    //   );
    console.log(AdmincategoryDropdown,'sbdvhjsdvsdv')

    useEffect(() => {
        dispatch(AdminOrderListURL(page,search,currentUser?.token,limit,comapanyOption,option));
    }, [])

    const searchfunction = (type, pages) => {
        if (type === "search") {
            console.log(pages, "ghjkvbnm")
            setSearch(pages)
            setPage(0)
            dispatch(AdminOrderListURL(0, pages, currentUser.token, limit, comapanyOption, option))
        }
        if (type === "prev") {
            setPage(page - 1)
            dispatch(AdminOrderListURL(page - 1, search, currentUser.token, limit, comapanyOption, option))
        }
        else if (type === "next") {
            setPage(page + 1)
            dispatch(AdminOrderListURL(page + 1, search, currentUser.token, limit, comapanyOption, option))
        }
        else if (type === "page") {
            setPage(page)
            dispatch(AdminOrderListURL(page, search, currentUser.token, limit), comapanyOption, option)
        }
        else if (type === "page+1") {
            setPage(page + 1)
            dispatch(AdminOrderListURL(page + 1, search, currentUser.token, limit, comapanyOption, option))
        }
        else if (type === "page+2") {
            setPage(page + 2)
            dispatch(AdminOrderListURL(page + 2, search, currentUser.token, limit, comapanyOption, option))
        }
        else if (type === "limit") {
            setLimit(pages)
            setPage(0)
            dispatch(AdminOrderListURL(0, search, currentUser.token, pages, comapanyOption, option))
        }
    }

    useEffect(() => {
        dispatch(ICafeAdminCategoryDropDownListURL());
        dispatch(ICafeAdminCategoryStoreDropDownListURL());
    }, [])

    const [isClearable,setIsClearable]=useState(true);
    const[isRemove,setIsRemove]=useState(true);

    const CompanyDropDown = [];

    AdmincategoryDropdown.data.map((text) => {
        console.log(text, 'dvhgdvgbhfvbj')
        return CompanyDropDown.push({ label: text?.company_name, value: text?.uuid })
    })

    const selectedCompany = (selectvalue) => {
        setComapanyOption(selectvalue?.value)
        dispatch(AdminOrderListURL(0, search, currentUser.token, limit, selectvalue=== null ? "": selectvalue?.value, option === null ? "" : option))
    }

    const dropdownValues = [];

    storeDropdown.data.map((text) => {
        console.log(text, 'dvhgdvgbhfvbj')
        return dropdownValues.push({ label: text?.store_name, value: text?.uuid })
    })

    const selectdropdown = (text) => {
        console.log(text, 'hsdbvudgsfy')
        setOption(text)
        dispatch(AdminOrderListURL(0, search, currentUser.token, limit, comapanyOption, text=== null ? '' : text?.value))
    }


    return (
        <>
            <HtmlHead title={title} description={description} />
            <div className="page-title-container">
                <Row className="g-0">
                    {/* Title Start */}
                    <Col className="col-auto mb-3 mb-sm-0 me-auto">
                        <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/">
                            <CsLineIcons icon="chevron-left" size="13" />
                            <span className="align-middle text-small ms-1">Home</span>
                        </NavLink>
                        <h1 className="mb-0 pb-0 display-4" id="title">
                            {title}
                        </h1>
                    </Col>
                    {/* Title End */}

                    {/* Top Buttons Start */}
                    <Col xs="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
                        <Button variant="outline-primary" className="btn-icon btn-icon-only ms-1 d-inline-block d-lg-none">
                            <CsLineIcons icon="sort" />
                        </Button>
                        {/* <div className="btn-group ms-1 check-all-container">
                            <CheckAll
                                allItems={allItems}
                                selectedItems={selectedItems}
                                onToggle={toggleCheckAll}
                                inputClassName="form-check"
                                className="btn btn-outline-primary btn-custom-control py-0"
                            />
                            <Dropdown align="end">
                                <Dropdown.Toggle className="dropdown-toggle dropdown-toggle-split" variant="outline-primary" />
                                <Dropdown.Menu>
                                    <Dropdown.Item>Move</Dropdown.Item>
                                    <Dropdown.Item>Archive</Dropdown.Item>
                                    <Dropdown.Item>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div> */}
                    </Col>
                    {/* Top Buttons End */}
                </Row>
            </div>

            <Row className="mb-3">
                <Col md="5" lg="3" xxl="2" className="mb-1">
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

                {/* <Col lg="3"> */}
                {/* <Form.Label>Company</Form.Label> */}
                {/* <Select classNamePrefix="react-select"
                        options={ActivcompanyList}
                        value={compnayId}
                        onChange={setCompnayId}
                        placeholder="Select Company" */}
                {/* disabled={eventType} */}
                {/* /> */}
                {/* </Col> */}
                
                <Col lg="3">
                    {/* <Form.Label>Company</Form.Label> */}
                    <Select
                        className="basic-single"
                        classNamePrefix="select company"
                        isClearable={isClearable}
                        // defaultValue={colourOptions[0]}
                        onChange={selectedCompany}
                        name="color"
                        border="none"
                        options={CompanyDropDown}
                    />
                </Col>
                <Col lg="3">
                    {/* <Form.Label>Category</Form.Label> */}
                    <Select
                     className="basic-single"
                     classNamePrefix="select Store"
                        options={dropdownValues}
                        isClearable={isRemove}
                        // value={categoryId}
                        onChange={selectdropdown}
                        placeholder="Select Store"
                    // disabled={eventType}
                    />
                </Col>
                <Col lg="3" className="mb-1 text-end">
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
                        <Dropdown.Menu className="shadow dropdown-menu-end">
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
                    <div className="text-muted text-small cursor-pointer sort">ID</div>
                </Col>
                <Col md="3" className="d-flex flex-column pe-1 justify-content-center">
                    <div className="text-muted text-small cursor-pointer sort">NAME</div>
                </Col>
                <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
                    <div className="text-muted text-small cursor-pointer sort">PURCHASE</div>
                </Col>
                <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
                    <div className="text-muted text-small cursor-pointer sort">DATE</div>
                </Col>
                <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
                    <div className="text-muted text-small cursor-pointer sort">STATUS</div>
                </Col>
            </Row>
            {/* List Header End */}

            {/* List Items Start */}
            {OrderData?.data?.map((text, index) => {
                console.log(text, 'bsdhbhf')
                return (
                    <Card className="mb-2" key={index}>
                        <Card.Body className="pt-0 pb-0 sh-21 sh-md-8">
                            <Row className="g-0 h-100 align-content-center cursor-default" onClick={() => checkItem(1)}>
                                <Col xs="11" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                                    <div className="text-muted text-small d-md-none">Id</div>
                                    <NavLink to="/orders/detail" className="text-truncate h-100 d-flex align-items-center">
                                        {index + 1}
                                    </NavLink>
                                </Col>
                                <Col xs="6" md="3" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                                    <div className="text-muted text-small d-md-none">Name</div>
                                    <div className="text-alternate">{text?.companies[0]?.company_name}</div>
                                </Col>
                                <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                                    <div className="text-muted text-small d-md-none">Purchase</div>
                                    <div className="text-alternate">
                                        <span>
                                            <span className="text-small">₹</span>
                                            {text?.amount}
                                        </span>
                                    </div>
                                </Col>
                                <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-5 order-md-4">
                                    <div className="text-muted text-small d-md-none">Date</div>
                                    <div className="text-alternate"> {moment(text?.updatedAt).format("YYYY-MM-DD")}</div>
                                </Col>
                                <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                                    <div className="text-muted text-small d-md-none">Status</div>
                                    <div>
                                        <Badge bg="outline-primary">{text?.payment_status}</Badge>
                                    </div>
                                </Col>
                                {/* <Col xs="1" md="1" className="d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-2 text-end order-md-last">
                            <Form.Check className="form-check mt-2 ps-5 ps-md-2" type="checkbox" checked={selectedItems.includes(1)} onChange={() => { }} />
                        </Col> */}
                            </Row>
                        </Card.Body>
                    </Card>
                )
            })}



            {/* <Card className={`mb-2 ${selectedItems.includes(2) && 'selected'}`}>
                <Card.Body className="pt-0 pb-0 sh-21 sh-md-8">
                    <Row className="g-0 h-100 align-content-center cursor-default" onClick={() => checkItem(2)}>
                        <Col xs="11" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                            <div className="text-muted text-small d-md-none">Id</div>
                            <NavLink to="/orders/detail" className="text-truncate h-100 d-flex align-items-center">
                                1251
                            </NavLink>
                        </Col>
                        <Col xs="6" md="3" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                            <div className="text-muted text-small d-md-none">Name</div>
                            <div className="text-alternate">Esperanza Lodge</div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                            <div className="text-muted text-small d-md-none">Purchase</div>
                            <div className="text-alternate">
                                <span>
                                    <span className="text-small">₹</span>
                                    59.00
                                </span>
                            </div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-5 order-md-4">
                            <div className="text-muted text-small d-md-none">Date</div>
                            <div className="text-alternate">14.09.2021</div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                            <div className="text-muted text-small d-md-none">Status</div>
                            <div>
                                <Badge bg="outline-primary">CONFIRMED</Badge>
                            </div>
                        </Col>
                        <Col xs="1" md="1" className="d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-2 text-end order-md-last">
                            <Form.Check className="form-check mt-2 ps-5 ps-md-2" type="checkbox" checked={selectedItems.includes(2)} onChange={() => { }} />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Card className={`mb-2 ${selectedItems.includes(3) && 'selected'}`}>
                <Card.Body className="pt-0 pb-0 sh-21 sh-md-8">
                    <Row className="g-0 h-100 align-content-center cursor-default" onClick={() => checkItem(3)}>
                        <Col xs="11" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                            <div className="text-muted text-small d-md-none">Id</div>
                            <NavLink to="/orders/detail" className="text-truncate h-100 d-flex align-items-center">
                                1397
                            </NavLink>
                        </Col>
                        <Col xs="6" md="3" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                            <div className="text-muted text-small d-md-none">Name</div>
                            <div className="text-alternate">Blaine Cottrell</div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                            <div className="text-muted text-small d-md-none">Purchase</div>
                            <div className="text-alternate">
                                <span>
                                    <span className="text-small">₹</span>
                                    128.25
                                </span>
                            </div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-5 order-md-4">
                            <div className="text-muted text-small d-md-none">Date</div>
                            <div className="text-alternate">17.09.2021</div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                            <div className="text-muted text-small d-md-none">Status</div>
                            <div>
                                <Badge bg="outline-secondary">DONE</Badge>
                            </div>
                        </Col>
                        <Col xs="1" md="1" className="d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-2 text-end order-md-last">
                            <Form.Check className="form-check mt-2 ps-5 ps-md-2" type="checkbox" checked={selectedItems.includes(3)} onChange={() => { }} />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Card className={`mb-2 ${selectedItems.includes(4) && 'selected'}`}>
                <Card.Body className="pt-0 pb-0 sh-21 sh-md-8">
                    <Row className="g-0 h-100 align-content-center cursor-default" onClick={() => checkItem(4)}>
                        <Col xs="11" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                            <div className="text-muted text-small d-md-none">Id</div>
                            <NavLink to="/orders/detail" className="text-truncate h-100 d-flex align-items-center">
                                1421
                            </NavLink>
                        </Col>
                        <Col xs="6" md="3" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                            <div className="text-muted text-small d-md-none">Name</div>
                            <div className="text-alternate">Daisy Hartley</div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                            <div className="text-muted text-small d-md-none">Purchase</div>
                            <div className="text-alternate">
                                <span>
                                    <span className="text-small">₹</span>
                                    252.75
                                </span>
                            </div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-5 order-md-4">
                            <div className="text-muted text-small d-md-none">Date</div>
                            <div className="text-alternate">16.09.2021</div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                            <div className="text-muted text-small d-md-none">Status</div>
                            <div>
                                <Badge bg="outline-secondary">DONE</Badge>
                            </div>
                        </Col>
                        <Col xs="1" md="1" className="d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-2 text-end order-md-last">
                            <Form.Check className="form-check mt-2 ps-5 ps-md-2" type="checkbox" checked={selectedItems.includes(4)} onChange={() => { }} />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Card className={`mb-2 ${selectedItems.includes(5) && 'selected'}`}>
                <Card.Body className="pt-0 pb-0 sh-21 sh-md-8">
                    <Row className="g-0 h-100 align-content-center cursor-default" onClick={() => checkItem(5)}>
                        <Col xs="11" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                            <div className="text-muted text-small d-md-none">Id</div>
                            <NavLink to="/orders/detail" className="text-truncate h-100 d-flex align-items-center">
                                1438
                            </NavLink>
                        </Col>
                        <Col xs="6" md="3" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                            <div className="text-muted text-small d-md-none">Name</div>
                            <div className="text-alternate">Kathryn Mengel</div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                            <div className="text-muted text-small d-md-none">Purchase</div>
                            <div className="text-alternate">
                                <span>
                                    <span className="text-small">₹</span>
                                    189.50
                                </span>
                            </div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-5 order-md-4">
                            <div className="text-muted text-small d-md-none">Date</div>
                            <div className="text-alternate">12.09.2021</div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                            <div className="text-muted text-small d-md-none">Status</div>
                            <div>
                                <Badge bg="outline-secondary">DONE</Badge>
                            </div>
                        </Col>
                        <Col xs="1" md="1" className="d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-2 text-end order-md-last">
                            <Form.Check className="form-check mt-2 ps-5 ps-md-2" type="checkbox" checked={selectedItems.includes(5)} onChange={() => { }} />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Card className={`mb-2 ${selectedItems.includes(6) && 'selected'}`}>
                <Card.Body className="pt-0 pb-0 sh-21 sh-md-8">
                    <Row className="g-0 h-100 align-content-center cursor-default" onClick={() => checkItem(6)}>
                        <Col xs="11" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                            <div className="text-muted text-small d-md-none">Id</div>
                            <NavLink to="/orders/detail" className="text-truncate h-100 d-flex align-items-center">
                                1573
                            </NavLink>
                        </Col>
                        <Col xs="6" md="3" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                            <div className="text-muted text-small d-md-none">Name</div>
                            <div className="text-alternate">Winry Rockbell</div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                            <div className="text-muted text-small d-md-none">Purchase</div>
                            <div className="text-alternate">
                                <span>
                                    <span className="text-small">₹</span>
                                    63.10
                                </span>
                            </div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-5 order-md-4">
                            <div className="text-muted text-small d-md-none">Date</div>
                            <div className="text-alternate">10.08.2021</div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                            <div className="text-muted text-small d-md-none">Status</div>
                            <div>
                                <Badge bg="outline-secondary">DONE</Badge>
                            </div>
                        </Col>
                        <Col xs="1" md="1" className="d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-2 text-end order-md-last">
                            <Form.Check className="form-check mt-2 ps-5 ps-md-2" type="checkbox" checked={selectedItems.includes(6)} onChange={() => { }} />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Card className={`mb-2 ${selectedItems.includes(7) && 'selected'}`}>
                <Card.Body className="pt-0 pb-0 sh-21 sh-md-8">
                    <Row className="g-0 h-100 align-content-center cursor-default" onClick={() => checkItem(7)}>
                        <Col xs="11" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                            <div className="text-muted text-small d-md-none">Id</div>
                            <NavLink to="/orders/detail" className="text-truncate h-100 d-flex align-items-center">
                                1633
                            </NavLink>
                        </Col>
                        <Col xs="6" md="3" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                            <div className="text-muted text-small d-md-none">Name</div>
                            <div className="text-alternate">Olli Hawkins</div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                            <div className="text-muted text-small d-md-none">Purchase</div>
                            <div className="text-alternate">
                                <span>
                                    <span className="text-small">₹</span>
                                    45.10
                                </span>
                            </div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-5 order-md-4">
                            <div className="text-muted text-small d-md-none">Date</div>
                            <div className="text-alternate">05.08.2021</div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                            <div className="text-muted text-small d-md-none">Status</div>
                            <div>
                                <Badge bg="outline-secondary">DONE</Badge>
                            </div>
                        </Col>
                        <Col xs="1" md="1" className="d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-2 text-end order-md-last">
                            <Form.Check className="form-check mt-2 ps-5 ps-md-2" type="checkbox" checked={selectedItems.includes(7)} onChange={() => { }} />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Card className={`mb-2 ${selectedItems.includes(8) && 'selected'}`}>
                <Card.Body className="pt-0 pb-0 sh-21 sh-md-8">
                    <Row className="g-0 h-100 align-content-center cursor-default" onClick={() => checkItem(8)}>
                        <Col xs="11" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                            <div className="text-muted text-small d-md-none">Id</div>
                            <NavLink to="/orders/detail" className="text-truncate h-100 d-flex align-items-center">
                                1633
                            </NavLink>
                        </Col>
                        <Col xs="6" md="3" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                            <div className="text-muted text-small d-md-none">Name</div>
                            <div className="text-alternate">Olli Hawkins</div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                            <div className="text-muted text-small d-md-none">Purchase</div>
                            <div className="text-alternate">
                                <span>
                                    <span className="text-small">₹</span>
                                    45.10
                                </span>
                            </div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-5 order-md-4">
                            <div className="text-muted text-small d-md-none">Date</div>
                            <div className="text-alternate">05.08.2021</div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                            <div className="text-muted text-small d-md-none">Status</div>
                            <div>
                                <Badge bg="outline-secondary">DONE</Badge>
                            </div>
                        </Col>
                        <Col xs="1" md="1" className="d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-2 text-end order-md-last">
                            <Form.Check className="form-check mt-2 ps-5 ps-md-2" type="checkbox" checked={selectedItems.includes(8)} onChange={() => { }} />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Card className={`mb-2 ${selectedItems.includes(9) && 'selected'}`}>
                <Card.Body className="pt-0 pb-0 sh-21 sh-md-8">
                    <Row className="g-0 h-100 align-content-center cursor-default" onClick={() => checkItem(9)}>
                        <Col xs="11" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                            <div className="text-muted text-small d-md-none">Id</div>
                            <NavLink to="/orders/detail" className="text-truncate h-100 d-flex align-items-center">
                                1633
                            </NavLink>
                        </Col>
                        <Col xs="6" md="3" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                            <div className="text-muted text-small d-md-none">Name</div>
                            <div className="text-alternate">Kirby Peters</div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                            <div className="text-muted text-small d-md-none">Purchase</div>
                            <div className="text-alternate">
                                <span>
                                    <span className="text-small">₹</span>
                                    79.75
                                </span>
                            </div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-5 order-md-4">
                            <div className="text-muted text-small d-md-none">Date</div>
                            <div className="text-alternate">03.08.2021</div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                            <div className="text-muted text-small d-md-none">Status</div>
                            <div>
                                <Badge bg="outline-tertiary">SHIPPED</Badge>
                            </div>
                        </Col>
                        <Col xs="1" md="1" className="d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-2 text-end order-md-last">
                            <Form.Check className="form-check mt-2 ps-5 ps-md-2" type="checkbox" checked={selectedItems.includes(9)} onChange={() => { }} />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Card className={`mb-2 ${selectedItems.includes(10) && 'selected'}`}>
                <Card.Body className="pt-0 pb-0 sh-21 sh-md-8">
                    <Row className="g-0 h-100 align-content-center cursor-default" onClick={() => checkItem(10)}>
                        <Col xs="11" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                            <div className="text-muted text-small d-md-none">Id</div>
                            <NavLink to="/orders/detail" className="text-truncate h-100 d-flex align-items-center">
                                2743
                            </NavLink>
                        </Col>
                        <Col xs="6" md="3" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                            <div className="text-muted text-small d-md-none">Name</div>
                            <div className="text-alternate">Zayn Hartley</div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                            <div className="text-muted text-small d-md-none">Purchase</div>
                            <div className="text-alternate">
                                <span>
                                    <span className="text-small">₹</span>
                                    124.75
                                </span>
                            </div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-5 order-md-4">
                            <div className="text-muted text-small d-md-none">Date</div>
                            <div className="text-alternate">01.08.2021</div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                            <div className="text-muted text-small d-md-none">Status</div>
                            <div>
                                <Badge bg="outline-tertiary">SHIPPED</Badge>
                            </div>
                        </Col>
                        <Col xs="1" md="1" className="d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-2 text-end order-md-last">
                            <Form.Check className="form-check mt-2 ps-5 ps-md-2" type="checkbox" checked={selectedItems.includes(10)} onChange={() => { }} />
                        </Col>
                    </Row>
                </Card.Body>
            </Card> */}
            {/* List Items End */}

            {/* Pagination Start */}
            <div className="d-flex justify-content-center mt-5">
                <Pagination>
                    <Pagination.Prev className="shadow" disabled={page === 0} onClick={() => searchfunction("prev")}>
                        <CsLineIcons icon="chevron-left" />
                    </Pagination.Prev>
                    <Pagination.Item className="shadow" active onClick={() => searchfunction("page")} >
                        {page + 1}
                    </Pagination.Item>
                    <Pagination.Item className="shadow" disabled={Math.ceil(OrderData && OrderData.count / limit) <= page + 1} onClick={() => searchfunction("page+1", page + 1)}>{page + 2}</Pagination.Item>
                    <Pagination.Item className="shadow" disabled={Math.ceil(OrderData && OrderData.count / limit) <= page + 2} onClick={() => searchfunction("page+2", page + 2)}>{page + 3}</Pagination.Item>

                    {Math.ceil(OrderData && OrderData.count / limit) > page + 3 &&
                        <>
                            <Pagination.Item className="shadow" >...</Pagination.Item>
                        </>

                    }
                    <Pagination.Next className="shadow" disabled={Math.ceil(OrderData && OrderData.count / limit) <= page + 1} onClick={() => searchfunction("next")}>
                        <CsLineIcons icon="chevron-right" />
                    </Pagination.Next>
                </Pagination>
            </div>
            {/* Pagination End */}
        </>
    );
};

export default Order;
