import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CartListURL, deleteToCartURL, updateCartURL } from 'Redux/ConsumerRedux/Cart/CartRedux';
import { CreateCheckOutURL, CreateCheckOutGuestURL } from 'Redux/ConsumerRedux/Checkout/CheckoutRedux';
import { IpAddressDataURL } from 'Redux/ConsumerRedux/IpAddressRedux/IpAddress';
import { Row, Col, Card, Button } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import Clamp from 'components/clamp/index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import Slider from 'react-slick';
import QRCode from "react-qr-code";
import axios from 'axios';
// import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from "react-simply-carousel";
// import ItemCounter from '../storefront/cart/components/ItemCounter';



const OrderSuccessPage = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const location = useLocation();
  console.log(location, "vvgdgfdgdgddf")
  const title = 'Order Success';
  const description = 'Ecommerce Storefront Cart Page';
  const { currentUser, isLogin } = useSelector((state) => state.auth);

  // const companyId = localStorage.getItem('companyId');
  let companyId = '';
  useEffect(() => {
    companyId = localStorage.getItem('companyId')
  }, [localStorage.getItem('companyId')])

  const [activeSlide, setActiveSlide] = useState(0);

  const handleBack = () => {
    if (currentUser && currentUser.data && currentUser.data.group === "consumer") {

      history.push(({
        // pathname: "/consumer/login",
        pathname: "/order",
        // state: {
        //   userType: "consumer"
        // }
      }));
    }
    else {
      history.push(({
        pathname: `/menu/company/${companyId}`,
        // pathname: "Checkout",

      }));
    }

  }

  const handleDownload = () => {
    window.print();

  };




  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title Start */}
      <div className="page-title-container">
        <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back"
          to={`/menu/${companyId}`}
        >
          <CsLineIcons icon="chevron-left" size="20" />
          <span className="align-middle text-medium ms-1 ">Menu</span>
        </NavLink>
        <h1 className="mb-0 pb-0 display-4 mt-2" id="title">
          {title}
        </h1>
      </div>
      {/* Title End */}

      <Row>
        <Col xs="12" lg="12" className="order-0 order-lg-1">
          <h2 className="small-title">Order Placed</h2>
          <Card
            style={{ width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}
          >
            <Card.Body>
              <div className="mb-4">
                <div className="mb-2">
                  <div >
                    <CsLineIcons icon="check-circle" size="45" />
                  </div>
                  <h3 >
                    Order Placed Successfully
                  </h3>
                  <h5
                  >
                    Order Id : {location && location.state && location.state.message}
                  </h5>
                  {/* <h5>
                    Token Number : {location?.state?.data.map((item) => {
                      return (item?.token_no)
                    })}
                  </h5> */}
                </div>
              </div>
              <Row style={{ padding: '0px' }}>
                <Col lg="12" md="12">



                  {/* {location?.state?.data?.length > 0 && (
                    <Carousel showThumbs={false} showStatus={false} showArrows={false} interval={2000} infiniteLoop>
                      {location.state.data.map((items, index) => (
                        <div key={index}>
                          <QRCode
                            size={200}
                            value={`${process.env.REACT_APP_WEB_APP_URL}/scanorderdetails/${items?.uuid}`}
                          />
                        </div>
                      ))}
                    </Carousel>
                  )} */}


                  {location?.state?.data?.length > 0 && (
                    <Carousel
                      containerProps={{
                        style: {
                          width: "100%",
                          justifyContent: "center",
                          userSelect: "none"
                        }
                      }}
                      showArrows={false}
                      preventScrollOnSwipe
                      swipeTreshold={60}
                      activeSlideIndex={activeSlide}
                      activeSlideProps={{
                        style: {
                          background: "blue"
                        }
                      }}
                      onRequestChange={setActiveSlide}
                      forwardBtnProps={{
                        children: ">",
                        style: {
                          height: 16,
                          width: 16,
                          borderRadius: "50%",
                          border: 0,
                          marginTop: "30%",
                          marginLeft: "10px"
                        },
                        activeItemBtnProps: {
                          background: "red"
                        }
                      }}
                      backwardBtnProps={{
                        children: "<",
                        style: {
                          height: 16,
                          width: 16,
                          borderRadius: "50%",
                          border: 0,
                          marginTop: "30%",
                          marginRight: "10px"
                        },
                        activeItemBtnProps: {
                          background: "red"
                        }
                      }}
                      dotsNav={{
                        show: true,
                        itemBtnProps: {
                          style: {
                            height: 16,
                            width: 16,
                            borderRadius: "50%",
                            border: 0,
                            margin: "20px",
                            backgroundColor: "#eb9cb0"
                          }
                        },
                        activeItemBtnProps: {
                          style: {
                            height: 16,
                            width: 16,
                            borderRadius: "50%",
                            border: 0,
                            background: "#ed6789",
                            margin: "20px"
                          }
                        }
                      }}

                      itemsToShow={1}
                      speed={300}
                      centerMode
                    >

                      {location.state.data.map((items, index) => (
                        <>
                          <div key={index}>
                            <div>Store Name : {items?.store_name}</div>
                            <div>Token No: {items?.token_no}</div>
                            <br />
                            <QRCode
                              size={200}
                              value={`${process.env.REACT_APP_WEB_APP_URL}/scanorderdetails/${items?.uuid}`}
                            />
                          </div>
                        </>
                      ))}
                    </Carousel>
                  )}


                </Col>
              </Row>
              <br />
              {/* <div style={{ alignItems: "center" }}>
                <Button variant="outline-primary"
                  className='btn-icon btn-icon-end w-100'
                  onClick={handleDownload}>
                  <CsLineIcons icon="print" /> <span>Print</span>
                </Button>
              </div> */}
              <br />
              <Button className="btn-icon btn-icon-end w-100" variant="primary" onClick={handleBack}>
                <CsLineIcons icon="chevron-left" />
                {currentUser && currentUser.data && currentUser.data.group === "consumer" ?
                  <span>Back to Order Page </span> :
                  <span>Back to Menu </span>
                }
              </Button>

             

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderSuccessPage;
