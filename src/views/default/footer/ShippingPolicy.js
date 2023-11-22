import React,{useEffect} from "react";
import { Row, Col,  } from 'react-bootstrap';

const ShippingPolicy = () =>{
    // const scrollToTop = () => {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: "smooth",
    //     });
    // };
    // useEffect(()=>{
    //     scrollToTop()
    // })
    return(
        <>
         <div className="container">
        <Col className="termcondition">
            <Col className="header-term">
                {/* <Header /> */}
            {/* <img src={Logo} alt="Logo" width="120px" height="auto" className='fluid-img'/>
            <h1>Shipping & Delivery Policy</h1> */}
            </Col>
            <div style={{backgroundColor: "rgb(33 90 65 / 3%)", padding: "22px"}}>
            <Col className="header-term1">
            <center><h1>Shipping & Delivery Policy</h1></center>
            </Col>

            <Col>
                <p><strong>Last updated on Nov 10th 2022</strong></p>
            </Col>
            <Col>
                <p>For International buyers, orders are shipped and delivered through registered international courier companies and/or International speed post only. For domestic buyers, orders are shipped through registered domestic courier companies and /or speed post only. Orders are shipped within 0-2 days or as per the delivery date agreed at the time of order confirmation and delivering of the shipment subject to Courier Company / post office norms. Mista Foods is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within 0-2 days from the date of the order and payment or as per the delivery date agreed at the time of order confirmation. Delivery of all orders will be to the address provided by the buyer. Delivery of our services will be confirmed on your mail ID as specified during registration. For any issues in utilizing our services you may contact our helpdesk on 9206884884 or support@mistaeats.com</p>
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