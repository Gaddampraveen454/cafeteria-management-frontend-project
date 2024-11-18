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
                        <Row>
                            <Col>
                                <center><h1><strong>Address : </strong></h1></center>
                                <center><h4>4th Floor, Plot no. 57, <br /> Dwaraka Central Building,<br /> Hitech City Rd, VIP Hills,<br /> Jaihind Enclave, Madhapur, Hyderabad,<br /> Telangana 500081.</h4></center>
                            </Col>
                            <Col>
                                <center><h1><strong>Mobile : </strong></h1></center>
                                <center><h4>9206884884</h4></center>
                            </Col>
                            <Col>
                                <center><h1><strong>Email : </strong></h1></center>
                                <center><h4>icafe@mistaeats.com</h4></center>
                            </Col>
                        </Row>
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