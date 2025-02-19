import React, { useEffect } from "react";
import { Row, Col, } from 'react-bootstrap';

const TermCondition = () => {
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
            <div className="container" >
                <Col className="termcondition" >
                    <Col >
                        {/* <img src={Logo} alt="Logo" width="120px" height="auto" className='fluid-img'/>
            <h1>TERMS & CONDITIONS</h1> */}

                    </Col>
                    <div style={{ backgroundColor: "rgb(33 90 65 / 3%)", padding: "22px" }}>
                        <center><h1><strong>Terms and Conditions</strong></h1></center>
                        <Col>
                            <p>This website and associated services are operated by iCafe. Throughout the site, the terms "we," "us," and "our" refer to iCafe. iCafe offers this website, including all information, tools, and services available from this site, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here. By visiting <a href="https://www.icafe.co.in" rel="noreferrer" target="_blank">https://www.icafe.co.in</a> and/or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions.</p>
                        </Col>
                        <Col>
                            <p>Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.</p>
                        </Col>
                        <Col>
                            <p>Any new features or tools added to the current website shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change, or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.</p>
                        </Col>
                        <Col>
                            <h4>PURCHASES</h4>
                        </Col>
                        <Col>
                            <p>We are committed to ensuring that the Service we provide is as useful and efficient as possible. For that reason, we reserve the right to make changes to the website or services, or to charge for its services, at any time and for any reason. We will never charge you for the Services without making it very clear to you exactly what you're paying for.</p>
                        </Col>
                        <Col>
                            <p>If you wish to purchase any restaurant services from merchants available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase, including, without limitation, email address, mobile number, name, the number of people included in the restaurant order, and comments on your experience.</p>
                        </Col>
                        <Col>
                            <h4>WEBSITE USAGE</h4>
                        </Col>
                        <Col>
                            <p>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.</p>
                        </Col>
                        <Col>
                            <p>You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).</p>
                        </Col>
                        <Col>
                            <p>You must not transmit any worms or viruses or any code of a destructive nature. Our Service stores and processes personal data that you have provided to us so that you can process your food orders. It is your responsibility to keep your access secure. A breach or violation of any of the Terms will result in an immediate termination of your Services.</p>
                        </Col>
                        <Col>
                            <h4>GENERAL CONDITIONS</h4>
                        </Col>
                        <Col>
                            <p>We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (excluding credit card information) may be transferred unencrypted and involve transmissions over various networks. Credit card information is always encrypted during transfer over networks.</p>
                        </Col>
                        <Col>
                            <p>You should be aware that there are certain things that our Service will not take responsibility for. The website requires an active internet connection for certain functions, and you are responsible for associated charges. If you are not the bill payer for the device, ensure you have permission. You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service without express written permission.</p>
                        </Col>
                        <Col>
                            <p>The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.</p>
                        </Col>
                        <Col>
                            <h4>ACCURACY, COMPLETENESS, AND TIMELINESS OF INFORMATION</h4>
                        </Col>
                        <Col>
                            <p>We are not responsible if information made available on this site is not accurate, complete, or current. The material on this site is provided for general information only and should not be relied upon for making decisions without consulting primary, more accurate sources of information. This site may contain certain historical information, provided for reference only. We reserve the right to modify the contents of this site at any time.</p>
                        </Col>
                        <Col>
                            <h4>MODIFICATIONS TO THE SERVICE AND PRICES</h4>
                        </Col>
                        <Col>
                            <p>Prices for our products are subject to change without notice. We reserve the right to modify or discontinue the Service without notice. We may take steps to improve the usability and functionality of the website. The mobile application is available on Android, iOS, and web-browsers. Requirements may change, and updates may be necessary for continued use. We may terminate the app at any time without notice.</p>
                        </Col>
                        <Col>
                            <p>We shall not be liable for any modification, price change, suspension, or discontinuance of the Service.</p>
                        </Col>
                        <Col>
                            <h4>PRODUCTS OR SERVICES</h4>
                        </Col>
                        <Col>
                            <p>Certain products or services may be available exclusively online through the website. These products or services may have limited quantities. We have made every effort to display colors and images accurately.</p>
                        </Col>
                        <Col>
                            <p>We reserve the right to limit the sales of our products or services to any person, geographic region, or jurisdiction. We may exercise this right on a case-by-case basis. We do not warrant that the quality of any products or services will meet your expectations.</p>
                        </Col>
                        <Col>
                            <h4>ACCURACY OF BILLING AND ACCOUNT INFORMATION</h4>
                        </Col>
                        <Col>
                            <p>We reserve the right to refuse any order you place with us. We may limit or cancel quantities purchased per person, per household, or per order. You agree to provide current, complete, and accurate purchase and account information.</p>
                        </Col>
                        <Col>
                            <p>For more detail, please review our Refund Policy.</p>
                        </Col>
                        <Col>
                            <h4>OPTIONAL TOOLS</h4>
                        </Col>
                        <Col>
                            <p>We may provide access to third-party tools over which we have no control. We provide access to such tools "as is" and "as available" without any warranties. We shall have no liability arising from or relating to your use of optional third-party tools.</p>
                        </Col>
                        <Col>
                            <h4>THIRD-PARTY LINKS</h4>
                        </Col>
                        <Col>
                            <p>Certain content, products, and services available via our Service may include materials from third-parties. Third-party links on this site may direct you to websites that are not affiliated with us. We are not responsible for examining or evaluating the content of third-party materials.</p>
                        </Col>
                        <Col>
                            <h4>USER COMMENTS, FEEDBACK, AND OTHER SUBMISSIONS</h4>
                        </Col>
                        <Col>
                            <p>If you send specific submissions or creative ideas, you agree that we may, at any time, edit, copy, publish, distribute, translate, and otherwise use any comments you forward to us. We may monitor, edit, or remove content that we determine in our sole discretion violates these Terms.</p>
                        </Col>
                        <Col>
                            <h4>PERSONAL INFORMATION</h4>
                        </Col>
                        <Col>
                            <p>Your submission of personal information through the store is governed by our Privacy Policy.</p>
                        </Col>
                        <Col>
                            <h4>ERRORS, INACCURACIES, AND OMISSIONS</h4>
                        </Col>
                        <Col>
                            <p>We are not responsible for information on our site that contains errors, inaccuracies, or omissions. We reserve the right to correct any errors, inaccuracies, or omissions without notice.</p>
                        </Col>
                        <Col>
                            <h4>PROHIBITED USES</h4>
                        </Col>
                        <Col>
                            <p>You are prohibited from using the site for any unlawful purpose or to violate any laws. We reserve the right to terminate your use of the Service for violating any prohibited uses.</p>
                        </Col>
                        <Col>
                            <h4>DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY</h4>
                        </Col>
                        <Col>
                            <p>We do not guarantee that your use of our service will be uninterrupted, timely, secure, or error-free. We do not warrant that the results obtained from the use of the service will be accurate or reliable.</p>
                        </Col>
                        <Col>
                            <p>You agree that your use of the service is at your sole risk. The service and all products and services are provided "as is" and "as available." We shall not be liable for any direct, indirect, incidental, punitive, special, or consequential damages arising from your use of the service.</p>
                        </Col>
                        <Col>
                            <h4>INDEMNIFICATION</h4>
                        </Col>
                        <Col>
                            <p>You agree to indemnify and hold us harmless from any claim or demand, including reasonable attorneys' fees, arising from your breach of these Terms.</p>
                        </Col>
                        <Col>
                            <h4>TERMINATION</h4>
                        </Col>
                        <Col>
                            <p>The obligations of the parties incurred before the termination date shall survive the termination of this agreement. These Terms of Service are effective unless terminated by either party. We may terminate this agreement at any time without notice.</p>
                        </Col>
                        <Col>
                            <h4>ENTIRE AGREEMENT</h4>
                        </Col>
                        <Col>
                            <p>These Terms of Service constitute the entire agreement and understanding between you and us, superseding any prior agreements.</p>
                        </Col>
                        <Col>
                            <h4>GOVERNING LAW</h4>
                        </Col>
                        <Col>
                            <p>These Terms of Service shall be governed by and construed in accordance with the laws of India and jurisdiction of Hyderabad, Telangana.</p>
                        </Col>
                        <Col>
                            <h4>CHANGES TO TERMS OF SERVICE</h4>
                        </Col>
                        <Col>
                            <p>You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change, or replace any part of these Terms of Service.</p>
                        </Col>
                        <Col>
                            <h4>CONTACT INFORMATION</h4>
                        </Col>
                        <Col>
                            <p>Questions about the Terms of Service should be sent to us at<strong> icafe@mistaeats.com.</strong></p>
                        </Col>
                    </div>

                </Col>
                {/* <Footer  style={{position:"sticky"}}/> */}
            </div>
        </>

    )
};

export default TermCondition;