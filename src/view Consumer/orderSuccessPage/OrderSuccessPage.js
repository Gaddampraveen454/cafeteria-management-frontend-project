import React, { useEffect, useState } from 'react';
import { NavLink, useHistory,useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CartListURL, deleteToCartURL, updateCartURL } from 'Redux/ConsumerRedux/Cart/CartRedux';
import { CreateCheckOutURL,CreateCheckOutGuestURL } from 'Redux/ConsumerRedux/Checkout/CheckoutRedux';
import { IpAddressDataURL } from 'Redux/ConsumerRedux/IpAddressRedux/IpAddress';
import { Row, Col, Card, Button } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import Clamp from 'components/clamp/index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import axios from 'axios';
// import ItemCounter from '../storefront/cart/components/ItemCounter';



const OrderSuccessPage = () => {
  const dispatch = useDispatch()
  const history = useHistory();  
  const location = useLocation();
  console.log(location,"vvgdgfdgdgddf")
  const title = 'Order Success';
  const description = 'Ecommerce Storefront Cart Page';
  const { currentUser, isLogin } = useSelector((state) => state.auth);

  const companyId = localStorage.getItem('companyId');
 



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
        pathname: `/menu/${companyId}`,
        // pathname: "Checkout",

      }));
    }

  }






 
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
          // className="mb-5 w-100 sw-lg-50"
          style={{width:"100%", height:"100%"}}
          >
            <Card.Body>
              <div className="mb-4">
                
                
                
               
                <div className="mb-2">
                  {/* <p className="large-small ">Your Order has been plased successfully</p> */}
                  <h2 className="small-title" 
                  // style={{fontSize:"35px"}}
                  >{location && location.state && location.state.message}</h2>
                </div>
              </div>
              <br/>
              <Button className="btn-icon btn-icon-end w-100" variant="primary" onClick={handleBack}>
               <CsLineIcons icon="chevron-left" />
               {currentUser && currentUser.data && currentUser.data.group === "consumer"?
               <span>back to order Page </span> :
               <span>back to menu </span> 
               }
              </Button>
              {/* <Button className="btn-icon btn-icon-end " variant="primary" onClick={handleBack}>
               <CsLineIcons icon="chevron-left" /> <span>back to order Page </span> 
              </Button> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderSuccessPage;
