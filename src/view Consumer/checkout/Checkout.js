import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { createOrderURL, createOrderAsGuestURL, CreateCheckOutURL, CreateCheckOutGuestURL } from 'Redux/ConsumerRedux/Checkout/CheckoutRedux';
import { IfLogedinUpdateCartURL, CartListURL } from 'Redux/ConsumerRedux/Cart/CartRedux';
import { getWalletURL } from 'Redux/ConsumerRedux/WalletRedux/WalletRedux';
import { LogOutURL, LoginURL } from 'auth/authSlice';
// import { CreateCheckOutGuestURL, CreateCheckOutURL } from 'Redux/ConsumerRedux/Checkout/CheckoutRedux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';



function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

const Categories = () => {
  const title = 'Checkout';
  const description = 'Ecommerce Storefront Checkout Page';
  const location = useLocation();
  const dispatch = useDispatch()
  const history = useHistory();
  const userType = location && location.state && location.state.userType;
  const { CartData, } = useSelector((state) => state.CartList)
  const { currentUser, isLogin } = useSelector((state) => state.auth);
  const { WalletData } = useSelector((state) => state.WalletData);
  const { CheckoutData, checkoutnotification } = useSelector((state) => state.checkoutdata);
  // const { OrderData } = useSelector((state) => state.checkoutdata);
  const { IpAddressData } = useSelector((state) => state.IpAddressList);
  const [mobile, setMobile] = useState("")
  const [orderData, setOrderData] = useState([])
  console.log(WalletData, "WalletData12313213")
  console.log(orderData.length === 0, "gsgdsfdsfsdfsdfsdfsdfsdfds")
  const walletAmount = WalletData && WalletData.data && WalletData.data.wallet_amount ? WalletData && WalletData.data && WalletData.data.wallet_amount : 0
  const TotaleAmount = (CartData.total_amount - walletAmount) * 100
  //    const [WalletAmount1, setWalletAmount]=useState(WalletData ? WalletData.data.wallet_amount : 0)
  // console.log(WalletAmount1,"dsfdsfsdfsdf")



  console.log(currentUser === {}, "fgdgsgdczxczxczfgsfsdfsd")


  const [suc, setSuc] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.data) {
      dispatch(getWalletURL(currentUser.data.uuid, currentUser.token))
    }
  }, [])


















  const data = "ord012356"
  const RAZORPAY_KEY_ID = "rzp_test_S9SzVOTBYWn56h"
  const RAZORPAY_KEY_SECRET = "28NnsrgmxIHGKGU6qcgBwans"

  const displayRazorpay = async () => {

    if (orderData) {
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
      if (!res) {
        alert("err")
        return
      }

      const options = {
        "key": process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        "amount": TotaleAmount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Cafeteria",
        "description": "Cafeteria",
        "image": "https://example.com/your_logo",
        // "order_id": data.data.razorpay_id,
        "order_id": orderData && orderData.data && orderData.data.razorpay_id,

        // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        //    "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
        handler: (response) => {
          console.log(response, "dgdghj")
          const payLoad = {
            "order_uuid": orderData && orderData.data && orderData.data.order_uuid,
            "transaction_uuid": orderData && orderData.data && orderData.data.transaction_id,
            "payment_status": "paid",
            "razorpay_order_id": response.razorpay_order_id,
            "razorpay_payment_id": response.razorpay_payment_id,
            "razorpay_signature": response.razorpay_signature,
          }
          axios.put(`${process.env.REACT_APP_URL}/order/payment/update`, payLoad)
            .then((resp) => {
              dispatch(CartListURL(IpAddressData.ip))
              // toast.success("Payment Sucess")
              // const payLoads = {
              //   "checkout_uuid": data.data.checkout_uuid,
              //   "payment_status": "paid",
              //   "delivery_address": {
              //     "first_name": firstName,
              //     "last_name": lastName,
              //     "mobile": mobileNum,
              //     "company_name": company,
              //     "city": selectValueCity && selectValueCity.value,
              //     "state": selectValueState && selectValueState.value,
              //     "pincode": selectValuePincode && selectValuePincode.value,
              //     "address": address
              //   }
              // }
              // axios.post(`${process.env.REACT_APP_URL}/order/place`, payLoads)
              //   .then((respons) => {
              //     toast.success("Order Placed !")
              //     setTimeout(function () {
              //       history.push({
              //         pathname: '/dashboard',
              //       })
              //     }, 1000)
              //   })
              //   .catch((err) => {
              //     toast.success(err.response.data)
              //   })

            })
            .catch((err) => {
              // toast.success(err.response.data.message)

            })

        },
        "prefill": {
          "name": currentUser.name,
          "email": currentUser.email,
          "contact": currentUser.mobile
        },
        // config: {
        //   display: {
        //     hide: [
        //       {
        //         method: 'upi'
        //       }
        //     ],
        //     preferences: {
        //       show_default_blocks: true,
        //     },
        //   },
        // },
        // config: {
        //   display: {
        //     blocks: {
        //       banks: {
        //         name: 'Pay via Card',
        //         instruments: [
        //           {
        //             method: 'card'
        //           }
        //         ],
        //       },
        //     },
        //     sequence: ['block.banks'],
        //     preferences: {
        //       show_default_blocks: false,
        //     },
        //   },
        // },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open()
    }
  }



  useEffect(() => {
    if (orderData.length !== 0) {
      displayRazorpay()
    }
  }, [orderData])

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




  const CartUpdate = () => {
    if (currentUser) {
      const payload = {
        "user_uuid": currentUser.data.uuid,
        "ip_address": IpAddressData.ip
      }
      dispatch(IfLogedinUpdateCartURL(payload, currentUser.token))
    }


    // setSuc(true)
  }
  const ConsumerCheckout = () => {
    const payload = {
      "user_uuid": currentUser.data.uuid
    }
    dispatch(CreateCheckOutURL(payload, currentUser.token))
    // setSuc(true)
  }



  const GuestCheckOut = () => {

    const payload = {
      "ip_address": IpAddressData.ip
    }
    dispatch(CreateCheckOutGuestURL(payload,))
    // setSuc(true)

  }
  useEffect(() => {
    if (currentUser && currentUser.data && currentUser.data.uuid) {
      CartUpdate()
      ConsumerCheckout()
    } else {

      GuestCheckOut()
    }

  }, [])


  // const [ip, setIP] = useState('');
  // console.log(ip, "dsfsdfdsfdsfsd")
  // const getData = async () => {
  //   payload={

  //   }
  //   axios.post(`${process.env.REACT_APP_URL}/order/place`, payLoads)
  //         .then((respons) => {

  //         })
  //         .catch((err) => {

  //         })

  // }

  // useEffect(() => {
  //   getData()
  // }, [])








  const submitOrder = async (event) => {
    if (userType === "consumer") {
      event.preventDefault()
      const value = event.target.elements
      const payload = {
        "checkout_uuid": CheckoutData.data.uuid,
        "user_uuid": currentUser.data.uuid,
        "company_uuid": CheckoutData.data.company_uuid,
        "paid_from_wallet": walletAmount

      }
      axios.post(`${process.env.REACT_APP_URL}/order/create`, payload,
        {
          headers: {
            "x-auth-token": currentUser.token
          }
        })
        .then((respons) => {
          console.log(respons, "fffgdsfsdfdsf")
          setOrderData(respons.data)
    
        })
        .catch((err) => {
          console.log(err.response.data.message,"zasdsadasd")
          toast.error(err.response.data.message)
        
          if(err.response.data.message==="Your account has been deactivated. Please contact superadmin."){
            setTimeout(() => {
              // console.log('Hello, World!')
              dispatch(LogOutURL())
              history.push('/dashboard')
            }, 3000);
           
            
          }


        })



      // await dispatch(createOrderURL(payload, currentUser.token))
      // setSuc(true)
      // // await displayRazorpay()
      // setTimeout(() => {
      //   displayRazorpay()
      // }, 3000);


    } else {
      event.preventDefault()
      const value = event.target.elements
      const payload = {
        "checkout_uuid": CheckoutData.data.uuid,
        "ip_address": IpAddressData.ip,
        "company_uuid": CheckoutData.data.company_uuid,
        "mobile": mobile

      }

      axios.post(`${process.env.REACT_APP_URL}/order/create/guest`, payload,
        {
          headers: {
            "x-auth-token": currentUser.token
          }
        })
        .then((respons) => {
          console.log(respons, "fffgdsfsdfdsf")
          setOrderData(respons.data)
          // displayRazorpay()

        })
        .catch((err) => {

        })
      // dispatch(createOrderAsGuestURL(payload, currentUser.token))
      // setSuc(true)
      // setOrderData(respons.data)
      // displayRazorpay()

    }


  }


  useEffect(() => {
    if (suc === true) {
      if (checkoutnotification.status === true) {
        toast.success(checkoutnotification.message, {
          position: "top-right",
        })
        setSuc(false)
        setTimeout(() => {
          // dispatch(CompanyListURL(currentUser.token))
          // history.push(({
          //   pathname: "/Company",

          // }));
        }, 1000)

      }
      else if (checkoutnotification.status === false) {
        toast.error(checkoutnotification.message)
        setSuc(false)
      }
    }

  }, [checkoutnotification])
  console.log(checkoutnotification, "ProductDataProductData")

















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

          {/* Payment Start */}
          <h2 className="small-title">Payment</h2>
          <Card className="mb-5">
            <Card.Body>
              {userType === "guest" ?
                <Row className="g-3">
                  <Col className="col-sm-auto mb-3">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="text" className="w-100 sw-sm-40" onChange={(e) => setMobile(e.target.value)} />
                  </Col>
                </Row>
                :
                null}

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
                      <span className="text-small text-muted">₹</span>{CartData.total_amount}
                    </span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">SHIPPING</p>
                  <p>
                    <span className="text-alternate">
                      <span className="text-small text-muted">₹</span> 0
                    </span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">Wallet Amount</p>
                  <p>
                    <span className="text-alternate">
                      <span className="text-small text-muted">₹</span> {walletAmount}
                    </span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">GRAND TOTAL</p>
                  <div className="cta-2">
                    <span>
                      <span className="text-small text-muted cta-2">₹</span>{CartData && CartData.total_amount - walletAmount}
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-check mb-4">
                <input type="checkbox" className="form-check-input" name="terms" onChange={(e) => console.log(e.target.value, "DSfsdfsdfsdfsdf")} />
                <label className="form-check-label">
                  I have read and accept the{' '}
                  <NavLink to="/" target="_blank">
                    terms and conditions.
                  </NavLink>
                </label>
              </div>
              <Button className="btn-icon btn-icon-end w-100" variant="primary"
                onClick={submitOrder}
              // onClick={displayRazorpay}
              >
                <span>Purchase</span> <CsLineIcons icon="chevron-right" />
              </Button>
              {/* <button className="App-link" onClick={displayRazorpay}>
                    Pay ₹500
                </button> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Categories;
