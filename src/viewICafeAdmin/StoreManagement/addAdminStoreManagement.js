import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Card, Button, Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { IcafeAdminStoreAddURL, ICafeAdminStoreDropDownListURL } from 'Redux/IcafeAdminRedux/StoreManagement/storemanagement';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const addAdminStoreManagement = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const [option, setOption] = useState('');
  const { currentUser } = useSelector((state) => state.auth)
  const { storeData, dropdownList, notification } = useSelector((state) => state.storemanagement)
  console.log(storeData, 'bfvdhvbdfh')
  const title = 'Add Store';
  const description = 'Ecommerce Storefront Add Details Page';





  const initialValues = { storeName: "", walletamount: "", email: "", mobile: "", location: "", address: "", gstin: "", fssai_no: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);




  // const [companyName, setComapnayName] = useState("")
  // const [walletamount, setwalletamount] = useState("")
  // const [email, setEmail] = useState("")
  // const [mobile, setMobile] = useState("")
  // const [location, setLocation] = useState("")
  // const [address, setAddress] = useState("")
  const [suc, setSuc] = useState(false);


  const AddCategory = () => {
    // event.preventDefault()
    // const value = event.target.elements
    const payload = {
      "company_uuid": option,
      "store_name": formValues.storeName,
      "email": formValues.email,
      "mobile": formValues.mobile,
      "wallet_amount": formValues.walletamount,
      "location": formValues.location,
      "address": formValues.address,
      "gstin": formValues.gstin,
      "fssai_no": formValues.fssai_no,
    }
    dispatch(IcafeAdminStoreAddURL(payload, currentUser.token))
    setSuc(true)
    // dispatch(CompanyListURL(currentUser.token))
  }


  useEffect(() => {
    if (suc === true) {
      if (notification.status === true) {
        toast.success(notification.message, {
          position: "top-right",
        })
        setSuc(false)
        setTimeout(() => {
          // dispatch(CompanyListURL(currentUser.token))
          history.push(({
            pathname: "/store_management",

          }));
        }, 1000)

      }
      else if (notification.status === false) {
        toast.error(notification.message)
        setSuc(false)
      }
    }

  }, [notification])
  console.log(notification, "ProductDataProductData")






  console.log(formValues, "sdfsdfsdfsdf")
  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const alpharegex = /^[A-Za-z].{3,15}$/
    const numberregex = /^[0-9]{10,12}$/

    if (!values.storeName) {
      errors.storeName = "Store Name is Required";
    }
    else if (!values.walletamount) {
      errors.walletamount = "Wallet Amout is Required";
    }
    else if (!values.mobile) {
      errors.mobile = "Moble number is Required";
    }
    else if (!numberregex.test(values.mobile)) {
      errors.mobile = "Please Enter vailid Mobile Number";
    }
    else if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    else if (!values.location) {
      errors.location = "Location is required!";
    }

    else if (!values.address) {
      errors.address = "Address is required!";
    }
    else if (!values.gstin) {
      errors.gstin = 'Gstin is required';
    }
    else if (!values.fssai_no) {
      errors.fssai_no = 'Fassi Number is required';
    }

    else {
      setIsSubmit(true)

    }
    return errors;
  };
  console.log(formValues, "initialValues")

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));

    // setIsSubmit(true);
    // if(isSubmit===true){
    //   AddCategory()
    // }

  };
  const myhandlechange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };


  useEffect(() => {
    if (isSubmit === true) {
      AddCategory()
    }

  }, [formErrors])




  useEffect(() => {
    dispatch(ICafeAdminStoreDropDownListURL())
  }, [])

  const dropdownvalues = [];
  dropdownList?.data?.map((text) => {
    console.log(text, 'dbvhdsh')
    return dropdownvalues.push({ value: text?.uuid, label: text?.company_name })

  })

  const PaginationFunn = (selectedOption) => {
    console.log(selectedOption, 'hbsdvhdhgvb')
    setOption(selectedOption?.value);
    // dispatch(ICafeAdminStoreListURL(page, search, currentUser.token, limit, selectedOption?.value))
  }

  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title Start */}
      <div className="page-title-container">
        <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back mb-2" to="/store_management">
          <CsLineIcons icon="chevron-left" size="20" />
          <span className="align-middle text-medium ms-1">Store Management</span>
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
              <Form
                // onSubmit={AddCategory}
                onSubmit={handleSubmit}
              >
                <Row className="g-3">
                  <Col lg="6">
                    <Form.Label>Store Name</Form.Label>
                    <Form.Control
                      // type="text" onChange={(e) => { setComapnayName(e.target.value) }} 
                      name="storeName"
                      onChange={myhandlechange}

                    />
                    <p style={{ color: "red" }}>{formErrors.storeName}</p>
                    {/* <Select classNamePrefix="react-select" options={optionsState} value={selectValueState} onChange={setSelectValueState} placeholder="" /> */}
                  </Col>
                  <Col lg='6' className="">
                    <Form.Label> Select Company</Form.Label>
                    <Select
                      classNamePrefix="react-select"
                      className=""
                      name="selectcompany"
                      options={dropdownvalues}
                      // value={option} // Set the selected option
                      onChange={PaginationFunn}
                      // placeholder="Select Company"
                      required
                      style={{ borderRadius: '10px' }}
                    />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Wallet Amount</Form.Label>
                    <Form.Control type="number"
                      name="walletamount"
                      // onChange={(e) => { setwalletamount(e.target.value) }}
                      onChange={myhandlechange}
                    />
                    <p style={{ color: "red" }}>{formErrors.walletamount}</p>
                  </Col>
                  <Col lg="6">
                    <Form.Label>Contact No</Form.Label>
                    <Form.Control
                      type="text"
                      //  onChange={(e)=>{setMobile(e.target.value)}}
                      name="mobile" minLength={10} maxLength={10}
                      onChange={myhandlechange}
                      onKeyPress={(e) => {
                        const regex = /^[0-9\b]+$/;
                        if (!regex.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    <p style={{ color: "red" }}>{formErrors.mobile}</p>
                  </Col>
                  <Col lg="6">
                    <Form.Label>Email</Form.Label>
                    {/* <Form.Control type="email" onChange={(e)=>{setEmail(e.target.value)}}/> */}
                    <Form.Control
                      // type="email" onChange={(e)=>{setEmail(e.target.value)}}
                      onChange={myhandlechange}
                      name="email"
                    />
                    <p style={{ color: "red" }}>{formErrors.email}</p>


                  </Col>
                  <Col lg="6">
                    <Form.Label>Location</Form.Label>
                    <Form.Control as="textarea" rows={2}
                      name="location"
                      // onChange={(e) => { setLocation(e.target.value) }} 
                      onChange={myhandlechange}
                    />
                    <p style={{ color: "red" }}>{formErrors.location}</p>
                  </Col>

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
                  <Col lg="6">
                    <Form.Label>Address</Form.Label>
                    <Form.Control as="textarea" rows={2}
                      name="address"
                      // onChange={(e) => { setAddress(e.target.value) }}
                      onChange={myhandlechange}
                    />
                    <p style={{ color: "red" }}>{formErrors.address}</p>
                  </Col>
                  <Col lg="6">
                    <Form.Label>Gstin</Form.Label>
                    <Form.Control
                      // type="text" onChange={(e) => { setComapnayName(e.target.value) }} 
                      type="text"
                      name="gstin"
                      onChange={myhandlechange}

                    />
                    <p style={{ color: "red" }}>{formErrors.gstin}</p>
                    {/* <Select classNamePrefix="react-select" options={optionsState} value={selectValueState} onChange={setSelectValueState} placeholder="" /> */}
                  </Col>
                  <Col lg="6">
                    <Form.Label>Fssai No </Form.Label>
                    <Form.Control
                      type="text"
                      //  onChange={(e) => { setComapnayName(e.target.value) }} 
                      name="fssai_no"
                      onChange={myhandlechange}
                      onKeyPress={(e) => {
                        const regex = /^[0-9\b]+$/;
                        if (!regex.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    <p style={{ color: "red" }}>{formErrors.fssai_no}</p>
                    {/* <Select classNamePrefix="react-select" options={optionsState} value={selectValueState} onChange={setSelectValueState} placeholder="" /> */}
                  </Col>
                  <Col lg="12">
                    <Col lg="6">
                      <Button variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto" type="submit"
                      // onSubmit={handleSubmit}
                      >
                        <CsLineIcons /> <span>Submit</span>
                      </Button>
                    </Col>
                  </Col>
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

export default addAdminStoreManagement;
