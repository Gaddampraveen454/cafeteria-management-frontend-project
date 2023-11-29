import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import axios from 'axios'
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import { useDispatch, useSelector } from 'react-redux';
import { OrderListURL, CompanyOrderStatusUpdateURL } from 'Redux/AdminRedux/OrderRedux/OrderRedux';
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
import moment from 'moment';


const NICorders = () => {
  const dispatch = useDispatch()
  const title = 'Orders';
  const description = 'Ecommerce Orders Page';
  // const [status, setStatus] = useState(false)
  const [eventType, setEventType] = useState(false)
  const [suc, setSuc] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [productDetails, setProductDetails] = useState([])
  console.log(productDetails, "fdfdsfdsfsdfsdfsdfffgfdgd")
  // console.log(status, "sdfsdfsfs")
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

  const history = useHistory('')


  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('')

  const { currentUser } = useSelector((state) => state.auth)
  const { OrderData, notification } = useSelector((state) => state.orderList)
  useEffect(() => {
    dispatch(OrderListURL(page, search, currentUser.token, limit, currentUser?.data?.uuid))
  }, [])
  console.log(OrderData, "dfgdgdgdfgd");


  const searchfunction = (type, pages) => {
    console.log(pages, "ghjsdfsdfkvbnm")
    if (type === "search") {
      console.log(pages, "ghjkvbnm")
      setSearch(pages)
      setPage(0)
      dispatch(OrderListURL(0, pages, currentUser.token, limit, currentUser?.data?.uuid))
    }
    if (type === "prev") {
      setPage(page - 1)
      dispatch(OrderListURL(page - 1, search, currentUser.token, limit, currentUser?.data?.uuid))
    }
    else if (type === "next") {
      setPage(page + 1)
      dispatch(OrderListURL(page + 1, search, currentUser.token, limit, currentUser?.data?.uuid))
    }
    else if (type === "page") {
      setPage(page)
      dispatch(OrderListURL(page, search, currentUser.token, limit, currentUser?.data?.uuid))
    }
    else if (type === "page+1") {
      setPage(page + 1)
      dispatch(OrderListURL(page + 1, search, currentUser.token, limit, currentUser?.data?.uuid))
    }
    else if (type === "page+2") {
      setPage(page + 2)
      dispatch(OrderListURL(page + 2, search, currentUser.token, limit, currentUser?.data?.uuid))
    }
    else if (type === "limit") {
      setLimit(pages)
      setPage(0)
      dispatch(OrderListURL(0, search, currentUser.token, pages, currentUser?.data?.uuid))
    }
  }







  const eventHandler = (event, status) => {
    console.log(event, status, "eventxzdsdcvvxcvv")
    // if (event.is_delivered)
    const payload = {
      "order_uuid": event?.uuid,
      "status": status
    }
    dispatch(CompanyOrderStatusUpdateURL(payload, currentUser.token))
    setSuc(true)


  };




  useEffect(() => {
    if (suc === true) {
      if (notification.status === true) {
        toast.success(notification.message, {
          position: "top-right",
        })
        setSuc(false)
        setTimeout(() => {
          dispatch(OrderListURL(page, search, currentUser.token, limit, currentUser?.data?.uuid))
          // setOpen(false)

        }, 1000)

      }
      else if (notification.status === false) {
        toast.error(notification.message)
        setSuc(false)
      }
    }

  }, [notification])



  const viewEventHandler = (event) => {
    setOpen(true)

    console.log(event, "fdfffgfdgd")
    setProductDetails(event.details)
    history.push({
      pathname: `/companyViewOrder/${event?.uuid}`,
      state: event
    })


  };

  const [print, setPrint] = useState(false);
  const [printData, setPrintData] = useState('')

  const PrintFunction = (orderid) => {
    axios.get(`${process.env.REACT_APP_URL}/order/list/cashier/print/${orderid}`, {
      headers: {
        'x-auth-token': currentUser?.token
      }
    })
      .then((res) => {
        console.log(res, "hdfhfhjdefaultdetails")
        setPrint(true)
        setPrintData(res.data)
        // setdefaultdetails(res?.data)
      })
      .catch((err) => {
        console.log(err, "hdfhfhjdefaultdetails")
        setPrint(false)
        setPrintData('')
      })
  }

  return (
    <>
      {print === true && printData !== '' &&
        <iframe
          title="Print Frame"
          srcDoc={printData}
          onLoad={() => {
            const iframe = document.querySelector("iframe");
            // iframe.style.display = "none"; // Hide the iframe
            // Check if the browser supports silent printing
            if ("requestMediaKeySystemAccess" in navigator) {
              try {
                // Attempt to silently print
                console.log("silently print");
                iframe.contentWindow.print({ silent: true });
                setTimeout(() => {
                  setPrint(false);
                  setPrintData('')
                }, 1000)

              } catch (error) {
                console.error("Error printing:", error);
                setPrint(false)
                setPrintData('')
              }
            } else {
              console.error("Silent printing is not supported in this browser.");
              setPrint(false)
              setPrintData('')
            }
          }}
        />
      }
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
            {/* <NavLink to="/addNICorder">
            <Button variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto">
            <CsLineIcons icon="plus" /> <span>Add Orders</span>
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
            <Col xs="1" lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">S.No</div>
            </Col>
            <Col xs="1" lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">Order Date</div>
            </Col>
            <Col xs="2" lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">Order id</div>
            </Col>
            <Col xs="1" lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">Token No </div>
            </Col>
            <Col xs="1" lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">Store Name </div>
            </Col>
            <Col xs="1" lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">Consumer Name </div>
            </Col>
            <Col xs="1" lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">Order Type </div>
            </Col>

            <Col xs="1" lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">Price</div>
            </Col>
            <Col xs="2" lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">Transaction </div>
            </Col>
            <Col xs="2" lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">Ordered By</div>
            </Col>
            <Col xs="2" lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">Status</div>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* List Header End */}

      {/* List Items Start */}
      {OrderData && OrderData.data && OrderData.data.map((item, index) => {
        return <div key="">
          {console.log(item, "dffdfdfdfsssfsdfsdf")}
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
                  <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">

                    <div className="lh-1 text-alternate">{index + 1}</div>
                  </Col>
                  <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate"> {moment(item.createdAt).format('DD/MM/YYYY HH:mm:ss')}</div>
                  </Col>

                  <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item.uuid}</div>
                  </Col>
                  <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item.token_no}</div>
                  </Col>
                  <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item && item.stores && item.stores[0] && item.stores[0].store_name}
                    </div>
                  </Col>
                  <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item && item.users && item.users[0] && item.users[0].name}
                    </div>
                  </Col>
                  <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item && item.order_created_by}
                    </div>
                  </Col>
                  {/* <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">{newItem.quantity}</div>
              </Col> */}

                  <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item.amount}</div>
                  </Col>

                  <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item.transaction_uuid}</div>
                  </Col>
                  <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item.order_created_by}</div>
                  </Col>
                  <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    {/* <div className="lh-1 text-alternate">{item.is_delivered === true ? "Delivered" : "Pending"}</div> */}

                    <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1">
                      <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Item Count</Tooltip>}>
                        <Dropdown.Toggle variant="foreground-alternate" className="shadow sw-13">
                          {item.order_status ? item.order_status : "Pending"}
                        </Dropdown.Toggle>
                      </OverlayTrigger>
                      <Dropdown.Menu className="shadow dropdown-menu-end">
                        <Dropdown.Item
                          onClick={(status) => { eventHandler(item, "Pending") }}>Pending</Dropdown.Item>
                        <Dropdown.Item onClick={(status) => { eventHandler(item, "Accepted") }} >Accepted</Dropdown.Item>
                        <Dropdown.Item
                          onClick={(status) => { eventHandler(item, "Preparing") }}>Preparing</Dropdown.Item>
                        <Dropdown.Item onClick={(status) => { eventHandler(item, "Ready") }} >Ready</Dropdown.Item>
                        <Dropdown.Item onClick={(status) => { eventHandler(item, "Delivered") }} >Delivered</Dropdown.Item>
                        {/* <Dropdown.Item onClick={()=>searchfunction("limit", 20)}>20 Items</Dropdown.Item> */}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>


                  {/* <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
             
                <Form.Check 
                className="form-check mt-2 ps-7 ps-md-2" 
                type="switch" checked={item.is_delivered} 
               

                onClick={() => { eventHandler(item) }}
                />
              </Col> */}

                  <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate" style={{ marginLeft: "25px" }}>
                      <table>
                        <tr>
                          {/* <ToggleButton
                value={ items.is_active }
                onToggle={()=>activefunct(items)}
                 /> */}
                          <td>
                            <Button title="VIEW" variant="outline-primary" className="btn px-2 py-2"
                              onClick={() => { viewEventHandler(item); setEventType(false) }}
                            >
                              <CsLineIcons icon="eye" />
                            </Button>
                          </td>
                          <td>
                            <Button variant="foreground-alternate" className="btn-icon btn-icon-only shadow" onClick={() => PrintFunction(item?.uuid)}>
                              <CsLineIcons icon="print" />
                            </Button>
                          </td>

                        </tr>
                      </table>
                    </div>
                  </Col>
                  {/* <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">Non veg</div>
              </Col>
              <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">₹ 345</div>
              </Col>
              <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">5 p</div>
              </Col>
              <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">icons</div>
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
          </Card >
        </div >
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



      <div>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"

        >
          {/* <DialogTitle id="alert-dialog-title">
          Hello India
          {"Use Google's location service?"}
        </DialogTitle> */}
          <DialogContent style={{ width: "500px", height: "auto" }}>

            {/* List Header Start */}
            <Row className="g-0 mb-2 d-none d-lg-flex">
              {/* <Col xs="auto" className="sw-11 d-none d-lg-flex" /> */}
              <Col>
                <Row className="g-0 h-100 align-content-center custom-sort ps-5 pe-4 h-100">
                  <Col xs="1" lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                    <div className="text-muted text-medium cursor-pointer sort">S.No</div>
                  </Col>
                  <Col xs="2" lg="4" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                    <div className="text-muted text-medium cursor-pointer sort">Product Name</div>
                  </Col>

                  <Col xs="2" lg="3" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                    <div className="text-muted text-medium cursor-pointer sort">Quantity</div>
                  </Col>
                  <Col xs="2" lg="3" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                    <div className="text-muted text-medium cursor-pointer sort">Price</div>
                  </Col>

                  {/* <Col xs="2" lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                    <div className="text-muted text-medium cursor-pointer sort">status</div>
                  </Col> */}

                </Row>
              </Col>
            </Row>
            {/* List Header End */}

            {/* List Items Start */}
            {productDetails && productDetails.map((item, index) => {
              return <div key="">
                {console.log(item, "fghfghfghh")}
                <Card className={`mb-2 ${selectedItems.includes(1) && 'selected'}`}>
                  <Row className="g-0 h-100 sh-lg-9 position-relative">

                    <Col className="py-4 py-lg-0 ps-5 pe-4 h-100">
                      <Row className="g-0 h-100 ">

                        <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                          <div className="lh-1 text-alternate">{index + 1}</div>
                        </Col>
                        <Col lg="4" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                          <div className="lh-1 text-alternate">{item.name}</div>
                        </Col>

                        <Col lg="3" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                          <div className="lh-1 text-alternate">{item.quantity}</div>
                        </Col>

                        <Col lg="3" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                          <div className="lh-1 text-alternate">{item.price}</div>
                        </Col>
                        {/* 
                        <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                         
                          <Form.Check
                            className="form-check mt-2 ps-7 ps-md-2"
                            type="switch"
                            checked={item.is_delivered}
                            onClick={() => { eventHandler(item) }}
                          />
                        </Col> */}





                      </Row>
                    </Col>
                  </Row>
                </Card>
              </div>
            })}

            {/* List Items End */}
          </DialogContent>

        </Dialog>
      </div>
    </>
  );
};

export default NICorders;
