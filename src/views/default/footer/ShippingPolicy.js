import React, { useEffect } from "react";
import { Row, Col, } from 'react-bootstrap';

const ShippingPolicy = () => {
    // const scrollToTop = () => {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: "smooth",
    //     });
    // };
    // useEffect(()=>{
    //     scrollToTop()
    // })
    return (
        <>
            <div className="container">
                <Col className="termcondition">
                    <Col className="header-term">
                        {/* <Header /> */}
                        {/* <img src={Logo} alt="Logo" width="120px" height="auto" className='fluid-img'/>
            <h1>Shipping & Delivery Policy</h1> */}
                    </Col>
                    <div style={{ backgroundColor: "rgb(33 90 65 / 3%)", padding: "22px" }}>
                        <Col className="header-term1">
                            <center><h1><strong>SHIPPING POLICY</strong></h1></center>
                        </Col>

                        <Col>
                            <h4>Overview:</h4>
                        </Col>
                        <Col>
                            <p>iCafe is a food court ordering service that connects users with various merchants within a food court, providing a seamless experience for ordering and enjoying meals. Unlike traditional e-commerce platforms, iCafe does not involve shipping physical products. Instead, it facilitates the ordering and pickup or dine-in process for users.</p>
                        </Col>
                        <Col>
                            <h4>Order Placement:</h4>
                        </Col>
                        <Col>
                            <p>Users can browse through the available merchants and their menus on the iCafe platform. After selecting desired items, users can place an order through the iCafe app or website.</p>
                        </Col>
                        <Col>
                            <h4>Confirmation and Payment:</h4>
                        </Col>
                        <Col>
                            <p>Users will receive an order confirmation detailing the items, quantities, and total cost. Payments can be made securely through the iCafe platform.</p>
                        </Col>
                        <Col>
                            <h4>Order Fulfillment:</h4>
                        </Col>
                        <Col>
                            <p>Users will receive a notification when the order is ready. Users can collect their orders directly from the respective merchant's counter in the food court.</p>
                        </Col>
                        <Col>
                            <h4>Delivery:</h4>
                        </Col>
                        <Col>
                            <p>iCafe does not provide a delivery service. All orders are fulfilled through pickup or on-site dining at the chosen food court location.</p>
                        </Col>
                        <Col>
                            <h4>Order Modifications and Cancellations:</h4>
                        </Col>
                        <Col>
                            <p>Users may modify or cancel orders within a specific timeframe, as indicated in the iCafe app or website.</p>
                            <p>Modifications and cancellations are subject to the policies of individual merchants.</p>
                        </Col>
                        <Col>
                            <h4>Refunds:</h4>
                        </Col>
                        <Col>
                            <p>Refunds for canceled orders will be processed in accordance with the iCafe Refund Policy.</p>
                            <p>Refunds will be credited back to the original payment method.</p>
                        </Col>
                        <Col>
                            <h4>Contact Information:</h4>
                        </Col>
                        <Col>
                            <p>For any inquiries regarding orders, users can contact iCafe customer support at icafe@mistaeats.com.</p>
                        </Col>
                        <Col>
                            <h4>Policy Updates:</h4>
                        </Col>
                        <Col>
                            <p>iCafe reserves the right to update, modify, or change the Shipping Policy. Users are encouraged to review the policy regularly for any updates.</p>
                        </Col>
                        <Col>
                            <h4>Effective Date:</h4>
                        </Col>
                        <Col>
                            <p>This Shipping Policy is effective as of 24-11-2023.</p>
                        </Col>
                    </div>

                </Col>
                <div>
                    {/* <Footer /> */}
                </div>
            </div>
        </>

    )
};

export default ShippingPolicy;