import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CashierReportListURL } from "Redux/CashierRedux/Reports/ReportRedux"
import { NavLink } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import Select from 'react-select';
// import { ExportExcel } from 'Export'
import { ExportExcel } from 'views/ExportData';

const report = () => {
  const dispatch = useDispatch()
  const title = 'Report';
  const description = 'Ecommerce Report Page';

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

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('')

  // const { companyData } = useSelector((state) => state.companyList)

  // const companyList = companyData && companyData.data && companyData.data.map((item) => { return { label: item.company_name, value: item.uuid } })

  const { currentUser } = useSelector((state) => state.auth)
  const { CashierReportData, notification } = useSelector((state) => state.CashierReportList)

  const searchfunction = (type, pages) => {
    if (type === "search") {
      setSearch(pages)
      setPage(0)
      dispatch(CashierReportListURL(0, limit, pages, currentUser?.data?.uuid, startDate, endDate, currentUser.token))
    }
    if (type === "prev") {
      setPage(page - 1)
      dispatch(CashierReportListURL(page - 1, limit, search, currentUser?.data?.uuid, startDate, endDate, currentUser.token))
    }
    else if (type === "next") {
      setPage(page + 1)
      dispatch(CashierReportListURL(page + 1, limit, search, currentUser?.data?.uuid, startDate, endDate, currentUser.token))
    }
    else if (type === "page") {
      setPage(page)
      dispatch(CashierReportListURL(page, limit, search, currentUser?.data?.uuid, startDate, endDate, currentUser.token))
    }
    else if (type === "page+1") {
      setPage(page + 1)
      dispatch(CashierReportListURL(page + 1, limit, search, currentUser?.data?.uuid, startDate, endDate, currentUser.token))
    }
    else if (type === "page+2") {
      setPage(page + 2)
      dispatch(CashierReportListURL(page + 2, limit, search, currentUser?.data?.uuid, startDate, endDate, currentUser.token))
    }
    else if (type === "limit") {
      setLimit(pages)
      setPage(0)
      dispatch(CashierReportListURL(0, pages, search, currentUser?.data?.uuid, startDate, endDate, currentUser.token,))
    }
  }


  const ChangeStartData = e => {
    setStartDate(e.target.value);
  };
  const ChangeEndData = e => {
    setEndDate(e.target.value);
  };


  const exportfunction = async () => {
    await ExportExcel(`/report/date/wise/store?start_date=${startDate}&end_date=${endDate}`, "Report", currentUser.token)
  }


  // useEffect(()=>{
  //   dispatch(CashierReportListURL(currentUser.token))
  // },[])

  useEffect(() => {
    if (currentUser)
      dispatch(CashierReportListURL(page, limit, search, currentUser?.data?.uuid, startDate, endDate, currentUser.token))
  }, [startDate, endDate])



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
      <Col md="3" lg="3" xxl="2" className="mb-1">
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
        {/* <Col  md="3" lg="3" xxl="3"  className="mb-1">
          <Form.Label>Company Name</Form.Label>
          <Select classNamePrefix="react-select"
            options={companyList}
            value={selectValueState}
            onChange={setSelectValueState}
            placeholder="Select Company"
          //  name="companyName"
          //  onChange={myhandlechange}
          />
        </Col> */}
        <Col md="2" lg="2" xxl="2" className="mb-1" style={{marginTop:"-2%"}}>
          {/* <div className="mb-3"> */}
          <Form.Label>Start date</Form.Label>
          <Form.Control type="date" value={startDate} onChange={ChangeStartData} />
        </Col>
        <Col md="2" lg="2" xxl="2" className="mb-1" style={{marginTop:"-2%"}}>
          <Form.Label>End date</Form.Label>
          <Form.Control type="date" value={endDate} onChange={ChangeEndData} />
          {/* </div> */}
        </Col>
        <Col md="5" lg="5" xxl="5" className="mb-1 text-end">

          {/* Print Button Start */}
          {/* <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Print</Tooltip>}>
            <Button variant="foreground-alternate" className="btn-icon btn-icon-only shadow">
              <CsLineIcons icon="print" />
            </Button>
          </OverlayTrigger> */}
          {/* Print Button End */}

          {/* Export Dropdown Start */}
          <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1">
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
          <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1">
            <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Item Count</Tooltip>}>
              <Dropdown.Toggle variant="foreground-alternate" className="shadow sw-13">
                10 Items
              </Dropdown.Toggle>
            </OverlayTrigger>
            <Dropdown.Menu className="shadow dropdown-menu-end">
              <Dropdown.Item href="#" onClick={() => searchfunction("limit", 5)}>5 Items</Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => searchfunction("limit", 10)}>10 Items</Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => searchfunction("limit", 15)}>15 Items</Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => searchfunction("limit", 20)}>20 Items</Dropdown.Item>

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
            <Col xs="2" lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">Company</div>
            </Col>
            <Col xs="2" lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">Employee Name</div>
            </Col>
            <Col xs="2" lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">Employee Id</div>
            </Col>
            <Col xs="2" lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">Wallet Amount</div>
            </Col>
            <Col xs="2" lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">Total Amount</div>
            </Col>
            <Col xs="2" lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">Transaction</div>
            </Col>

            {/* <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Active</div>
            </Col> */}
            {/* <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Veg/Non Veg</div>
            </Col>
            <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Price</div>
            </Col>
            <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Quantity</div>
            </Col>
            <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Active</div>
            </Col> */}
            {/* <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Location</div>
            </Col> */}
          </Row>
        </Col>
      </Row>
      {/* List Header End */}

      {/* List Items Start */}
      {CashierReportData && CashierReportData.data && CashierReportData.data.map((item, index) => {
        return <div key="">
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
                  <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item?.company?.length > 0 ? item?.company[0]?.company_name : ""}</div>
                  </Col>
                  <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item.employee_name}</div>
                  </Col>
                  <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item.employee_id}</div>
                  </Col>
                  <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item.paid_from_wallet}</div>
                  </Col>
                  <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{Math.round(item.total_amount)}</div>
                  </Col>
                  <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item.transaction_uuid}</div>
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
                  <Button title="EDIT" variant="outline-success"  className="btn px-2 py-2">
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
          <Pagination.Item className="shadow" disabled={Math.ceil(CashierReportData?.count / limit) <= page + 1} onClick={() => searchfunction("page+1", page + 1)}>{page + 2}</Pagination.Item>
          <Pagination.Item className="shadow" disabled={Math.ceil(CashierReportData?.count / limit) <= page + 2} onClick={() => searchfunction("page+2", page + 2)}>{page + 3}</Pagination.Item>

          {Math.ceil(CashierReportData?.count / limit) > page + 3 &&
            <>
              <Pagination.Item className="shadow" >...</Pagination.Item>
            </>

          }
          <Pagination.Next className="shadow" disabled={Math.ceil(CashierReportData?.count / limit) <= page + 1} onClick={() => searchfunction("next")}>
            <CsLineIcons icon="chevron-right" />
          </Pagination.Next>
        </Pagination>
      </div>
      {/* Pagination End */}
      {/* Pagination End */}
    </>
  );
};

export default report;
