import React, { useState,useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Card, Button, Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { useDispatch, useSelector } from 'react-redux';
import { consumerListURL,CompanyConsumerAddURL, consumerUpdateURL} from 'Redux/AdminRedux/Consumer/ConsumerRedux';
import { CompanyListURL, compnayUpdateURL, companyAddURL } from 'Redux/AdminRedux/Comapny/Company';
import { ActiveCompnyURL } from 'Redux/AdminRedux/Comapny/ActiveCompany';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const adduser = () => {
  const history = useHistory();
  const title = 'Add User ';
  const description = 'Ecommerce Storefront Add Details Page';
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.auth)
  const { consumerData,notification } = useSelector((state) => state.consumerList)
  const [selectValueState, setSelectValueState] = useState();
  console.log(selectValueState,"selectValueState")
  const [suc,setSuc] = useState(false);







  // const [name,setName]=useState("")
  // const [companyName, setComapnayName]=useState("")
  // const [email, setEmail]=useState("")
  // const [mobile, setMobile]=useState("")
  // const [location, setLocation]=useState("")
  // const [EmpId,setEmpId]=useState("")
  

  const initialValues = { name: "", email: "", mobile: "", location: "", EmpId: "" ,designation:"",per_day_amount:""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  
  const { ActiveCompnayData } = useSelector((state) => state.ActiveCompnayList)

useEffect(()=>{

  dispatch(ActiveCompnyURL(currentUser.token))
},[])
  console.log(ActiveCompnayData,"sfsdfdssdfsffs");
 
  const companyList= ActiveCompnayData && ActiveCompnayData.data && ActiveCompnayData.data.map((item) =>{return {label:item.company_name, value:item.uuid}})

 

  const AddConsumer = () => {
  
    const payload = {
       
        
          "name" : formValues.name,
          "mobile" : formValues.mobile,
          "email" : formValues.email,
          "company_uuid" : selectValueState && selectValueState.value,
          "emp_id" :formValues.EmpId,
          "location" :formValues.location,
          "designation" : formValues.designation,
          "per_day_amount" : formValues.per_day_amount,
      
    }
    dispatch(CompanyConsumerAddURL(payload, currentUser.token))
    // dispatch(CompanyListURL(currentUser.token))
    setSuc(true)
}




useEffect(() => {
  if (suc === true) {
    if (notification.status === true) {
      toast.success(notification.message,{
        position:"top-right",
      })
      setSuc(false)
      setTimeout(()=>{
        // dispatch(ProductListURL(currentUser.token))
        history.push(({
          pathname: "/User",
          // state : {detail : id,fullname : name, pic :image, type:"edit"},
        }));
      },2000)
    }
    else if (notification.status === false) {
      toast.error(notification.message)
      setSuc(false)
    }
  }

}, [notification])




const validate = (values) => {
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const alpharegex = /^[A-Za-z].{3,15}$/
  const numberregex = /^[0-9]{10,12}$/
 
  if (!values.name) {
    errors.name = "Name is Required";
  }
  else if(!values.EmpId){
    errors.EmpId = "Employe id is required!";
  }
  else if(!values.designation){
    errors.designation = "designation is required!";
  }
  else if (!values.email) {
    errors.email = "Email is required!";
  } else if (!regex.test(values.email)) {
    errors.email = "This is not a valid email format!";
  }

 else if (!values.mobile) {
    errors.mobile = "Moble number is Required";
  }
  else if (!numberregex.test(values.mobile)) {
    errors.mobile = "Please Enter vailid Mobile Number";
  }

  else if(!values.location){
    errors.location = "Location is required!";
  }
  
  else if(!values.per_day_amount){
    errors.per_day_amount = "Location is required!";
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

};
const myhandlechange = (e) => {
  const { name, value } = e.target;
  setFormValues({ ...formValues, [name]: value });
};


useEffect(() => {
  if (isSubmit === true) {
    AddConsumer()
  }

}, [formErrors])
  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title Start */}
      <div className="page-title-container">
        <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back mb-2" to="/User">
          <CsLineIcons icon="chevron-left" size="20" />
          <span className="align-middle text-medium ms-1">User Management</span>
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
              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col lg="6">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text"  
                    // onChange={(e)=>{setName(e.target.value)}}
                    name="name"
                    onChange={myhandlechange}
                     />
                        <p style={{color:"red"}}>{formErrors.name}</p>
                  </Col>
                  <Col lg="6">
                    <Form.Label>Company Name</Form.Label>
                    <Select classNamePrefix="react-select" 
                    options={companyList}
                     value={selectValueState}
                     onChange={setSelectValueState} 
                     placeholder="Select Company"
                    //  name="companyName"
                    //  onChange={myhandlechange}
                      />
                  
                  </Col>
                  <Col lg="6">
                    <Form.Label>Employee ID</Form.Label>
                    <Form.Control type="text" 
                    // onChange={(e)=>{setEmpId(e.target.value)}}
                    name="EmpId"
                    onChange={myhandlechange}
                     />
                      <p style={{color:"red"}}>{formErrors.EmpId}</p>
                  </Col>
                  <Col lg="6">
                    <Form.Label>designation</Form.Label>
                    <Form.Control type="text"
                      // onChange={(e)=>{setEmail(e.target.value)}}
                      name="designation"
                    onChange={myhandlechange}

                      />
                       <p style={{color:"red"}}>{formErrors.designation}</p>
                  </Col>
                  <Col lg="6">
                    <Form.Label>Email ID</Form.Label>
                    <Form.Control type="text"
                      // onChange={(e)=>{setEmail(e.target.value)}}
                      name="email"
                    onChange={myhandlechange}

                      />
                       <p style={{color:"red"}}>{formErrors.email}</p>
                  </Col>
                  <Col lg="6">
                    <Form.Label>Phone No</Form.Label>
                    <Form.Control type="text" 
                    // onChange={(e)=>{setMobile(e.target.value)}}
                    name="mobile"
                    onChange={myhandlechange}
                    />
                     <p style={{color:"red"}}>{formErrors.mobile}</p>
                  </Col>
                  <Col lg="6">
                    <Form.Label>Location</Form.Label>
                    <Form.Control as="textarea" rows={1} 
                    // onChange={(e)=>{setLocation(e.target.value)}}
                    name="location"
                    onChange={myhandlechange}
                    />
                     <p style={{color:"red"}}>{formErrors.location}</p>
                  </Col>
                  <Col lg="6">
                    <Form.Label>Per day amount</Form.Label>
                    <Form.Control type="number"
                    // onChange={(e)=>{setLocation(e.target.value)}}
                    name="per_day_amount"
                    onChange={myhandlechange}
                    />
                     <p style={{color:"red"}}>{formErrors.per_day_amount}</p>
                  </Col>
                  <Col lg="6">
                    <Col lg="3">
                    <Button variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto" type='submit'>
                    <CsLineIcons /> <span>Submit</span>
                    </Button>
                    </Col>
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

export default adduser;
