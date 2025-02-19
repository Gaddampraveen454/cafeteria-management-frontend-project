import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { AdminReportListURL,ExportAdminReportURL } from "Redux/AdminRedux/Reports/ReportRedux"
import { NavLink } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import Select from 'react-select';
import DatePicker from 'react-date-picker';
import '../Order/datepicker.css'
import { CompanyListURL } from 'Redux/AdminRedux/Comapny/Company';
// import Export from 'Export';
import 'react-date-picker/dist/DatePicker.css';
import { ExportExcel } from 'Export';
import { ICafeAdminReportListURL, ICafeAdminUserDropdownList } from 'Redux/IcafeAdminRedux/Reports/reportsredux';
import { ICafeAdminCategoryDropDownListURL, ICafeAdminCategoryStoreDropDownListURL, ICafeAdminCategoryStoreDropDownList } from "Redux/IcafeAdminRedux/CategoryManagement/admincategorymanagementredux";
import moment from 'moment';

const AdminReports = () => {
    const dispatch = useDispatch()
    const title = 'Report';
    const description = 'Ecommerce Report Page';




    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('')

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
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [orderStartDate, setOrderStartDate] = useState('');
    const [orderEndDate, setOrderEndDate] = useState('');
    const [selectValueState, setSelectValueState] = useState("");
    console.log(selectValueState, "selectValueState")
    const { companyData } = useSelector((state) => state.companyList)
    const [comapanyOption, setComapanyOption] = useState('')
    const [companyOption1, setCompanyOption1] = useState('')
    const [orderComapnyOption, setOrderCompanyOption] = useState('');
    const [orderComapnyOption1, setOrderCompanyOption1] = useState('');
    const [orderOption, setOrderOption] = useState('');
    const [orderOption1, setOrderOption1] = useState('');
    const [option, setOption] = useState('');
    const [option1, setOption1] = useState('');
    const [selectuser, setSelectUser] = useState('');
    const [selectuser1, setSelectUser1] = useState('');
    const [selectType, setSelectType] = useState('');


    console.log(companyData, "sfsdfdsfs");

    const companyList = companyData && companyData.data && companyData.data.map((item) => { return { label: item.company_name, value: item.uuid } })

    const { currentUser } = useSelector((state) => state.auth)
    const { AdminReportData, notification, userDrop } = useSelector((state) => state.admindashbord)
    console.log(userDrop, 'dbsvhhvhvdsghvgh');

    // useEffect(() => {
    //     const today = new Date().toISOString().split('T')[0];
    //     setStartDate(today);
    //     setEndDate(today);
    //     setOrderStartDate(today);
    //     setOrderEndDate(today);
    // }, []);

    // useEffect(() => {
    //   dispatch(AdminReportListURL(currentUser.token))
    // }, [])
    //   useEffect(() => {
    //     dispatch(CompanyListURL(page, search, currentUser.token, limit))
    //   }, [])
    //   useEffect(() => {
    //     if (selectValueState)
    //       dispatch(ICafeAdminReportListURL(selectValueState && selectValueState.value, startDate, endDate, currentUser.token))
    // dispatch(ExportAdminReportURL(selectValueState && selectValueState.value, startDate, endDate, currentUser.token))

    //   }, [selectValueState,startDate,endDate])

    // useEffect(() => {
    //     dispatch(ICafeAdminReportListURL(currentUser?.token))
    // }, [])


    const ChangeStartData = (e) => {
        if (e) {
            const formattedDate = moment(e).format("MM-DD-YYYY");
            console.log(formattedDate, 'sdvhhjdfsgv');

            setStartDate(formattedDate);
            dispatch(ICafeAdminReportListURL(page, search, currentUser?.token, limit, comapanyOption, option, formattedDate, endDate));
        }
        else {
            setStartDate('');
            dispatch(ICafeAdminReportListURL(page, search, currentUser?.token, limit, comapanyOption, option, '', endDate));
        }
    };
    const ChangeEndData = (e) => {
        if (e) {
            const formattedEndDate = moment(e).format("MM-DD-YYYY");
            console.log(formattedEndDate, 'sdvhhjdfsgv');

            setEndDate(formattedEndDate);
            dispatch(ICafeAdminReportListURL(page, search, currentUser?.token, limit, comapanyOption, option, startDate, formattedEndDate));
        }
        else {
            setEndDate('');
            dispatch(ICafeAdminReportListURL(page, search, currentUser?.token, limit, comapanyOption, option, startDate, ''));
        }
    };

    const OrderStartData = (e) => {
        if (e) {
            const orderFormattedDate = moment(e).format("MM-DD-YYYY");
            console.log(orderFormattedDate, 'sdvhhjdfsgv');

            setOrderStartDate(orderFormattedDate);
            dispatch(ICafeAdminReportListURL(page, search, currentUser?.token, limit, orderComapnyOption, orderOption, orderFormattedDate, orderEndDate));
        }
        else {
            setOrderStartDate('');
            dispatch(ICafeAdminReportListURL(page, search, currentUser?.token, limit, orderComapnyOption, orderOption, '', orderEndDate));
        }
    };
    const OrderEndData = (e) => {
        if (e) {
            const orderFormattedEndDate = moment(e).format("MM-DD-YYYY");
            console.log(orderFormattedEndDate, 'sdvhhjdfsgv');

            setOrderEndDate(orderFormattedEndDate);
            dispatch(ICafeAdminReportListURL(page, search, currentUser?.token, limit, orderComapnyOption, orderOption, orderStartDate, orderFormattedEndDate));
        }
        else {
            setOrderEndDate('');
            dispatch(ICafeAdminReportListURL(page, search, currentUser?.token, limit, orderComapnyOption, orderOption, orderStartDate, ''));
        }
    };

    const { AdmincategoryDropdown, storeDropdown, storeDropdownByCompanyId } = useSelector((state) => state.admincategory)
    // const { AdmincategoryDropdown,storeDropdown } = useSelector(
    //     ({ adminCategorySlice }) => adminCategorySlice
    //   );
    console.log(storeDropdownByCompanyId, 'sbdvhjsdvsdv')

    // useEffect(() => {
    //     dispatch(ICafeAdminReportListURL(page, search, currentUser?.token, limit, comapanyOption, option, startDate, endDate));
    //     dispatch(ICafeAdminReportListURL(page, search, currentUser?.token, limit, orderComapnyOption, orderOption, startDate, endDate));
    // }, [])

    // useEffect(() => {
    //     dispatch(ICafeAdminReportListURL(page, search, currentUser?.token, limit, orderComapnyOption, orderOption, startDate, endDate));
    // }, [])

    // const searchfunction = (type, pages) => {
    //     if (type === "search") {
    //         console.log(pages, "ghjkvbnm")
    //         setSearch(pages)
    //         setPage(0)
    //         dispatch(ICafeAdminReportListURL(0, pages, currentUser.token, limit, comapanyOption, option, startDate, endDate))
    //     }
    //     if (type === "prev") {
    //         setPage(page - 1)
    //         dispatch(ICafeAdminReportListURL(page - 1, search, currentUser.token, limit, comapanyOption, option, startDate, endDate))
    //     }
    //     else if (type === "next") {
    //         setPage(page + 1)
    //         dispatch(ICafeAdminReportListURL(page + 1, search, currentUser.token, limit, comapanyOption, option, startDate, endDate))
    //     }
    //     else if (type === "page") {
    //         setPage(page)
    //         dispatch(ICafeAdminReportListURL(page, search, currentUser.token, limit, comapanyOption, option, startDate, endDate))
    //     }
    //     else if (type === "page+1") {
    //         setPage(page + 1)
    //         dispatch(ICafeAdminReportListURL(page + 1, search, currentUser.token, limit, comapanyOption, option, startDate, endDate))
    //     }
    //     else if (type === "page+2") {
    //         setPage(page + 2)
    //         dispatch(ICafeAdminReportListURL(page + 2, search, currentUser.token, limit, comapanyOption, option, startDate, endDate))
    //     }
    //     else if (type === "limit") {
    //         setLimit(pages)
    //         setPage(0)
    //         dispatch(ICafeAdminReportListURL(0, search, currentUser.token, pages, comapanyOption, option, startDate, endDate))
    //     }
    // }

    useEffect(() => {
        dispatch(ICafeAdminCategoryDropDownListURL());
        dispatch(ICafeAdminCategoryStoreDropDownListURL());

    }, [])

    const [isClearable, setIsClearable] = useState(true);
    const [isRemove, setIsRemove] = useState(true);



    const CompanyDropDown = [];

    AdmincategoryDropdown?.data?.map((text) => {
        return CompanyDropDown.push({ label: text?.company_name, value: text?.uuid })
    })

    const selectedCompany = (selectvalue) => {
        setComapanyOption(selectvalue?.value)
        setCompanyOption1(selectvalue)
        setOption("")
        setOption1('');
        dispatch(ICafeAdminCategoryStoreDropDownList(selectvalue === null ? "" : selectvalue?.value));
        // dispatch(ICafeAdminReportListURL(0, search, currentUser.token, limit, selectvalue === null ? "" : selectvalue?.value, '', startDate, endDate))
    }

    const StoreDropp = [];

    storeDropdownByCompanyId?.data?.map((text) => {
        return StoreDropp.push({ value: text?.uuid, label: text?.store_name })
    })


    const dropdownValues = [];

    storeDropdown?.data?.map((text) => {
        return dropdownValues.push({ label: text?.store_name, value: text?.uuid })
    })

    const selectdropdown = (text) => {
        setOption(text?.value)
        setOption1(text)
        // dispatch(ICafeAdminReportListURL(0, search, currentUser.token, limit, comapanyOption === undefined ? "" : comapanyOption, text === null ? "" : text?.value, startDate, endDate))
    }




    const OrderCompanyDropDown = [];

    AdmincategoryDropdown?.data?.map((text) => {
        return OrderCompanyDropDown.push({ label: text?.company_name, value: text?.uuid })
    })

    const OrderCompanyHandle = (selectvalue) => {
        console.log(selectvalue, 'dshvhgdv')
        setOrderCompanyOption(selectvalue?.value)
        setOrderCompanyOption1(selectvalue)
        setOrderOption("")
        setOrderOption1('')
        dispatch(ICafeAdminCategoryStoreDropDownList(selectvalue === null ? "" : selectvalue?.value));
        dispatch(ICafeAdminUserDropdownList(currentUser?.token, selectvalue === null ? "" : selectvalue?.value))
    }


    const orderDropdownValues = [];

    storeDropdownByCompanyId?.data?.map((text) => {
        return orderDropdownValues.push({ label: text?.store_name, value: text?.uuid })
    })

    const selectOrderdropdown = (text) => {
        setOrderOption(text?.value)
        setOrderOption1(text)
        dispatch(ICafeAdminReportListURL(0, search, currentUser.token, limit, orderComapnyOption === undefined ? "" : orderComapnyOption, text === null ? "" : text?.value, orderStartDate, orderEndDate))
    }


    const UserDropdown = [];
    console.log(UserDropdown, 'svdcgvsgd')


    if (userDrop?.length > 0) {
        userDrop?.map((item) => {
            return UserDropdown.push({ label: item?.name, value: item?.uuid })
        })
    }

    const SelectUserDropdown = (select) => {
        console.log(select, "select")
        setSelectUser(select)
        setSelectUser1(select?.value)
    }

    const types = [
        { label: "Lunch", value: 'Lunch' },
        { label: "Dinner", value: 'Dinner' },
    ]

    const handleType = (type) => {
        console.log(type, 'dbdgshvsda')
        setSelectType(type?.value)
    }


    const exportfunction = async () => {
        await ExportExcel(`/report/date/wise/admin?start_date=${startDate}&end_date=${endDate}&company_uuid=${comapanyOption}&store_uuid=${option === null ? "" : option}`, "ItemwiseReports", currentUser.token)
    }
    const exportfunction1 = async () => {
        await ExportExcel(`/report/list/admin/export?company_uuid=${orderComapnyOption}&store_uuid=${orderOption}&user_uuid=${selectuser1}&start_date=${orderStartDate}&end_date=${orderEndDate}&type=${selectType}`, "OrderwiseReports", currentUser.token)
    }
    // /report/list/admin/export?pagenum=0&limit=10&search=&user_uuid=&start_date=&end_date='
    useEffect(() => {
        dispatch(ICafeAdminCategoryStoreDropDownList(""));
    }, [])

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
                        {/* <NavLink to="/addreport">
              <Button variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto">
                <CsLineIcons icon="plus" /> <span>Add Report</span>
              </Button>
            </NavLink> */}
                        <Button variant="outline-primary" className="btn-icon btn-icon-only ms-1 d-inline-block d-lg-none">
                            <CsLineIcons icon="sort" />
                        </Button>
                        {/* <div className="btn-group ms-1 check-all- container">
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
                <h3 className='mb-5'>Item Wise Report:</h3>
                {/* <Col md="5" lg="3" xxl="2" className="mb-1"> */}
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
                {/* </Col> */}

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
                    <Form.Label>Select Company</Form.Label>
                    <Select
                        className="basic-single"
                        classNamePrefix="select company"
                        isClearable={isClearable}
                        // defaultValue={colourOptions[0]}
                        // value={companyOption1}
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
                <Col lg="3">
                    <Form.Label>Select Store</Form.Label>
                    <Select
                        className="basic-single"
                        classNamePrefix="select Store"
                        options={StoreDropp}
                        isClearable={isRemove}
                        value={option1}
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
                <Col md="2" lg="2" xxl="2" className="mb-1" >
                    {/* <div className="mb-3"> */}
                    <Form.Label>Start date</Form.Label>
                    <DatePicker value={startDate} onChange={ChangeStartData} placeholder="Start date" />
                </Col>
                <Col md="2" lg="2" xxl="2" className="mb-1" >
                    <Form.Label>End date</Form.Label>
                    <DatePicker value={endDate} onChange={ChangeEndData} placeholder="End date" />
                    {/* </div> */}
                </Col>
                {/* <Col lg="3" className="mb-1 text-end"> */}
                {/* Print Button Start */}
                {/* <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Print</Tooltip>}>
                        <Button variant="foreground-alternate" className="btn-icon btn-icon-only shadow">
                            <CsLineIcons icon="print" />
                        </Button>
                    </OverlayTrigger> */}
                {/* Print Button End */}


                {/* </Col> */}


                <Col xs="2" md="2" className='mt-4' style={{ display: "flex", justifyContent: "start", alignItems: "center", marginBottom: "10px" }} >
                    {/* Export Dropdown Start */}
                    {/* <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1 mt-4">
                        <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Export</Tooltip>}>
                            <Dropdown.Toggle variant="foreground-alternate" className="dropdown-toggle-no-arrow btn btn-icon btn-icon-only shadow">
                                <CsLineIcons icon="download" />
                            </Dropdown.Toggle>
                        </OverlayTrigger>
                        <Dropdown.Menu className="shadow dropdown-menu-end">
                            <Dropdown.Item href="#">Copy</Dropdown.Item>
                            <Dropdown.Item href="#" onClick={exportfunction}>Excel</Dropdown.Item>
                            <Dropdown.Item href="#">Cvs</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> */}

                    <Button onClick={exportfunction}>
                        Download
                    </Button>
                    {/* Export Dropdown End */}

                    {/* Length Start */}
                    {/* <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1 mt-4">
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
                    </Dropdown> */}
                    {/* Length End */}

                </Col>
            </Row>

            <Row className="mb-3">
                <h3 className='mb-5'>Order Wise Report:</h3>
                {/* <Col md="5" lg="3" xxl="2" className="mb-1"> */}
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
                {/* </Col> */}

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
                <Col lg="2">
                    <Form.Label>Select Company</Form.Label>
                    <Select
                        className="basic-single"
                        classNamePrefix="select company"
                        isClearable={isClearable}
                        // defaultValue={colourOptions[0]}
                        value={orderComapnyOption1}
                        onChange={OrderCompanyHandle}
                        name="color"
                        border="none"
                        options={OrderCompanyDropDown}
                        placeholder='Select Company'
                        styles={{
                            control: provided => ({
                                ...provided,
                                borderRadius: '12px',
                            }),
                        }}
                    />
                </Col>
                <Col lg="2">
                    <Form.Label>Select Store</Form.Label>
                    <Select
                        className="basic-single"
                        classNamePrefix="select Store"
                        options={orderDropdownValues}
                        isClearable={isRemove}
                        value={orderOption1}
                        onChange={selectOrderdropdown}
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
                <Col md="2" lg="2" className="mb-1">
                    <Form.Label>Select User</Form.Label>
                    <Select classNamePrefix="react-select"
                        options={UserDropdown}
                        value={selectuser}
                        onChange={SelectUserDropdown}
                        placeholder="Select User"
                    // disabled={eventType}
                    />
                </Col>
                <Col md="2" lg="2" className="mb-1" >
                    {/* <div className="mb-3"> */}
                    <Form.Label>Start date</Form.Label>
                    <DatePicker value={orderStartDate} onChange={OrderStartData} placeholder="Start date" />
                </Col>
                <Col md="2" lg="2" className="mb-1" >
                    <Form.Label>End date</Form.Label>
                    <DatePicker value={orderEndDate} onChange={OrderEndData} placeholder="End date" />
                    {/* </div> */}
                </Col>
                <Col md="2" lg="2" className="mb-1">
                    <Form.Label>Type</Form.Label>
                    <Select classNamePrefix="react-select"
                        options={types}
                        // value={selectType}
                        onChange={handleType}
                        placeholder="Type"
                    // disabled={eventType}
                    />
                </Col>
                {/* <Col lg="3" className="mb-1 text-end"> */}
                {/* Print Button Start */}
                {/* <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Print</Tooltip>}>
                        <Button variant="foreground-alternate" className="btn-icon btn-icon-only shadow">
                            <CsLineIcons icon="print" />
                        </Button>
                    </OverlayTrigger> */}
                {/* Print Button End */}


                {/* </Col> */}


                <Col md="2" className='mt-3' style={{ display: "flex", justifyContent: "start", alignItems: "center", marginBottom: "15px" }} >
                    <Button onClick={exportfunction1}>
                        Download
                    </Button>
                    {/* Export Dropdown Start */}
                    {/* <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1 mt-4">
                        <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Export</Tooltip>}>
                            <Dropdown.Toggle variant="foreground-alternate" className="dropdown-toggle-no-arrow btn btn-icon btn-icon-only shadow">
                                <CsLineIcons icon="download" />
                            </Dropdown.Toggle>
                        </OverlayTrigger>
                        <Dropdown.Menu className="shadow dropdown-menu-end">
                            <Dropdown.Item href="#">Copy</Dropdown.Item>
                            <Dropdown.Item href="#" onClick={exportfunction1}>Excel</Dropdown.Item>
                            <Dropdown.Item href="#">Cvs</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> */}
                    {/* Export Dropdown End */}

                    {/* Length Start */}
                    {/* <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1 mt-4">
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
                    </Dropdown> */}
                    {/* Length End */}

                </Col>
            </Row>

            {/* List Header Start */}
            {/* <Row className="g-0 mb-2 d-none d-lg-flex"> */}
            {/* <Col xs="auto" className="sw-11 d-none d-lg-flex" /> */}
            {/* <Col>
                    <Row className="g-0 h-100 align-content-center custom-sort ps-5 pe-4 h-100">
                        <Col xs="2" lg="3" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                            <div className="text-muted text-medium cursor-pointer sort">Company</div>
                        </Col>
                        <Col xs="2" lg="3" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                            <div className="text-muted text-medium cursor-pointer sort">Store Name</div>
                        </Col>

                        <Col xs="2" lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                            <div className="text-muted text-medium cursor-pointer sort">Type</div>
                        </Col>
                        <Col xs="2" lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                            <div className="text-muted text-medium cursor-pointer sort">Wallet Amount</div>
                        </Col>
                        <Col xs="2" lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                            <div className="text-muted text-medium cursor-pointer sort">Total Amount</div>
                        </Col>
                        <Col xs="2" lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                            <div className="text-muted text-medium cursor-pointer sort">Status</div>
                        </Col> */}

            {/* <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Active</div>
            </Col> */}

            {/* </Row>
                </Col>
            </Row> */}
            {/* List Header End */}

            {/* List Items Start */}
            {/* {AdminReportData?.data?.map((item, index) => {
                console.log(item, 'hjdvbhjbfver')
                return <div key={index}>
                    <Card className={`mb-2 ${selectedItems.includes(1) && 'selected'}`}>
                        <Row className="g-0 h-100 sh-lg-9 position-relative"> */}
            {/* <Col xs="auto" className="positio-relative">
            <NavLink to="/products/detail">
              <img src="/img/product/small/product-1.webp" alt="product" className="card-img card-img-horizontal sw-11 h-100" />
            </NavLink>
        //   </Col> */}
            {/* //                     <Col className="py-4 py-lg-0 ps-5 pe-4 h-100"> */}
            {/* //                         <Row className="g-0 h-100 "> */}
            {/* <Col xs="11" lg="3" className="d-flex flex-column mb-lg-0 mb-3 pe-3 d-flex order-1 h-lg-100 justify-content-center">
                <NavLink to="/products/detail">
                  Anpan
                  <div className="text-small text-muted text-truncate">#2342</div>
                </NavLink>
              </Col> */}
            {/* <Col lg="3" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                                        <div className="lh-1 text-alternate">{item?.companies[0]?.company_name}</div>
                                    </Col>
                                    <Col lg="3" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                                        <div className="lh-1 text-alternate">{item?.store[0]?.store_name}</div>
                                    </Col>
                                    <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                                        <div className="lh-1 text-alternate">{item?.details[0]?.type}</div>
                                    </Col>
                                    <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                                        <div className="lh-1 text-alternate">{item?.companies[0]?.wallet_amount}</div>
                                    </Col>
                                    <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                                        <div className="lh-1 text-alternate">{item.total_amount}</div>
                                    </Col>
                                    <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                                        <div className="lh-1 text-alternate">{item.payment_status}</div>
                                        <div>
                                            <Badge bg="outline-primary">{item?.payment_status}</Badge>
                                        </div>
                                    </Col> */}

            {/* <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">
                      <table>
                        <tr>
                    
                          <td>
                            <Button title="VIEW" variant="outline-primary" className="btn px-2 py-2">
                              <CsLineIcons icon="eye" />
                            </Button>
                          </td>
                          <td>
                            <Button title="EDIT" variant="outline-success" className="btn px-2 py-2">
                              <CsLineIcons icon="edit-square" />
                            </Button>
                          </td>
                  
                        </tr>
                      </table>
                    </div>
                  </Col> */}
            {/* 
                                </Row>
                            </Col>
                        </Row>
                    </Card></div>
            })} */}

            {/* List Items End */}

            {/* Pagination Start */}
            {/* <div className="d-flex justify-content-center mt-5">
                <Pagination>
                    <Pagination.Prev className="shadow" disabled={page === 0} onClick={() => searchfunction("prev")}>
                        <CsLineIcons icon="chevron-left" />
                    </Pagination.Prev>
                    <Pagination.Item className="shadow" active onClick={() => searchfunction("page")} >
                        {page + 1}
                    </Pagination.Item>
                    <Pagination.Item className="shadow" disabled={Math.ceil(AdminReportData && AdminReportData.count / limit) <= page + 1} onClick={() => searchfunction("page+1", page + 1)}>{page + 2}</Pagination.Item>
                    <Pagination.Item className="shadow" disabled={Math.ceil(AdminReportData && AdminReportData.count / limit) <= page + 2} onClick={() => searchfunction("page+2", page + 2)}>{page + 3}</Pagination.Item>

                    {Math.ceil(AdminReportData && AdminReportData.count / limit) > page + 3 &&
                        <>
                            <Pagination.Item className="shadow" >...</Pagination.Item>
                        </>

                    }
                    <Pagination.Next className="shadow" disabled={Math.ceil(AdminReportData && AdminReportData.count / limit) <= page + 1} onClick={() => searchfunction("next")}>
                        <CsLineIcons icon="chevron-right" />
                    </Pagination.Next>
                </Pagination>
            </div> */}
            {/* Pagination End */}
        </>
    );
};

export default AdminReports;
