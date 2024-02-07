import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import { useDispatch, useSelector } from 'react-redux';
import { StoreCategoryListURL, CategoryAddURL, StoreCategoryUpdateURL, StoreCategoryStatusUpdateURL } from 'Redux/CashierRedux/StoreCategoryRedux/storeCategoryRedux';
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


const Storecategory = () => {
  const dispatch = useDispatch()
  const title = 'Category Management';
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
  const [sortorder, setSortOrder] = useState("")
  const [error, setError] = useState("");
  const [categoryId, setCategoryId] = useState("")
  const [suc, setSuc] = useState(false);

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('')


  const { currentUser } = useSelector((state) => state.auth)
  // const { cashierData } = useSelector((state) => state.cashierList)
  const { categoryData, notification } = useSelector((state) => state.StorecategorySlice)
  useEffect(() => {
    dispatch(StoreCategoryListURL(page, search, currentUser.token, limit, currentUser?.data?.company_uuid, currentUser && currentUser.data && currentUser.data.group === "cashier" ? currentUser?.data?.store_uuid : currentUser?.data?.uuid ))
  }, [])






  const eventHandler = (event) => {
    setOpen(true)

    console.log(event, "eventxcvvxcvv")
    setName(event.name)
    setSortOrder(event?.sort_order)
    setCategoryId(event.uuid)
  };



  const updateCategory = (event) => {
    event.preventDefault()
    const value = event.target.elements

    if (sortorder <= 0) {
      toast.error("Sort order must be greater than zero");
      return; // Stop the function if validation fails
    }

    const payload = {
      "company_uuid": currentUser?.data?.company_uuid,
      "store_uuid": currentUser && currentUser.data && currentUser.data.group === "cashier" ? currentUser?.data?.store_uuid : currentUser?.data?.uuid ,
      "name": name,
      "sort_order": sortorder
    }
    dispatch(StoreCategoryUpdateURL(categoryId, payload, currentUser.token))
    // dispatch(CompanyListURL(currentUser.token))
    setSuc(true)
  }





  useEffect(() => {
    if (suc === true) {
      if (notification.status === true) {
        toast.success(notification.message, {
          position: "top-right",
        })
        setSuc(false)
        setTimeout(() => {
          dispatch(StoreCategoryListURL(page, search, currentUser.token, limit, currentUser?.data?.company_uuid, currentUser && currentUser.data && currentUser.data.group === "cashier" ? currentUser?.data?.store_uuid : currentUser?.data?.uuid ))
          setOpen(false)
        }, 1000)

      }
      else if (notification.status === false) {
        toast.error(notification.message)
        setSuc(false)
      }
    }

  }, [notification])
  console.log(notification, "ProductDataProductData")

  console.log(categoryData, "categoryDatacategoryData")



  const searchfunction = (type, pages) => {
    if (type === "search") {
      console.log(pages, "ghjkvbnm")
      setSearch(pages)
      setPage(0)
      dispatch(StoreCategoryListURL(0, pages, currentUser.token, limit, currentUser?.data?.company_uuid, currentUser && currentUser.data && currentUser.data.group === "cashier" ? currentUser?.data?.store_uuid : currentUser?.data?.uuid ))
    }
    if (type === "prev") {
      setPage(page - 1)
      dispatch(StoreCategoryListURL(page - 1, search, currentUser.token, limit, currentUser?.data?.company_uuid, currentUser && currentUser.data && currentUser.data.group === "cashier" ? currentUser?.data?.store_uuid : currentUser?.data?.uuid ))
    }
    else if (type === "next") {
      setPage(page + 1)
      dispatch(StoreCategoryListURL(page + 1, search, currentUser.token, limit, currentUser?.data?.company_uuid, currentUser && currentUser.data && currentUser.data.group === "cashier" ? currentUser?.data?.store_uuid : currentUser?.data?.uuid ))
    }
    else if (type === "page") {
      setPage(page)
      dispatch(StoreCategoryListURL(page, search, currentUser.token, limit, currentUser?.data?.company_uuid, currentUser && currentUser.data && currentUser.data.group === "cashier" ? currentUser?.data?.store_uuid : currentUser?.data?.uuid ))
    }
    else if (type === "page+1") {
      setPage(page + 1)
      dispatch(StoreCategoryListURL(page + 1, search, currentUser.token, limit, currentUser?.data?.company_uuid, currentUser && currentUser.data && currentUser.data.group === "cashier" ? currentUser?.data?.store_uuid : currentUser?.data?.uuid ))
    }
    else if (type === "page+2") {
      setPage(page + 2)
      dispatch(StoreCategoryListURL(page + 2, search, currentUser.token, limit, currentUser?.data?.company_uuid, currentUser && currentUser.data && currentUser.data.group === "cashier" ? currentUser?.data?.store_uuid : currentUser?.data?.uuid ))
    }
    else if (type === "limit") {
      setLimit(pages)
      setPage(0)
      dispatch(StoreCategoryListURL(0, search, currentUser.token, pages))
    }
  }

  const HandleCategoryStatus = (event) => {
    console.log(event, "eventxcvvxcvv")
    // if (event.is_delivered)
    const payload = {
      // "uuid" : event.uuid,
      "status": !event.is_active
    }
    dispatch(StoreCategoryStatusUpdateURL(payload, currentUser.token, event?.uuid))
    setSuc(true)

  };
  return (
    <>
      <HtmlHead title={title} description={description} />
      <div className="page-title-container">
        <Row className="g-0">
          {/* Title Start */}
          <Col className="col-auto mb-3 mb-sm-0 me-auto">
            <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back mb-2" to="/">
              <CsLineIcons icon="chevron-left" size="20" />
              <span className="align-middle text-medium ms-1">Dashboard</span>
            </NavLink>
            <h1 className="mb-0 pb-0 display-4" id="title">
              {title}
            </h1>
          </Col>
          {/* Title End */}

          {/* Top Buttons Start */}
          <Col xs="12" sm="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
            <NavLink to="/Storeaddcatagory">
              <Button variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto">
                <CsLineIcons icon="plus" /> <span>Add Category</span>
              </Button>
            </NavLink>
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
        <Col md="7" lg="9" xxl="10" className="mb-1 text-end">
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
      <Row className="g-0 mb-2 d-none d-lg-flex">
        {/* <Col xs="auto" className="sw-11 d-none d-lg-flex" /> */}
        <Col>
          <Row className="g-0 h-100 align-content-center custom-sort ps-5 pe-4 h-100">
            <Col xs="2" lg="3" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">Name</div>
            </Col>
            <Col xs="2" lg="3" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">Category Id</div>
            </Col>
            <Col xs="2" lg="3" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer " />
            </Col>
            <Col xs="2" lg="3" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Action</div>
            </Col>
            {/* <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Email</div>
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
      {categoryData && categoryData.data && categoryData.data.map((item, index) => {
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
                  <Col lg="3" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item.name}</div>
                  </Col>
                  <Col lg="3" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item.uuid}</div>
                  </Col>
                  <Col lg="3" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
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
                  <Col lg="3" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">
                      <div className="lh-1 text-alternate">
                        <table>
                          <tr>
                            {/* <ToggleButton
                value={ items.is_active }
                onToggle={()=>activefunct(items)}
                 /> */}
                            <td>
                              <Button title="VIEW" variant="outline-primary" className="btn px-2 py-2" onClick={() => { eventHandler(item); setEventType(true) }}>
                                <CsLineIcons icon="eye" />
                              </Button>
                            </td>
                            <td>
                              <Button title="EDIT" variant="outline-success" className="btn px-2 py-2" onClick={() => { eventHandler(item); setEventType(false) }}>
                                <CsLineIcons icon="edit-square" />
                              </Button>
                            </td>
                            {/* <td>
                  <Button title="ACTIVATE" variant="outline-info"  className="btn px-2 py-2">
                 <CsLineIcons icon="check" />
                 </Button>
                  </td>
                  <td>
                  <Button title="DEACTIVATE" variant="outline-danger"  className="btn px-2 py-2">
                 <CsLineIcons icon="close" />
                 </Button>
                  </td> */}
                            {/* <td>
                  <Button title="DELETE" variant="outline-danger" className="btn px-2 py-2">
                 <CsLineIcons icon="bin" />
                 </Button>
                  </td> */}
                          </tr>
                        </table>
                      </div>
                    </div>
                  </Col>
                  {/* <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">sciens2023@gmail.com</div>
              </Col>
              <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">XYZA</div>
              </Col> */}
                  {/* <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4">
                <div className="lh-1 text-alternate">₹ 250</div>
              </Col> */}
                  {/* <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 align-items-start justify-content-center order-5">
                <Badge bg="outline-primary">SALE</Badge>
              </Col> */}
                  {/* <Col xs="1" className="d-flex flex-column mb-2 mb-lg-0 align-items-end order-2 order-lg-last justify-content-lg-center">
                <Form.Check className="form-check mt-2 ps-7 ps-md-2" type="checkbox" checked={selectedItems.includes(1)} onChange={() => checkItem(1)} />
              </Col> */}
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
                <Col lg="12">
                  <Form.Label>Sort Order</Form.Label>
                  <Form.Control type="number"
                    defaultValue={sortorder}
                    onChange={(e) => {
                      const enteredValue = e.target.value;
                      if (enteredValue !== "0") {
                        setSortOrder(enteredValue);
                        setError(""); // Clear any previous error
                      } else {
                        setError("Sort Order cannot be 0");
                      }
                    }}
                    disabled={eventType}
                  />
                  {error && <div style={{ color: 'red' }}>{error}</div>}
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

export default Storecategory;
