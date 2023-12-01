import React, { useEffect } from "react";
import { Row, Col, } from 'react-bootstrap';

const Contactus = () => {
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
                            <center><h1><strong>Contact Us</strong></h1></center>
                        </Col>

                        <Col>
                            <h1>Mobile
                            </h1>
                            <h4>9206884884</h4>
                            <h1>Email</h1>
                            <h4>icafe@mistaeats.com</h4>
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

export default Contactus;