import React, { useEffect } from "react";
import { Row, Col, } from 'react-bootstrap';

const RefundReturns = () => {
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
                        {/* <img src={Logo} alt="Logo" width="120px" height="auto" className='fluid-img'/>
            <h1>Refund and Returns Policy</h1> */}
                        {/* <Header /> */}
                    </Col>
                    <div style={{ backgroundColor: "rgb(33 90 65 / 3%)", padding: "22px" }}>
                        <center><h1><strong>Refund & Return Policy</strong></h1></center>


                        <Col className="mt-5">
                            <h4>Refund Policy</h4>
                        </Col>
                        <Col className="mt-5">
                            <p>You are eligible for a reimbursement solely if you make a pre-payment for your order when placing it through the Services, under the following conditions:</p>
                            <p>(i) the restaurant cancels your order due to the unavailability of the items you selected, or</p>
                            <p>(ii) the restaurant is incapable of processing your order for any reason.</p>
                        </Col>
                        {/* <Col>
                            <h4>Definitions</h4>
                        </Col> */}
                        <Col className="mt-5">
                            <p>The determination of refunds rests solely at our discretion and is deemed final and binding. Reimbursements for canceled orders or items to be processed within 24 hours will be credited back to your payment method within 4 to 5 business days.</p>
                        </Col>
                    </div>
                </Col>
                {/* <Footer /> */}
            </div>
        </>

    )
};

export default RefundReturns;