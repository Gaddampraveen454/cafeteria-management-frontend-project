import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { AdminReportListURL,ExportAdminReportURL } from "Redux/AdminRedux/Reports/ReportRedux"
import { NavLink } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { CompanyListURL } from 'Redux/AdminRedux/Comapny/Company';
// import Export from 'Export';
import { ExportExcel } from 'Export';
import { ICafeAdminReportListURL } from 'Redux/IcafeAdminRedux/Reports/reportsredux';
import { ICafeAdminCategoryDropDownListURL, ICafeAdminCategoryStoreDropDownListURL, ICafeAdminCategoryStoreDropDownList } from "Redux/IcafeAdminRedux/CategoryManagement/admincategorymanagementredux";

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
    const [selectValueState, setSelectValueState] = useState("");
    console.log(selectValueState, "selectValueState")
    const { companyData } = useSelector((state) => state.companyList)
    const [comapanyOption, setComapanyOption] = useState('')
    const [companyOption1, setCompanyOption1] = useState('')
    const [option, setOption] = useState('');


    console.log(companyData, "sfsdfdsfs");

    const companyList = companyData && companyData.data && companyData.data.map((item) => { return { label: item.company_name, value: item.uuid } })

    const { currentUser } = useSelector((state) => state.auth)
    const { AdminReportData, notification } = useSelector((state) => state.admindashbord)
    console.log(AdminReportData, 'dbsvhdsghvgh');



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
        console.log("ChangeStartData: ", e.target.value);
        setStartDate(e.target.value);
        dispatch(ICafeAdminReportListURL(page, search, currentUser?.token, limit, comapanyOption, option, e?.target?.value, endDate));
    };
    const ChangeEndData = (e) => {
        console.log("ChangeStartData: ", e.target.value);
        setEndDate(e.target.value);
        dispatch(ICafeAdminReportListURL(page, search, currentUser?.token, limit, comapanyOption, option, startDate, e?.target?.value));
    };

    const { AdmincategoryDropdown, storeDropdown, storeDropdownByCompanyId } = useSelector((state) => state.admincategory)
    // const { AdmincategoryDropdown,storeDropdown } = useSelector(
    //     ({ adminCategorySlice }) => adminCategorySlice
    //   );
    console.log(AdmincategoryDropdown, 'sbdvhjsdvsdv')

    useEffect(() => {
        dispatch(ICafeAdminReportListURL(page, search, currentUser?.token, limit, comapanyOption, option, startDate, endDate));
    }, [])

    const searchfunction = (type, pages) => {
        if (type === "search") {
            console.log(pages, "ghjkvbnm")
            setSearch(pages)
            setPage(0)
            dispatch(ICafeAdminReportListURL(0, pages, currentUser.token, limit, comapanyOption, option, startDate, endDate))
        }
        if (type === "prev") {
            setPage(page - 1)
            dispatch(ICafeAdminReportListURL(page - 1, search, currentUser.token, limit, comapanyOption, option, startDate, endDate))
        }
        else if (type === "next") {
            setPage(page + 1)
            dispatch(ICafeAdminReportListURL(page + 1, search, currentUser.token, limit, comapanyOption, option, startDate, endDate))
        }
        else if (type === "page") {
            setPage(page)
            dispatch(ICafeAdminReportListURL(page, search, currentUser.token, limit, comapanyOption, option, startDate, endDate))
        }
        else if (type === "page+1") {
            setPage(page + 1)
            dispatch(ICafeAdminReportListURL(page + 1, search, currentUser.token, limit, comapanyOption, option, startDate, endDate))
        }
        else if (type === "page+2") {
            setPage(page + 2)
            dispatch(ICafeAdminReportListURL(page + 2, search, currentUser.token, limit, comapanyOption, option, startDate, endDate))
        }
        else if (type === "limit") {
            setLimit(pages)
            setPage(0)
            dispatch(ICafeAdminReportListURL(0, search, currentUser.token, pages, comapanyOption, option, startDate, endDate))
        }
    }

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
        dispatch(ICafeAdminCategoryStoreDropDownList(selectvalue === null ? "" : selectvalue?.value));
        // dispatch(ICafeAdminReportListURL(0, search, currentUser.token, limit, selectvalue === null ? "" : selectvalue?.value, option === null ? "" : option, startDate, endDate))
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
        dispatch(ICafeAdminReportListURL(0, search, currentUser.token, limit, comapanyOption === undefined ? "" : comapanyOption, text === null ? "" : text?.value, startDate, endDate))
    }

    useEffect(() => {
        dispatch(ICafeAdminCategoryStoreDropDownList(""));
    }, [])

    const exportfunction = async () => {
        await ExportExcel(`/report/date/wise/admin?start_date=${startDate}&end_date=${endDate}&company_uuid=${comapanyOption}&store_uuid=${option === null ? "" : option}`, "Report", currentUser.token)
    }


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
                        value={companyOption1}
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
                    {/* <Form.Label>Category</Form.Label> */}
                    <Select
                        className="basic-single"
                        classNamePrefix="select Store"
                        options={StoreDropp}
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
                <Col md="3" lg="3" xxl="2" className="mb-1" style={{ marginTop: "-2%" }}>
                    {/* <div className="mb-3"> */}
                    <Form.Label>Start date</Form.Label>
                    <Form.Control type="date" value={startDate} onChange={ChangeStartData} placeholder="Start date" />
                </Col>
                <Col md="3" lg="3" xxl="2" className="mt-1" style={{ marginTop: "-2%" }}>
                    <Form.Label>End date</Form.Label>
                    <Form.Control type="date" value={endDate} onChange={ChangeEndData} placeholder="End date" />
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


                <Col xs="12" md="9" style={{ display: "flex", justifyContent: "end", alignItems: "center", marginBottom: "15px" }} >
                    {/* Export Dropdown Start */}
                    <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1 mt-4">
                        <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Export</Tooltip>}>
                            <Dropdown.Toggle variant="foreground-alternate" className="dropdown-toggle-no-arrow btn btn-icon btn-icon-only shadow">
                                <CsLineIcons icon="download" />
                            </Dropdown.Toggle>
                        </OverlayTrigger>
                        <Dropdown.Menu className="shadow dropdown-menu-end">
                            {/* <Dropdown.Item href="#">Copy</Dropdown.Item> */}
                            <Dropdown.Item href="#" onClick={exportfunction}>Excel</Dropdown.Item>
                            {/* <Dropdown.Item href="#">Cvs</Dropdown.Item> */}
                        </Dropdown.Menu>
                    </Dropdown>
                    {/* Export Dropdown End */}

                    {/* Length Start */}
                    <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1 mt-4">
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
                        </Col>

                        {/* <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Active</div>
            </Col> */}

                    </Row>
                </Col>
            </Row>
            {/* List Header End */}

            {/* List Items Start */}
            {AdminReportData?.data?.map((item, index) => {
                console.log(item, 'hjdvbhjbfver')
                return <div key={index}>
                    <Card className={`mb-2 ${selectedItems.includes(1) && 'selected'}`}>
                        <Row className="g-0 h-100 sh-lg-9 position-relative">
                            {/* <Col xs="auto" className="positio-relative">
            <NavLink to="/products/detail">
              <img src="/img/product/small/product-1.webp" alt="product" className="card-img card-img-horizontal sw-11 h-100" />
            </NavLink>
          </Col> */}
                            <Col className="py-4 py-lg-0 ps-5 pe-4 h-100">
                                <Row className="g-0 h-100 ">
                                    {/* <Col xs="11" lg="3" className="d-flex flex-column mb-lg-0 mb-3 pe-3 d-flex order-1 h-lg-100 justify-content-center">
                <NavLink to="/products/detail">
                  Anpan
                  <div className="text-small text-muted text-truncate">#2342</div>
                </NavLink>
              </Col> */}
                                    <Col lg="3" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
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
                                        {/* <div className="lh-1 text-alternate">{item.payment_status}</div> */}
                                        <div>
                                            <Badge bg="outline-primary">{item?.payment_status}</Badge>
                                        </div>
                                    </Col>

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

                                </Row>
                            </Col>
                        </Row>
                    </Card></div>
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
            </div>
            {/* Pagination End */}
        </>
    );
};

export default AdminReports;
