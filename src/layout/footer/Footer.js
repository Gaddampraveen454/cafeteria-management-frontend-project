import React, { useEffect } from 'react';
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';

const Footer = () => {
  useEffect(() => {
    document.documentElement.setAttribute('data-footer', 'true');
    return () => {
      document.documentElement.removeAttribute('data-footer');
    };
  }, []);

  return (
    <footer>
      <div className="footer-content">
        <Container className='mt-3 pb-5'>
          <Row >
            {/* align="center" */}
            <Col xs="12" sm="4" >
              <p className="mb-0 text-muted text-medium">Developed & Maintained  By Sciens Technologies</p>
            </Col>
            <Col xs="12" sm="3"  >
              <p className="mb-0 text-muted text-medium center"><a href='/termsconditions' target='_blank'>Terms and Conditions</a></p>
            </Col>
            <Col xs="12" sm="3"  >
              <p className="mb-0 text-muted text-medium"><a href='/shippingpolicy' target='_blank'>Shipping Policy</a></p>
            </Col>
            {/* className="d-none d-sm-block" */}
            {/* <Col xs="12" sm="4"  > */}
            {/* <p className="mb-0 text-muted text-medium center">© 2023 All Rights Reserved </p> */}
            {/* <p className="mb-0 text-muted text-medium center"><a href='/termsconditions' target='_blank'>Terms and Conditions</a></p> */}
            {/* <Breadcrumb className="pt-0 pe-0 mb-0 float-end">
                <Breadcrumb.Item className="mb-0 text-medium" href="#/" linkProps={{ className: 'btn-link' }}>
                  Review
                </Breadcrumb.Item>
                <Breadcrumb.Item className="mb-0 text-medium" href="#/" linkProps={{ className: 'btn-link' }}>
                  Purchase
                </Breadcrumb.Item>
                <Breadcrumb.Item className="mb-0 text-medium" href="#/" linkProps={{ className: 'btn-link' }}>
                  Docs
                </Breadcrumb.Item>
              </Breadcrumb> */}
            {/* </Col> */}
            {/* className="d-none d-sm-block" */}
            {/* <Col xs="12" sm="4"  >
              <p className="mb-0 text-muted text-medium"><a href='/refund' target='_blank'>Refund Policy</a></p>
            </Col> */}







            <Col xs="4" sm="2"  >
              <p className="mb-0 text-muted text-medium"><a href='/privacy' target='_blank'>Privacy Policy</a></p>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="4"  >
              <p className="mb-0 text-muted text-medium">Branded & Market By Zeonova Technology</p>
              {/* <p className="mb-0 text-muted text-medium"><a href='/shippingpolicy' target='_blank'>Shipping policy</a></p> */}
            </Col>
            <Col xs="3" sm="3"  >
              <p className="mb-0 text-muted text-medium"><a href='/refund' target='_blank'>Refund Policy</a></p>
            </Col>
            <Col xs="4" sm="3"  >
              <p className="mb-0 text-muted text-medium"><a href='/about' target='_blank'>About Us</a></p>
            </Col>
            <Col xs="4" sm="2"  >
              <p className="mb-0 text-muted text-medium"><a href='/contact' target='_blank'>Contact Us</a></p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
