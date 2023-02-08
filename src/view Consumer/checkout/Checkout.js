import React, { useState, useEffect } from 'react';
import { NavLink ,useLocation,useHistory} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { Card, Button, Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { createOrderURL, createOrderAsGuestURL ,CreateCheckOutURL,CreateCheckOutGuestURL} from 'Redux/ConsumerRedux/Checkout/CheckoutRedux';
import { IfLogedinUpdateCartURL } from 'Redux/ConsumerRedux/Cart/CartRedux';
// import { CreateCheckOutGuestURL, CreateCheckOutURL } from 'Redux/ConsumerRedux/Checkout/CheckoutRedux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Categories = () => {
  const title = 'Checkout';
  const description = 'Ecommerce Storefront Checkout Page';
  const location = useLocation();
  const dispatch = useDispatch()
  const history = useHistory();
  const userType = location &&  location.state && location.state.userType;
    console.log(location,"sdffsdfsdf") 
  const { CartData, } = useSelector((state) => state.CartList)
  const { currentUser, isLogin } = useSelector((state) => state.auth);
  const { CheckoutData,checkoutnotification } = useSelector((state) => state.checkoutdata);
  const { IpAddressData } = useSelector((state) => state.IpAddressList);
  console.log(IpAddressData,"IpAddressData")
  // const { IpAddress } = useSelector((state) => state.IpAddressData);
  // console.log(IpAddress,"IpAddress")
  const walletAmount=currentUser && currentUser.data && currentUser.data.wallet_amount?currentUser.data.wallet_amount:0
console.log(CartData,currentUser,"fgdgsgdfgsfsdfsd")


const [suc,setSuc] = useState(false);
const [ip, setIP] = useState('');
console.log(ip, "dsfsdfdsfdsfsd")
const getData = async () => {
  const res = await axios.get('https://ipapi.co/json/')
  console.log(res.data);
  setIP(res.data.ip)
}

useEffect(() => {
  getData()
}, [])


  

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

// const GuestCheckOut=()=>{
//   const payload = {
//     "ip_address" : "117.98.149.81"

// }
//   dispatch(CreateCheckOutURL(payload,currentUser.token))
//   setSuc(true)
// }


const CartUpdate = () => {
  const payload = {
          "user_uuid":currentUser.data.uuid,
          "ip_address" : IpAddressData.ip
        } 
        dispatch(IfLogedinUpdateCartURL(payload,currentUser.token))
      
  setSuc(true)
}
const ConsumerCheckout = () => {
  const payload = {
    "user_uuid" : currentUser.data.uuid
}
  dispatch(CreateCheckOutURL(payload,currentUser.token))
  setSuc(true)
}



const GuestCheckOut = () => {

  const payload = {
    "ip_address": IpAddressData.ip
  }
  dispatch(CreateCheckOutGuestURL(payload,))
  setSuc(true)

}
useEffect(()=>{
  if(currentUser && currentUser.data  && currentUser.data.uuid){
    CartUpdate()
    ConsumerCheckout()
  }else{
   
    GuestCheckOut()
  }
  
},[])











  const submitOrder = (event) => {
    if(userType==="consumer"){
      event.preventDefault()
      const value = event.target.elements
      const payload = {
        
        
          "checkout_uuid" : CheckoutData.data.uuid,
          "user_uuid" : currentUser.data.uuid,
          "company_uuid" : CheckoutData.data.company_uuid,
          "paid_from_wallet" : walletAmount
      
    }
      dispatch(createOrderURL(payload, currentUser.token))
      setSuc(true)
    }else{
      event.preventDefault()
    const value = event.target.elements
    const payload = {
  
      
        "checkout_uuid" : CheckoutData.data.uuid,
        "ip_address" : ip,
        "company_uuid" : CheckoutData.data.company_uuid,
        "mobile" : "9985119760"
    
  }

    dispatch(createOrderAsGuestURL(payload, currentUser.token))
    setSuc(true)
    }
    
   
}


useEffect(() => {
  if (suc === true) {
    if (checkoutnotification.status === true) {
      toast.success(checkoutnotification.message,{
        position:"top-right",
      })
      setSuc(false)
      setTimeout(()=>{
        // dispatch(CompanyListURL(currentUser.token))
        // history.push(({
        //   pathname: "/Company",
         
        // }));
      },1000)
     
    }
    else if (checkoutnotification.status === false) {
      toast.error(checkoutnotification.message)
      setSuc(false)
    }
  }

}, [checkoutnotification])
console.log(checkoutnotification ,"ProductDataProductData")




// useEffect(()=>{
//   if(ip){
//     const payload = {
//       "user_uuid":currentUser.data.uuid,
//       "ip_address" : ip
//     } 
//     dispatch(IfLogedinUpdateCartURL(payload,currentUser.token))
//   }
 
// },[currentUser,ip])

  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title Start */}
      <div className="page-title-container">
        <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/storefront/home">
          <CsLineIcons icon="chevron-left" size="13" />
          <span className="align-middle text-small ms-1">Storefront</span>
        </NavLink>
        <h1 className="mb-0 pb-0 display-4" id="title">
          {title}
        </h1>
      </div>
      {/* Title End */}

      <Row>
        <Col xs="12" className="col-lg order-1 order-lg-0">
          {/* Address Start */}
          {/* <h2 className="small-title">Address</h2> */}
          {/* <Card className="mb-5">
            <Card.Body>
              <Form>
                <Row className="g-3">
                  <Col lg="6">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Company(Optional)</Form.Label>
                    <Form.Control type="text" />
                  </Col>
                  <Col lg="4">
                    <Form.Label>State</Form.Label>
                    <Select classNamePrefix="react-select" options={optionsState} value={selectValueState} onChange={setSelectValueState} placeholder="" />
                  </Col>
                  <Col lg="4">
                    <Form.Label>City</Form.Label>
                    <Select classNamePrefix="react-select" options={optionsCity} value={selectValueCity} onChange={setSelectValueCity} placeholder="" />
                  </Col>
                  <Col lg="4">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control type="text" />
                  </Col>
                  <Col lg="12">
                    <Form.Label>Address</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card> */}
          {/* Address End */}

          {/* Shipment Start */}
          {/* <h2 className="small-title">Shipment</h2> */}
          {/* <Card className="mb-5">
            <Card.Body>
              <Form.Label>Options</Form.Label>
              <Form.Check type="radio" label="Free standard delivery" id="shipmentRadio1" name="shipmentRadio" />
              <Form.Check type="radio" label="Same day delivery for $12.00" id="shipmentRadio2" name="shipmentRadio" />
            </Card.Body>
          </Card> */}
          {/* Shipment End */}

          {/* Payment Start */}
          <h2 className="small-title">Payment</h2>
          <Card className="mb-5">
            <Card.Body>
              <Row className="g-3">
                <Col className="col-sm-auto mb-3">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control type="text" className="w-100 sw-sm-40" />
                </Col>
              </Row>
              <Row className="g-3">
                <Col className="col-sm-auto mb-3">
                  <Form.Label>Name on the Card</Form.Label>
                  <Form.Control type="text" className="w-100 sw-sm-40" />
                </Col>
              </Row>
              <Row className="g-3">
                <Col className="col-auto mb-3">
                  <Form.Label>CCV</Form.Label>
                  <Form.Control type="text" className="sw-9" />
                </Col>
                <Col className="col-auto mb-3">
                  <Form.Label className="d-block">Expiration Date</Form.Label>
                  <Select
                    classNamePrefix="react-select"
                    className="sw-9 d-inline-block me-1 text-center"
                    options={optionsMonth}
                    value={selectValueMonth}
                    onChange={setSelectValueMonth}
                    placeholder=""
                  />
                  <Select
                    classNamePrefix="react-select"
                    className="sw-9 d-inline-block"
                    options={optionsYear}
                    value={selectValueYear}
                    onChange={setSelectValueYear}
                    placeholder=""
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
          {/* Payment End */}
        </Col>
        <Col lg="auto" className="order-0 order-lg-1">
          <h2 className="small-title">Summary</h2>
          <Card className="mb-5 w-100 sw-lg-35">
            <Card.Body>
              <div className="mb-3">
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">ITEMS</p>
                  <p>
                    <span className="text-alternate">{CartData.count}</span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">TOTAL</p>
                  <p>
                    <span className="text-alternate">
                      <span className="text-small text-muted">$</span>{CartData.total_amount}
                    </span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">SHIPPING</p>
                  <p>
                    <span className="text-alternate">
                      <span className="text-small text-muted">$</span> 0
                    </span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">Wallet Amount</p>
                  <p>
                    <span className="text-alternate">
                      <span className="text-small text-muted">$</span> {walletAmount}
                    </span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">GRAND TOTAL</p>
                  <div className="cta-2">
                    <span>
                      <span className="text-small text-muted cta-2">$</span>{CartData && CartData.total_amount-walletAmount}
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-check mb-4">
                <input type="checkbox" className="form-check-input" name="terms" onChange={(e)=>console.log(e.target.value,"DSfsdfsdfsdfsdf")}/>
                <label className="form-check-label">
                  I have read and accept the{' '}
                  <NavLink to="/" target="_blank">
                    terms and conditions.
                  </NavLink>
                </label>
              </div>
              <Button className="btn-icon btn-icon-end w-100" variant="primary" onClick={submitOrder}>
                <span>Purchase</span> <CsLineIcons icon="chevron-right" />
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Categories;
