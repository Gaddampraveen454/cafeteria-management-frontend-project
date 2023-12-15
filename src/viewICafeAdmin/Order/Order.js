import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Pagination, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import moment from "moment";
import axios from 'axios'
import { AdminOrderListURL } from "Redux/IcafeAdminRedux/Orders/orderredux";
import { AdminProductStoreDropDownList } from 'Redux/IcafeAdminRedux/ProductManagement/productmanagementredux';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
} from '@mui/material';
import QrReader from "react-web-qr-reader";
import { ICafeAdminCategoryDropDownListURL, ICafeAdminCategoryStoreDropDownListURL } from "Redux/IcafeAdminRedux/CategoryManagement/admincategorymanagementredux";
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';


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
    const history = useHistory('');
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('')
    const [comapanyOption, setComapanyOption] = useState('')
    const [option, setOption] = useState('');
    const [option1, setOption1] = useState('');
    const [qropen, setQROpen] = React.useState(false);
    const [discountModal, setDiscountModal] = useState(false);
    const [view, setView] = useState('');
    console.log(view, 'hsbdvhgbfberu')
    const { currentUser } = useSelector((state) => state.auth);
    console.log(currentUser, 'bdvgsvf')
    const { OrderData, notification } = useSelector((state) => state.adminorder)
    console.log(OrderData, 'hgdvgsahef')

    const { AdmincategoryDropdown, storeDropdown } = useSelector((state) => state.admincategory)
    const { storeList } = useSelector((state) => state.adminproducts)
    // const { AdmincategoryDropdown,storeDropdown } = useSelector(
    //     ({ adminCategorySlice }) => adminCategorySlice
    //   );
    console.log(AdmincategoryDropdown, 'sbdvhjsdvsdv')

    const [result1, setResult1] = useState();

  const delay = 500;
  const previewStyle = {
    // height: 200,
    width: 280
  };

  const handleScan = (result) => {

    const Compuuid = result?.data?.split("scanorderdetails/")
    const slugRoute = result?.data?.replace(`${process.env.REACT_APP_WEB_APP_URL}`, '')
    const routeStartPath = slugRoute?.replace("/scanorderdetails/", "")

    console.log(slugRoute, "routeStartPath")

    if (routeStartPath?.startsWith("ORD-")) {
      localStorage.setItem('OrderCompanyDetails', routeStartPath);
    }
    if (result) {
      setResult1(result.data);
    }
  };

  const handleError = (error) => {
    console.log(error);
  };


    const [openpopup, setOpenPopup] = useState(false);
  // const [scantoast, setScanToast] = useState(false);
  const [message123, setMessage] = useState(false);

  useEffect(() => {

    if (result1) {

      const Compuuid = result1.split("scanorderdetails/")
      const slugRoute = result1?.replace(`${process.env.REACT_APP_WEB_APP_URL}`, '')
      console.log(slugRoute, "result1")
      const routeStartPath = slugRoute?.replace("/scanorderdetails/", "")
      if (routeStartPath) {
        setQROpen(false)
        const payload = {
          "order_uuid": routeStartPath,
          "status": "Delivered"
        }
        axios.put(`${process.env.REACT_APP_URL}/order/status/update`, payload, {
          headers: {
            "x-auth-token": currentUser?.token
          }
        }).then((res) => {
          console.log(res, "sdfsddffsdff")
          setOpenPopup(true)
          setMessage(true)
          toast.success(res.data.message)
        })
          .catch((err) => {
            console.log(err && err.response, "hjgjghgjhghj")
            setMessage(false)
            setOpenPopup(true)
            toast.error(err && err.response?.data)
          })
        // setScanToast(true)
      }
    }
  }, [result1])
    useEffect(() => {
        dispatch(AdminOrderListURL(page, search, currentUser?.token, limit, comapanyOption, option));
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
        dispatch(AdminProductStoreDropDownList(''))
    }, [])

    const [isClearable, setIsClearable] = useState(true);
    const [isRemove, setIsRemove] = useState(true);

    const CompanyDropDown = [];

    if (AdmincategoryDropdown?.data?.length > 0) {
        AdmincategoryDropdown.data.map((text) => {
            console.log(text, 'dvhgdvgbhfvbj')
            return CompanyDropDown.push({ label: text?.company_name, value: text?.uuid })
        })
    }

    const selectedCompany = (selectvalue) => {
        console.log(option, "selectvalue")
        setComapanyOption(selectvalue?.value)
        dispatch(AdminProductStoreDropDownList(selectvalue === null ? "" : selectvalue?.value))
        dispatch(AdminOrderListURL(0, search, currentUser.token, limit, selectvalue === null ? "" : selectvalue?.value, option === null || option === undefined ? "" : option))
    }

    const StoredropdownValues = [];

    if (storeList?.data?.length > 0) {
        storeList?.data?.map((text) => {
            console.log(text, 'dvhgdvgbhfvbj')
            return StoredropdownValues.push({ label: text?.store_name, value: text?.uuid })
        })
    }


    const dropdownValues = [];

    if (storeDropdown?.data?.length > 0) {
        storeDropdown.data.map((text) => {
            console.log(text, 'dvhgdvgbhfvbj')
            return dropdownValues.push({ label: text?.store_name, value: text?.uuid })
        })
    }


    const selectdropdown = (text) => {
        setOption(text?.value)
        setOption1(text)
        dispatch(AdminOrderListURL(0, search, currentUser.token, limit, comapanyOption === undefined ? "" : comapanyOption, text === null ? '' : text?.value))
    }

    const viewEventHandler = (event) => {
        history.push({
            pathname: '/order_view',
            state: event
        })
    }

    const viewEventHandlerSamePage = (event) => {
        console.log(event, 'vdshdgfv')
        setDiscountModal(true);
        // dispatch(ConsumerOrderView(currentUser?.token, event?.uuid))
        setView(event);
    }

    // setTimeout(() => {
    //     window.location.reload(true);
    //   }, 20000)

// useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         dispatch(AdminOrderListURL(page, search, currentUser?.token, limit, comapanyOption, option));
    //     }, 10000); 

    
    //     return () => clearInterval(intervalId);
    // }, []); 

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
                        {/* <Button variant="outline-primary" className="btn-icon btn-icon-only ms-1 d-inline-block d-lg-none">
                            <CsLineIcons icon="sort" />
                        </Button> */}
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
                <Col  lg="3" xxl="2" className="mb-1">
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

                <Col lg="3" xxl='2' className='mb-2'>
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
                        placeholder='Select Company'
                        styles={{
                            control: provided => ({
                                ...provided,
                                borderRadius: '12px',
                            }),
                        }}
                    />
                </Col>
                <Col lg="3" xxl='2' className='mb-2'>
                    {/* <Form.Label>Category</Form.Label> */}
                    <Select
                        className="basic-single"
                        classNamePrefix="select Store"
                        options={StoredropdownValues}
                        isClearable={isRemove}
                        // value={categoryId}
                        onChange={selectdropdown}
                        placeholder="Select Store"
                        styles={{
                            control: provided => ({
                                ...provided,
                                borderRadius: '12px',
                            }),
                        }}
                    // disabled={eventType}
                    />
                </Col>
                <Col  lg="2" xxl="2">
                    <Button xs="4" variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto"
                        onClick={() => setQROpen(true)}>
                        <CsLineIcons icon="scanner" /><span>Scan QR Code </span>
                    </Button>
                </Col>
                <Col lg="1" xxl='3' className="mb-1 text-end">
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
                <Col md="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                    <div className="text-muted text-small cursor-pointer ">ID</div>
                </Col>
                <Col md="1" className="d-flex flex-column pe-1 justify-content-center">
                    <div className="text-muted text-small cursor-pointer ">COMPANY  NAME</div>
                </Col>
                <Col md="1" className="d-flex flex-column pe-1 justify-content-center">
                    <div className="text-muted text-small cursor-pointer ">STORE NAME</div>
                </Col>
                <Col md="1" className="d-flex flex-column pe-1 justify-content-center">
                    <div className="text-muted text-small cursor-pointer ">CONSUMER NAME</div>
                </Col>
                <Col md="1" className="d-flex flex-column pe-1 justify-content-center">
                    <div className="text-muted text-small cursor-pointer ">ORDER TYPE</div>
                </Col>
                <Col md="1" className="d-flex flex-column pe-1 justify-content-center">
                    <div className="text-muted text-small cursor-pointer ">ORDER ID</div>
                </Col>
                <Col md="1" className="d-flex flex-column pe-1 justify-content-center">
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
                </Col>
            </Row>
            {/* List Header End */}

            {/* List Items Start */}
            {OrderData?.data?.map((text, index) => {
                console.log(text, 'bsdhbhf')
                return (
                    <Card className="mb-2" key={index}>
                        <Card.Body className="pt-0 pb-0 sh-40 sh-md-8">
                            <Row className="g-0 h-100 align-content-center cursor-default" onClick={() => checkItem(1)}>
                                <Col xs="6" md="1" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                                    <div className="text-muted text-small d-md-none">Id</div>
                                    {/* <NavLink to="/orders/detail" className="text-truncate h-100 d-flex align-items-center"> */}
                                    <div className="text-alternate">{index + 1}</div>
                                    {/* </NavLink> */}
                                </Col>
                                <Col xs="6" md="1" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                                    <div className="text-muted text-small d-md-none">Company Name</div>
                                    {/* <div className="text-alternate"></div> */}
                                    <Button variant="link" className="p-0 text-truncate h-100 d-flex align-items-center" onClick={() => viewEventHandlerSamePage(text)}>
                                        {text?.companies[0]?.company_name}
                                    </Button>
                                </Col>
                                <Col xs="6" md="1" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                                    <div className="text-muted text-small d-md-none">Store Name</div>
                                    <div className="text-alternate">{text?.stores?.length > 0 ? text?.stores[0]?.store_name : ""}</div>
                                </Col>
                                <Col xs="6" md="1" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                                    <div className="text-muted text-small d-md-none">Consumer Name</div>
                                    <div className="text-alternate">{text?.users?.length > 0 ? text?.users[0]?.name : ""}</div>
                                </Col>
                                <Col xs="6" md="1" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                                    <div className="text-muted text-small d-md-none">Order Type</div>
                                    <div className="text-alternate">{text?.order_created_by}</div>
                                </Col>
                                <Col xs="6" md="1" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                                    <div className="text-muted text-small d-md-none">Order Id</div>
                                    <div className="text-alternate">{text?.uuid}</div>
                                </Col>
                                <Col xs="6" md="1" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
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
                                </Col>
                                <Col xs="6" md="1" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-5 order-md-4">
                                    <div className="text-muted text-small d-md-none">Order Date</div>
                                    <div className="text-alternate"> {moment(text?.createdAt).format("YYYY-MM-DD HH:mm:ss")}</div>
                                </Col>
                                <Col xs="6" md="1" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                                    <div className="text-muted text-small d-md-none">Payment Status</div>
                                    <div>
                                        <Badge bg="outline-primary">{text?.payment_status}</Badge>
                                    </div>
                                </Col>
                                {/* <Col xs="1" md="1" className="d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-2 text-end order-md-last">
                            <Form.Check className="form-check mt-2 ps-5 ps-md-2" type="checkbox" checked={selectedItems.includes(1)} onChange={() => { }} />
                        </Col> */}
                                <Col xs="6" md="1" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                                    <div className="text-muted text-small d-md-none">Order Status</div>
                                    <div className="text-alternate">
                                        {text?.order_status}
                                    </div>
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

            {/* Discount Detail Modal Start */}
            <Modal className="modal-right scroll-out-negative" show={discountModal} onHide={() => setDiscountModal(false)} scrollable dialogClassName="full">
                <Modal.Header closeButton>
                    <Modal.Title as="h5">Orders View</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <OverlayScrollbarsComponent options={{ overflowBehavior: { x: 'hidden', y: 'scroll' } }} className="scroll-track-visible">
                        <Form>
                            {/* List Header Start */}
                            {/* <Row className="g-0 mb-2 d-none d-lg-flex">
                                <Col>
                                    <Row className="g-0 w-100 h-100 align-content-start  h-100"> */}
                            {/* <Col xs="1" lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                          <div className="text-muted text-medium cursor-pointer sort">S.No</div>
                        </Col> */}
                            {/* <Col xs="12" lg="6" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                                            <div className="text-muted text-medium cursor-pointer">Product Name</div>
                                            {view?.details?.length > 0 && view?.details?.map((item, index) => {
                                                console.log(item, 'hcbghefyef')
                                                return (
                                                    <div key={index}>{item?.name}</div>
                                                )
                                            })}
                                        </Col> */}
                            {/* <Col xs="2" lg="4" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                          <div className="text-muted text-medium cursor-pointer sort">Product Id</div>
                        </Col> */}
                            {/* <Col xs="12" lg="6" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                                            <div className="text-muted text-medium cursor-pointer ">Quantity</div>
                                            {view?.details?.length > 0 && view?.details?.map((item, index) => {
                                                console.log(item, 'hcbghefyef')
                                                return (
                                                    <div key={index}>{item?.quantity}</div>
                                                )
                                            })}
                                        </Col> */}
                            {/* <Col xs="2" lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                          <div className="text-muted text-medium cursor-pointer sort">Price</div>
                        </Col> */}
                            {/* </Row>
                                </Col>
                            </Row>
                        </Form> */}



                            <Row className="g-3 ">
                                <Col xs="9" lg="9" className="d-flex flex-column mb-lg-0 pe-3 d-flex mb-4">
                                    <div className="text-muted text-medium cursor-pointer">Product Name</div>
                                    {view?.details?.length > 0 && view?.details?.map((item, index) => {
                                        console.log(item, 'hcbghefyef')
                                        return (
                                            <div key={index}>{item?.name?.length > 18 ? `${item?.name.slice(0, 18)}..` : item?.name}</div>
                                        )
                                    })}
                                </Col>
                                <Col xs="3" lg="3" className="d-flex flex-column mb-lg-0 pe-3 d-flex mb-4">
                                    <div className="text-muted text-medium cursor-pointer ">Quantity</div>
                                    {view?.details?.length > 0 && view?.details?.map((item, index) => {
                                        console.log(item, 'hcbghefyef')
                                        return (
                                            <div key={index}>{item?.quantity}</div>
                                        )
                                    })}
                                </Col>
                                <Col xs='6' lg="6">
                                    <Form.Label>Payment Status</Form.Label>
                                    <Form.Control type="text" disabled value={view?.payment_status} />
                                </Col>
                                <Col xs='6' lg="6">
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control type="text" disabled value={view?.amount} />
                                </Col>
                                <Col xs='6' lg="6">
                                    <Form.Label>Order Created By</Form.Label>
                                    <Form.Control type="text" disabled value={view?.order_created_by} />
                                </Col>

                                <Col xs='6' lg="6">
                                    <Form.Label>Online Payment</Form.Label>
                                    <Form.Control type="text" disabled value={view?.online_payment} />
                                </Col>
                                <Col xs='6' lg="6">
                                    <Form.Label>Paid From Wallet</Form.Label>
                                    <Form.Control type="text" disabled value={view?.paid_from_wallet} />
                                </Col>
                                <Col xs='6' lg="6">
                                    <Form.Label>Payment Mode</Form.Label>
                                    <Form.Control type="text" disabled value={view?.payment_type} />
                                </Col>
                                <Col xs='6' lg="6">
                                    <Form.Label>SGST Tax</Form.Label>
                                    <Form.Control type="text" disabled value={view?.sgst_tax} />
                                </Col>
                                <Col xs='6' lg="6">
                                    <Form.Label>CGST Tax</Form.Label>
                                    <Form.Control type="text" disabled value={view?.cgst_tax} />
                                </Col>
                            </Row>

                            {/* <div className="mb-3">
                <Form.Label>Type</Form.Label>
                <Select classNamePrefix="react-select" options={options} value={discountType} onChange={setDiscountType} placeholder="" />
              </div>
              <div className="mb-3">
                <Form.Label>Start</Form.Label>
                <DatePicker className="form-control" selected={startDate} onChange={(date) => setStartDate(date)} />
              </div>
              <div className="mb-3">
                <Form.Label>End</Form.Label>
                <DatePicker className="form-control" selected={endDate} onChange={(date) => setEndDate(date)} />
              </div> */}
                            {/* <div className="mb-3">
                <Form.Label>Limit</Form.Label>
                <Form.Control type="text" defaultValue="5000" />
              </div>
              <div className="mb-3">
                <Form.Label>Usage</Form.Label>
                <Form.Control type="text" defaultValue="2723" readOnly />
              </div> */}
                        </Form>
                    </OverlayScrollbarsComponent>
                </Modal.Body>
                {/* <Modal.Footer className="border-0">
          <Button variant="outline-primary" className="btn-icon btn-icon-only ">
            <CsLineIcons icon="bin" />
          </Button>
          <Button variant="primary" className="btn-icon btn-icon-start">
            <CsLineIcons icon="save" /> <span>Save</span>
          </Button>
        </Modal.Footer> */}
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

            <Dialog
          open={qropen}
          onClose={() => setQROpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* qr code start */}
          <DialogContent style={{ width: "100%", height: "100%" }}>
            <QrReader
              delay={delay}
              style={previewStyle}
              onError={handleError}
              // onScan={handleScan}
              onScan={(result) => handleScan(result)}
            />
          </DialogContent>
          {/* <p>{result1}</p> */}
        </Dialog>

        <Dialog
          open={openpopup}
          onClose={() => setOpenPopup(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent style={{ width: "100%", height: "100%" }}>
            <Row>
              <Col xs="12" lg="12" className="order-0 order-lg-1">
                {/* <h2 className="small-title">Order Placed</h2> */}
                <Card style={{ width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                  <Card.Body>
                    <div className="mb-4">
                      <div className="mb-2">
                        <div >
                          <CsLineIcons icon="check-circle" size="45" />
                        </div>
                        <h3 >
                          {message123 ? "Order successfully Delivered" : "Already Order Delivered"}
                        </h3>
                      </div>
                    </div>
                    <br />

                    <Button className="btn-icon btn-icon-end w-100" variant="primary" onClick={() => { setOpenPopup(false); setQROpen(true) }}>
                      <CsLineIcons icon="chevron-left" />
                      <span>Back to Scan </span>
                    </Button>

                  </Card.Body>
                </Card>
              </Col>
            </Row >
          </DialogContent>
        </Dialog>

        </>
    );
};

export default Order;
