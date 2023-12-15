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

  const [activeSlide, setActiveSlide] = useState('');

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



  // const carouselItems = [
  //   'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample5.jpg',
  //   'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample5.jpg',
  //   'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample3.jpg',
  //   'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample5.jpg',
  //   'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample5.jpg',
  //   'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample3.jpg',
  //   // Add more image URLs as needed
  // ];

  // const [currentIndex, setCurrentIndex] = useState(0);

  // const goToPrevious = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1));
  // };

  // const goToNext = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1));
  // };



  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title Start */}
      <div className="page-title-container">
        <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back"
          // to={`/menu/${companyId}`}
          to='/menu/company/qr'
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
              <Row >
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
                  {/* <div className="carousel">
                    <button type="button" onClick={goToPrevious}>&lt; Previous</button>
                    <div className="carousel-content">
                      <img src={carouselItems[currentIndex]} alt={`item ${currentIndex}`} />



                      {location.state.data.map((items, index) => {
                        console.log(items, "hjdfdksjhfkdjs")
                        return (
                          <div key={index}>
                            {items?.store_name}<br />
                            {items?.token_no}
                            <br />
                            <QRCode
                              size={200}
                              index
                              value={`${process.env.REACT_APP_WEB_APP_URL}/scanorderdetails/${items?.uuid}`}
                            />
                          </div>
                        )
                      })}


                    </div>
                    <button type="button" onClick={goToNext}>Next &gt;</button>
                  </div> */}
                  <br />
                  <br />
                  <br />
                  {/* {location?.state?.data?.length > 0 && ( */}
                  <Carousel
                    containerProps={{
                      style: {
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center"
                        // userSelect: "none"
                      }
                    }}
                    onRequestChange={(index) => setActiveSlide(index)}
                    preventScrollOnSwipe
                    swipeTreshold={60}
                    activeSlideIndex={activeSlide}
                    activeSlideProps={{
                      style: {
                        background: "white"
                      }
                    }}
                    // onRequestChange={setActiveSlide}
                    forwardBtnProps={{
                      children: ">",
                      style: {
                        height: 16,
                        width: 16,
                        borderRadius: "50%",
                        border: 0,
                        marginTop: "30%",
                        marginLeft: "10px"
                      }
                      // activeItemBtnProps: {
                      //   background: "red"
                      // }
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
                      }
                      // activeItemBtnProps: {
                      //   background: "red"
                      // }
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
                    {location.state.data.map((items, index) => {
                      console.log(items, "hjdfdksjhfkdjs")
                      return (
                        <div key={index}>
                          {items?.store_name}<br />
                          {items?.token_no}
                          <br />
                          <Row className="g-3 " key=''>
                            <Col xs="9" lg="9" className="d-flex flex-column mb-lg-0 pe-3 d-flex mb-4">
                              <div className="text-muted text-medium cursor-pointer">PRODUCT NAME:</div>
                              {items?.details?.length > 0 && items?.details?.map((item, ind) => {
                                console.log(item, 'hcbghefyef')
                                return (
                                  <div key={ind}>{item?.name?.length > 18 ? `${item?.name.slice(0, 18)}..` : item?.name}</div>
                                )
                              })}
                            </Col>
                            <Col xs="3" lg="3" className="d-flex flex-column mb-lg-0 pe-3 d-flex mb-4">
                              <div className="text-muted text-medium cursor-pointer ">QTY:</div>
                              {items?.details?.length > 0 && items?.details?.map((item, i) => {
                                console.log(item, 'hcbghefyef')
                                return (
                                  <div key={i}>{item?.quantity}</div>
                                )
                              })}
                            </Col>
                          </Row>
                          <br />
                          <QRCode
                            size={200}
                            value={`${process.env.REACT_APP_WEB_APP_URL}/scanorderdetails/${items?.uuid}`}
                          />
                        </div>
                      )
                    })}
                  </Carousel>
                  {/* )} */}


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
      </Row >
    </>
  );
};

export default OrderSuccessPage;
