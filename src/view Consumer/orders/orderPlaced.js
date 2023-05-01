import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import { useDispatch, useSelector } from 'react-redux';
import { OrderListUR, OrderStatusUpdateURL } from 'Redux/AdminRedux/OrderRedux/OrderRedux';
import { ConsumerOrderListURL } from 'Redux/ConsumerRedux/OrderRedux/OrderRedux';
import { toast } from 'react-toastify';
import { InvoiceListURL } from 'Redux/AdminRedux/invoice/InvoiceRedux';
import 'react-toastify/dist/ReactToastify.css';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
} from '@mui/material';
import axios from 'axios';
import moment from 'moment';

const OrderPlaced = () => {
  const dispatch = useDispatch()
  const title = 'Orders';
  const description = 'Ecommerce Orders Page';
  const [status, setStatus] = useState(false)
  const [eventType, setEventType] = useState(false)
  const [suc, setSuc] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openpdf, setOpenPdf] = useState(false)
  const [closepdf, setClosePdf] = useState(false);
  const [productDetails, setProductDetails] = useState([])
  console.log(productDetails, "fdfdsfdsfsdfsdfsdfffgfdgd")
  console.log(status, "sdfsdfsfs")
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


  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('')

  const { currentUser } = useSelector((state) => state.auth)
  console.log(currentUser, "currentUser")
  const { ConsumerOrderData, notification } = useSelector((state) => state.OrderPlacedData)
  const { InvoiceData } = useSelector((state) => state.InvoiceData)
  console.log(InvoiceData, "InvoiceData")

  useEffect(() => {
    if (currentUser.data) {
      dispatch(ConsumerOrderListURL(page, search, currentUser.token, limit, currentUser.data.uuid))
    }

  }, [])
  console.log(ConsumerOrderData, "dfgdgdgdfgd");


  const searchfunction = (type, pages) => {
    if (type === "search") {
      console.log(pages, "ghjkvbnm")
      setSearch(pages)
      setPage(0)
      dispatch(ConsumerOrderListURL(0, pages, currentUser.token, limit, currentUser.data.uuid))
    }
    if (type === "prev") {
      setPage(page - 1)
      dispatch(ConsumerOrderListURL(page - 1, search, currentUser.token, limit, currentUser.data.uuid))
    }
    else if (type === "next") {
      setPage(page + 1)
      dispatch(ConsumerOrderListURL(page + 1, search, currentUser.token, limit, currentUser.data.uuid))
    }
    else if (type === "page") {
      setPage(page)
      dispatch(ConsumerOrderListURL(page, search, currentUser.token, limit, currentUser.data.uuid))
    }
    else if (type === "page+1") {
      setPage(page + 1)
      dispatch(ConsumerOrderListURL(page + 1, search, currentUser.token, limit, currentUser.data.uuid))
    }
    else if (type === "page+2") {
      setPage(page + 2)
      dispatch(ConsumerOrderListURL(page + 2, search, currentUser.token, limit, currentUser.data.uuid))
    }
    else if (type === "limit") {
      setLimit(pages)
      setPage(0)
      dispatch(ConsumerOrderListURL(0, search, currentUser.token, pages, currentUser.data.uuid))
    }
  }







  const eventHandler = (event) => {
    console.log(event, "eventxcvvxcvv")
    // if (event.is_delivered)
    const payload = {
      "order_uuid": event.uuid,
      "order_status": !event.is_delivered
    }
    dispatch(OrderStatusUpdateURL(payload, currentUser.token))
    setSuc(true)


  };

  const GetInvoice = (event) => {
    console.log(event, "sfdfsfdsf")

    dispatch(InvoiceListURL(currentUser.token))
  };





  useEffect(() => {
    if (suc === true) {
      if (notification.status === true) {
        toast.success(notification.message, {
          position: "top-right",
        })
        setSuc(false)
        setTimeout(() => {
          dispatch(ConsumerOrderListURL(page, search, currentUser.token, limit, currentUser.data.uuid))
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


  };




  const failurePdfOpen = () => {
    setClosePdf(true);
  };

  const failurePdfClose = () => {
    setClosePdf(false);
  };

  const handlePdfOpen = () => {
    setOpenPdf(true);
  };

  const handlePdfClose = () => {
    setOpenPdf(false);
  };

  // const handlePdf = (event) => {
  //   const endPoint = "";


  //   // setLoader(true);
  //   let dt;
  //   let url;
  //   async function getpdf(item) {
  //     try {
  //       await axios
  //         .get(`${process.env.REACT_APP_URL}/order/invoice/ORD-052669A2`, {
  //           // headers: {
  //           //   "x-auth-token": authState.token,
  //           // },
  //         })
  //         .then((res) => {
  //           if (res.data) {
  //             dt = res.data;
  //             // setLoader(false);
  //           }
  //         });

  //       handlePdfOpen();
  //       await fetch("data:application/pdf;base64," + dt)
  //         .then((res) => res.blob())
  //         .then((blob) => {
  //           url = window.URL.createObjectURL(blob);
  //         });
  //       const iframe = document.querySelector("#pdf");
  //       iframe.setAttribute("src", url);
  //     } catch (error) {
  //       // failurePdfOpen();
  //     }
  //   }

  //   getpdf(item);
  // };


  const handleHistoryCaseNote = (e) => {
    console.log(e.uuid, "Asdasdasdasdasdas")
    // setLoader(true);
    // const caseid = e.target.id;
    const caseid = e.uuid
    let dt;
    let url;
    async function getpdf(id) {
      try {
        await axios.get(`${process.env.REACT_APP_URL}/order/invoice/${id}`
          )
          .then((res) => {
            if (res.data) {
              dt = res.data;
              console.log(dt,"SDsadasdasda")
              fetch(`data:application/pdf;base64,${dt}`).then(response => {
                response.blob().then(blob => {
                    // Creating new object of PDF file
                    const fileURL = window.URL.createObjectURL(blob);
                    // Setting various property values
                    const alink = document.createElement('a');
                    alink.href = fileURL;
                    alink.download = 'Invoice.pdf';
                    alink.click();
                })
            })
            
              // setLoader(false);
            }
          });

      //   handlePdfOpen();
         
      //   await fetch(`data:application/pdf;base64,${dt}`)
      //     .then((res) => res.blob())
      //     .then((blob) => {
      //       url = window.URL.createObjectURL(blob);
      //     });
      //   const iframe = document.querySelector("#pdf");
      //   iframe.setAttribute("src", url);


      //   // const onButtonClick = () => {
      //     // using Java Script method to get PDF file
         
      // // }
        
      } catch (error) {
        failurePdfOpen();
      }
    }

    getpdf(caseid);
  };



//   const handleDownload = () => {
//     window.print();

//   };


//   const onButtonClick = (e) => {
//     // using Java Script method to get PDF file
//     fetch(`${process.env.REACT_APP_URL}/order/invoice/${e.uuid}`).then(response => {
//         response.data.blob().then(blob => {
//             // Creating new object of PDF file
//             const fileURL = window.URL.createObjectURL(blob);
//             // Setting various property values
//             const alink = document.createElement('a');
//             alink.href = fileURL;
//             alink.download = 'SamplePDF.pdf';
//             alink.click();
//         })
//     })
// }

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
            {/* <NavLink to="/addNICorder">
            <Button variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto">
            <CsLineIcons icon="plus" /> <span>Add Orders</span>
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
      <Row
        className="p-0 mb-2 d-none d-lg-flex"
      >

        <Col>
          <Row className="g-0 h-100 align-content-center custom-sort ps-5 pe-4 h-100">
            <Col lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">S.No</div>
            </Col>
            <Col lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">Date</div>
            </Col>
            <Col lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">Order id</div>
            </Col>
            <Col lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">Paid from Wallet</div>
            </Col>
            <Col lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">Online Payment</div>
            </Col>

            <Col lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">Price</div>
            </Col>
            <Col lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">Transaction </div>
            </Col>
            <Col lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">Status</div>
            </Col>
            <Col lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">Action</div>
            </Col>


          </Row>
        </Col>
      </Row>
      {/* List Header End */}

      {/* List Items Start */}
      {ConsumerOrderData && ConsumerOrderData.data && ConsumerOrderData.data.map((item, index) => {
        return <div key="">
          {console.log(item, "dffdfdfdfsssfsdfsdf")}
          {/* <Card className={`mb-2 ${selectedItems.includes(1) && 'selected'}`}>
        <Row className="g-0 h-100 sh-lg-9 position-relative">
       
          <Col className="py-4 py-lg-0 ps-5 pe-4 h-100">
            <Row className="g-0 h-100 ">
            
              <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">{index+1}</div>
              </Col>
              <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">{moment(item.createdAt).format('DD/MM/YYYY')}</div>
              </Col>
              
              <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">{item.uuid}</div>
              </Col>
              <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">{item && item.paid_from_wallet}
                </div>
              </Col>
              <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">{item && item.online_payment}
                </div>
              </Col>
          
              
              <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">{item.total_amount}</div>
              </Col>
              
              <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">{item.transaction_uuid}</div>
              </Col>
              <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">{item.is_delivered===true?"Delivered":"Pending"}</div>
              </Col>
              
              
        
        
              <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
           <div>
           <Button title="VIEW" variant="outline-primary" className="btn px-2 py-2" 
                  onClick={() => { viewEventHandler(item); setEventType(false) }}
                  >
                  <CsLineIcons icon="eye" />                  
                 </Button>
                 <Button title="PRINT" variant="outline-primary" className="btn px-2 py-2" 
                  onClick={(e) => { handleHistoryCaseNote(item);  }}
                  >
                  <CsLineIcons icon="print" />                  
                 </Button>
           </div>
              </Col>
             
            </Row>
          </Col>
        </Row>
      </Card> */}

          <Col sm="6" lg="12">
            <Card>
              <Row className="g-0 h-auto sh-lg-12">
                <Col xs="12" className="col-lg p-0 h-100">
                  <Card.Body className="h-100">
                    <Row className="gx-2 d-flex h-100 align-items-lg-center">

                      <Col lg="1">
                        <Row className="gx-2 align-items-center ">

                          <Col lg="12" className="col">
                            <Row className="p-0 mb-2 d-none d-lg-flex">
                              <Col xs="auto" lg="12" >
                                <div className="lh-1 text-alternate">{index + 1}</div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Col lg="2">
                        <Row className="gx-2 align-items-center">
                          <Col lg="12" className="col">
                            <Row className="g-0">
                              <Col className="d-lg-none">
                                <div className="text-alternate sh-4 d-flex align-items-center lh-1-25">Date</div>
                              </Col>
                              <Col xs="auto" lg="12">
                                <div className="lh-1 text-alternate">{moment(item.createdAt).format('DD/MM/YYYY')}</div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Col lg="2">
                        <Row className="gx-2 align-items-center">
                          <Col lg="12" className="col">
                            <Row className="g-0">
                              <Col className="d-lg-none">
                                <div className="text-alternate sh-4 d-flex align-items-center lh-1-25">Order Id</div>
                              </Col>
                              <Col xs="auto" lg="12">
                                <div className="lh-1 text-alternate">{item.uuid}</div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Col lg="1">
                        <Row className="gx-2 align-items-center">
                          <Col lg="12" className="col">
                            <Row className="g-0">
                              <Col className="d-lg-none">
                                <div className="text-alternate sh-4 d-flex align-items-center lh-1-25">Paid from Wallet</div>
                              </Col>
                              <Col xs="auto" lg="12">
                                <div className="lh-1 text-alternate">{item && item.paid_from_wallet}</div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Col lg="1">
                        <Row className="gx-2 align-items-center">
                          <Col lg="12" className="col">
                            <Row className="g-0">
                              <Col className="d-lg-none">
                                <div className="text-alternate sh-4 d-flex align-items-center lh-1-25">Online Payment</div>
                              </Col>
                              <Col xs="auto" lg="12">
                                <div className="lh-1 text-alternate">{item && item.online_payment}</div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Col lg="1">
                        <Row className="gx-2 align-items-center">

                          <Col lg="12" className="col">
                            <Row className="g-0">
                              <Col className="d-lg-none">
                                <div className="text-alternate sh-4 d-flex align-items-center lh-1-25">Price</div>
                              </Col>
                              <Col xs="auto" lg="12">
                                <div className="lh-1 text-alternate">{item.total_amount}</div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Col lg="2">
                        <Row className="gx-2 align-items-center">
                          <Col lg="12" className="col">
                            <Row className="g-0">
                              <Col className="d-lg-none">
                                <div className="text-alternate sh-4 d-flex align-items-center lh-1-25">Transaction</div>
                              </Col>
                              <Col xs="auto" lg="12">
                                <div className="lh-1 text-alternate">{item.transaction_uuid}</div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Col lg="1">
                        <Row className="gx-2 align-items-center">

                          <Col lg="12" className="col">
                            <Row className="g-0">
                              <Col className="d-lg-none">
                                <div className="text-alternate sh-4 d-flex align-items-center lh-1-25">Status</div>
                              </Col>
                              <Col xs="auto" lg="12">
                                <div className="lh-1 text-alternate">{item.is_delivered === true ? "Delivered" : "Pending"}</div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Col lg="1">
                        <Row className="gx-2 align-items-center">

                          <Col lg="12" className="col">
                            <Row className="g-0">
                              <Col className="d-lg-none">
                                {/* <div className="text-alternate sh-4 d-flex align-items-center lh-1-25"></div> */}
                              </Col>
                              <Col xs="auto" lg="12">
                                <div className="sh-4 d-flex align-items-center text-alternate justify-content-lg-end">

                                  <Button title="VIEW" variant="outline-primary" className="btn px-2 py-2"
                                    onClick={() => { viewEventHandler(item); setEventType(false) }}
                                  >
                                    <CsLineIcons icon="eye" />
                                  </Button>
                                  <Button title="PRINT" variant="outline-primary" className="btn px-2 py-2"
                                    onClick={(e) => { handleHistoryCaseNote(item); }}
                                  >
                                    <CsLineIcons icon="print" />
                                  </Button>
                                  {/* <Button title="PRINT" variant="outline-primary" className="btn px-2 py-2"
                                  //  onClick={onButtonClick}
                                   onClick={(e) => { onButtonClick(item); }}
                                   >
                    Download PDF
                </Button> */}

                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
          <br />
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
          <Pagination.Item className="shadow" disabled={Math.ceil(ConsumerOrderData && ConsumerOrderData.count / limit) <= page + 1} onClick={() => searchfunction("page+1", page + 1)}>{page + 2}</Pagination.Item>
          <Pagination.Item className="shadow" disabled={Math.ceil(ConsumerOrderData && ConsumerOrderData.count / limit) <= page + 2} onClick={() => searchfunction("page+2", page + 2)}>{page + 3}</Pagination.Item>

          {Math.ceil(ConsumerOrderData && ConsumerOrderData.count / limit) > page + 3 &&
            <>
              <Pagination.Item className="shadow" >...</Pagination.Item>
            </>

          }
          <Pagination.Next className="shadow" disabled={Math.ceil(ConsumerOrderData && ConsumerOrderData.count / limit) <= page + 1} onClick={() => searchfunction("next")}>
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
          fullWidth
          // width="lg"

        >
          {/* <DialogTitle id="alert-dialog-title">
          Hello India
          {"Use Google's location service?"}
        </DialogTitle> */}
          <DialogContent
          // style={{ width: "500px", height: "auto"  }}
          >

            {/* List Header Start */}
            <Row 
            className="g-0 mb-2 d-none d-lg-flex"
            >
              {/* <Col xs="auto" className="sw-11 d-none d-lg-flex" /> */}
              <Col>
                <Row 
                className="g-0 h-100 align-content-center custom-sort ps-5 pe-4 h-100"
                >
                  <Col xs="1" lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                    <div className="text-muted text-medium cursor-pointer sort">S.No</div>
                  </Col>
                  <Col xs="2" lg="4" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                    <div className="text-muted text-medium cursor-pointer sort">Product Name</div>
                  </Col>
                  <Col xs="2" lg="4" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                    <div className="text-muted text-medium cursor-pointer sort">Product Id</div>
                  </Col>

                  <Col xs="2" lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                    <div className="text-muted text-medium cursor-pointer sort">Quantity</div>
                  </Col>
                  <Col xs="2" lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
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
                        <Col lg="1">
                          <Row className="gx-2 align-items-center ">

                            <Col lg="12" className="col">
                              <Row className="p-0 mb-2 d-none d-lg-flex">
                                <Col xs="auto" lg="12" >
                                  <div className="lh-1 text-alternate  mt-2">{index + 1}</div>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg="4">
                          <Row className="gx-2 align-items-center">
                            <Col lg="12" className="col">
                              <Row className="g-0">
                                <Col xs="6"  className="d-lg-none">
                                  <div className="text-alternate sh-4 d-flex align-items-center lh-1-25">Name</div>
                                </Col>
                                <Col xs="6" lg="12">
                                  <div className="lh-1 text-alternate mt-2 ">{item.name}</div>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg="4">
                          <Row className="gx-2 align-items-center">
                            <Col lg="12" className="col">
                              <Row className="g-0">
                                <Col className="d-lg-none">
                                  <div className="text-alternate sh-4 d-flex align-items-center lh-1-25">Product Id</div>
                                </Col>
                                <Col xs="auto" lg="12">
                                  <div className="lh-1 text-alternate  mt-2">{item.uuid}</div>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg="2">
                          <Row className="gx-2 align-items-center">
                            <Col lg="12" className="col">
                              <Row className="g-0">
                                <Col className="d-lg-none">
                                  <div className="text-alternate sh-4 d-flex align-items-center lh-1-25">Quantity</div>
                                </Col>
                                <Col xs="auto" lg="12">
                                  <div className="lh-1 text-alternate  mt-2">{item.quantity}</div>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg="1">
                          <Row className="gx-2 align-items-center">
                            <Col lg="12" className="col">
                              <Row className="g-0">
                                <Col className="d-lg-none">
                                  <div className="text-alternate sh-4 d-flex align-items-center lh-1-25">Price</div>
                                </Col>
                                <Col xs="auto" lg="12">
                                  <div className="lh-1 text-alternate  mt-2">{item.price}</div>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                        {/* <Col lg="2">
                          <Row className="gx-2 align-items-center">
                            <Col lg="12" className="col">
                              <Row className="g-0">
                                <Col className="d-lg-none">
                                  <div className="text-alternate sh-4 d-flex align-items-center lh-1-25">Status</div>
                                </Col>
                                <Col xs="auto" lg="12">
                                  <div className="lh-1 text-alternate  mt-2">{item.is_delivered === true ? "Delivered" : "Pending"}</div>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
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
      <Dialog
        disableBackdropClick
        style={{ borderRadius: "0px" }}
        // fullScreen
        maxWidth="lg"
        fullWidth
        open={openpdf}
        // scroll="paper"
        onClose={handlePdfClose}
        PaperProps={{ sx: { width: "100%", height: "100%" } }}
      >


        <Button title="VIEW" variant="outline-primary" className="btn px-2 py-2" style={{ width: "40px" }}
          onClick={() => handlePdfClose()}

        >
          <CsLineIcons icon="close" />
        </Button>
        <DialogContent >
          <iframe src="" className="pdfiframe" id="pdf" title="myFrame"
          
            style={{ width: "100%", height: "100%" }}

          />

        </DialogContent>
        {/* </div> */}
      </Dialog>

    </>
  );
};

export default OrderPlaced;



