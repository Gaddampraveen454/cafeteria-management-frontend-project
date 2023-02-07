import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CartListURL, deleteToCartURL, updateCartURL } from 'Redux/ConsumerRedux/Cart/CartRedux';
import { CreateCheckOutURL,CreateCheckOutGuestURL } from 'Redux/ConsumerRedux/Checkout/CheckoutRedux';
import { Row, Col, Card, Button } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import Clamp from 'components/clamp/index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import axios from 'axios';
import ItemCounter from '../storefront/cart/components/ItemCounter';



const Cardcart = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const title = 'Cart';
  const description = 'Ecommerce Storefront Cart Page';
  const { currentUser, isLogin } = useSelector((state) => state.auth);
  const { CheckoutData, checkoutnotification } = useSelector((state) => state.checkoutdata);
  console.log(CheckoutData, "asdadssdfdsazcs")
  console.log(currentUser, isLogin, "curreasdasdntUdfddsfsdfdser")
  const { CartData, notification } = useSelector((state) => state.CartList)
  const [CartId, setCartId] = useState()
  const [suc, setSuc] = useState(false);


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

  console.log(CartId, "Dsdfsfddsfsdfdsf")
  useEffect(() => {
    if (ip)
      dispatch(CartListURL(ip))
  }, [ip])
  console.log(CartData, "jhfhdfdffdfjhfj")


  // const updateToCart = (event) => {
  //   console.log(event,"jhjjgjhsdfsfsdgjgjhg")

  //   const payload = {
  //     "uuid" :event.uuid,
  //     "quantity" : value
  // }
  //   dispatch(updateCartURL(payload))
  //   setSuc(true)
  //   // dispatch(CompanyListURL(currentUser.token))
  // }


  const deleteToCart = (event) => {
    console.log(event, "jhjjgjhsdfsfsdgjgjhg")
    dispatch(deleteToCartURL(event.uuid))
    setSuc(true)
  }

  const [updateQnt, setUpdateQnt] = useState()
  const updateQntevnt = (event) => {
    setUpdateQnt(event)
    // console.log(event,"jhjjgjhsdfsfsdgjgjhg")
    // dispatch(deleteToCartURL(event.uuid))
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

          dispatch(CartListURL(ip))
          // history.push(({
          //   pathname: "/Cardcart",

          // }));
        }, 1000)

      }
      else if (notification.status === false) {
        toast.error(notification.message)
        setSuc(false)
      }
    }

  }, [notification])
  console.log(notification, "ProductDataProductData")



  const GuestCheckOut = () => {
    const payload = {
      "ip_address": ip

    }
    dispatch(CreateCheckOutGuestURL(payload,))
    setSuc(true)
  }
  const GuestCheckOut1 = () => {
    const payload = {
      "user_uuid" : currentUser.data.uuid
  }
    dispatch(CreateCheckOutURL(payload,currentUser.token))
    setSuc(true)
  }

  const CheckLogin = () => {
    if (currentUser && currentUser.data && currentUser.data.group === "consumer") {

      history.push(({
        // pathname: "/consumer/login",
        pathname: "/Checkout",
        state: {
          userType: "consumer"
        }
      }));
    }
    else {
      history.push(({
        pathname: "/consumer/login",
        // pathname: "Checkout",

      }));
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

          if (currentUser && currentUser.data && currentUser.data.group === "consumer") {

            history.push(({
              // pathname: "/consumer/login",
              pathname: "/Checkout",
              state: {
                userType: "consumer"
              }
            }));
          }
          else {
            history.push(({
              pathname: "/consumer/login",
              // pathname: "Checkout",
      
            }));
          }
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
        <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/Cards">
          <CsLineIcons icon="chevron-left" size="20" />
          <span className="align-middle text-medium ms-1 ">Card</span>
        </NavLink>
        <h1 className="mb-0 pb-0 display-4 mt-2" id="title">
          {title}
        </h1>
      </div>
      {/* Title End */}

      <Row>
        <Col xs="12" className="col-lg order-1 order-lg-0">
          {/* Items Start */}
          <h2 className="small-title">Items</h2>
          <div className="mb-5">
            {CartData && CartData.data && CartData.data.map((item) => {
              return <>
                <Card className="mb-2">
                  <Row className="g-0 sh-18 sh-md-14">

                    <Col className="position-relative h-100">
                      <Card.Body>
                        <Row className="h-100">
                          <Col md="6" lg={4} className="mb-2 mb-md-0 d-flex align-items-center">
                            <div className="pt-0 pb-0 pe-2">
                              <div className="h6 mb-0">
                                <Clamp tag="span" clamp="1">
                                  {item.product_name}
                                </Clamp>
                              </div>
                              {/* <div className="text-muted text-small">Whole Wheat</div>
                          <div className="mb-0 sw-19">$ 22.60</div> */}
                            </div>
                          </Col>
                          <Col xs="6" md="3" lg={4} className="pe-0 d-flex align-items-center" onClick={() => { updateQntevnt(item) }}>
                            <ItemCounter defVal={item.quantity} data={updateQnt} />
                          </Col>

                          <Col xs="6" md="3" lg={4} className="d-flex justify-content-end justify-content-md-start align-items-center">
                            <div className="h6 mb-0">₹ {item.product_price}</div>
                          </Col>
                        </Row>
                        <Button size="sm"
                          className="btn-icon btn-icon-only position-absolute t-2 e-2"
                          variant="foreground-alternate"
                          onClick={() => { deleteToCart(item) }}
                        >
                          <CsLineIcons icon="error-hexagon" />
                        </Button>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </>

            })}


          </div>
          {/* Items End */}

          {/* Worth Checking Start */}
          {/* <h2 className="small-title">Worth Checking</h2> */}
          {/* <Row className="g-2">
            <Col sm="6" xxl="3">
              <Card className="w-100 sh-19 sh-sm-25 hover-img-scale-up">
                <img src="/img/banner/cta-square-1.webp" className="card-img h-100 scale" alt="card image" />
                <div className="card-img-overlay d-flex flex-column justify-content-between bg-transparent">
                  <div className="d-flex flex-column h-100 justify-content-between align-items-start">
                    <div className="cta-2 text-black w-80">Seasoned Breads</div>
                    <Button variant="primary" className="btn-icon btn-icon-start stretched-link">
                      <CsLineIcons icon="chevron-right" /> <span>View</span>
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
            <Col sm="6" xxl="3">
              <Card className="w-100 sh-19 sh-sm-25 hover-img-scale-up">
                <img src="/img/banner/cta-square-2.webp" className="card-img h-100 scale" alt="card image" />
                <div className="card-img-overlay d-flex flex-column justify-content-between bg-transparent">
                  <div className="d-flex flex-column h-100 justify-content-between align-items-start">
                    <div className="cta-2 text-black w-80">Herbal and Vegan</div>
                    <Button variant="primary" className="btn-icon btn-icon-start stretched-link">
                      <CsLineIcons icon="chevron-right" /> <span>View</span>
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
            <Col sm="6" xxl="3">
              <Card className="w-100 sh-19 sh-sm-25 hover-img-scale-up">
                <img src="/img/banner/cta-square-3.webp" className="card-img h-100 scale" alt="card image" />
                <div className="card-img-overlay d-flex flex-column justify-content-between bg-transparent">
                  <div className="d-flex flex-column h-100 justify-content-between align-items-start">
                    <div className="cta-2 text-black w-80">Fruit Mixed Dough</div>
                    <Button variant="primary" className="btn-icon btn-icon-start stretched-link">
                      <CsLineIcons icon="chevron-right" /> <span>View</span>
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
            <Col sm="6" xxl="3">
              <Card className="w-100 sh-19 sh-sm-25 hover-img-scale-up">
                <img src="/img/banner/cta-square-4.webp" className="card-img h-100 scale" alt="card image" />
                <div className="card-img-overlay d-flex flex-column justify-content-between bg-transparent">
                  <div className="d-flex flex-column h-100 justify-content-between align-items-start">
                    <div className="cta-2 text-black w-80">Berries, Nuts and Sugar</div>
                    <Button variant="primary" className="btn-icon btn-icon-start stretched-link">
                      <CsLineIcons icon="chevron-right" /> <span>View</span>
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
          </Row> */}
          {/* Worth Checking End */}
        </Col>

        <Col xs="12" lg="auto" className="order-0 order-lg-1">
          <h2 className="small-title">Cart Totals</h2>
          <Card className="mb-5 w-100 sw-lg-35">
            <Card.Body>
              <div className="mb-4">
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">ITEMS</p>
                  <p>
                    <span className="text-alternate"> {CartData.count}</span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">TOTAL</p>
                  <p>
                    <span className="text-alternate">
                      <span className="text-small text-muted">₹</span>
                      {CartData.total_amount}
                    </span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">SHIPPING</p>
                  <p>
                    <span className="text-alternate">
                      <span className="text-small text-muted">₹</span>
                      0
                    </span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">SALE</p>
                  <p>
                    <span className="text-alternate">
                      <span className="text-small text-muted">₹</span>

                    </span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">GRAND TOTAL</p>
                  <div className="cta-2">
                    <span>
                      <span className="text-small text-muted cta-2">₹</span>
                      {CartData.total_amount}
                    </span>
                  </div>
                </div>
              </div>
              <Button className="btn-icon btn-icon-end w-100" variant="primary" onClick={GuestCheckOut}>
                <span>Proceed to checkout1</span> <CsLineIcons icon="chevron-right" />
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Cardcart;
