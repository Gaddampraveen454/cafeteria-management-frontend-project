import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import { companycouponslist, companyCouponStatus } from 'Redux/IcafeAdminRedux/CouponsRedux/coponscompanyredux';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { AdminCategoryListURL, AdminCategoryUpdateURL, AdminCategoryStatusUpdateURL, ICafeAdminCategoryDropDownListURL, ICafeAdminCategoryStoreDropDownList } from 'Redux/IcafeAdminRedux/CategoryManagement/admincategorymanagementredux';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Input,
} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const category = () => {
    const dispatch = useDispatch()
    const title = 'Coupons List';
    const description = 'Ecommerce Category Management Page';

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

    const [open, setOpen] = React.useState(false);
    const [eventType, setEventType] = useState(false)
    const [name, setName] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [suc, setSuc] = useState(false);

    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('')
    const [companyDrop, setComapnyDrop] = useState('');
    const [companyDrop1, setComapnyDrop1] = useState('');

    const [storeDrop, setStoreDrop] = useState('');
    const [storeDrop1, setStoreDrop1] = useState('');
    const [sortOrder, setSortOrder] = useState('');


    const [companyUpdateDrop, setCompanyUpdateDrop] = useState('');
    const [storeUpdateDrop, setStoreUpdateDrop] = useState('');


    const { currentUser } = useSelector((state) => state.auth)
    console.log(currentUser, 'dvcgvdh')
    // const { cashierData } = useSelector((state) => state.cashierList)
    const { categoryData, AdmincategoryDropdown, storeDropdownByCompanyId } = useSelector((state) => state.admincategory)
    const { Couponsdata ,notification} = useSelector((state) => state.companycoupons)
    console.log(Couponsdata, "CouponsdataCouponsdataer")
    // companycoupons
    console.log(AdmincategoryDropdown, 'evhgfvgefvef')
    useEffect(() => {
        dispatch(companycouponslist(page, search, limit, "", currentUser?.data?.uuid, storeDrop, currentUser?.token))
        // dispatch(companycouponslist())
    }, [])
    // /Updatecoupon
    const history = useHistory();

    const eventHandler = (event) => {
        console.log(event, "eventevent")
        history.push({
            pathname: "/Updatecoupon",
            state: event
        })
    }

    // const eventHandler = (event) => {
    //     setOpen(true)

    //     console.log(event, "eventxcvvxcvv")
    //     setName(event.name)
    //     setCompanyUpdateDrop({ label: event.company[0].company_name, value: event.company[0].uuid })
    //     setStoreUpdateDrop({ label: event.store[0].store_name, value: event.store[0].uuid })
    //     setCategoryId(event.uuid)
    //     setSortOrder(event.sort_order)
    // };



    const updateCategory = (event) => {
        event.preventDefault()
        const value = event.target.elements
        if (sortOrder <= 0) {
            toast.error("Sort order must be greater than zero");
            return; // Stop the function if validation fails
        }
        const payload = {
            "company_uuid": companyUpdateDrop?.value,
            "store_uuid": storeUpdateDrop?.value,
            "name": name,
            "sort_order": sortOrder

        }
        dispatch(AdminCategoryUpdateURL(categoryId, payload, currentUser.token))
        // dispatch(CompanyListURL(currentUser.token))
        setSuc(true)
    }

    const searchfunction = (type, pages) => {
        if (type === "search") {
            console.log(pages, "ghjkvbnm")
            setSearch(pages)
            setPage(0)
            // dispatch(AdminCategoryListURL(0, pages, limit, companyDrop, storeDrop))
            dispatch(companycouponslist(0, page, limit, "", currentUser?.data?.uuid, storeDrop, currentUser?.token))
        }
        if (type === "prev") {
            setPage(page - 1)
            // dispatch(AdminCategoryListURL(page - 1, search, limit, currentUser?.data?.uuid, storeDrop))
            dispatch(companycouponslist(page - 1, search, limit, "", currentUser?.data?.uuid, storeDrop, currentUser?.token))
        }
        else if (type === "next") {
            setPage(page + 1)
            // dispatch(AdminCategoryListURL(page + 1, search, limit, currentUser?.data?.uuid, storeDrop))
            dispatch(companycouponslist(page + 1, search, limit, "", currentUser?.data?.uuid, storeDrop, currentUser?.token))


        }
        else if (type === "page") {
            setPage(page)
            // dispatch(AdminCategoryListURL(page, search, limit, currentUser?.data?.uuid, storeDrop))
            dispatch(companycouponslist(page, search, limit, "", currentUser?.data?.uuid, storeDrop, currentUser?.token))


        }
        else if (type === "page+1") {
            setPage(page + 1)
            // dispatch(AdminCategoryListURL(page + 1, search, limit, currentUser?.data?.uuid, storeDrop))
            dispatch(companycouponslist(page + 1, search, limit, "", currentUser?.data?.uuid, storeDrop, currentUser?.token))

        }
        else if (type === "page+2") {
            setPage(page + 2)
            // dispatch(AdminCategoryListURL(page + 2, search, limit, currentUser?.data?.uuid, storeDrop))
            dispatch(companycouponslist(page + 2, search, limit, "", currentUser?.data?.uuid, storeDrop, currentUser?.token))

        }
        else if (type === "limit") {
            setLimit(pages)
            setPage(0)
            // dispatch(AdminCategoryListURL(0, search, pages, currentUser?.data?.uuid, storeDrop))
            dispatch(companycouponslist(0, search, pages, "", currentUser?.data?.uuid, storeDrop, currentUser?.token))

        }
    }

    const HandleCategoryStatus = (event) => {
        console.log(event, "eventxcvvxcvv")
        // if (event.is_delivered)
        const payload = {
            "uuid": event.uuid,
            "status": !event.is_active
        }
        dispatch(companyCouponStatus(payload, currentUser.token))
        setSuc(true)

    };
    const [isClearable, setIsClearable] = useState(true);
    const [isRemove, setIsRemove] = useState(true);

    // useEffect(() => {
    //     dispatch(ICafeAdminCategoryDropDownListURL());
    // }, [])

    const categoryDrop = [];

    AdmincategoryDropdown?.data?.map((text) => {
        console.log(text, 'sbdvhbsdvb')
        return categoryDrop.push({ value: text?.uuid, label: text?.company_name })
    })

    const selectCompanyFunction = (selectedEvent) => {
        setComapnyDrop(selectedEvent?.value);
        setComapnyDrop1(selectedEvent)
        setStoreDrop1('')
        dispatch(ICafeAdminCategoryStoreDropDownList(selectedEvent === null ? "" : selectedEvent?.value));
        // dispatch(AdminCategoryListURL(page, search, limit, selectedEvent === null ? "" : selectedEvent?.value, ""))
        dispatch(companycouponslist(page, search, limit, "", selectedEvent === null ? "" : selectedEvent?.value, "", currentUser?.token))
    }

    useEffect(() => {
        dispatch(ICafeAdminCategoryStoreDropDownList(""));
    }, [])

    const StoreDropp = [];

    storeDropdownByCompanyId?.data?.map((text) => {
        console.log(text, 'hdfbhfbfb')
        return StoreDropp.push({ value: text?.uuid, label: text?.store_name })
    })

    const selectStoreDrop = (storeDroped) => {
        setStoreDrop(storeDroped?.value);
        setStoreDrop1(storeDroped)
        // dispatch(AdminCategoryListURL(page, search, limit, currentUser?.data?.uuid, storeDroped === null ? "" : storeDroped?.value))
        dispatch(companycouponslist(page, search, limit, "", currentUser?.data?.uuid, storeDroped === null ? "" : storeDroped?.value, currentUser?.token))
    }

    const handleUpdateDrop = (select) => {
        console.log(select, 'sbdvhbsdvjrthritb')
        setCompanyUpdateDrop(select)
        dispatch(ICafeAdminCategoryStoreDropDownList(select === null ? "" : select?.value));
    }

    const handleUpdateStore = (selected) => {
        setStoreUpdateDrop(selected)
    }


    useEffect(() => {
        console.log(suc, "hgfdsjjdshfjshfj")
        if (suc === true) {
            if (notification.status === true) {
                toast.success(notification.message, {
                    position: "top-right",
                })
                // setSuc(false)
                setTimeout(() => {
                    // dispatch(AdminCategoryListURL(page, search, limit, companyDrop, storeDrop))
                    dispatch(companycouponslist(page, search, limit, "", currentUser?.data?.uuid, storeDrop, currentUser?.token))

                    setOpen(false)
                }, 1000)

            }
            else if (notification.status === false) {
                toast.error(notification.message)
                setSuc(false)
            }
        }

    }, [suc, notification])


    return (
        <>
            <HtmlHead title={title} description={description} />
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
                        <NavLink to="/Addcoupon">
                            <Button variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto">
                                <CsLineIcons icon="plus" /> <span>Add Coupons</span>
                            </Button>
                        </NavLink>
                        <Button variant="outline-primary" className="btn-icon btn-icon-only ms-1 d-inline-block d-lg-none">
                            <CsLineIcons icon="sort" />
                        </Button>

                    </Col>
                    {/* Top Buttons End */}
                </Row>
            </div>

            <Row className="mb-3">
                <Col lg="3" className="mb-1">
                    {/* Search Start */}
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

                {/* <Col lg="3">
                   
                    <Select
                        className="basic-single"
                        classNamePrefix="select Store"
                        options={StoreDropp}
                        isClearable={isRemove}
                        value={storeDrop1}
                        onChange={selectStoreDrop}
                        placeholder="Select Store"
                      
                        styles={{
                            control: provided => ({
                                ...provided,
                                borderRadius: '12px',
                            }),
                        }}
                    />
                </Col> */}


                <Col lg="3" className="mb-1 text-end">


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
                        <Col xs="1" lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                            <div className="text-muted text-medium cursor-pointer sort">image</div>
                        </Col>
                        <Col xs="1" lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                            <div className="text-muted text-medium cursor-pointer sort">Amount</div>
                        </Col>
                        <Col xs="1" lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                            <div className="text-muted text-medium cursor-pointer sort">Coupon Code</div>
                        </Col>
                        <Col xs="2" lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                            <div className="text-muted text-medium cursor-pointer sort">Category Id</div>
                        </Col>
                        <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
                            <div className="text-muted text-medium cursor-pointer " >Company Name</div>
                        </Col>
                        <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
                            <div className="text-muted text-medium cursor-pointer " >Store Name</div>
                        </Col>
                        <Col xs="1" lg="1" className="d-flex flex-column pe-1 justify-content-center">
                            <div className="text-muted text-medium " />
                        </Col>
                        <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
                            <div className="text-muted text-medium cursor-pointer sort">Action</div>
                        </Col>

                    </Row>
                </Col>
            </Row>
            {/* List Header End */}

            {/* List Items Start */}
            {Couponsdata?.data?.length > 0 && Couponsdata?.data?.map((item, index) => {
                console.log(item, "itemsdfgdfg54454")
                return <div key={index}>
                    <Card className={`mb-2 ${selectedItems.includes(1) && 'selected'}`}>
                        <Row className="g-0 h-100 sh-lg-9 position-relative">


                            <Col className="py-4 py-lg-0 ps-5 pe-4 h-100">
                                <Row className="g-0 h-100 ">
                                    <Col xs="1" md="1" className="d-flex flex-column justify-content-center mb-2 mb-md-0" >
                                        <div>
                                            <img crossOrigin="anonymous" src={item.image} alt="" style={{ width: "50px" }} />
                                        </div>
                                    </Col>
                                    <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                                        <div className="lh-1 text-alternate">{item.amount}</div>
                                    </Col>
                                    <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                                        <div className="lh-1 text-alternate">{item.code}</div>
                                    </Col>
                                    <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                                        <div className="lh-1 text-alternate">{item.uuid}</div>
                                    </Col>

                                    <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                                        <div className="lh-1 text-alternate">{item?.company[0]?.company_name}</div>
                                    </Col>
                                    <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                                        <div className="lh-1 text-alternate">{item?.store[0]?.store_name}</div>
                                    </Col>
                                    <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                                        <div className="lh-1 text-alternate">
                                            <div className="mb-n1">
                                                {/* <Form.Check type="switch" id="quantitySwitch1" label="Allow out of stock purchase" /> */}
                                                <Form.Check

                                                    type="switch"
                                                    checked={item.is_active}
                                                    onClick={() => { HandleCategoryStatus(item) }}

                                                />
                                                {/* <Form.Check type="switch" id="quantitySwitch3" label="Display quantity at storefront" /> */}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                                        <div className="lh-1 text-alternate">
                                            <div className="lh-1 text-alternate">
                                                <table>
                                                    <tr>

                                                        {/* <td>
                                                            <Button title="VIEW" variant="outline-primary" className="btn px-2 py-2" onClick={() => { eventHandler(item); }}>
                                                                <CsLineIcons icon="eye" />
                                                            </Button>
                                                        </td> */}
                                                        <td>
                                                            <Button title="EDIT" variant="outline-success" className="btn px-2 py-2" onClick={() => eventHandler(item)}>
                                                                <CsLineIcons icon="edit-square" />
                                                            </Button>
                                                        </td>

                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </Col>

                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </div>
            })}

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
                    <Pagination.Item className="shadow" disabled={Math.ceil(categoryData && categoryData.count / limit) <= page + 1} onClick={() => searchfunction("page+1", page + 1)}>{page + 2}</Pagination.Item>
                    <Pagination.Item className="shadow" disabled={Math.ceil(categoryData && categoryData.count / limit) <= page + 2} onClick={() => searchfunction("page+2", page + 2)}>{page + 3}</Pagination.Item>

                    {Math.ceil(categoryData && categoryData.count / limit) > page + 3 &&
                        <>
                            <Pagination.Item className="shadow" >...</Pagination.Item>
                        </>

                    }
                    <Pagination.Next className="shadow" disabled={Math.ceil(categoryData && categoryData.count / limit) <= page + 1} onClick={() => searchfunction("next")}>
                        <CsLineIcons icon="chevron-right" />
                    </Pagination.Next>
                </Pagination>
            </div>
            {/* Pagination End */}



            {/* edit view popup start */}
            <div>
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    {/* <DialogTitle id="alert-dialog-title1">
          Hello India1
       
        </DialogTitle> */}
                    <DialogContent style={{ width: "500px", height: "auto" }}>
                        <Form
                            onSubmit={updateCategory}
                        >
                            <Row className="g-3">
                                <Col lg="12">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" value={name} onChange={(e) => { setName(e.target.value) }} disabled={eventType} />
                                    {/* <Select classNamePrefix="react-select" options={optionsState} value={selectedCompany} onChange={setSelectedCompany} placeholder="" /> */}
                                </Col>
                                <Col lg='12' className="mb-1">
                                    <Form.Label>Select Company</Form.Label>
                                    <Select
                                        classNamePrefix="react-select"
                                        className=""
                                        name="categery"
                                        options={categoryDrop}
                                        defaultValue={companyUpdateDrop}
                                        onChange={handleUpdateDrop}
                                        placeholder="Select Company"
                                        required
                                        style={{ borderRadius: '10px' }}
                                        isDisabled={eventType}
                                    />
                                </Col>
                                <Col lg='12' className="mb-1">
                                    <Form.Label>Select Store</Form.Label>
                                    <Select
                                        classNamePrefix="react-select"
                                        className=""
                                        name="categery"
                                        options={StoreDropp}
                                        defaultValue={storeUpdateDrop} //
                                        onChange={handleUpdateStore}
                                        placeholder="Select Store"
                                        required
                                        style={{ borderRadius: '10px' }}
                                        isDisabled={eventType}
                                    />
                                </Col>
                                <Col lg="12">
                                    <Form.Label>Sort</Form.Label>
                                    <Form.Control type="number" value={sortOrder} onChange={(e) => { setSortOrder(e.target.value) }} disabled={eventType} />
                                    {/* <Select classNamePrefix="react-select" options={optionsState} value={selectedCompany} onChange={setSelectedCompany} placeholder="" /> */}
                                </Col>



                                <Col lg="6">
                                    <Col lg="3">
                                        {eventType ?
                                            null
                                            :
                                            <Button variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto" type="submit">Submit</Button>
                                        }
                                    </Col>

                                </Col>
                                <Col lg="6" align="right">
                                    {/* <Col lg="3"> */}
                                    <Button onClick={() => setOpen(false)} autoFocus>
                                        Cancel
                                    </Button>
                                    {/* </Col> */}

                                </Col>
                            </Row>

                        </Form>

                    </DialogContent>

                </Dialog>
            </div>
        </>
    );
};

export default category;
