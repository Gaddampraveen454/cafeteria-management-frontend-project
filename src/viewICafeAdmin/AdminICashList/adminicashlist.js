import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import Select from 'react-select';
import {
    Autocomplete,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Input,
    TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AdminProductBulkUplodURL, AdminProductStatusUpdateURL, AdminProductStoreDropDownListURL, AdminProductStoreDropDownList } from 'Redux/IcafeAdminRedux/ProductManagement/productmanagementredux';
import { ActiveCompnyURL } from 'Redux/AdminRedux/Comapny/ActiveCompany';
import { CategoryListURL, CategoryAddURL, CategoryUpdateURL, CategoryStatusUpdateURL } from 'Redux/AdminRedux/Cataogy/categoryRedux';
import { toast } from 'react-toastify';
import moment from 'moment';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ICafeAdminCategoryDropDownListURL } from 'Redux/IcafeAdminRedux/CategoryManagement/admincategorymanagementredux';
import { ICafeAdminUserDropdownList } from 'Redux/IcafeAdminRedux/Reports/reportsredux';
import { AdminICashListURL } from 'Redux/IcafeAdminRedux/AdminIcash/adminicashRedux';

import Swal from 'sweetalert2';

const AdminICashList = () => {
    const dispatch = useDispatch()
    const title = 'ICash List';
    // const description = 'Ecommerce Product Management Page';

    const [selectValueState, setSelectValueState] = useState();
    const optionsState = [
        { value: 'Fougasse', label: 'Fougasse' },
        { value: 'Lefse', label: 'Lefse' },
    ];
    const optionsType = [
        { value: 'credited', label: 'Credited' },
        { value: 'debited', label: 'Debited' },
    ];


    const [selectValueCity, setSelectValueCity] = useState();
    const optionsCity = [
        { value: 'Breadstick', label: 'Breadstick' },
        { value: 'Biscotti', label: 'Biscotti' },
    ];

    const [selectValueMonth, setSelectValueMonth] = useState();
    const optionsMonth = [
        { value: '01', label: '01' },
        { value: '02', label: '02' },
        { value: '03', label: '03' },
        { value: '04', label: '04' },
        { value: '05', label: '05' },
        { value: '06', label: '06' },
        { value: '07', label: '07' },
        { value: '08', label: '08' },
        { value: '09', label: '09' },
        { value: '10', label: '10' },
        { value: '11', label: '11' },
        { value: '12', label: '12' },
    ];

    const [selectValueYear, setSelectValueYear] = useState();
    const optionsYear = [
        { value: '21', label: '21' },
        { value: '22', label: '22' },
        { value: '23', label: '23' },
        { value: '24', label: '24' },
        { value: '25', label: '25' },
        { value: '26', label: '26' },
        { value: '27', label: '27' },
        { value: '28', label: '28' },
        { value: '29', label: '29' },
        { value: '30', label: '30' },
    ];

    const [suc, setSuc] = useState(false);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('')
    const [limit, setLimit] = useState(10);

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


    const { currentUser } = useSelector((state) => state.auth)
    const { IcashListData, notification } = useSelector((state) => state.adminIcash)
    const { userDrop } = useSelector((state) => state.admindashbord);

    // const UsersList = [];

    // if (userDrop.length > 0) {
    //     userDrop && userDrop?.map((item) => {
    //         return UsersList.push({ label: item.name, value: item.uuid })
    //     })
    // }
    const [userslist, setUsersList] = useState('');
    const [userslist1, setUsersList1] = useState('');

    const [WithdrawType, setWithdrawType] = useState('');
    const [WithdrawType1, setWithdrawType1] = useState('');

    const UsersList = userDrop.map((item) => {
        return { label: item.name, value: item.uuid };
    });

    const HandleUserSelect = (event) => {
        setUsersList(event)
        setUsersList1(event?.value)
        dispatch(AdminICashListURL(page, currentUser.token, limit, event === null ? "" : event?.value, ''))
    }

    const HandleTypeSelect = (event) => {
        setWithdrawType(event);
        setWithdrawType1(event?.value)
        dispatch(AdminICashListURL(page, currentUser.token, limit, userslist1 === undefined ? "" : userslist1, event === null ? "" : event?.value))
    }

    useEffect(() => {
        dispatch(AdminICashListURL(page, currentUser.token, limit, userslist1, WithdrawType1))
        dispatch(ICafeAdminUserDropdownList(currentUser.token, ""))
    }, [])

    useEffect(() => {
        if (suc === true) {
            if (notification.status === true) {
                toast.success(notification.message, {
                    position: "top-right",
                    duration: 1000
                })
                setSuc(false)
                setTimeout(() => {
                    dispatch(AdminICashListURL(page, currentUser.token, limit, userslist1, WithdrawType1))
                }, 1000)

            }
            else if (notification.status === false) {
                toast.error(notification.message)
                setSuc(false)
            }
        }

    }, [notification])

    const searchfunction = (type, pages) => {
        if (type === "search") {
            console.log(pages, "ghjkvbnm")
            setSearch(pages)
            setPage(0)
            dispatch(AdminICashListURL(0, currentUser.token, limit, userslist1, WithdrawType1))
        }
        if (type === "prev") {
            setPage(page - 1)
            dispatch(AdminICashListURL(page - 1, currentUser.token, limit, userslist1, WithdrawType1))
        }
        else if (type === "next") {
            setPage(page + 1)
            dispatch(AdminICashListURL(page + 1, currentUser.token, limit, userslist1, WithdrawType1))
        }
        else if (type === "page") {
            setPage(page)
            dispatch(AdminICashListURL(page, currentUser.token, limit, userslist1, WithdrawType1))
        }
        else if (type === "page+1") {
            setPage(page + 1)
            dispatch(AdminICashListURL(page + 1, currentUser.token, limit, userslist1, WithdrawType1))
        }
        else if (type === "page+2") {
            setPage(page + 2)
            dispatch(AdminICashListURL(page + 2, currentUser.token, limit, userslist1, WithdrawType1))
        }
        else if (type === "limit") {
            setLimit(pages)
            setPage(0)
            dispatch(AdminICashListURL(0, currentUser.token, pages, userslist1, WithdrawType1))
        }
    }

    const [isClearable, setIsClearable] = useState(true);
    const [isRemove, setIsRemove] = useState(true);


    return (
        <>
            <HtmlHead title={title} />
            <div className="page-title-container">
                <Row className="g-0">
                    {/* Title Start */}
                    <Col className="col-auto mb-3 mb-sm-0 me-auto">
                        <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back mb-2" to="/">
                            <CsLineIcons icon="chevron-left" size="20" />
                            <span className="align-middle text-medium ms-1">Home</span>
                        </NavLink>
                        <h1 className="mb-0 pb-0 display-4" id="title">
                            {title}
                        </h1>
                    </Col>
                    {/* Title End */}

                    {/* Top Buttons Start */}
                    <Col xs="12" sm="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
                        {/* <Button variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto" onClick={() => setOpen(true)}>
                            <CsLineIcons icon="plus" /> <span>Upload Product</span>
                        </Button> */}
                        {/* <NavLink to="/add_banner">
                            <Button variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto">
                                <CsLineIcons icon="plus" /> <span>Add Banner</span>
                            </Button>
                        </NavLink> */}
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
                <Col md="5" lg="3" xxl="2" className="mb-1">
                    {/* Search Start */}
                    {/* <Form.Label/> */}
                    {/* <div className="d-inline-block float-md-start me-1 mb-1 search-input-container w-100 shadow bg-foreground">

                        <Form.Control type="text" onChange={(event) => searchfunction("search", event.target.value)} placeholder="Search" />
                        <span className="search-magnifier-icon">
                            <CsLineIcons icon="search" />
                        </span>
                        <span className="search-delete-icon d-none">
                            <CsLineIcons icon="close" />
                        </span>
                    </div> */}
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
                    <Form.Label>Users</Form.Label>
                    <Select
                        className="basic-single"
                        classNamePrefix="select company"
                        isClearable={isRemove}
                        value={userslist}
                        onChange={HandleUserSelect}
                        name="color"
                        border="none"
                        options={UsersList}
                        placeholder='Select Users'
                        styles={{
                            control: provided => ({
                                ...provided,
                                borderRadius: '12px',
                            }),
                        }}
                    />
                </Col>
                <Col lg="3">
                    <Form.Label>Type</Form.Label>
                    <Select
                        className="basic-single"
                        classNamePrefix="select company"
                        isClearable={isRemove}
                        value={WithdrawType}
                        onChange={HandleTypeSelect}
                        name="color"
                        border="none"
                        options={optionsType}
                        placeholder='Select Type'
                        styles={{
                            control: provided => ({
                                ...provided,
                                borderRadius: '12px',
                            }),
                        }}
                    />
                </Col>
                {/* <Col lg="3"> */}
                {/* <Autocomplete
                    // disablePortal
                    id="combo-box-demo"
                    options={CompanyDropDown}
                    onChange={selectedCompany}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Movie" />}
                /> */}
                {/* </Col> */}
                {/* <Col lg="3">
                    <Form.Label>Category</Form.Label>

                    <Select
                        className="basic-single"
                        classNamePrefix="select Store"
                        isClearable={isClearable}
                        Value={store1}
                        onChange={selectdropdown}
                        name="color"
                        border="none"
                        // placeholder='Select Store'
                        options={dropdownValues}
                        styles={{
                            control: provided => ({
                                ...provided,
                                borderRadius: '12px',
                            }),
                        }}
                        placeholder="Select Store"
                    />
                </Col> */}
                <Col md="7" lg="9" xxl="10" className="mb-1 text-end">

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
            <Row className="g-0 mb-2 d-none d-lg-flex">
                {/* <Col xs="auto" className="sw-11 d-none d-lg-flex" /> */}
                <Col>
                    <Row className="g-0 h-100 align-content-center custom-sort ps-5 pe-4 h-100">
                        <Col md="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                            <div className="text-muted text-small cursor-pointer ">S NO.</div>
                        </Col>
                        <Col xs="2" lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                            <div className="text-muted text-medium cursor-pointer sort">Transaction Id</div>
                        </Col>
                        <Col xs="2" lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                            <div className="text-muted text-medium cursor-pointer sort">User Name</div>
                        </Col>
                        <Col xs="2" lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                            <div className="text-muted text-medium cursor-pointer sort">Date</div>
                        </Col>
                        <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
                            <div className="text-muted text-medium cursor-pointer sort">Amount</div>
                        </Col>
                        <Col xs="2" lg="1" className="d-flex flex-column pe-1 justify-content-center">
                            <div className="text-muted text-medium cursor-pointer sort">Status</div>
                        </Col>
                        <Col xs="2" lg="1" className="d-flex flex-column pe-1 justify-content-center">
                            <div className="text-muted text-medium cursor-pointer " >Type</div>
                        </Col>
                        {/* <Col xs="2" lg="1" className="d-flex flex-column pe-1 justify-content-center">
                            <div className="text-muted text-medium cursor-pointer sort">Veg/Non Veg</div>
                        </Col>
                        <Col xs="2" lg="1" className="d-flex flex-column pe-1 justify-content-center">
                            <div className="text-muted text-medium cursor-pointer sort">stock quantity</div>
                        </Col>
                        <Col xs="2" lg="1" className="d-flex flex-column pe-1 justify-content-center">
                            <div className="text-muted text-medium cursor-pointer sort">Price</div>
                        </Col>
                        <Col xs="2" lg="1" className="d-flex flex-column pe-1 justify-content-center">
                            <div className="text-muted text-medium cursor-pointer sort">Quantity</div>
                        </Col> */}
                    </Row>
                </Col>
            </Row>
            {/* List Header End */}

            {/* List Items Start */}
            {IcashListData?.data?.length > 0 && IcashListData && IcashListData?.data && IcashListData?.data?.map((item, index) => {

                console.log(item, 'svdghvfdfdsdghf')
                const textStyle = {
                    backgroundColor: item.type === 'credited' ? 'green' : 'red',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '5px'
                };
                return <div key={index}>
                    <Card className={`mb-2 ${selectedItems.includes(1) && 'selected'}`}>
                        <Row className="g-0 h-100 sh-lg-9 position-relative">
                            <Col className="py-4 py-lg-0 ps-5 pe-4 h-100">
                                <Row className="g-0 h-100 ">
                                    <Col xs="11" md="1" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                                        <div className="text-muted text-small d-md-none">S NO.</div>
                                        <div className="text-truncate h-100 d-flex align-items-center">
                                            {index + 1}
                                        </div>
                                    </Col>
                                    <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                                        <div className="lh-1 text-alternate">{item.transaction_uuid}</div>
                                    </Col>
                                    <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                                        <div className="lh-1 text-alternate">{item.users[0].name}</div>
                                    </Col>
                                    <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                                        <div className="lh-1 text-alternate">{(moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss"))}</div>
                                    </Col>
                                    <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                                        <div className="lh-1 text-alternate">{item.amount}</div>
                                    </Col>
                                    <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                                        <div className="lh-1 text-alternate">{item.status}</div>
                                    </Col>
                                    <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                                        <div className="lh-1 text-alternate">
                                            <span style={textStyle}>
                                                {item?.type === "credited" ? "Credited" : "Debited"}
                                            </span>
                                        </div>
                                    </Col>
                                    {/* <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                                        <div className="lh-1 text-alternate">{item.company_name}</div>
                                    </Col>
                                    <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                                        <div className="lh-1 text-alternate">{item.type}</div>
                                    </Col>
                                    <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                                        <div className="lh-1 text-alternate">{item.stock_quantity}</div>
                                    </Col>
                                    <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                                        <div className="lh-1 text-alternate">{item.price}</div>
                                    </Col>
                                    <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                                        <div className="lh-1 text-alternate">{item.quantity}</div>
                                    </Col> */}
                                    {/* {toggle code} */}
                                    {/* <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                                        <div className="lh-1 text-alternate">
                                            <div className="mb-n1">
                                                <Form.Check
                                                    type="switch"
                                                    checked={item.is_active}
                                                    onClick={() => HandleBannerStatus(item)}
                                                />
                                            </div>
                                        </div>
                                    </Col> */}
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </div>
            })}

            {/* List Items End */}

            {/* Pagination Start */}
            {/* <div className="d-flex justify-content-center mt-5">
        <Pagination>
          <Pagination.Prev className="shadow" disabled>
            <CsLineIcons icon="chevron-left" />
          </Pagination.Prev>
          <Pagination.Item className="shadow" active>
            1
          </Pagination.Item>
          <Pagination.Item className="shadow">2</Pagination.Item>
          <Pagination.Item className="shadow">3</Pagination.Item>
          <Pagination.Next className="shadow">
            <CsLineIcons icon="chevron-right" />
          </Pagination.Next>
        </Pagination>
      </div> */}
            <div className="d-flex justify-content-center mt-5">
                <Pagination>
                    <Pagination.Prev className="shadow" disabled={page === 0} onClick={() => searchfunction("prev")}>
                        <CsLineIcons icon="chevron-left" />
                    </Pagination.Prev>
                    <Pagination.Item className="shadow" active onClick={() => searchfunction("page")} >
                        {page + 1}
                    </Pagination.Item>
                    <Pagination.Item className="shadow" disabled={Math.ceil(IcashListData && IcashListData.count / limit) <= page + 1} onClick={() => searchfunction("page+1", page + 1)}>{page + 2}</Pagination.Item>
                    <Pagination.Item className="shadow" disabled={Math.ceil(IcashListData && IcashListData.count / limit) <= page + 2} onClick={() => searchfunction("page+2", page + 2)}>{page + 3}</Pagination.Item>

                    {Math.ceil(IcashListData && IcashListData.count / limit) > page + 3 &&
                        <>
                            <Pagination.Item className="shadow" >...</Pagination.Item>
                        </>

                    }
                    <Pagination.Next className="shadow" disabled={Math.ceil(IcashListData && IcashListData.count / limit) <= page + 1} onClick={() => searchfunction("next")}>
                        <CsLineIcons icon="chevron-right" />
                    </Pagination.Next>
                </Pagination>
            </div>
            {/* Pagination End */}
        </>
    );
};

export default AdminICashList;

