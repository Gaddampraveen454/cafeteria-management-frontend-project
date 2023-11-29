import React, { useState, useEffect } from 'react';
import { NavLink ,useHistory} from 'react-router-dom';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import Select from 'react-select';
import CheckAll from 'components/check-all/CheckAll';
// import { getRegisteredStyles, registerStyles, insertStyles } from '@emotion/utils';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
} from '@mui/material';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { consumerListURL, consumerAddURL, consumerUpdateURL, consumerBulkUploadURL } from 'Redux/CashierRedux/Consumer/ConsumerRedux';
import { LogOutURL, LoginURL } from 'auth/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const User = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const title = 'User Management';
  const description = 'Ecommerce User Management Page';

  const [openPopup, setOpenPopup] = React.useState(false);
  const [eventType, setEventType] = useState(false)
  const { currentUser } = useSelector((state) => state.auth)
  const { consumerData, notification } = useSelector((state) => state.CashierConsumerList)
  const { companyData } = useSelector((state) => state.companyList)
  // const { companyData } = useSelector((state) => state.companyList)
  const [selectCompany, setSelectCompany] = useState();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search , setSearch] = useState('')
  console.log(selectCompany,"sfsfsdfdsfsfds")

  useEffect(() => {
    dispatch(consumerListURL(page, search,currentUser.token,limit,currentUser.data.company_uuid))
  }, [])


  const companyList = companyData && companyData.data && companyData.data.map((item) => { return { label: item.company_name, value: item.uuid } })
  console.log(consumerData, "cashierDatadassadad")


  const [selectValueState, setSelectValueState] = useState();
  const optionsState = [
    { value: 'Fougasse', label: 'Fougasse' },
    { value: 'Lefse', label: 'Lefse' },
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

  const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

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





  const [name, setName] = useState("")
  const [companyName, setComapnayName] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [location, setLocation] = useState("")
  const [EmpId, setEmpId] = useState("")
  const [consmerId, setConsumerId] = useState("")
  const [selectedCompany, setSelectedCompany] = useState();
  console.log(selectedCompany, "selectedCompany")

  const [suc, setSuc] = useState(false);


  const eventHandler = (event) => {
    setOpenPopup(true)

    console.log(event, "eventxsddsdcvvxcvv")
    setName(event.name)
    // setComapnayName(event.company_name)
    setEmail(event.email)
    setMobile(event.mobile)
    setSelectedCompany({ label: event.company_name, value: event.company_uuid })
    setEmpId(event.emp_id)
    setLocation(event.location)
    setConsumerId(event.uuid)



  };
  const UpdateConsumer = (event) => {
    event.preventDefault()
    const value = event.target.elements
    const payload = {
      "name": name,
      "mobile": mobile,
      "email": email,
      "company_uuid": selectedCompany.value,
      "emp_id": EmpId,
      "location": location,

    }

    dispatch(consumerUpdateURL(consmerId, payload, currentUser.token))
    setSuc(true)
    // dispatch(CompanyListURL(currentUser.token))
  }


  useEffect(() => {
    if (suc === true) {
      if (notification.status === true) {
        toast.success(notification.message, {
          position: "top-right",
        })
        setSuc(false)
        setTimeout(() => {
          dispatch(consumerListURL(page, search,currentUser.token,limit,currentUser.data.company_uuid))
          setOpenPopup(false)
        }, 1000)

      }
      else if (notification.status === false) {
        toast.error(notification.message)
        setSuc(false)
      }
    }

  }, [notification])
  console.log(notification, "ProductDataProductData")



  const [file, setFile] = useState()
  console.log(file, "dfsfsdfsffsfs");
  function handleChange(event) {
    setFile(event.target.files[0])
  }

  function handleSubmit(event) {
    if (!file) {
      console.log("zxczxczxcz")
      toast.error("Please Select File")
        }
        else{

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    formData.append('company_uuid',selectCompany && selectCompany.value);
    dispatch(consumerBulkUploadURL(formData, currentUser.token))
    setSuc(true)
  }
}


const searchfunction =(type , pages)=>{
  if(type === "search"){
   console.log(pages ,"ghjkvbnm")
   setSearch(pages)
   setPage(0)
   dispatch(consumerListURL(0, pages,currentUser.token,limit,currentUser.data.company_uuid)) 
  }
  if(type === "prev"){
   setPage(page-1)
   dispatch(consumerListURL(page-1,search,currentUser.token,limit,currentUser.data.company_uuid))
  }
  else if(type === "next"){
   setPage(page+1)
   dispatch(consumerListURL(page+1,search,currentUser.token,limit,currentUser.data.company_uuid))
  }
  else if(type === "page"){
   setPage(page)
   dispatch(consumerListURL(page,search,currentUser.token,limit,currentUser.data.company_uuid))
  }
  else if(type === "page+1"){
   setPage(page+1)
   dispatch(consumerListURL(page+1,search,currentUser.token,limit,currentUser.data.company_uuid))
  }
  else if(type === "page+2"){
   setPage(page+2)
   dispatch(consumerListURL(page+2,search,currentUser.token,limit,currentUser.data.company_uuid))
  }
  else if(type === "limit"){
   setLimit(pages)
   setPage(0)
   dispatch(consumerListURL(0,search,currentUser.token,pages,currentUser.data.company_uuid))
  }
 }

 useEffect(() => {
  setSuc(true)
  if (suc === true) {
    if (notification.status === false) {
      toast.error(notification.message.message)
      setSuc(false)
      if(notification.message.logout===true){
   setTimeout(() => {
        // console.log('Hello, World!')
        dispatch(LogOutURL())
        history.push('/login')
      }, 5000);
      }
   
    }
  }

}, [notification])
  return (
    <>
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
        <DialogContent style={{ width: "500px", height: "200px" }}>
          <DialogContentText >

            <Form.Label>Select Company</Form.Label>
          {/* <Select classNamePrefix="react-select" options={optionsState} value={selectValueState} onChange={setSelectValueState} placeholder="" /> */}
          <Select classNamePrefix="react-select" options={companyList} value={selectCompany} onChange={setSelectCompany} placeholder="" />
          </DialogContentText><br />

          <DialogContentText >
            <input type="file" onChange={handleChange} className="form-control" />
          </DialogContentText>


        </DialogContent>
        <DialogActions>
          <Row
            className="g-3"
            style={{ width: "100%" }}
          >
            <Col lg="6">

              <p><a href={`${process.env.REACT_APP_URL}/user/download/consumerdata/excel/format`}>Download Sample File <CsLineIcons icon="download" /> </a> </p>
            </Col>
            <Col lg="6" align="right">
              {/* <Button onClick={() => setOpen(false)}>Disagree</Button> */}
              <Button
              //  onClick={() => handleSubmit()} 
               autoFocus>
                submit
              </Button>
            </Col>
          </Row>


        </DialogActions>
      </Dialog>

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
            {/* <Popup trigger={<Button className="button"> Open Modal </Button>} modal>
            <span> Modal content </span>
          </Popup> */}
            {/* <Button variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto" 
            // onClick={() => setOpen(true)}
            >
              <CsLineIcons icon="plus" /> <span>Bulk Upload</span>
            </Button> */}
            {/* <NavLink 
            to="/adduser"
            > */}
              {/* <Button variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto">
                <CsLineIcons icon="plus" /> <span>Add User</span>
              </Button> */}
            {/* </NavLink> */}
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
          <Form.Control type="text" onChange={(event)=>searchfunction("search" , event.target.value)} placeholder="Search" />
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
            <Dropdown.Item onClick={()=>searchfunction("limit", 5)}>5 Items</Dropdown.Item>
              <Dropdown.Item onClick={()=>searchfunction("limit", 10)}>10 Items</Dropdown.Item>
              <Dropdown.Item onClick={()=>searchfunction("limit", 20)}>20 Items</Dropdown.Item>
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
              <div className="text-muted text-medium cursor-pointer sort">Name</div>
            </Col>
            <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Employee ID*</div>
            </Col>
            <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Email ID</div>
            </Col>
            <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Phone No</div>
            </Col>
            <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Company Name*</div>
            </Col>
            <Col xs="2" lg="1" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Location</div>
            </Col>
            {/* <Col xs="2" lg="1" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer" />
            </Col> */}
            <Col xs="2" lg="1" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Action</div>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* List Header End */}

      {/* List Items Start */}

      {consumerData && consumerData.data && consumerData.data.map((item, index) => {
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
                    <div className="lh-1 text-alternate">{item.name}</div>
                  </Col>
                  <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item.emp_id}</div>
                  </Col>
                  <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item.email}</div>
                  </Col>
                  <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item.mobile}</div>
                  </Col>
                  <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item.company_name}</div>
                  </Col>
                  <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4">
                    <div className="lh-1 text-alternate">{item.location}</div>
                  </Col>
                  {/* <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4">
                    <div className="lh-1 text-alternate">
                      <div className="mb-n1">
                      
                        <Form.Check type="switch" id="quantitySwitch2" defaultChecked />
                       
                      </div>
                    </div>
                  </Col> */}
                  <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4">
                    <div className="lh-1 text-alternate">
                      <table>
                        <tr>
                          {/* <ToggleButton
                value={ items.is_active }
                onToggle={()=>activefunct(items)}
                 /> */}
                          <td>
                            <Button title="VIEW" variant="outline-primary" className="btn px-2 py-2"
                              onClick={() => { eventHandler(item); setEventType(true) }}
                              >
                              <CsLineIcons icon="eye" />
                            </Button>
                          </td>
                          <td>
                            {/* <Button title="EDIT" variant="outline-success" className="btn px-2 py-2"
                              // onClick={() => { eventHandler(item); setEventType(false) }}
                            >
                              <CsLineIcons icon="edit-square" />
                            </Button> */}
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

      {/* List Items End */}

      {/* Pagination Start */}
      <div className="d-flex justify-content-center mt-5">
        <Pagination>
          <Pagination.Prev className="shadow" disabled={page===0} onClick={()=>searchfunction("prev")}>
            <CsLineIcons icon="chevron-left" />
          </Pagination.Prev>
          <Pagination.Item className="shadow" active onClick={()=>searchfunction("page")} >
            {page+1}
          </Pagination.Item>
          <Pagination.Item className="shadow" disabled={Math.ceil(consumerData && consumerData.count/limit)<= page+1} onClick={()=>searchfunction("page+1",page+1)}>{page+2}</Pagination.Item>
          <Pagination.Item className="shadow" disabled={Math.ceil(consumerData && consumerData.count/limit)<= page+2} onClick={()=>searchfunction("page+2",page+2)}>{page+3}</Pagination.Item>

          {Math.ceil(consumerData && consumerData.count/limit) > page+3 &&
          <>
          <Pagination.Item className="shadow" >...</Pagination.Item>
           </>

        }
          <Pagination.Next className="shadow" disabled={Math.ceil(consumerData && consumerData.count/limit)<= page+1} onClick={()=>searchfunction("next")}>
            <CsLineIcons icon="chevron-right" />
          </Pagination.Next>
        </Pagination>
      </div>
      {/* Pagination End */}



      {/* view and edit popup start */}
      <div>
        <Dialog
          open={openPopup}
          onClose={() => setOpenPopup(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* <DialogTitle id="alert-dialog-title">
          Hello India
          {"Use Google's location service?"}
        </DialogTitle> */}
          <DialogContent style={{ width: "500px", height: "auto" }}>
            <Form
              onSubmit={UpdateConsumer}
            >
              <Row className="g-3">
                <Col lg="6">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                    disabled={eventType}

                  />
                  {/* <Select classNamePrefix="react-select" options={optionsState} value={selectedCompany} onChange={setSelectedCompany} placeholder="" /> */}
                </Col>
                <Col lg="6">
                  <Form.Label>Company Name</Form.Label>
                  <Select classNamePrefix="react-select"
                    options={companyList}
                    value={selectedCompany}
                    onChange={setSelectedCompany}
                    placeholder=""
                    disabled={eventType}
                  />
                  {/* <Form.Control type="text" onChange={(e)=>{setComapnayName(e.target.value)}}/> */}
                </Col>
                {/* <Col lg="6">
                  <Form.Label>Wallet Amount</Form.Label>
                  <Form.Control type="text" value={walletamount} onChange={(e) => { setwalletamount(e.target.value) }} disabled={eventType} />
                </Col> */}
                <Col lg="6">
                  <Form.Label>Contact No</Form.Label>
                  <Form.Control type="number"
                    value={mobile}
                    onChange={(e) => { setMobile(e.target.value) }}
                    disabled={eventType}
                  />
                </Col>
                <Col lg="6">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    disabled={eventType} />
                </Col>

                <Col lg="6">
                  <Form.Label>Employee Id</Form.Label>
                  <Form.Control type="text"
                    value={EmpId}
                    onChange={(e) => { setEmpId(e.target.value) }}
                    disabled={eventType} />
                </Col>

                <Col lg="6">
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text"
                    value={location}
                    onChange={(e) => { setLocation(e.target.value) }}
                    disabled={eventType} />
                </Col>
                {/* <Col lg="6">
                  <Form.Label>Location</Form.Label>
                  <Form.Control as="textarea" rows={2} value={location} onChange={(e) => { setLocation(e.target.value) }} disabled={eventType} />
                </Col> */}


                {/* <Col lg="6">
                  <Form.Label>Address</Form.Label>
                  <Form.Control as="textarea" rows={2} value={address} onChange={(e) => { setAddress(e.target.value) }} disabled={eventType} />
                </Col> */}
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
                  <Button onClick={() => setOpenPopup(false)} autoFocus>
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

export default User;
