import React, { useState, useEffect } from 'react';
import { NavLink, useHistory, useLocation, useParams } from 'react-router-dom';
import { Card, Button, Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { useDispatch, useSelector } from 'react-redux';
import { ConsumerOrderView, ConsumerFeedback } from 'Redux/ConsumerRedux/OrderRedux/OrderRedux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Rating from 'react-rating-stars-component';

const StoreOrderView = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const title = 'Order View';
    const description = 'Ecommerce Category Management Page';

    const { id } = useParams();

    const location = useLocation('')

    const optionsState = [
        { value: 'Fougasse', label: 'Fougasse' },
        { value: 'Lefse', label: 'Lefse' },
    ];

    const [selectValueCity, setSelectValueCity] = useState();
    const optionsCity = [
        { value: 'Breadstick', label: 'Breadstick' },
        { value: 'Biscotti', label: 'Biscotti' },
    ];

    const [selectValueMonth, setSelectValueMonth] = useState();
    const optionsMonth = [
        { value: '01', label: '01' },
        { value: '02', label: '02' },
        { value: '03', label: '03' },
        { value: '04', label: '04' },
        { value: '05', label: '05' },
        { value: '06', label: '06' },
        { value: '07', label: '07' },
        { value: '08', label: '08' },
        { value: '09', label: '09' },
        { value: '10', label: '10' },
        { value: '11', label: '11' },
        { value: '12', label: '12' },
    ];

    const [selectValueYear, setSelectValueYear] = useState();
    const optionsYear = [
        { value: '21', label: '21' },
        { value: '22', label: '22' },
        { value: '23', label: '23' },
        { value: '24', label: '24' },
        { value: '25', label: '25' },
        { value: '26', label: '26' },
        { value: '27', label: '27' },
        { value: '28', label: '28' },
        { value: '29', label: '29' },
        { value: '30', label: '30' },
    ];


    const { currentUser } = useSelector((state) => state.auth)

    const { OrderView } = useSelector((state) => state.OrderPlacedData)

    const OrderViewFunction = () => {
        dispatch(ConsumerOrderView(currentUser?.token, location?.state?.uuid || id))
    }

    useEffect(() => {
        OrderViewFunction()
    }, [])

    const [ratingValue, setRating] = React.useState(location?.state?.feedbacks[0]?.rating);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };


    return (
        <>
            <HtmlHead title={title} description={description} />
            {/* Title Start */}
            <div className="page-title-container">
                <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back mb-2" to="/orders">
                    <CsLineIcons icon="chevron-left" size="20" />
                    <span className="align-middle text-medium ms-1">order List</span>
                </NavLink>
                <h1 className="mb-0 pb-0 display-4" id="title">
                    {title}
                </h1>
            </div>
            {/* Title End */}

            <Row>
                <Col xs="12" className="col-lg order-1 order-lg-0">
                    {/* Address Start */}
                    {/* <h2 className="small-title">Address</h2> */}
                    <Card className="mb-5">
                        <Card.Body>
                            <Form>
                                <Row className="g-3">
                                    <Col xs="6" lg="6">
                                        <Form.Label>Payment Status</Form.Label>
                                        <Form.Control type="text" disabled value={OrderView?.data?.payment_status} />
                                    </Col>
                                    <Col xs="6" lg="6">
                                        <Form.Label>Total Amount</Form.Label>
                                        <Form.Control type="text" disabled value={OrderView?.data?.amount} />
                                    </Col>
                                    <Col xs="6" lg="6">
                                        <Form.Label>Order Created By</Form.Label>
                                        <Form.Control type="text" disabled value={OrderView?.data?.order_created_by} />
                                    </Col>

                                    <Col xs="6" lg="6">
                                        <Form.Label>Online Payment</Form.Label>
                                        <Form.Control type="text" disabled value={OrderView?.data?.online_payment} />
                                    </Col>
                                    <Col xs="6" lg="6">
                                        <Form.Label>Paid From Wallet</Form.Label>
                                        <Form.Control type="text" disabled value={OrderView?.data?.paid_from_wallet} />
                                    </Col>
                                    <Col xs="6" lg="6">
                                        <Form.Label>Payment Mode</Form.Label>
                                        <Form.Control type="text" disabled value={OrderView?.data?.payment_type} />
                                    </Col>
                                    <Col xs="6" lg="6">
                                        <Form.Label>SGST Tax</Form.Label>
                                        <Form.Control type="text" disabled value={OrderView?.data?.sgst_tax} />
                                    </Col>
                                    <Col xs="6" lg="6">
                                        <Form.Label>CGST Tax</Form.Label>
                                        <Form.Control type="text" disabled value={OrderView?.data?.cgst_tax} />
                                    </Col>
                                </Row>

                            </Form>
                        </Card.Body>
                    </Card>

                    {/* <Row>
                        <Col xs="12" className="col-lg order-1 order-lg-0">
                            <Card className="mb-5">
                                <Card.Body>
                                    <Form>
                                        <h3>Feedback : </h3>
                                        <Row className="g-3">
                                            <Col lg="6">
                                                <Form.Label>Rating</Form.Label>
                                                <Rating
                                                    count={5}
                                                    defaultValue={location?.state?.feedbacks[0]?.rating}
                                                    value={ratingValue}
                                                    onChange={handleRatingChange}
                                                    size={35}
                                                    activeColor="#ffd700"
                                                    edit={false}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="g-3">
                                            <Col lg="6">
                                                {location?.state?.feedbacks?.length === 1 &&
                                                    <>
                                                        <Form.Label>Review</Form.Label>
                                                        <Form.Control as="textarea" name="review" rows={3} disabled defaultValue={location?.state?.feedbacks[0]?.review} />
                                                    </>
                                                }
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row> */}

                    <Card className='mt-3'>
                        <Card.Body>
                            <Form>
                                {/* List Header Start */}
                                <Row className="g-0 d-none d-lg-flex mb-4">
                                    <Col>
                                        <Row className="g-0 h-100 align-content-center custom-sort ps-5 pe-4 h-100">
                                            <Col xs="2" lg="1" className="d-flex align-items-center justify-content-center">
                                                <div className="text-muted text-medium cursor-pointer orderView" style={{ paddingRight: "35px" }}>S.No</div>
                                            </Col>
                                            <Col xs="2" lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                                                <div className="text-muted text-medium cursor-pointer sort" >Product Name</div>
                                            </Col>
                                            <Col xs="2" lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                                                <div className="text-muted text-medium cursor-pointer sort">Type</div>
                                            </Col>
                                            <Col xs="2" lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                                                <div className="text-muted text-medium cursor-pointer sort">Product Id</div>
                                            </Col>
                                            <Col xs="2" lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                                                <div className="text-muted text-medium cursor-pointer sort">Quantity</div>
                                            </Col>
                                            <Col xs="2" lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                                                <div className="text-muted text-medium cursor-pointer sort">Price</div>
                                            </Col>
                                            <Col xs="2" lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                                                <div className="text-muted text-medium cursor-pointer sort">Rating</div>
                                            </Col>

                                        </Row>
                                    </Col>
                                </Row>
                                {/* List Header End */}

                                {/* List Items Start */}
                                {OrderView?.data?.details?.length > 0 && OrderView?.data?.details.map((item, index) => {
                                    return <div key="">
                                        {console.log(item, "fghfghfghh")}
                                        {/* <Card className=''> */}
                                        <Row className="g-0 h-100 sh-25 sh-lg-9 position-relative">

                                            {/* <Col> */}
                                            <Row className="g-0 h-100 ">
                                                <Col lg="1" className='d-flex align-items-start justify-content-center'>
                                                    {/* <Row className="gx-2 align-items-center "> */}

                                                    {/* <Col lg="12" className="col"> */}
                                                    {/* <Row className="p-0 mb-2 d-none d-lg-flex"> */}
                                                    {/* <Col  lg="12" > */}
                                                    <div className="text-alternate index">{index + 1}</div>
                                                    {/* </Col> */}
                                                    {/* </Row> */}
                                                    {/* </Col> */}
                                                    {/* </Row> */}
                                                </Col>
                                                <Col lg="2">
                                                    <Row className="align-items-center">
                                                        <Col lg="12" className="col">
                                                            <Row className="g-0">
                                                                <Col xs="6" className="d-lg-none">
                                                                    <div className="text-alternate d-flex align-items-start lh-1-25" style={{ fontWeight: 'bold' }}>Name</div>
                                                                </Col>
                                                                <Col xs="6" lg="12" className=' d-flex align-items-center'>
                                                                    <div className="lh-1 text-alternate orderView" style={{ paddingLeft: "30px" }}>{item.name}</div>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg="2">
                                                    <Row className="gx-2 align-items-center">
                                                        <Col lg="12" className="col">
                                                            <Row className="g-0">
                                                                <Col xs="6" className="d-lg-none">
                                                                    <div className="text-alternate sh-4 d-flex align-items-center lh-1-25" style={{ fontWeight: 'bold' }}>Type</div>
                                                                </Col>
                                                                <Col xs="6" lg="12">
                                                                    <div className="lh-1 text-alternate mt-2 orderView" style={{ paddingLeft: "18px" }}>{item.type}</div>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg="2">
                                                    <Row className=" align-items-center">
                                                        <Col lg="12" className="col">
                                                            <Row className="g-0">
                                                                <Col xs='6' className="d-lg-none">
                                                                    <div className="text-alternate d-flex align-items-center lh-1-25" style={{ fontWeight: 'bold' }}>Product Id</div>
                                                                </Col>
                                                                <Col xs="6" lg="12" className='d-flex align-items-center'>
                                                                    <div className="lh-1 text-alternate orderView" style={{ paddingLeft: "10px" }}>{item.uuid}</div>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg="2">
                                                    <Row className=" align-items-center">
                                                        <Col lg="12" className="col">
                                                            <Row className="g-0">
                                                                <Col xs='6' className="d-lg-none">
                                                                    <div className="text-alternate d-flex align-items-center lh-1-25" style={{ fontWeight: 'bold' }}>Quantity</div>
                                                                </Col>
                                                                <Col xs="6" lg="12" className='d-flex align-items-center'>
                                                                    <div className="lh-1 text-alternate">{item.quantity}</div>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg="1">
                                                    <Row className="align-items-center">
                                                        <Col lg="12" className="col">
                                                            <Row className="g-0">
                                                                <Col xs='6' lg='12' className="d-lg-none">
                                                                    <div className="text-alternate d-flex align-items-center lh-1-25" style={{ fontWeight: 'bold' }}>Price</div>
                                                                </Col>
                                                                <Col xs="6" lg="12" className='d-flex align-items-center'>
                                                                    <div className="lh-1 text-alternate">{item.price}</div>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg="2" className='mb-4'>
                                                    <Row className="align-items-center">
                                                        <Col lg="12" >
                                                            <Row className="g-0">
                                                                <Col xs='6' className="d-lg-none">
                                                                    <div className="text-alternate d-flex align-items-center" style={{ fontWeight: 'bold' }}>Rating</div>
                                                                </Col>
                                                                {location?.state?.feedbacks.map((feedback, ind) => {
                                                                    console.log(feedback, "hdvfsjdgfdsj")
                                                                    return <Col xs="6" lg="12" key={ind} className='d-flex align-items-center'>
                                                                        {feedback?.product_uuid === item?.uuid ?
                                                                            <Rating
                                                                                count={5}
                                                                                value={feedback?.rating}
                                                                                // onChange={handleRatingChange}
                                                                                size={20}
                                                                                activeColor="#ffd700"
                                                                                edit={false}
                                                                                className="lh-1 text-alternate  mt-2"
                                                                            />
                                                                            :
                                                                            <span className="lh-1 text-alternate">No Rating</span>
                                                                        }
                                                                    </Col>
                                                                })}
                                                                {location?.state?.feedbacks?.length === 0 &&
                                                                    <Col>
                                                                        <span>No Rating</span>
                                                                    </Col>
                                                                }

                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Col>


                                            </Row>
                                            {/* </Col> */}
                                        </Row>

                                        {/* </Card> */}

                                    </div>
                                })}

                                {/* List Items End */}
                            </Form>
                        </Card.Body>
                    </Card>
                    {/* Address End */}

                    {/* Shipment Start */}
                    {/* <h2 className="small-title">Shipment</h2> */}
                    {/* <Card className="mb-5">
            <Card.Body>
              <Form.Label>Options</Form.Label>
              <Form.Check type="radio" label="Free standard delivery" id="shipmentRadio1" name="shipmentRadio" />
              <Form.Check type="radio" label="Same day delivery for $12.00" id="shipmentRadio2" name="shipmentRadio" />
            </Card.Body>
          </Card> */}
                    {/* Shipment End */}

                    {/* Payment Start */}
                    {/* <h2 className="small-title">Payment</h2>
          <Card className="mb-5">
            <Card.Body>
              <Row className="g-3">
                <Col className="col-sm-auto mb-3">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control type="text" className="w-100 sw-sm-40" />
                </Col>
              </Row>
              <Row className="g-3">
                <Col className="col-sm-auto mb-3">
                  <Form.Label>Name on the Card</Form.Label>
                  <Form.Control type="text" className="w-100 sw-sm-40" />
                </Col>
              </Row>
              <Row className="g-3">
                <Col className="col-auto mb-3">
                  <Form.Label>CCV</Form.Label>
                  <Form.Control type="text" className="sw-9" />
                </Col>
                <Col className="col-auto mb-3">
                  <Form.Label className="d-block">Expiration Date</Form.Label>
                  <Select
                    classNamePrefix="react-select"
                    className="sw-9 d-inline-block me-1 text-center"
                    options={optionsMonth}
                    value={selectValueMonth}
                    onChange={setSelectValueMonth}
                    placeholder=""
                  />
                  <Select
                    classNamePrefix="react-select"
                    className="sw-9 d-inline-block"
                    options={optionsYear}
                    value={selectValueYear}
                    onChange={setSelectValueYear}
                    placeholder=""
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card> */}
                    {/* Payment End */}
                </Col>
                {/* <Col lg="auto" className="order-0 order-lg-1"> */}
                {/* <h2 className="small-title">Summary</h2> */}
                {/* <Card className="mb-5 w-100 sw-lg-35">
            <Card.Body>
              <div className="mb-3">
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
                      <span className="text-small text-muted">$</span> 285.25
                    </span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">SHIPPING</p>
                  <p>
                    <span className="text-alternate">
                      <span className="text-small text-muted">$</span> 12.50
                    </span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">SALE</p>
                  <p>
                    <span className="text-alternate">
                      <span className="text-small text-muted">$</span> -24.50
                    </span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">GRAND TOTAL</p>
                  <div className="cta-2">
                    <span>
                      <span className="text-small text-muted cta-2">$</span> 321.50
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-check mb-4">
                <input type="checkbox" className="form-check-input" name="terms" />
                <label className="form-check-label">
                  I have read and accept the{' '}
                  <NavLink to="/" target="_blank">
                    terms and conditions.
                  </NavLink>
                </label>
              </div>
              <Button className="btn-icon btn-icon-end w-100" variant="primary">
                <span>Purchase</span> <CsLineIcons icon="chevron-right" />
              </Button>
            </Card.Body>
          </Card> */}
                {/* </Col> */}
            </Row >
        </>
    );
};

export default StoreOrderView;
