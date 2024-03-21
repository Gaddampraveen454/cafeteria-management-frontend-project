import React, { useState, useEffect } from 'react';
import { NavLink, useHistory, useLocation, useParams } from 'react-router-dom';
import { Card, Button, Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { useDispatch, useSelector } from 'react-redux';
import { ConsumerOrderView, ConsumerOrderReview, ConsumerFeedback } from 'Redux/ConsumerRedux/OrderRedux/OrderRedux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Rating from 'react-rating-stars-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Input,
} from '@mui/material';

const UserOrderRating = () => {
    const dispatch = useDispatch()
    const history = useHistory();


    const { id } = useParams();

    const location = useLocation('')
    console.log(location?.state, "111111")

    const title = 'Order Rating';
    const description = 'Ecommerce Category Management Page';

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

    const { OrderView, consumerfeedback, notification } = useSelector((state) => state.OrderPlacedData)
    console.log(OrderView, location?.state?.event?.uuid, id, OrderView?.data?.uuid, "ConsumerOrderView")

    const [ratingValue, setRating] = React.useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        dispatch(ConsumerOrderView(currentUser?.data?.token, location?.state?.event?.uuid || id || OrderView?.data?.uuid))
    }, [])





    // const [review,setReview]=useState(OrderView?.data?.reviews.length > 0  ? OrderView?.data?.reviews[0]?.review : '')
    const [productuuid, setProductuuid] = useState('');

    const [RatingValue, setRatingValue1] = useState(location?.state?.event?.feedbacks?.length > 0 && location?.state?.event?.feedbacks.map((items) => {
        return items?.rating
    }))

    useEffect(() => {
        setRatingValue1(location?.state?.event?.feedbacks?.length > 0 && location?.state?.event?.feedbacks.map((items) => {
            return console.log(items?.rating, "RatingValue")
        }))
    }, [location?.state])
    // console.log(RatingValue,"RatingValue")

    const handleRatingChange = (newRating, productID) => {
        console.log("jdvcdbchbcsjh")

        const payload = {
            "user_uuid": currentUser?.data?.uuid,
            "order_uuid": location?.state?.event?.uuid || id,
            "product_uuid": productID?.uuid,
            "rating": newRating,
        }
        dispatch(ConsumerFeedback(currentUser?.data?.token, payload))
        setSuccess(true)
        setTimeout(() => {
            dispatch(ConsumerOrderView(currentUser?.data?.token, location?.state?.event?.uuid || id || OrderView?.data?.uuid))
        }, 500)
    }

    const ConsumerReviewApi = (event) => {
        event?.preventDefault()
        const value = event?.target?.elements;
        console.log(value, "ghdfvcshbjbsdjhj")
        const payload = {
            "user_uuid": currentUser?.data?.uuid,
            "order_uuid": location?.state?.event?.uuid || id,
            "review": value?.review?.value
        }
        dispatch(ConsumerOrderReview(currentUser?.data?.token, payload))
        setSuccess(true)
        setTimeout(() => {
            dispatch(ConsumerOrderView(currentUser?.data?.token, location?.state?.event?.uuid || id || OrderView?.data?.uuid))
            history.push("/Order")
        }, 1000)


    }

    const [ratingvalue, setRatingValue] = useState('')
    console.log(ratingvalue, "ratingvalue")

    useEffect(() => {
        OrderView?.data?.feedbacks?.map((items) => {
            console.log(items, "hgdsfgsgjs")
            return setRatingValue(items.rating)
        })
    })

    useEffect(() => {
        if (success === true) {
            if (notification?.status === true) {
                // dispatch(ConsumerOrderView(currentUser?.data?.token, location?.state?.event?.uuid || id || OrderView?.data?.uuid))
                toast.success(notification?.message, {
                    position: "top-right",
                })
            }
            else if (notification?.status === false) {
                toast.error(notification?.message, {
                    position: "top-right",
                })
            }
        }
    }, [notification])


    const [ratingopen, setRatingOpen] = useState(false)

    const OrderRating = (event) => {
        console.log(event, "sfdsfsdfsdfcvghnh")
        setProductuuid(event?.uuid)
        setRatingOpen(true)
    }

    const RenderStars = ({ rating, onStarClick }) => {
        console.log(rating, 'fdbvhgvf')
        const stars = [];

        for (let i = 1; i <= 5; i += 1) {
            stars.push(
                // <CsLineIcons icon="star" size="20" fill={i < Number(rating) ? 'gold' : ''} />
                <FontAwesomeIcon icon={faStar} onClick={() => onStarClick(i)} color={i <= Number(rating) ? 'gold' : ''} style={{ size: "25" }} />
            );
        }

        return <div>{stars}</div>;
    };


    return (
        <>
            <HtmlHead title={title} description={description} />
            {/* Title Start */}
            <div className="page-title-container">
                <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back mb-2" to="/Order">
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
                                    <Col lg="6">
                                        <Form.Label>Payment Status</Form.Label>
                                        <Form.Control type="text" disabled value={OrderView?.data?.payment_status} />
                                    </Col>
                                    {/* <Col lg="6">
                    <Form.Label>Order Created By</Form.Label>
                    <Form.Control type="text" disabled value={OrderView?.data?.amount} />
                  </Col> */}

                                    <Col lg="6">
                                        <Form.Label>Online Payment</Form.Label>
                                        <Form.Control type="text" disabled value={OrderView?.data?.online_payment} />
                                    </Col>
                                    <Col lg="6">
                                        <Form.Label>Paid From Wallet</Form.Label>
                                        <Form.Control type="text" disabled value={OrderView?.data?.paid_from_wallet} />
                                    </Col>
                                    {/* <Col lg="6">
                    <Form.Label>Payment Type</Form.Label>
                    <Form.Control type="text" disabled value={OrderView?.data?.payment_type} />
                  </Col> */}
                                    <Col lg="6">
                                        <Form.Label>SGST Tax</Form.Label>
                                        <Form.Control type="text" disabled value={OrderView?.data?.sgst_tax} />
                                    </Col>
                                    <Col lg="6">
                                        <Form.Label>CGST Tax</Form.Label>
                                        <Form.Control type="text" disabled value={OrderView?.data?.cgst_tax} />
                                    </Col>
                                    <Col lg="6">
                                        <Form.Label>Total Amount</Form.Label>
                                        <Form.Control type="text" disabled value={OrderView?.data?.amount} />
                                    </Col>
                                </Row>

                            </Form>
                        </Card.Body>
                    </Card>



                    <Card>
                        <Card.Body>
                            <Form>
                                {/* List Header Start */}
                                <Row className="g-0 mb-2 d-none d-lg-flex">
                                    <Col>
                                        <Row className="g-0 h-100 align-content-center custom-sort ps-5 pe-4 h-100">
                                            <Col xs="1" lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                                                <div className="text-muted text-medium cursor-pointer sort">S.No</div>
                                            </Col>
                                            <Col xs="2" lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                                                <div className="text-muted text-medium cursor-pointer sort">Product Name</div>
                                            </Col>
                                            <Col xs="2" lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                                                <div className="text-muted text-medium cursor-pointer sort">Type</div>
                                            </Col>
                                            <Col xs="2" lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                                                <div className="text-muted text-medium cursor-pointer sort">Product Id</div>
                                            </Col>
                                            <Col xs="2" lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                                                <div className="text-muted text-medium cursor-pointer sort">Quantity</div>
                                            </Col>
                                            <Col xs="2" lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                                                <div className="text-muted text-medium cursor-pointer sort">Price</div>
                                            </Col>
                                            {location?.state?.event?.order_status === "Cancelled" ?
                                                ""
                                                :
                                                <Col xs="2" lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                                                    <div className="text-muted text-medium cursor-pointer sort">Rating</div>
                                                </Col>
                                            }
                                        </Row>
                                    </Col>
                                </Row>
                                {/* List Header End */}

                                {/* List Items Start */}
                                {OrderView?.data?.details?.length > 0 && OrderView?.data?.details.map((item, index) => {
                                    return <div key="">
                                        {console.log(item, "fghfghfghh")}
                                        <Card className='mb-2'>
                                            <Row className="g-0 h-100 sh-lg-9 position-relative">

                                                <Col className="py-4 py-lg-0 ps-5 pe-4 h-100">
                                                    <Row className="g-0 h-100 ">
                                                        <Col lg="1">
                                                            <Row className="gx-2 align-items-center ">

                                                                <Col lg="12" className="col">
                                                                    <Row className="p-0 mb-2 d-none d-lg-flex">
                                                                        <Col xs="auto" lg="12" >
                                                                            <div className="lh-1 text-alternate  mt-2">{index + 1}</div>
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
                                                                            <div className="text-alternate sh-4 d-flex align-items-center lh-1-25">Name</div>
                                                                        </Col>
                                                                        <Col xs="6" lg="12">
                                                                            <div className="lh-1 text-alternate mt-2 ">{item.name}</div>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col lg="2">
                                                            <Row className="gx-2 align-items-center">
                                                                <Col lg="12" className="col">
                                                                    <Row className="g-0">
                                                                        <Col className="d-lg-none">
                                                                            <div className="text-alternate sh-4 d-flex align-items-center lh-1-25">Type</div>
                                                                        </Col>
                                                                        <Col xs="auto" lg="12">
                                                                            <div className="lh-1 text-alternate  mt-2">{item.type}</div>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col lg="2">
                                                            <Row className="gx-2 align-items-center">
                                                                <Col lg="12" className="col">
                                                                    <Row className="g-0">
                                                                        <Col className="d-lg-none">
                                                                            <div className="text-alternate sh-4 d-flex align-items-center lh-1-25">Product Id</div>
                                                                        </Col>
                                                                        <Col xs="auto" lg="12">
                                                                            <div className="lh-1 text-alternate  mt-2">{item.uuid}</div>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col lg="1">
                                                            <Row className="gx-2 align-items-center">
                                                                <Col lg="12" className="col">
                                                                    <Row className="g-0">
                                                                        <Col className="d-lg-none">
                                                                            <div className="text-alternate sh-4 d-flex align-items-center lh-1-25">Quantity</div>
                                                                        </Col>
                                                                        <Col xs="auto" lg="12">
                                                                            <div className="lh-1 text-alternate  mt-2">{item.quantity}</div>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col lg="1">
                                                            <Row className="gx-2 align-items-center">
                                                                <Col lg="12" className="col">
                                                                    <Row className="g-0">
                                                                        <Col className="d-lg-none">
                                                                            <div className="text-alternate sh-4 d-flex align-items-center lh-1-25">Price</div>
                                                                        </Col>
                                                                        <Col xs="auto" lg="12">
                                                                            <div className="lh-1 text-alternate  mt-2">{item.price}</div>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col lg="2">
                                                            <Row className="gx-2 align-items-center">
                                                                <Col lg="12" className="col">
                                                                    <Row className="g-0">
                                                                        <Col className="d-lg-none">
                                                                            <div className="text-alternate sh-4 d-flex align-items-center lh-1-25">Rating</div>
                                                                        </Col>
                                                                        {/* {location?.state?.type !== "View"} */}
                                                                        {/* {OrderView?.data?.feedbacks.length > 0 && OrderView?.data?.feedbacks.map((feedback, ind) => {

                                      console.log(feedback, "hdvfsjdgfdsj")
                                      return <Col xs="auto" lg="12" key={ind}>
                                        {feedback?.product_uuid === item?.uuid &&
                                          <Rating
                                            count={5}
                                            value={feedback?.rating}
                                            onChange={handleRatingChange}
                                            size={20}
                                            activeColor="#ffd700"
                                            edit={false}
                                          />
                                        }
                                        {feedback?.product_uuid !== item?.uuid &&
                                          <Button title="PRINT" variant="outline-primary" className="btn px-2 py-2"
                                            onClick={(e) => OrderRating(item)}
                                          >
                                            <CsLineIcons icon="star" />
                                          </Button>
                                        }
                                      </Col>
                                    })} */}
                                                                        {/* {OrderView?.data?.feedbacks?.length === 0 &&
                                      <Col>
                                        <Button title="PRINT" variant="outline-primary" className="btn px-2 py-2"
                                          onClick={(e) => OrderRating(item)}
                                        >
                                          <CsLineIcons icon="star" />s
                                        </Button>
                                      </Col>
                                    } */}                              {location?.state?.event?.order_status === "Cancelled" ?
                                                                            ""
                                                                            :
                                                                            <Col xs="auto" lg="12">
                                                                                {/* <Rating
                                                                                count={5}
                                                                                // value={item?.feedbacks[0]?.rating}
                                                                                value={item?.feedbacks[0]?.rating || 0}
                                                                                onChange={(rating) => handleRatingChange(rating, item)}
                                                                                size={25}
                                                                                activeColor="#ffd700"
                                                                            /> */}

                                                                                {/* <div>{renderStars(item?.feedbacks[0]?.rating)}</div> */}
                                                                                <RenderStars rating={item?.feedbacks[0]?.rating} onStarClick={(rating) => handleRatingChange(rating, item)} />

                                                                            </Col>
                                                                        }
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                        </Col>

                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card>

                                    </div>
                                })}

                                {/* List Items End */}
                            </Form>
                        </Card.Body>
                    </Card>
                    {/* Address End */}

                    {/* View QR code  Popup Start */}
                    <div>
                        <Dialog
                            open={ratingopen}
                            onClose={() => setRatingOpen(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                Feedback:
                            </DialogTitle>

                            <DialogContent style={{ width: "500px", height: "auto" }}>
                                <Form>
                                    <Row className="g-3">
                                        <Col lg='12' className="mb-1">
                                            <Rating
                                                count={5}
                                                value={ratingValue}
                                                onChange={handleRatingChange}
                                                size={35}
                                                activeColor="#ffd700"
                                            />
                                        </Col>
                                        <Col lg="6">
                                            <Button variant="outline-primary"
                                                className='btn-icon btn-icon-end w-100'
                                                type='submit'
                                                onClick={() => setRatingOpen(false)}
                                            >
                                                Submit
                                            </Button>
                                        </Col>
                                    </Row>

                                </Form>

                            </DialogContent>

                        </Dialog>
                    </div>

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
            <Row className='mt-5'>
                <Col xs="12" className="col-lg order-1 order-lg-0">
                    {location?.state?.event?.order_status === "Cancelled" ?
                        ""
                        :
                        <Card className="mb-5">
                            <Card.Body>
                                <Form onSubmit={ConsumerReviewApi}>
                                    <h3>Order Review : </h3>
                                    <Row className="g-3">
                                        <Col lg="6">
                                            <Form.Label>Review</Form.Label>
                                            {/* <Form.Control as="textarea" name="review" rows={3} disabled={OrderView?.data?.reviews?.length === 1} defaultValue={OrderView?.data?.reviews[0]?.review} /> */}
                                            <Form.Control as="textarea" name="review" rows={3}
                                                defaultValue={location?.state?.event?.reviews.length > 0 ? location?.state?.event?.reviews[0]?.review : ''}
                                            />
                                        </Col>
                                    </Row>
                                    {/* {OrderView?.data?.reviews.length !== 1 && */}
                                    <Row className="mt-3">
                                        <Col lg="6">
                                            <Button variant="outline-primary" type='submit'>Submit</Button>
                                        </Col>
                                    </Row>
                                    {/* } */}
                                </Form>
                            </Card.Body>
                        </Card>
                    }
                </Col>
            </Row>
        </>
    );
};

export default UserOrderRating;
