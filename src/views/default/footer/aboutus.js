import React, { useEffect } from "react";
import { Row, Col, } from 'react-bootstrap';

const Aboutus = () => {
    return (
        <>
            <div className="container">
                <Col className="termcondition">
                    <div style={{ backgroundColor: "rgb(33 90 65 / 3%)", padding: "22px" }}>
                        <Col className="header-term1">
                            <center><h1><strong>About Us</strong></h1></center>
                        </Col>

                        <Col>
                            <p>Mista proudly introduces iCafe, a revolutionary food court ordering application designed for corporate individuals seeking a seamless dining experience. This innovative app enables users to conveniently order from diverse vendors within their cafeteria, streamlining the entire process. iCafe promotes contactless ordering, empowering users to place orders effortlessly and efficiently, especially during the bustling peak lunch hours. By eliminating the need for physical queues, iCafe not only saves time for busy professionals but also enhances safety by minimizing contact points. Merging convenience with modern technology, iCafe is set to redefine corporate dining, offering a time-saving and hygienic solution for those looking to enjoy a diverse array of culinary options within the workplace.</p>
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

export default Aboutus;