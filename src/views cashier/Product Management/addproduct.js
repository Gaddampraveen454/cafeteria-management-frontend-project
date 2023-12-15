import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Card, Button, Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { useDispatch, useSelector } from 'react-redux';
import { StoreProductAddURL } from 'Redux/CashierRedux/Product/ProductRedux';
import { StoreCategoryDropDownL } from 'Redux/CashierRedux/StoreCategoryRedux/storeCategoryRedux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CompanyDropDown } from 'Redux/AdminRedux/Comapny/Company';
import axios from 'axios';

const addproduct = () => {

  const dispatch = useDispatch()
  const history = useHistory();
  const title = 'Add Product';
  const description = 'Ecommerce Product Management Page';

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('')

  const [selectType, setSelectType] = useState();
  const [selectCategory, setSelectCategory] = useState();
  const [selectCompany, setSelectCompany] = useState();
  const [UploadedFile, setUploadedFile] = useState("")


  const optionsType = [
    { value: 'veg', label: 'veg' },
    { value: 'non-veg', label: 'non-veg' },
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
  const { categoryData, categoryDropdown } = useSelector((state) => state.StorecategorySlice)
  const { companyData, companyDropData } = useSelector((state) => state.companyList)
  const { ProductData, notification } = useSelector((state) => state.StoreproductSlice)


  const productList = categoryDropdown && categoryDropdown.data && categoryDropdown.data.map((item) => { return { label: item.name, value: item.uuid } })

  const companyList = companyDropData && companyDropData.data && companyDropData.data.map((item) => { return { label: item.company_name, value: item.uuid } })


  useEffect(() => {
    dispatch(StoreCategoryDropDownL(currentUser?.data?.uuid))
    dispatch(CompanyDropDown())
  }, [])






  const [suc, setSuc] = useState(false);
  const [sortorder, setSortOrder] = useState("")
  const [error, setError] = useState("");
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [stockQuantity, setStockQuantity] = useState("")
  const [cgst, setCgst] = useState("")
  const [sgst, setSgst] = useState("")
  const [descriptionvalue, setDescriptionvalue] = useState('');
  const [image, setImage] = useState(null);


  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };







  const AddProduct = (event) => {
    event.preventDefault()
    const payload = {
      // "name" : name,
      // "type" : selectType && selectType.value,
      // "category_uuid" : selectCategory && selectCategory.value,
      // "price" : price,
      // "quantity" : quantity,
      // "stock_quantity" : 20,
      // "company_uuid" : selectCompany && selectCompany.value,


      "name": name,
      "type": selectType && selectType.value,
      "category_uuid": selectCategory && selectCategory.value,
      "price": price,
      "quantity": quantity,
      "company_uuid": currentUser?.data?.company_uuid,
      "image": UploadedFile,
      "stock_quantity": stockQuantity,
      "cgst_tax": cgst,
      "sgst_tax": sgst,
      "store_uuid": currentUser?.data?.uuid,
      "description": descriptionvalue,
      "sort_order": sortorder
    }
    dispatch(StoreProductAddURL(payload, currentUser.token))
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
            pathname: "/Storeproduct",
            // state : {detail : id,fullname : name, pic :image, type:"edit"},
          }));
        }, 2000)
      }
      else if (notification.status === false) {
        toast.error(notification?.message)
        setSuc(false)
      }
    }

  }, [notification])



  const handleSubmit = () => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    axios.post(`${process.env.REACT_APP_URL}/product/upload/image`, formData,
      {
        headers: {
          "x-access-token": `${currentUser.token}`,
        }
      })
      .then(res => {
        console.log(res.data.image, "resp00");
        setUploadedFile(res.data.image.filename)

      })
      .catch(err => {
        console.log(err, "err00")

      });
  }

  useEffect(() => {
    if (image !== null) {
      handleSubmit()
    }

  }, [image])
  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title Start */}
      <div className="page-title-container">
        <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back mb-2" to="/Storeproduct">
          <CsLineIcons icon="chevron-left" size="20" />
          <span className="align-middle text-medium ms-1">Product Management</span>
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
              <Form onSubmit={AddProduct}>
                <Row className="g-3">
                  <Col lg="6">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" onChange={(e) => { setName(e.target.value) }} />
                  </Col>
                  {/* <Col lg="6">
                    <Form.Label>Company</Form.Label>
                    <Select classNamePrefix="react-select" options={companyList} value={selectCompany} onChange={setSelectCompany} placeholder="" />
                  </Col> */}
                  <Col lg="6">
                    <Form.Label>Category</Form.Label>
                    <Select classNamePrefix="react-select" options={productList} value={selectCategory} onChange={setSelectCategory} placeholder="" />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Veg/Non Veg</Form.Label>

                    <Select classNamePrefix="react-select" options={optionsType} value={selectType} onChange={setSelectType} placeholder="" />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" onChange={(e) => { setPrice(e.target.value) }} />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="text" rows={1} onChange={(e) => { setQuantity(e.target.value) }} />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Stock Quantity</Form.Label>
                    <Form.Control type="text" rows={1} onChange={(e) => { setStockQuantity(e.target.value) }} />
                  </Col>
                  <Col lg="6">
                    <Form.Label>CGST(%)</Form.Label>
                    <Form.Control type="text" rows={1} onChange={(e) => { setCgst(e.target.value) }} />
                  </Col>
                  <Col lg="6">
                    <Form.Label>SGST(%)</Form.Label>
                    <Form.Control type="text" rows={1} onChange={(e) => { setSgst(e.target.value) }} />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" rows={1} onChange={(e) => { setDescriptionvalue(e.target.value) }} />
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
                  <Col lg="6">
                    <div>
                      <Form.Label>File</Form.Label>
                      <Form.Control type="file" onChange={handleImageChange} />
                      {/* <input type="file" onChange={handleImageChange} /> */}
                    </div>
                  </Col>
                  {/* <Col  lg="6"> */}
                  <div>
                    {image && (
                      <div >
                        <img src={URL.createObjectURL(image)} alt="Preview" style={{ width: "200px", height: "200px" }} />
                      </div>
                    )}
                  </div>
                  <Col lg="12">
                    <Col lg="3">
                      <Button variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto" type="submit">
                        <CsLineIcons /> <span>Submit</span>
                      </Button>
                    </Col>
                  </Col>
                  {/* <Col lg="4">
                    <Form.Label>State</Form.Label>
                    <Select classNamePrefix="react-select" options={optionsType} value={selectType} onChange={setSelectType} placeholder="" />
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

export default addproduct;
