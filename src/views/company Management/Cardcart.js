import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import Clamp from 'components/clamp/index';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import ItemCounter from '../storefront/cart/components/ItemCounter';

const Cardcart = () => {
  const title = 'Cart';
  const description = 'Ecommerce Storefront Cart Page';

  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title Start */}
      <div className="page-title-container">
        <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/Cards">
          <CsLineIcons icon="chevron-left" size="20" />
          <span className="align-middle text-medium ms-1 ">Card</span>
        </NavLink>
        <h1 className="mb-0 pb-0 display-4 mt-2" id="title">
          {title}
        </h1>
      </div>
      {/* Title End */}

      <Row>
        <Col xs="12" className="col-lg order-1 order-lg-0">
          {/* Items Start */}
          <h2 className="small-title">Items</h2>
          <div className="mb-5">
            <Card className="mb-2">
              <Row className="g-0 sh-18 sh-md-14">
                {/* <Col xs="auto">
                  <img src="/img/product/small/product-1.webp" className="card-img card-img-horizontal h-100 sw-9 sw-sm-13 sw-md-15" alt="thumb" />
                </Col> */}
                <Col className="position-relative h-100">
                  <Card.Body>
                    <Row className="h-100">
                      <Col md="6" lg={4} className="mb-2 mb-md-0 d-flex align-items-center">
                        <div className="pt-0 pb-0 pe-2">
                          <div className="h6 mb-0">
                            <Clamp tag="span" clamp="1">
                            Divine Combo
                            </Clamp>
                          </div>
                          {/* <div className="text-muted text-small">Whole Wheat</div>
                          <div className="mb-0 sw-19">$ 22.60</div> */}
                        </div>
                      </Col>
                      <Col xs="6" md="3" lg={4} className="pe-0 d-flex align-items-center">
                        <ItemCounter defVal="4" />
                      </Col>
                      <Col xs="6" md="3" lg={4} className="d-flex justify-content-end justify-content-md-start align-items-center">
                        <div className="h6 mb-0">₹ 124.20</div>
                      </Col>
                    </Row>
                    <Button size="sm" className="btn-icon btn-icon-only position-absolute t-2 e-2" variant="foreground-alternate">
                      <CsLineIcons icon="error-hexagon" />
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
            <Card className="mb-2">
              <Row className="g-0 sh-18 sh-md-14">
                {/* <Col xs="auto">
                  <img src="/img/product/small/product-1.webp" className="card-img card-img-horizontal h-100 sw-9 sw-sm-13 sw-md-15" alt="thumb" />
                </Col> */}
                <Col className="position-relative h-100">
                  <Card.Body>
                    <Row className="h-100">
                      <Col md="6" lg={4} className="mb-2 mb-md-0 d-flex align-items-center">
                        <div className="pt-0 pb-0 pe-2">
                          <div className="h6 mb-0">
                            <Clamp tag="span" clamp="1">
                            Roasted Almond Ice Cream
                            </Clamp>
                          </div>
                          {/* <div className="text-muted text-small">Whole Wheat</div>
                          <div className="mb-0 sw-19">$ 22.60</div> */}
                        </div>
                      </Col>
                      <Col xs="6" md="3" lg={4} className="pe-0 d-flex align-items-center">
                        <ItemCounter defVal="4" />
                      </Col>
                      <Col xs="6" md="3" lg={4} className="d-flex justify-content-end justify-content-md-start align-items-center">
                        <div className="h6 mb-0">₹ 556.44</div>
                      </Col>
                    </Row>
                    <Button size="sm" className="btn-icon btn-icon-only position-absolute t-2 e-2" variant="foreground-alternate">
                      <CsLineIcons icon="error-hexagon" />
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
            <Card className="mb-2">
              <Row className="g-0 sh-18 sh-md-14">
                {/* <Col xs="auto">
                  <img src="/img/product/small/product-1.webp" className="card-img card-img-horizontal h-100 sw-9 sw-sm-13 sw-md-15" alt="thumb" />
                </Col> */}
                <Col className="position-relative h-100">
                  <Card.Body>
                    <Row className="h-100">
                      <Col md="6" lg={4} className="mb-2 mb-md-0 d-flex align-items-center">
                        <div className="pt-0 pb-0 pe-2">
                          <div className="h6 mb-0">
                            <Clamp tag="span" clamp="1">
                            Tender Coconut Ice Cream
                            </Clamp>
                          </div>
                          {/* <div className="text-muted text-small">Whole Wheat</div>
                          <div className="mb-0 sw-19">$ 22.60</div> */}
                        </div>
                      </Col>
                      <Col xs="6" md="3" lg={4} className="pe-0 d-flex align-items-center">
                        <ItemCounter defVal="4" />
                      </Col>
                      <Col xs="6" md="3" lg={4} className="d-flex justify-content-end justify-content-md-start align-items-center">
                        <div className="h6 mb-0">₹ 864.98</div>
                      </Col>
                    </Row>
                    <Button size="sm" className="btn-icon btn-icon-only position-absolute t-2 e-2" variant="foreground-alternate">
                      <CsLineIcons icon="error-hexagon" />
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
            <Card className="mb-2">
              <Row className="g-0 sh-18 sh-md-14">
                {/* <Col xs="auto">
                  <img src="/img/product/small/product-1.webp" className="card-img card-img-horizontal h-100 sw-9 sw-sm-13 sw-md-15" alt="thumb" />
                </Col> */}
                <Col className="position-relative h-100">
                  <Card.Body>
                    <Row className="h-100">
                      <Col md="6" lg={4} className="mb-2 mb-md-0 d-flex align-items-center">
                        <div className="pt-0 pb-0 pe-2">
                          <div className="h6 mb-0">
                            <Clamp tag="span" clamp="1">
                            Alphonso Mango Ice Cream
                            </Clamp>
                          </div>
                          {/* <div className="text-muted text-small">Whole Wheat</div>
                          <div className="mb-0 sw-19">$ 22.60</div> */}
                        </div>
                      </Col>
                      <Col xs="6" md="3" lg={4} className="pe-0 d-flex align-items-center">
                        <ItemCounter defVal="4" />
                      </Col>
                      <Col xs="6" md="3" lg={4} className="d-flex justify-content-end justify-content-md-start align-items-center">
                        <div className="h6 mb-0">₹ 398.67</div>
                      </Col>
                    </Row>
                    <Button size="sm" className="btn-icon btn-icon-only position-absolute t-2 e-2" variant="foreground-alternate">
                      <CsLineIcons icon="error-hexagon" />
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
            <Card className="mb-2">
              <Row className="g-0 sh-18 sh-md-14">
                {/* <Col xs="auto">
                  <img src="/img/product/small/product-1.webp" className="card-img card-img-horizontal h-100 sw-9 sw-sm-13 sw-md-15" alt="thumb" />
                </Col> */}
                <Col className="position-relative h-100">
                  <Card.Body>
                    <Row className="h-100">
                      <Col md="6" lg={4} className="mb-2 mb-md-0 d-flex align-items-center">
                        <div className="pt-0 pb-0 pe-2">
                          <div className="h6 mb-0">
                            <Clamp tag="span" clamp="1">
                            Mixed Berries Ice Cream
                            </Clamp>
                          </div>
                          {/* <div className="text-muted text-small">Whole Wheat</div>
                          <div className="mb-0 sw-19">$ 22.60</div> */}
                        </div>
                      </Col>
                      <Col xs="6" md="3" lg={4} className="pe-0 d-flex align-items-center">
                        <ItemCounter defVal="4" />
                      </Col>
                      <Col xs="6" md="3" lg={4} className="d-flex justify-content-end justify-content-md-start align-items-center">
                        <div className="h6 mb-0">₹ 876.76</div>
                      </Col>
                    </Row>
                    <Button size="sm" className="btn-icon btn-icon-only position-absolute t-2 e-2" variant="foreground-alternate">
                      <CsLineIcons icon="error-hexagon" />
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </div>
          {/* Items End */}

          {/* Worth Checking Start */}
          {/* <h2 className="small-title">Worth Checking</h2> */}
          {/* <Row className="g-2">
            <Col sm="6" xxl="3">
              <Card className="w-100 sh-19 sh-sm-25 hover-img-scale-up">
                <img src="/img/banner/cta-square-1.webp" className="card-img h-100 scale" alt="card image" />
                <div className="card-img-overlay d-flex flex-column justify-content-between bg-transparent">
                  <div className="d-flex flex-column h-100 justify-content-between align-items-start">
                    <div className="cta-2 text-black w-80">Seasoned Breads</div>
                    <Button variant="primary" className="btn-icon btn-icon-start stretched-link">
                      <CsLineIcons icon="chevron-right" /> <span>View</span>
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
            <Col sm="6" xxl="3">
              <Card className="w-100 sh-19 sh-sm-25 hover-img-scale-up">
                <img src="/img/banner/cta-square-2.webp" className="card-img h-100 scale" alt="card image" />
                <div className="card-img-overlay d-flex flex-column justify-content-between bg-transparent">
                  <div className="d-flex flex-column h-100 justify-content-between align-items-start">
                    <div className="cta-2 text-black w-80">Herbal and Vegan</div>
                    <Button variant="primary" className="btn-icon btn-icon-start stretched-link">
                      <CsLineIcons icon="chevron-right" /> <span>View</span>
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
            <Col sm="6" xxl="3">
              <Card className="w-100 sh-19 sh-sm-25 hover-img-scale-up">
                <img src="/img/banner/cta-square-3.webp" className="card-img h-100 scale" alt="card image" />
                <div className="card-img-overlay d-flex flex-column justify-content-between bg-transparent">
                  <div className="d-flex flex-column h-100 justify-content-between align-items-start">
                    <div className="cta-2 text-black w-80">Fruit Mixed Dough</div>
                    <Button variant="primary" className="btn-icon btn-icon-start stretched-link">
                      <CsLineIcons icon="chevron-right" /> <span>View</span>
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
            <Col sm="6" xxl="3">
              <Card className="w-100 sh-19 sh-sm-25 hover-img-scale-up">
                <img src="/img/banner/cta-square-4.webp" className="card-img h-100 scale" alt="card image" />
                <div className="card-img-overlay d-flex flex-column justify-content-between bg-transparent">
                  <div className="d-flex flex-column h-100 justify-content-between align-items-start">
                    <div className="cta-2 text-black w-80">Berries, Nuts and Sugar</div>
                    <Button variant="primary" className="btn-icon btn-icon-start stretched-link">
                      <CsLineIcons icon="chevron-right" /> <span>View</span>
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
          </Row> */}
          {/* Worth Checking End */}
        </Col>

        <Col xs="12" lg="auto" className="order-0 order-lg-1">
          <h2 className="small-title">Cart Totals</h2>
          <Card className="mb-5 w-100 sw-lg-35">
            <Card.Body>
              <div className="mb-4">
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">ITEMS</p>
                  <p>
                    <span className="text-alternate">5</span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">TOTAL</p>
                  <p>
                    <span className="text-alternate">
                      <span className="text-small text-muted">₹</span>
                      285.25
                    </span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">SHIPPING</p>
                  <p>
                    <span className="text-alternate">
                      <span className="text-small text-muted">₹</span>
                      12.50
                    </span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">SALE</p>
                  <p>
                    <span className="text-alternate">
                      <span className="text-small text-muted">₹</span>
                      -24.50
                    </span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">GRAND TOTAL</p>
                  <div className="cta-2">
                    <span>
                      <span className="text-small text-muted cta-2">₹</span>
                      321.50
                    </span>
                  </div>
                </div>
              </div>
              <Button className="btn-icon btn-icon-end w-100" variant="primary">
                <span>Proceed to checkout</span> <CsLineIcons icon="chevron-right" />
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Cardcart;
