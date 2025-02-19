import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Card, Button, Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { useDispatch, useSelector } from 'react-redux';
import { StoreCategoryAddURL } from 'Redux/CashierRedux/StoreCategoryRedux/storeCategoryRedux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Storeaddcategory = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const title = 'Add Category';
  const description = 'Ecommerce Category Management Page';
  // const { CategoryListURL,notification } = useSelector((state) => state.cotegoryList)
  const [selectValueState, setSelectValueState] = useState();
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

  const [name, setName] = useState("")
  const [sortorder, setSortOrder] = useState("")
  const [error, setError] = useState("");
  const [suc, setSuc] = useState(false);

  const { currentUser } = useSelector((state) => state.auth)
  const { categoryData, notification } = useSelector((state) => state.StorecategorySlice)
  console.log(currentUser, "storecurrentUser")
  // const { cashierData } = useSelector((state) => state.cashierList)
  //   const { categoryData } = useSelector((state) => state.cotegoryList)
  // useEffect(() => {
  //   dispatch(CategoryListURL(currentUser.token))
  // }, [])
  const AddCategory = (event) => {
    event.preventDefault()
    if (sortorder <= 0) {
      toast.error("Sort order must be greater than zero");
      return; // Stop the function if validation fails
    }
    
    const payload = {
      "company_uuid": currentUser?.data?.company_uuid,
      "store_uuid": currentUser && currentUser.data && currentUser.data.group === "cashier" ? currentUser?.data?.store_uuid : currentUser?.data?.uuid ,
      "name": name,
      "sort_order": sortorder

    }
    dispatch(StoreCategoryAddURL(payload, currentUser.token))
    // dispatch(CompanyListURL(currentUser.token))
    setSuc(true)
  }

  useEffect(() => {
    if (suc === true) {
      if (notification.status === true) {
        toast.success(notification.message, {
          position: "top-right",
        })
        setSuc(false)
        setTimeout(() => {
          // dispatch(ProductListURL(page, search,currentUser.token,limit))
          history.push(({
            pathname: "/Storecategory",
            // state : {detail : id,fullname : name, pic :image, type:"edit"},
          }));
        }, 2000)
      }
      else if (notification.status === false) {
        toast.error(notification.message)
        setSuc(false)
      }
    }

  }, [notification])

  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title Start */}
      <div className="page-title-container">
        <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back mb-2" to="/Storecategory">
          <CsLineIcons icon="chevron-left" size="20" />
          <span className="align-middle text-medium ms-1">Category Management</span>
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
              <Form onSubmit={AddCategory}>
                <Row className="g-3">
                  <Col lg="6">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" onChange={(e) => { setName(e.target.value) }} />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Sort Order</Form.Label>
                    <Form.Control type="number"
                      onChange={(e) => {
                        const enteredValue = e.target.value;
                        if (enteredValue !== "0") {
                          setSortOrder(enteredValue);
                          setError(""); // Clear any previous error
                        } else {
                          setError("Sort Order cannot be 0");
                        }
                      }}
                    />
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                  </Col>
                  <Col lg="12" className='mt-4'>
                    {/* <Form.Label >hello</Form.Label> */}
                    <Button variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto" type="submit">
                      <CsLineIcons /> <span>Submit</span>
                    </Button>
                  </Col>

                  {/* <Col lg="6">
                    <Form.Label>Contact No</Form.Label>
                    <Form.Control type="text" />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Location</Form.Label>
                    <Form.Control as="textarea" rows={2} />
                  </Col> */}
                  {/* <Col lg="4">
                    <Form.Label>State</Form.Label>
                    <Select classNamePrefix="react-select" options={optionsState} value={selectValueState} onChange={setSelectValueState} placeholder="" />
                  </Col>
                  <Col lg="4">
                    <Form.Label>City</Form.Label>
                    <Select classNamePrefix="react-select" options={optionsCity} value={selectValueCity} onChange={setSelectValueCity} placeholder="" />
                  </Col>
                  <Col lg="4">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control type="text" />
                  </Col> */}
                  {/* <Col lg="6">
                    <Form.Label>Address</Form.Label>
                    <Form.Control as="textarea" rows={2} />
                  </Col> */}
                </Row>
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
      </Row>
    </>
  );
};

export default Storeaddcategory;
