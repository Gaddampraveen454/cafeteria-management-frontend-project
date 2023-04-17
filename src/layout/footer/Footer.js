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
        <Container>
          <Row>
            <Col xs="12" sm="4" align="center">
              <p className="mb-0 text-muted text-medium">Developed & Maintained <br/> By 
              <br/> Sciens Technologies</p>
            </Col>

            <Col xs="12" sm="4" className="d-none d-sm-block " align="center">
            <p className="mb-0 text-muted text-medium center">© 2023 All Rights Reserved </p>
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
            </Col>
            <Col xs="12" sm="4" className="d-none d-sm-block" align="center">
            <p className="mb-0 text-muted text-medium">Branded & Market <br/> By <br/> Zeonova Tech</p>
            
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
