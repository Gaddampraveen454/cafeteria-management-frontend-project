import React, { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import { useDispatch, useSelector } from 'react-redux';
import { cashierListURL, cashierAddURL, cashierUpdateURL } from 'Redux/AdminRedux/Cashier/CashierRedux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
} from '@mui/material';

const executive = () => {
  
  const dispatch = useDispatch()
  const title = 'Front Desk Executive';
  const description = 'Ecommerce Front Desk Executive Page';

  const allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [selectedItems, setSelectedItems] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [eventType, setEventType] = useState(false)
  const [name, setName]=useState("")
  const [companyName, setComapnayName]=useState("")
  const [email, setEmail]=useState("")
  const [mobile, setMobile]=useState("")
  const [password, setPassword]=useState("")







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
  const { cashierData } = useSelector((state) => state.cashierList)

console.log(cashierData,"currentUsersdsdfsfdsd")
useEffect(() => {
  dispatch(cashierListURL(currentUser.token))
}, [])


const eventHandler = (event) => {
  setOpen(true)

  console.log(event, "eventxcvvxcvv")
  // setComapnayName(event.company_name)
  // setwalletamount(event.wallet_amount)
  setEmail(event.email)
  setMobile(event.mobile)
  // setLocation(event.location)
  // setAddress(event.address)
  // setCompnayId(event.uuid)


};



const update = (event) => {
  event.preventDefault()
  const value = event.target.elements
  const payload = {
    "name":name,
    // "company_name" : companyName,
    "email" : email,
    "mobile" : mobile,
    "password":password,
    // "company_uuid" :selectValueState && selectValueState.value
}
  // dispatch(catgoryUpdateURL(compnayId , payload, currentUser.token))
  // dispatch(categoryListURL(currentUser.token))
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
            <NavLink to="/addexecutive">
            <Button variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto">
            <CsLineIcons icon="plus" /> <span>Add Executive</span>
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
            <Form.Control type="text" placeholder="Search" />
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
                10 Items
              </Dropdown.Toggle>
            </OverlayTrigger>
            <Dropdown.Menu className="shadow dropdown-menu-end">
              <Dropdown.Item href="#">5 Items</Dropdown.Item>
              <Dropdown.Item href="#">10 Items</Dropdown.Item>
              <Dropdown.Item href="#">20 Items</Dropdown.Item>
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
            <Col xs="2" lg="3" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Company Name</div>
            </Col>
            <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Phone No</div>
            </Col>
            <Col xs="2" lg="3" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Email</div>
            </Col>
            <Col xs="2" lg="1" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer " />
            </Col>
            <Col xs="2" lg="1" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Active</div>
            </Col>
            {/* <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Location</div>
            </Col> */}
          </Row>
        </Col>
      </Row>
      {/* List Header End */}

      {/* List Items Start */}
      {cashierData && cashierData.data && cashierData.data.map((item, index) => {
      return<div key="">
      <Card className={`mb-2 ${selectedItems.includes(1) && 'selected'}`}>
        <Row className="g-0 h-100 sh-lg-9 position-relative">
         
          <Col className="py-4 py-lg-0 ps-5 pe-4 h-100">
            <Row className="g-0 h-100 ">
             
              <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">{item.name}</div>
              </Col>
              <Col lg="3" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">{item.company_name}</div>
              </Col>
              <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">{item.mobile}</div>
              </Col>
              <Col lg="3" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">{item.email}</div>
              </Col>
              <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4">
                <div className="lh-1 text-alternate">
                <div className="mb-n1">
                  {/* <Form.Check type="switch" id="quantitySwitch1" label="Allow out of stock purchase" /> */}
                  <Form.Check type="switch" id="quantitySwitch2"  defaultChecked />
                  {/* <Form.Check type="switch" id="quantitySwitch3" label="Display quantity at storefront" /> */}
                </div>
                </div>
              </Col>
              <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4">
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
                  <Button title="EDIT" variant="outline-success"  className="btn px-2 py-2" onClick={() => { eventHandler(item); setEventType(false) }}>
                 <CsLineIcons icon="edit-square" />
                 </Button>
                  </td>
             
                </tr>
              </table>
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
          <DialogContent style={{ width: "500px", height: "400px" }}>
            <Form
            onSubmit={update}
            >
              <Row className="g-3">
                <Col lg="6">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control type="text" value={companyName} onChange={(e) => { setComapnayName(e.target.value) }} disabled={eventType} />
                  {/* <Select classNamePrefix="react-select" options={optionsState} value={selectValueState} onChange={setSelectValueState} placeholder="" /> */}
                </Col>
                {/* <Col lg="6">
                  <Form.Label>Wallet Amount</Form.Label>
                  <Form.Control type="text" value={walletamount} onChange={(e) => { setwalletamount(e.target.value) }} disabled={eventType} />
                </Col> */}
                <Col lg="6">
                  <Form.Label>Contact No</Form.Label>
                  <Form.Control type="number" value={mobile} onChange={(e) => { setMobile(e.target.value) }} disabled={eventType} />
                </Col>
                <Col lg="6">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} disabled={eventType} />
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
                    <Button onClick={() => setOpen(false)} autoFocus>
                  cancel
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

export default executive;
