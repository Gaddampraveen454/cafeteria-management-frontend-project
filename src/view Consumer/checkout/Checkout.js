import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Col, Form, Row, Spinner, Modal } from 'react-bootstrap';
import Select from 'react-select';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { createOrderURL, createOrderAsGuestURL, CreateCheckOutURL, CreateCheckOutGuestURL } from 'Redux/ConsumerRedux/Checkout/CheckoutRedux';
import { IpAddressDataURL } from 'Redux/ConsumerRedux/IpAddressRedux/IpAddress';
import { IfLogedinUpdateCartURL, CartListURL, ConsumerCartListURL } from 'Redux/ConsumerRedux/Cart/CartRedux';
import { getWalletURL, ProfileData } from 'Redux/ConsumerRedux/WalletRedux/WalletRedux';
import { LogOutURL, LoginURL } from 'auth/authSlice';
// import { CreateCheckOutGuestURL, CreateCheckOutURL } from 'Redux/ConsumerRedux/Checkout/CheckoutRedux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import io from 'socket.io-client';
import { removeCoupon } from 'Redux/ConsumerRedux/Coupons/CouponsRedux';
import ApplyCoupons from './ApplyCoupon';
import promoSuccessicon from './Img/promo-success-icon.svg';
import Logo from "../../Assests/images/cafe.png";



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

const Checkout = () => {
  const title = 'Checkout';
  const description = 'Ecommerce Storefront Checkout Page';
  const location = useLocation();
  const dispatch = useDispatch()
  const history = useHistory();
  const { CartData } = useSelector((state) => state.CartList)
  const { CouponData, discountAmount, coupon, notification } = useSelector((state) => state.coupons)
  console.log(CartData, "CartData")
  const { currentUser, isLogin } = useSelector((state) => state.auth);
  const { WalletData, Profiledatap } = useSelector((state) => state.WalletData);
  const { CheckoutData, checkoutnotification } = useSelector((state) => state.checkoutdata);
  // const { OrderData } = useSelector((state) => state.checkoutdata);

  const userType = currentUser && currentUser?.data?.group === "consumer" ? currentUser?.data?.group : location && location.state && location.state.userType;


  const { IpAddressData } = useSelector((state) => state.IpAddressList);
  const [mobile, setMobile] = useState("")
  const [orderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(false);

  const [discount, setDiscount] = useState(0);
  const [appliedcoupon, setAppliedCoupon] = useState([]);
  const [couponnotaplied, setNotAppllied] = useState("")

  const [instructionsvalue, setInstructionValue] = useState("");

  const [count, setCount] = useState(0);

  const walletAmount = WalletData && WalletData.data && WalletData.data.wallet_amount ? WalletData && WalletData.data && WalletData.data.wallet_amount : 0
  const ICashAmount = Profiledatap && Profiledatap?.data && Profiledatap?.data?.icash ? Profiledatap && Profiledatap?.data && Profiledatap?.data?.icash : 0

  const TotaleAmount = walletAmount > CartData.total_amount ? CartData.total_amount : (CartData.total_amount - walletAmount) * 100

  let TotalAmount;

  if (walletAmount > CartData.total_amount) {
    TotalAmount = CartData.total_amount;
  }
  else if (walletAmount < CartData.total_amount && ICashAmount >= (CartData.total_amount - walletAmount)) {
    TotalAmount = CartData.total_amount;
  }
  else {
    TotalAmount = (Number(CartData.total_amount) - Number(walletAmount) - Number(ICashAmount));
  }

  const [Icashvalue, setIcashValue] = useState(0);


  useEffect(() => {
    if (walletAmount < CartData.total_amount) {
      const Ivalue = (Number(CartData.total_amount) - Number(walletAmount));

      if (Ivalue === ICashAmount) {
        setIcashValue(ICashAmount);
      } else if (Ivalue > ICashAmount) {
        setIcashValue(Ivalue > ICashAmount && ICashAmount);
      } else if (Ivalue < ICashAmount) {
        setIcashValue(Ivalue);
      }
    }
  }, [walletAmount, CartData.total_amount, ICashAmount]);

  const [RadioButtonWalletCheck, setRadioButtonWalletCheck] = useState(false);
  const [RadioButtonICashCheck, setRadioButtonICashCheck] = useState(false);

  const [radioWallet, setRadioWallet] = useState(0);
  const [radioIcash, setRadioICash] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [checkwalletvalue, setCheckWalleteValue] = useState(false);
  const [checkICashvalue, setCheckICashValue] = useState(false);

  console.log(radioWallet, radioIcash, totalAmount, "hjgfjhfkjrhkerh")

  const handleWalletCheckboxChange = (e) => {
    setRadioButtonWalletCheck(e.target.checked);
    setCheckWalleteValue(false);
    const CheckValue = e.target.checked;

    if (CheckValue && RadioButtonICashCheck) {
      if (CartData?.total_amount === ICashAmount + walletAmount) {
        setTotalAmount(ICashAmount + walletAmount === CartData?.total_amount ? 0 : CartData?.total_amount)
        setRadioWallet(walletAmount)
      }
      else if (CartData.total_amount > ICashAmount) {
        setRadioWallet((walletAmount + ICashAmount) < CartData.total_amount ? walletAmount : ICashAmount - CartData?.total_amount)
      }
      else if (CartData?.total_amount > ICashAmount + walletAmount) {
        setTotalAmount(CartData?.total_amount - ICashAmount - walletAmount)
      }
      else if (CartData?.total_amount < ICashAmount + walletAmount) {
        setTotalAmount(walletAmount + ICashAmount - CartData?.total_amount)
      }
    }
    else if (!CheckValue) {
      setRadioWallet(0)
    }
    else if (CheckValue) {
      if (CartData?.total_amount === walletAmount) {
        setRadioWallet(walletAmount);
        setCheckWalleteValue(true);
      }
      else if (CartData?.total_amount > walletAmount) {
        setRadioWallet(walletAmount);
      }
      else if (CartData?.total_amount < walletAmount) {
        setRadioWallet(CartData?.total_amount);
        setCheckWalleteValue(true);
      }
    }

  };

  const handleICashCheckboxChange = (e) => {
    setRadioButtonICashCheck(e.target.checked);
    setCheckICashValue(false);
    const CheckValue = e.target.checked;

    if (RadioButtonWalletCheck && CheckValue) {
      if (CartData?.total_amount === ICashAmount + walletAmount) {
        setTotalAmount(ICashAmount + walletAmount === CartData?.total_amount ? 0 : CartData?.total_amount)
        setRadioICash(ICashAmount)
      }
      else if (CartData.total_amount > walletAmount) {
        setRadioICash((walletAmount + ICashAmount) < CartData.total_amount ? ICashAmount : Number(CartData?.total_amount) - Number(walletAmount))
      }
      else if (CartData?.total_amount > ICashAmount + walletAmount) {
        setTotalAmount(CartData?.total_amount - ICashAmount - walletAmount)
      }
      else if (CartData?.total_amount < ICashAmount + walletAmount) {
        setTotalAmount(walletAmount + ICashAmount - CartData?.total_amount)
      }
    }
    else if (!CheckValue) {
      setRadioICash(0)
    }
    else if (CheckValue) {
      if (CartData?.total_amount === ICashAmount) {
        setRadioICash(ICashAmount);
        setCheckICashValue(true);
      }
      else if (CartData?.total_amount > ICashAmount) {
        console.log(CartData?.total_amount, walletAmount, "hgdsgjhdsghgshdsj")
        setRadioICash(ICashAmount);
      }
      else if (CartData?.total_amount < ICashAmount) {
        console.log(CartData?.total_amount, "hgdsgjhdsghgshdsj")
        setRadioICash(CartData?.total_amount);
        setCheckICashValue(true);
      }
    }

  };
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
      dispatch(ProfileData(currentUser.data.uuid, currentUser?.data?.token))
    }
  }, [])

  useEffect(() => {
    setDiscount(discountAmount);
    setAppliedCoupon(coupon);
    setNotAppllied(coupon?.coupon_uuid)

  }, [discountAmount, coupon]);

  const StoreData = JSON.parse(localStorage.getItem("storeDatiles"));

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleOpen = () => {
    setShow(true);
  };


  useEffect(() => {
    dispatch(IpAddressDataURL())
  }, [])

  let coup
  if (couponnotaplied === undefined) {
    coup = '';
  } else {
    coup = couponnotaplied;
  }

  const data = "ord012356"
  // const RAZORPAY_KEY_ID = "rzp_test_SEA53JLJICNZPH"
  // const RAZORPAY_KEY_SECRET = "28NnsrgmxIHGKGU6qcgBwans"

  const displayRazorpay = async () => {

    if (orderData) {
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
      if (!res) {
        alert("err")
        return
      }
      console.log(orderData, "orderData")
      setLoading(true)
      const options = {
        "key": process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        "amount": String(totalAmount), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Cafeteria",
        "description": "Cafeteria",
        "image": Logo,
        "order_id": orderData?.data?.razorpay_id,
        handler: (response) => {
          const payLoad = {
            "transaction_uuid": orderData && orderData.data && orderData.data.transaction_id,
            "payment_status": "paid",
            "razorpay_order_id": response.razorpay_order_id,
            "razorpay_payment_id": response.razorpay_payment_id,
            "razorpay_signature": response.razorpay_signature,
          }
          axios.put(`${process.env.REACT_APP_URL}/order/payment/update`, payLoad)
            .then((resp) => {
              console.log(resp.data, "checkout123")
              dispatch(removeCoupon())
              if (currentUser && currentUser.data && currentUser.data.group === "consumer") {
                setLoading(false)
                dispatch(ConsumerCartListURL(currentUser && currentUser.data && currentUser.data.uuid))
                setSuc(false)
              } else {
                dispatch(CartListURL(IpAddressData.ip))
              }
              const host = `${process.env.REACT_APP_SOCKET}`; // Replace with your server host
              const queryParams = { transaction_uuid: orderData && orderData.data && orderData.data.transaction_id };
              const socket = io(host, {
                path: '/pathToConnection',
                transports: ['websocket'],
                upgrade: false,
                query: queryParams,
                reconnection: true,
                rejectUnauthorized: false
              });

              socket.on('connect', () => {
                console.log('Connected to the server');
                // socket.emit('newOrder', { company_uuid: StoreData?.company_uuid, transaction_uuid: orderData && orderData.data && orderData.data.transaction_id });
                socket.emit('newOrder');

                // <div>
                //   {loading && (
                //     <Spinner animation="border" variant="primary" />
                //   )}
                // </div>

                // socket.on('orderNotification', (value) => {
                //   console.log(value, 'Order placed');
                setTimeout(() => {
                  history.push(({
                    pathname: "/OrderSuccess",
                    state: {
                      message: `${resp.data.message}`,
                      data: resp.data.data
                    }
                  }));
                }, 1000)
                // })
              });

              return () => {
                if (socket) {
                  socket.disconnect();
                }
              };



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
    setSuc(true)
  }



  const GuestCheckOut = () => {

    const payload = {
      "ip_address": IpAddressData.ip,
      "compan_uuid": StoreData?.company_uuid
    }
    dispatch(CreateCheckOutGuestURL(payload, currentUser?.token))
    // setSuc(true)

  }
  useEffect(() => {
    if (currentUser && currentUser.data && currentUser.data.uuid) {

      CartUpdate()
      setTimeout(() => {
        ConsumerCheckout()
      }, 100)



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
      setCount(1)
      setLoading(true)
      if (currentUser && currentUser?.data?.company_uuid) {
        if (currentUser && currentUser?.data?.company_uuid === CheckoutData.data.company_uuid) {
          const value = event.target.elements
          const payload = {
            "checkout_uuid": CheckoutData.data.uuid,
            "user_uuid": currentUser.data.uuid,
            "company_uuid": CheckoutData.data.company_uuid,
            // "paid_from_wallet": walletAmount > CartData.total_amount ? CartData.total_amount : walletAmount,
            // "icash": Icashvalue,
            "paid_from_wallet": radioWallet,
            "icash": radioIcash,
            "instructions": instructionsvalue,
            "coupon_uuid": `${coup}`,
            "discount_amount": discount
          }

          axios.post(`${process.env.REACT_APP_URL}/order/create`, payload,
            {
              headers: {
                "x-auth-token": currentUser.data?.token
              }
            })
            .then((respons) => {
              console.log(respons, "fffgdsfsdfdsf")
              setLoading(false)
              const host = `${process.env.REACT_APP_SOCKET}`; // Replace with your server host
              const queryParams = { transaction_uuid: respons?.data?.message };
              const socket = io(host, {
                path: '/pathToConnection',
                transports: ['websocket'],
                upgrade: false,
                query: queryParams,
                reconnection: true,
                rejectUnauthorized: false
              });

              socket.on('connect', () => {
                console.log('Connected to the server');
                // socket.emit('newOrder', { company_uuid: StoreData?.company_uuid, transaction_uuid: orderData && orderData.data && orderData.data.transaction_id });
                socket.emit('newOrder');

                // <div>
                //   {loading && (
                //     <Spinner animation="border" variant="primary" />
                //   )}
                // </div>

                if (respons.data.message !== "Checkout Success") {
                  history.push(({
                    pathname: "/OrderSuccess",
                    state: {
                      message: `${respons.data.message}`,
                      data: respons.data.data
                    }
                  }));
                }

              })
              setOrderData(respons.data)
            })
            .catch((err) => {
              console.log(err.response, "zasdsadasdewe")
              toast.error(err.response.data)

              if (err.response.data === "Your account has been deactivated. Please contact superadmin.") {
                setTimeout(() => {
                  // console.log('Hello, World!')
                  dispatch(LogOutURL())
                  history.push('/dashboard')
                }, 3000);
              }
              setSuc(false)
            })

        }
        else {
          toast.error("Your Not Eligible For this Products")
        }
      }
      else {
        setLoading(true)
        const value = event.target.elements
        const payload = {
          "checkout_uuid": CheckoutData.data.uuid,
          "user_uuid": currentUser.data.uuid,
          "company_uuid": CheckoutData.data.company_uuid,
          // "paid_from_wallet": walletAmount > CartData.total_amount ? CartData.total_amount : walletAmount,
          // "icash": Icashvalue,
          "paid_from_wallet": radioWallet,
          "icash": radioIcash,
          "instructions": instructionsvalue,
          "coupon_uuid": `${coup}`,
          "discount_amount": discount,
        }

        axios.post(`${process.env.REACT_APP_URL}/order/create`, payload,
          {
            headers: {
              "x-auth-token": currentUser.data?.token
            }
          })
          .then((respons) => {
            console.log(respons, "fffgdsfsdfdsf")
            setLoading(false)
            const host = `${process.env.REACT_APP_SOCKET}`; // Replace with your server host
            const queryParams = { transaction_uuid: respons?.data?.message };
            const socket = io(host, {
              path: '/pathToConnection',
              transports: ['websocket'],
              upgrade: false,
              query: queryParams,
              reconnection: true,
              rejectUnauthorized: false
            });

            socket.on('connect', () => {
              console.log('Connected to the server');
              // socket.emit('newOrder', { company_uuid: StoreData?.company_uuid, transaction_uuid: orderData && orderData.data && orderData.data.transaction_id });
              socket.emit('newOrder');

              // <div>
              //   {loading && (
              //     <Spinner animation="border" variant="primary" />
              //   )}
              // </div>

              if (respons.data.message !== "Checkout Success") {
                history.push(({
                  pathname: "/OrderSuccess",
                  state: {
                    message: `${respons.data.message}`,
                    data: respons.data.data
                  }
                }));
              }
            })

            setOrderData(respons.data)
          })
          .catch((err) => {
            console.log(err.response, "zasdsadasdhdvbh")
            toast.error(err.response.data)

            if (err.response.data === "Your account has been deactivated. Please contact superadmin.") {
              setTimeout(() => {
                // console.log('Hello, World!')
                dispatch(LogOutURL())
                history.push('/dashboard')
              }, 3000);
            }
            setSuc(false)
          })


      }
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
  //   if (notification?.message !== undefined) {
  //     if (notification.status === true) {
  //       toast.success(notification.message, {
  //         position: "top-right",
  //       })
  //     }
  //     else if (notification.status === false) {
  //       toast.error(notification.message)
  //     }
  //   }
  // }, [notification])
  console.log(notification, "ProductDataProductData")

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
        <Col xs={12} md={4}>

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
        <Col xs={12} md={4} style={{ display: "flex", justifyContent: "stretch", alignItems: "center" }} className='spinner-checkout'>
          <div>
            {loading && (
              <Spinner animation="border" variant="primary" />
            )}
          </div>
        </Col>
        <Modal
          className="modal fade"
          show={show}
          onHide={handleClose}
          // size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          size="lg"
        >
          <Modal.Header closeButton className="modal-header">
            <h3>Offers</h3>
          </Modal.Header>
          {/* <h5 className="mt-5" style={{ textAlign: 'center' }}>
            You can apply both store & bank/wallet offer in one order
          </h5> */}
          <Modal.Body>
            <ApplyCoupons show={show} onHide={handleClose} CartData={CartData} />
          </Modal.Body>
        </Modal>
        <Col xs={12} md={4} >
          <div>
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
                  {/* <div className="mb-2">
                  <p className="text-small text-muted mb-1">SHIPPING</p>
                  <p>
                    <span className="text-alternate">
                      <span className="text-small text-muted">₹</span> 0
                    </span>
                  </p>
                </div> */}
                  <div className="mb-2">
                    <p className="text-small text-muted mb-1">CGST(%)</p>
                    <p>
                      <span className="text-alternate">
                        <span className="text-small text-muted">₹</span> {CartData.cgst_tax}
                      </span>
                    </p>
                  </div>
                  <div className="mb-2">
                    <p className="text-small text-muted mb-1">SGST(%)</p>
                    <p>
                      <span className="text-alternate">
                        <span className="text-small text-muted">₹</span>{CartData.sgst_tax}
                      </span>
                    </p>
                  </div>
                  {/* <div className="mb-2">
                    <p className="text-small text-muted mb-1">Wallet Amount</p>
                    <p>
                      <span className="text-alternate">
                        <span className="text-small text-muted">₹</span> {currentUser && currentUser.data ? walletAmount : 0}
                      </span>
                    </p>
                  </div>
                  <div className="mb-2">
                    <p className="text-small text-muted mb-1">Icash Amount</p>
                    <p>
                      <span className="text-alternate">
                        <span className="text-small text-muted">₹</span> {currentUser && currentUser.data ? ICashAmount : 0}
                      </span>
                    </p>
                  </div> */}
                  <div className="mb-2">
                    <p className="text-small text-muted mb-1">Discount</p>
                    <p>
                      ₹ {discount}
                    </p>
                  </div>
                  {/* <div className="mb-2">
                    <p className="text-small text-muted mb-1">To Pay</p>
                    <p>
                      {CartData && CartData.total_amount !== undefined
                        ? `₹ ${Number(CartData.total_amount).toFixed(2).replace(/(\.0+|(?<=\.\d)0+)$/, '')}`
                        : '₹ 0'}
                    </p>
                  </div> */}
                  <Row>
                    <Col lg="12">
                      <div>
                        <div className="form-check">
                          <label className="form-check-label" htmlFor="walletCheckbox">
                            <p className="text-medium text-muted mb-1">Wallet ₹ {currentUser && currentUser.data ? walletAmount : 0}</p>
                          </label>
                          {/* <input className="form-check-input cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={() => HandleRadioBalance('Wallet')} /> */}
                          <input type="checkbox" className="form-check-input" name="terms" disabled={checkICashvalue} checked={RadioButtonWalletCheck} onChange={handleWalletCheckboxChange} />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <div>
                        <div className="form-check">
                          <label className="form-check-label" htmlFor="icashCheckbox">
                            <p className="text-medium text-muted mb-1">ICash ₹ {currentUser && currentUser.data ? ICashAmount : 0}</p>
                          </label>
                          {/* <input className="form-check-input cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={() => HandleRadioBalance('ICash')} /> */}
                          <input type="checkbox" className="form-check-input" name="terms" disabled={checkwalletvalue} onChange={handleICashCheckboxChange} />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="mb-2">
                    <p className="text-small text-muted mb-1">GRAND TOTAL</p>
                    {/* <div className="cta-2"> */}
                    {/* <span>
                        <span className="text-small text-muted cta-2">₹</span>{currentUser && currentUser.data ? FinalAmount?.toFixed(2) : CartData?.total_amount?.toFixed(2)}
                      </span> */}
                    <p >
                      {CartData && CartData.total_amount !== undefined && discount !== undefined
                        ? (() => {
                          const calculatedAmount = CartData.total_amount - discount;
                          const formattedAmount = calculatedAmount % 1 === 0
                            ? `₹ ${calculatedAmount.toFixed(0)}`
                            : `₹ ${calculatedAmount.toFixed(2)}`;

                          return formattedAmount.replace(/(\.0+|(?<=\.\d)0+)$/, ''); // Remove unnecessary zeros

                        })()
                        : '0'}
                    </p>
                    {/* </div> */}
                  </div>
                  <div className="mb-2">
                    <p className="text-small text-muted mb-1">Cooking Instructions</p>
                    <p>
                      <Form.Control type="text" name="instructions" onChange={(e) => setInstructionValue(e.target.value)} placeholder="Instructions" />
                    </p>
                  </div>
                  <hr />
                  {Object.keys(currentUser).length > 0 ? (
                    <>
                      {discount !== 0 ? (
                        <div
                          className="mb-4"
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer',
                            border: '1px dashed',
                            padding: '15px',
                          }}
                          onClick={handleOpen}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div>
                              <img src={promoSuccessicon} alt="product" style={{ width: '100%' }} />
                            </div>
                            &nbsp;&nbsp;
                            <div style={{ color: 'red' }}> Applied Coupon {appliedcoupon?.code}</div>
                            <hr />
                            <div style={{ color: 'red' }}> You have saved ₹ {(CartData.total_amount - appliedcoupon?.amount).toFixed(2)}</div>
                          </div>

                          <div>
                            <Button
                              size="sm"
                              className="btn-icon btn-icon-only position-absolute t-9 e-2"
                              variant="foreground-alternate"

                              onClick={() => dispatch(removeCoupon())}
                              style={{ display: 'contents' }}
                            >
                              <CsLineIcons icon="error-hexagon" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="mb-4"
                          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                          onClick={handleOpen}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div>
                              <img src={promoSuccessicon} alt="product" style={{ width: '100%' }} />
                            </div>
                            &nbsp;&nbsp;
                            <div style={{ color: '#1da52b' }}> Apply your coupon </div>
                          </div>
                          <div>
                            <CsLineIcons style={{ color: '#1da52b' }} icon="chevron-right" />
                          </div>
                        </div>
                      )}
                    </>
                  ) : ""}
                  <hr />
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
                {(count === 0 && checkoutnotification?.status === true) ?
                  (<Button className="btn-icon btn-icon-end w-100" variant="primary"
                    onClick={submitOrder}
                  // onClick={displayRazorpay}
                  >
                    <span>Purchase</span> <CsLineIcons icon="chevron-right" />
                  </Button>)
                  :
                  (<Button className="btn-icon btn-icon-end w-100" variant="primary" disabled>
                    <span>Purchase</span> <CsLineIcons icon="chevron-right" />
                  </Button>)
                }
                {/* <button className="App-link" onClick={displayRazorpay}>
                    Pay ₹500
                </button> */}
              </Card.Body>
            </Card>
          </div>

        </Col>
      </Row>
    </>
  );
};

export default Checkout;
