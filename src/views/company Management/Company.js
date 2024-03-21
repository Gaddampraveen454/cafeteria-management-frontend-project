import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import axios from 'axios';
import { CompanyListURL, compnayUpdateURL, companyAddURL, CompanyStatusUpdateURL } from 'Redux/AdminRedux/Comapny/Company';
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
import QRCode from "react-qr-code";

const Company = () => {
  const title = 'Store Management';
  const description = 'Ecommerce Store Management Page';

  const allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [selectedItems, setSelectedItems] = useState([]);
  const [status, setStatus] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [eventType, setEventType] = useState(false)
  const [companyName, setComapnayName] = useState("")
  // const [walletamount, setwalletamount] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [location, setLocation] = useState("")
  const [address, setAddress] = useState("")
  const [gstin, setGstin] = useState('')
  const [fssai, setFssai] = useState('')
  const [logo, setLogo] = useState('');
  const [compnayId, setCompnayId] = useState("")
  const [suc, setSuc] = useState(false);


  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('')


  // console.log(page,limit,search,"sdsasfasasdasd")
  const value1 = "https://cms.scienstechnologies.com/menu/COMP-37CF1AF7"
  const [qrOpen, setQrOpen] = useState(false)

  console.log(status, "fgdffdggdf")


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

  const dispatch = useDispatch()

  const { currentUser } = useSelector((state) => state.auth)
  // const { companyData, notification } = useSelector((state) => state.companyList)
  const { companyData, notification } = useSelector((state) => state.companyList)

  // companyData

  console.log(companyData, "companyDatacompanyData")

  useEffect(() => {
    dispatch(CompanyListURL(page, search, currentUser.token, limit, currentUser?.data?.uuid))
  }, [])


  console.log(companyData, "currentUsersdffscurrentUser")


  const [UploadedFile, setUploadedFile] = useState()
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };


  const handleUpdateImage = () => {

    const formData = new FormData();
    formData.append('image', image);
    axios.post(`${process.env.REACT_APP_URL}/product/upload/image`, formData,
      {
        headers: {
          "x-access-token": `${currentUser.token}`,
        }
      })
      .then(res => {
        console.log(res.data.image, "resp00");
        setUploadedFile(res.data.image.filename)

      })
      .catch(err => {
        console.log(err, "err00")

      });
  }

  useEffect(() => {
    if (image !== null) {
      handleUpdateImage()
    }

  }, [image])



  const eventHandler = (event) => {
    setOpen(true)

    console.log(event, "jkjh")
    setComapnayName(event.store_name)
    // setwalletamount(event.wallet_amount)
    setEmail(event.email)
    setMobile(event.mobile)
    setLocation(event.location)
    setAddress(event.address)
    setGstin(event.gstin)
    setFssai(event.fssai_no)
    setCompnayId(event.uuid)
    setLogo(event?.logo)

  };


  const update = (event) => {
    event.preventDefault()
    const value = event.target.elements
    const payload = {
      "company_uuid": currentUser?.data?.uuid,
      "store_name": companyName,
      "email": email,
      "mobile": mobile,
      // "wallet_amount": walletamount,
      "location": location,
      "address": address,
      "gstin": gstin,
      "fssai_no": fssai,
      "logo": UploadedFile
    }
    dispatch(compnayUpdateURL(compnayId, payload, currentUser.token))
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
          dispatch(CompanyListURL(page, search, currentUser.token, limit, currentUser?.data?.uuid))
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


  const searchfunction = (type, pages) => {
    console.log(pages, type, "ghjkfgdvxvxvcvcfgssdvbnm")
    if (type === "search") {
      console.log(pages, type, "ghjkfgdfgssdvbnm")
      setSearch(pages)
      setPage(0)
      dispatch(CompanyListURL(0, pages, currentUser.token, limit, currentUser?.data?.uuid))
    }
    if (type === "prev") {
      setPage(page - 1)
      dispatch(CompanyListURL(page - 1, search, currentUser.token, limit, currentUser?.data?.uuid))
    }
    else if (type === "next") {
      setPage(page + 1)
      dispatch(CompanyListURL(page + 1, search, currentUser.token, limit, currentUser?.data?.uuid))
    }
    else if (type === "page") {
      setPage(page)
      dispatch(CompanyListURL(page, search, currentUser.token, limit, currentUser?.data?.uuid))
    }
    else if (type === "page+1") {
      setPage(page + 1)
      dispatch(CompanyListURL(page + 1, search, currentUser.token, limit, currentUser?.data?.uuid))
    }
    else if (type === "page+2") {
      setPage(page + 2)
      dispatch(CompanyListURL(page + 2, search, currentUser.token, limit, currentUser?.data?.uuid))
    }
    else if (type === "limit") {
      setLimit(pages)
      setPage(0)
      dispatch(CompanyListURL(0, search, currentUser.token, pages, currentUser?.data?.uuid))
    }
  }





  const HandleCompanyStatus = (event) => {
    console.log(event, "eventxcvvxcvv")
    // if (event.is_delivered)
    const payload = {
      // "uuid": event.uuid,
      "status": !event.is_active
    }
    dispatch(CompanyStatusUpdateURL(payload, currentUser.token, event?.uuid))
    setSuc(true)

  };


  const [CompnayIdForQR, setCompnayIdForQR] = useState("")

  console.log(CompnayIdForQR, "CompnayIdForQR")
  const ViewQRCode = (event) => {
    console.log(event, "sfdsfsdfsdf")
    setCompnayIdForQR(event.slug)
    setQrOpen(true)


  }
  console.log(`${process.env.REACT_APP_WEB_APP_URL}/products/store/${CompnayIdForQR}`, "sdfsdfsdfsfd")
  const handleDownload = () => {
    window.print();
    //   const printContents = document.getElementById('printablediv').innerHTML;
    //   const originalContents = document.body.innerHTML;
    //   document.body.innerHTML = printContents;
    //   window.print();
    //  document.body.innerHTML = originalContents; 

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
            <NavLink to="/addcompany">
              <Button variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto">
                <CsLineIcons icon="plus" /> <span>Add Store</span>
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

            <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer ">Store Name</div>
            </Col>
            <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Location</div>
            </Col>

            <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer ">Contact No</div>
            </Col>
            <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer ">Email</div>
            </Col>
            {/* <Col xs="2" lg="1" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer ">Wallet Amount</div>
            </Col> */}
            <Col xs="2" lg="1" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer" >Company Code</div>
            </Col>
            <Col xs="2" lg="1" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">QR Code</div>
            </Col>
            <Col xs="2" lg="1" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Action</div>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* List Header End */}

      {/* List Items Start */}



      {companyData && companyData.data && companyData.data.map((item, index) => {
        console.log(item, "itemitemitemitem")
        return <div key="">
          <Card className={`mb-2 ${selectedItems.includes(1) && 'selected'}`}>
            <Row className="g-0 h-100 sh-lg-9 position-relative">
              <Col className="py-4 py-lg-0 ps-5 pe-4 h-100">
                <Row className="g-0 h-100 ">
                  <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item.store_name}</div>
                  </Col>
                  <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item.location}</div>
                  </Col>
                  <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item.mobile}</div>
                  </Col>
                  <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item.email}</div>
                  </Col>
                  {/* <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4">
                    <div className="lh-1 text-alternate">₹ {item.wallet_amount}</div>
                  </Col> */}
                  <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4">
                    <div className="lh-1 text-alternate"> {item.uuid}</div>
                  </Col>
                  <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4">
                    <div className="lh-1 text-alternate">
                      <table>
                        <tr>
                          <td>
                            <Button title="VIEW" variant="outline-primary" className="btn px-2 py-2"
                              onClick={() => { ViewQRCode(item) }}
                            >
                              <CsLineIcons icon="print" />
                            </Button>
                          </td>

                        </tr>
                      </table>
                    </div>
                  </Col>
                  <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4">
                    <div className="lh-1 text-alternate">
                      <table>
                        <tr>
                          <td>
                            <Form.Check
                              type="switch"
                              checked={item.is_active}
                              onClick={() => { HandleCompanyStatus(item) }}

                            />
                          </td>
                          <td>
                            <Button title="VIEW" variant="outline-primary" className="btn px-2 py-2"
                              onClick={() => { eventHandler(item); setEventType(true) }}
                            >
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
                  </Col>
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



      {/* <Card className={`mb-2 ${selectedItems.includes(1) && 'selected'}`}>
        <Row className="g-0 h-100 sh-lg-9 position-relative">
          <Col xs="auto" className="positio-relative">
            <NavLink to="/products/detail">
              <img src="/img/product/small/product-1.webp" alt="product" className="card-img card-img-horizontal sw-11 h-100" />
            </NavLink>
          </Col>
          <Col className="py-4 py-lg-0 ps-5 pe-4 h-100">
            <Row className="g-0 h-100 ">
              <Col xs="11" lg="3" className="d-flex flex-column mb-lg-0 mb-3 pe-3 d-flex order-1 h-lg-100 justify-content-center">
                <NavLink to="/products/detail">
                  Anpan
                  <div className="text-small text-muted text-truncate">#2342</div>
                </NavLink>
              </Col>
              <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">ABCD</div>
              </Col>
              <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">Yousufguda</div>
              </Col>
              <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">Ayyappa Society</div>
              </Col>
              <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">9897654323</div>
              </Col>
              <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">sciens2023@gmail.com</div>
              </Col>
              <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4">
                <div className="lh-1 text-alternate">₹ 250</div>
              </Col>
              <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4">
                <div className="lh-1 text-alternate">
                <div className="mb-n1">
                  <Form.Check type="switch" id="quantitySwitch1" label="Allow out of stock purchase" />
                  <Form.Check type="switch" id="quantitySwitch2"  defaultChecked />
                  <Form.Check type="switch" id="quantitySwitch3" label="Display quantity at storefront" />
                </div>
                </div>
              </Col>
              <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4">
              <div className="lh-1 text-alternate">
              <table>
                <tr>
                <ToggleButton
                value={ items.is_active }
                onToggle={()=>activefunct(items)}
                 />
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
                  <td>
                  <Button title="ACTIVATE" variant="outline-info"  className="btn px-2 py-2">
                 <CsLineIcons icon="check" />
                 </Button>
                  </td>
                  <td>
                  <Button title="DEACTIVATE" variant="outline-danger"  className="btn px-2 py-2">
                 <CsLineIcons icon="close" />
                 </Button>
                  </td>
                  <td>
                  <Button title="DELETE" variant="outline-danger" className="btn px-2 py-2">
                 <CsLineIcons icon="bin" />
                 </Button>
                  </td>
                </tr>
              </table>
              </div>
            </Col>
              <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 align-items-start justify-content-center order-5">
                <Badge bg="outline-primary">SALE</Badge>
              </Col>
              <Col xs="1" className="d-flex flex-column mb-2 mb-lg-0 align-items-end order-2 order-lg-last justify-content-lg-center">
                <Form.Check className="form-check mt-2 ps-7 ps-md-2" type="checkbox" checked={selectedItems.includes(1)} onChange={() => checkItem(1)} />
              </Col>
            </Row>
          </Col>
        </Row>
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
          <Pagination.Item className="shadow" disabled={Math.ceil(companyData && companyData.count / limit) <= page + 1} onClick={() => searchfunction("page+1", page + 1)}>{page + 2}</Pagination.Item>
          <Pagination.Item className="shadow" disabled={Math.ceil(companyData && companyData.count / limit) <= page + 2} onClick={() => searchfunction("page+2", page + 2)}>{page + 3}</Pagination.Item>

          {Math.ceil(companyData && companyData.count / limit) > page + 3 &&
            <>
              <Pagination.Item className="shadow" >...</Pagination.Item>
            </>

          }
          <Pagination.Next className="shadow" disabled={Math.ceil(companyData && companyData.count / limit) <= page + 1} onClick={() => searchfunction("next")}>
            <CsLineIcons icon="chevron-right" />
          </Pagination.Next>
        </Pagination>
      </div>
      {/* Pagination end */}
      {/* View And Edit Popup Start */}
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
            <Form
              onSubmit={update}

            >
              <Row className="g-3">
                <Col lg="6">
                  <Form.Label>Store Name</Form.Label>
                  <Form.Control type="text" value={companyName} onChange={(e) => { setComapnayName(e.target.value) }} disabled={eventType} />
                  {/* <Select classNamePrefix="react-select" options={optionsState} value={selectValueState} onChange={setSelectValueState} placeholder="" /> */}
                </Col>
                {/* <Col lg="6">
                  <Form.Label>Wallet Amount</Form.Label>
                  <Form.Control type="text" value={walletamount} onChange={(e) => { setwalletamount(e.target.value) }} disabled={eventType} />
                </Col> */}
                <Col lg="6">
                  <Form.Label>Contact No</Form.Label>
                  <Form.Control type="text" value={mobile} maxLength={10} minLength={10} onKeyPress={(e) => {

                    const regex = /^[0-9\b]+$/;

                    if (!regex.test(e.key)) {

                      e.preventDefault();

                    }

                  }} onChange={(e) => { setMobile(e.target.value) }} disabled={eventType} />
                </Col>
                <Col lg="6">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} disabled={eventType} />
                </Col>
                <Col lg="6">
                  <Form.Label>Location</Form.Label>
                  <Form.Control as="textarea" rows={2} value={location} onChange={(e) => { setLocation(e.target.value) }} disabled={eventType} />
                </Col>


                <Col lg="6">
                  <Form.Label>Address</Form.Label>
                  <Form.Control as="textarea" rows={2} value={address} onChange={(e) => { setAddress(e.target.value) }} disabled={eventType} />
                </Col>
                <Col lg="6">
                  <Form.Label>Gstin</Form.Label>
                  <Form.Control type="text" value={gstin} onChange={(e) => { setGstin(e.target.value) }} disabled={eventType} />
                  {/* <Select classNamePrefix="react-select" options={optionsState} value={selectValueState} onChange={setSelectValueState} placeholder="" /> */}
                </Col>
                <Col lg="6">
                  <Form.Label>Fssai No</Form.Label>
                  <Form.Control type="text" value={fssai} onChange={(e) => { setFssai(e.target.value) }} disabled={eventType}
                    onKeyPress={(e) => {
                      const regex = /^[0-9\b]+$/;
                      if (!regex.test(e.key)) {
                        e.preventDefault();
                      }
                    }} />
                  {/* <Select classNamePrefix="react-select" options={optionsState} value={selectValueState} onChange={setSelectValueState} placeholder="" /> */}
                </Col>
                <Col lg="12">
                  <Form.Label>Logo</Form.Label><br />
                  {eventType === false &&
                    <Form.Control type="file" onChange={handleImageChange} />
                  }
                </Col>
                <Col lg="12">
                  <img src={logo} alt="logo" crossOrigin='anonymous' style={{ width: "100px", height: "100px" }} />
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
      {/* View And Edit Popup end */}





      {/* View QR code  Popup Start */}
      <div>
        <Dialog
          open={qrOpen}
          onClose={() => setQrOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"

        >

          <DialogContent

          >


            <div>
              <QRCode
                size={300}
                // style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={`${process.env.REACT_APP_WEB_APP_URL}/products/store/${CompnayIdForQR}`}
                viewBox='0 0 556 556'
              />
            </div>
            <br />
            <div style={{ alignItems: "center" }}>
              <Button variant="outline-primary"
                className='btn-icon btn-icon-end w-100'
                onClick={handleDownload}>
                <CsLineIcons icon="print" /> <span>Print</span>
              </Button>

            </div>

          </DialogContent>

        </Dialog>
      </div>
      {/* View And Edit Popup end  */}









    </>
  );
};

export default Company;
