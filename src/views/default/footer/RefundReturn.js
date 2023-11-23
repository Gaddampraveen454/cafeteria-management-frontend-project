import React,{useEffect} from "react";
import { Row, Col,  } from 'react-bootstrap';

const RefundReturns = () =>{
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
            {/* <img src={Logo} alt="Logo" width="120px" height="auto" className='fluid-img'/>
            <h1>Refund and Returns Policy</h1> */}
            {/* <Header /> */}
            </Col>
            <div style={{backgroundColor: "rgb(33 90 65 / 3%)" , padding: "22px"}}>
            <center><h1>Refund & Return Policy</h1></center>
            <Col>
            <p>Thank you for shopping at Mista Eats.</p>
            </Col>

            <Col>
                <h4>Interpretation</h4>
            </Col>
            <Col>
                <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
            </Col>
            <Col>
                <h4>Definitions</h4>
            </Col>
            <Col>
                <ul>
                    <li>Company (referred to as either “the Company”, “We”, “Us” or “Our” in this Agreement) refers to <strong>Mista Eats, Flat No 1B, Sri Teja Residency, Rd No 7, Madhapur, Telangana 500081.</strong></li>
                    <li>Goods refer to the items offered for sale on the Service.</li>
                    <li>Orders mean a request by You to purchase Goods from Us.</li>
                    <li>Service refers to the Website.</li>
                    <li>Website refers to Mista Eats, accessible from <strong>www.mistaeats.com</strong>
                    </li>
                    <li>You means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
                </ul>
            </Col>
            <Col>
                <h4>Your Order Cancellation Rights</h4>
            </Col>
            
            <Col>
                <ul>
                    <li>You are entitled to cancel Your Order within 7 days without giving any reason for doing so.</li>
                    <li>The deadline for cancelling an Order is 7 days from the date on which You received the Goods or on which a third party you have appointed, who is not the carrier, takes possession of the product delivered.</li>
                    <li>In order to exercise Your right of cancellation, You must inform Us of your decision by means of a clear statement. You can inform us of your decision by, visiting this page on our website: Mistaeats</li>
                    <li>We will reimburse You no later than 14 days from the day on which We receive the returned Goods. We will use the same means of payment as You used for the Order, and You will not incur any fees for such reimbursement.</li>
                </ul>
            </Col>
            
            <Col>
                <h4>Conditions for Returns</h4>
            </Col>
            <Col>
            <p>In order for the Goods to be eligible for a return, please make sure that:</p>
            </Col>
            <Col>
                <ul>
                    <li>The Goods were purchased in the last 7 days</li>
                    <li>The Goods are in the original packaging</li>
                </ul>
            </Col>
            <Col>
                <p>The following Goods cannot be returned:</p>
            </Col>
            <Col>
            <ul>
                    <li>The supply of Goods made to Your specifications or clearly personalized.</li>
                    <li>The supply of Goods which according to their nature are not suitable to be returned, deteriorate rapidly or where the date of expiry is over.</li>
                    <li>The supply of Goods which are not suitable for return due to health protection or hygiene reasons and were unsealed after delivery.</li>
                    <li>The supply of Goods which are, after delivery, according to their nature, inseparably mixed with other items.</li>
             </ul>
            </Col>
            <Col>
            <p>We reserve the right to refuse returns of any merchandise that does not meet the above return conditions in our sole discretion.Only regular priced Goods may be refunded. Unfortunately, Goods on sale cannot be refunded. This exclusion may not apply to You if it is not permitted by applicable law.</p>
            </Col>
            <Col>
                <h4>Returning Goods</h4>
            </Col>
            <Col>
                <p>You are responsible for the cost and risk of returning the Goods to Us. You should send the Goods at the following address:</p>
            </Col>
            <Col>
                <p><strong>Flat No 1B, Sri Teja Residency, Rd No 7, Madhapur, Telangana 500081</strong></p>
            </Col>
            
            <Col>
            <p>We cannot be held responsible for Goods damaged or lost in return shipment. Therefore, We recommend an insured and trackable mail service. We are unable to issue a refund without actual receipt of the Goods or proof of received return delivery.</p>
            </Col>
            <Col>
            <h4>Gifts</h4>
            </Col>
            
            <Col>
                <p>If the Goods were marked as a gift when purchased and then shipped directly to you, You’ll receive a gift credit for the value of your return. Once the returned product is received, a gift certificate will be mailed to You.</p>
            </Col>
            <Col>
            <p>If the Goods weren’t marked as a gift when purchased, or the gift giver had the Order shipped to themselves to give it to You later, We will send the refund to the gift giver.</p>
            </Col>

            <Col>
            <h4>Contact Us</h4>
            </Col>
            <Col>
            <p>If you have any questions about our Returns and Refunds Policy, please contact us, by visiting this page on our website: Mistaeats</p>
            </Col>
            </div>
        </Col>
        {/* <Footer /> */}
        </div>
        </>

    )
};

export default RefundReturns;