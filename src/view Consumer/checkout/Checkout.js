import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { createOrderURL, createOrderAsGuestURL, CreateCheckOutURL, CreateCheckOutGuestURL } from 'Redux/ConsumerRedux/Checkout/CheckoutRedux';
import { IpAddressDataURL } from 'Redux/ConsumerRedux/IpAddressRedux/IpAddress';
import { IfLogedinUpdateCartURL, CartListURL, ConsumerCartListURL } from 'Redux/ConsumerRedux/Cart/CartRedux';
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
  const { CartData, notification } = useSelector((state) => state.CartList)
  console.log(CartData, "CartData")
  const { currentUser, isLogin } = useSelector((state) => state.auth);
  const { WalletData } = useSelector((state) => state.WalletData);
  const { CheckoutData, checkoutnotification } = useSelector((state) => state.checkoutdata);
  // const { OrderData } = useSelector((state) => state.checkoutdata);

  const userType = currentUser && currentUser?.data?.group === "consumer" ? currentUser?.data?.group : location && location.state && location.state.userType;


  const { IpAddressData } = useSelector((state) => state.IpAddressList);
  const [mobile, setMobile] = useState("")
  const [orderData, setOrderData] = useState([])


  const walletAmount = WalletData && WalletData.data && WalletData.data.wallet_amount ? WalletData && WalletData.data && WalletData.data.wallet_amount : 0
  const TotaleAmount = walletAmount > CartData.total_amount ? CartData.total_amount : (CartData.total_amount - walletAmount) * 100


  console.log(TotaleAmount, "TotaleAmount")

  const FinalAmount = CartData.total_amount < walletAmount ? 0 : CartData.total_amount - walletAmount

  console.log(walletAmount > CartData.total_amount ? CartData.total_amount : walletAmount, "gfhggfhgg")

  console.log(walletAmount > CartData.total_amount ? CartData.total_amount : TotaleAmount, "vvcbcbvbcbv")

  console.log(CheckoutData, "CheckoutData")



  console.log(currentUser, "currentUser")


  const [suc, setSuc] = useState(false);
  const [suc1, setSuc1] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.data) {
      dispatch(getWalletURL(currentUser.data.uuid, currentUser?.data?.token))
    }
  }, [])

  const StoreData = JSON.parse(localStorage.getItem("storeDatiles"));




  useEffect(() => {
    dispatch(IpAddressDataURL())
  }, [])


  const data = "ord012356"
  const RAZORPAY_KEY_ID = "rzp_test_SEA53JLJICNZPH"
  const RAZORPAY_KEY_SECRET = "28NnsrgmxIHGKGU6qcgBwans"

  const displayRazorpay = async () => {

    if (orderData) {
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
      if (!res) {
        alert("err")
        return
      }
      console.log(orderData, "orderData")

      const options = {
        "key": process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        "amount": String(TotaleAmount), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Cafeteria",
        "description": "Cafeteria",
        "image": "https://images.pexels.com/photos/66997/pexels-photo-66997.jpeg?auto=compress&cs=tinysrgb&w=600",
        // "order_id": data.data.razorpay_id,
        "order_id": orderData?.data?.razorpay_id,

        // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        //    "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
        handler: (response) => {
          console.log(response, "sdfsdfsfsdf")
          const payLoad = {
            // "order_uuid": orderData && orderData.data && orderData.data.order_uuid,
            "transaction_uuid": orderData && orderData.data && orderData.data.transaction_id,
            "payment_status": "paid",
            "razorpay_order_id": response.razorpay_order_id,
            "razorpay_payment_id": response.razorpay_payment_id,
            "razorpay_signature": response.razorpay_signature,
          }
          axios.put(`${process.env.REACT_APP_URL}/order/payment/update`, payLoad)
            .then((resp) => {
              console.log(resp.data, "ssdfsdfsdsdfsdfsdffsdfsdf")
              // dispatch(CartListURL(IpAddressData.ip))
              if (currentUser && currentUser.data && currentUser.data.group === "consumer") {
                dispatch(ConsumerCartListURL(currentUser && currentUser.data && currentUser.data.uuid))
                setSuc(false)
              } else {
                // if (ip)
                dispatch(CartListURL(IpAddressData.ip))
              }

              console.log(resp.data, "ssdfsdfsdsdfsdfsdffsdfsdf")

              history.push(({
                pathname: "/OrderSuccess",
                state: {
                  message: `${resp.data.message}`
                }
              }));

              // dispatch(getWalletURL(currentUser.data.uuid, currentUser.token))
            })
            .catch((err) => {
              // toast.success(err.response.data.message)
              console.log(err.response.data, "sdfsdfsdffsd")

            })

        },
        "prefill": {
          "name": currentUser.data?.name,
          "email": currentUser.data?.email,
          "contact": currentUser.data?.mobile
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
      dispatch(IfLogedinUpdateCartURL(payload, currentUser.data?.token))
    }


    // setSuc(true)
  }
  const ConsumerCheckout = () => {
    const payload = {
      "user_uuid": currentUser.data.uuid,
      "compan_uuid": StoreData?.company_uuid
    }
    dispatch(CreateCheckOutURL(payload, currentUser.data?.token))
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

      setTimeout(() => {
        ConsumerCheckout()
      }, 1500)



      // ConsumerCheckout()
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
        "paid_from_wallet": walletAmount > CartData.total_amount ? CartData.total_amount : walletAmount
      }

      axios.post(`${process.env.REACT_APP_URL}/order/create`, payload,
        {
          headers: {
            "x-auth-token": currentUser.data?.token
          }
        })
        .then((respons) => {
          console.log(respons, "fffgdsfsdfdsf")
          if (respons.data.message !== "Checkout Success") {
            history.push(({
              pathname: "/OrderSuccess",
              state: {
                message: `${respons.data.message}`
              }
            }));
          }

          setOrderData(respons.data)

        })
        .catch((err) => {
          console.log(err.response.data.message, "zasdsadasd")
          toast.error(err.response.data.message)

          if (err.response.data.message === "Your account has been deactivated. Please contact superadmin.") {
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
            "x-auth-token": currentUser.data?.token
          }
        })
        .then((respons) => {
          console.log(respons, "fffgdsfsdfdsf")
          setOrderData(respons.data)
          // displayRazorpay()

        })
        .catch((err) => {
          console.log(err.response.data, "asdasdasdasdasd")
          toast.error(err.response.data)
          setSuc(false)
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


  // useEffect(() => {
  //   if (suc1 === true) {
  //     if (notification.status === true) {

  //       // toast.success(notification.message, {
  //       //   position: "top-right",
  //       // })


  //       setTimeout(() => {
  //         ConsumerCheckout()
  //       }, 1000)
  //       setSuc1(false)

  //     }
  //     else if (notification.status === false) {
  //       toast.error(notification.message)
  //       setSuc1(false)
  //     }
  //   }

  // }, [notification])
  // console.log(notification, "ProductDataProductData")

  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title Start */}
      <div className="page-title-container">
        <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/Cardcart">
          <CsLineIcons icon="chevron-left" size="20" />
          <span className="align-middle text-small ms-1">Cart</span>
        </NavLink>
        <h1 className="mb-0 pb-0 display-4" id="title">
          {title}
        </h1>
      </div>
      {/* Title End */}

      <Row>
        <Col xs={12} sm={12} lg={8} md={8}>

          {/* Payment Start */}
          <h2 className="small-title">Payment</h2>
          {userType === "guest" ?
            <Card className="mb-5">
              <Card.Body>

                <Row className="g-3">
                  <Col className="col-sm-auto mb-3">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="number" className="w-100 sw-sm-40" onChange={(e) => setMobile(e.target.value)} />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            :
            null}
          {/* Payment End */}
        </Col>
        <Col xs={12} sm={12} lg={4} md={4}>
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
                      <span className="text-small text-muted">₹</span>{CartData.amount}
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
                  <p className="text-small text-muted mb-1">CGST(%)</p>
                  <p>
                    <span className="text-alternate">
                      <span className="text-small text-muted">₹</span> {CartData.cgst_tax}
                    </span>
                  </p>
                </div>
                {/* <div className="mb-2">
                  <p className="text-small text-muted mb-1">SGST(%)</p>
                  <p>
                    <span className="text-alternate">
                      <span className="text-small text-muted">₹</span>{CartData.sgst_tax} 
                    </span>
                  </p>
                </div> */}
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">Wallet Amount</p>
                  <p>
                    <span className="text-alternate">
                      <span className="text-small text-muted">₹</span> {currentUser && currentUser.data ? walletAmount : 0}
                    </span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">GRAND TOTAL</p>
                  <div className="cta-2">
                    <span>
                      <span className="text-small text-muted cta-2">₹</span>{currentUser && currentUser.data ? FinalAmount?.toFixed(2) : CartData?.total_amount?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              {/* <div className="form-check mb-4">
                <input type="checkbox" className="form-check-input" name="terms" onChange={(e) => console.log(e.target.value, "DSfsdfsdfsdfsdf")} />
                <label className="form-check-label">
                  I have read and accept the{' '}
                  <NavLink to="/" target="_blank">
                    terms and conditions.
                  </NavLink>
                </label>
              </div> */}
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
