import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useHistory, useParams, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from 'hooks/useWindowSize';
import { ProductForConsumerListURL } from 'Redux/ConsumerRedux/Product/ProductRedux';
import { categoryForConsumerListURL } from 'Redux/ConsumerRedux/Category/CategoryRedux';
import { CartListURL, addToCartURL, updateCartURL, deleteToCartURL, ConsumerCartListURL } from 'Redux/ConsumerRedux/Cart/CartRedux';
import Rating from 'react-rating';
import Clamp from 'components/clamp';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Pagination, Modal, InputGroup } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { QrReader } from 'react-qr-reader';
import QrReader from "react-web-qr-reader";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
} from '@mui/material';
import Select from 'react-select';
import Cardsdetails from './Cardsdetails';
import GreenDot from '../../Assests/images/GreenDot.png';
import Cart from './Cart';




// import FilterMenuContent from "../storefront/filters/components/FilterMenuContent";





const MenuForCashier = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const title = 'Menu';
  const title1 = 'Cart list';
  const description = 'Ecommerce Storefront Filters Page';
  const { id } = useParams();
  console.log(id, "dsfsdfsdfsdf")


  // const [cmpid, newid] = id.split("=")
  // console.log(newid, "sdfsdsdfsdfsdfdsfsdf")
  console.log(window.location.pathname, "sdfsdfsdfsdfsdfsd")
  const { themeValues } = useSelector((state) => state.settings);
  const lgBreakpoint = parseInt(themeValues.lg.replace('px', ''), 10);
  const { width } = useWindowSize();
  const [isLgScreen, setIsLgScreen] = useState(false);
  const [isOpenFiltersModal, setIsOpenFiltersModal] = useState(true);
  const [categoryID, setCategoryID] = useState("")
  const [suc, setSuc] = useState(false);
  const [value, setValue] = useState(0);
  const [handleopen, sethandleopen] = useState(true)
  console.log(handleopen,"handleopencsdfvdfv")

  const [open, setOpen] = React.useState(false);
  const [result1, setResult1] = useState();

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('')
  const [amount, setAmount] = useState("")
  console.log(amount,"amount")
  const [message, setMessage] = useState("")
  const [category, setCategory] = useState("")

  // const [data, setData] = useState('No result');
  const delay = 500;

  const previewStyle = {
    // height: 200,

    width: 280
  };




  const [items, setItems] = useState([]);

  const [name, setName] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [selectPaymentType, setSelectPaymentType] = useState("");
  const optionsPayment = [
    { value: 'CASH', label: 'Cash ' },
    { value: 'UPI', label: 'UPI' },
    { value: 'CREDIT_CARD', label: 'Credit Card' },
    { value: 'DEBID_CARD', label: 'Debit Card' }

  ];





  const { currentUser } = useSelector((state) => state.auth)









  useEffect(() => {
    if (width) {
      if (width >= lgBreakpoint) {
        if (!isLgScreen) setIsLgScreen(true);
        if (isOpenFiltersModal) setIsOpenFiltersModal(false);
      } else if (isLgScreen) setIsLgScreen(false);
    }
    return () => { };
    // eslint-disable-next-line
  }, [width]);

  const allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [selectedItems, setSelectedItems] = useState([]);
  const checkItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((x) => x !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  const toggleCheckAll = (allSelect) => {
    if (allSelect) {
      setSelectedItems(allItems);
    } else {
      setSelectedItems([]);
    }
  };
  const { categoryForConsumer } = useSelector((state) => state.categoryForConsumerList)
  const { ProductForConsumer } = useSelector((state) => state.ProductForConsumerList)
  const { CartData, notification } = useSelector((state) => state.CartList)

  console.log(currentUser, "currentUser")









  useEffect(() => {
    if (suc === true) {
      if (notification.status === true) {
        toast.success(
          notification.message,
          // "Successfully Added",
          {
            position: "top-right",
          })
        if (currentUser && currentUser.data && currentUser.data.group === "consumer") {
          // dispatch(ConsumerCartListURL(currentUser && currentUser.data && currentUser.data.uuid))
          setSuc(false)
        } else {
          // dispatch(CartListURL(ip))
          setSuc(false)
        }



      }
      else if (notification.status === false) {
        toast.error(notification.message)
        setSuc(false)
      }
    }

  }, [notification])


  console.log(notification, "ProductDataProductData")

  const handleModel = () => {
    setIsOpenFiltersModal(false)
  }
  useEffect(() => {
    if (window.location.pathname === "/menu/qr" || window.location.pathname === "/menu/undefined") {
      toast.error("Please Scan the QR code")
    }
  }, [window.location.pathname])






  const onInput = (event) => {
    setValue(event.target.value || 0);
  };

  const spinUp = () => {
    setValue(parseInt(typeof value === 'number' ? value : 0, 10) + 1);
  };

  const spinDown = () => {
    if (value === 1) {
      setValue(1)
    }
    else {
      setValue(parseInt(typeof value === 'number' ? value : 0, 10) - 1);
    }

  };



  const prod = ProductForConsumer && ProductForConsumer.data && ProductForConsumer.data.map((item) => {
    return item.uuid
  })
  console.log(prod, "sdfsdfsdfsdfsdfdsf")



  const prodCart = CartData && CartData.data && CartData.data.map((item) => {
    return item.item_uuid
  })






  useEffect(() => {
    dispatch(categoryForConsumerListURL())

    // currentUser.data.company_uuid
  }, [])

  useEffect(() => {
    if (categoryForConsumer) {
      setCategory(categoryForConsumer && categoryForConsumer.data && categoryForConsumer.data[0] && categoryForConsumer.data[0].uuid)
    }
  }, [categoryForConsumer])


  const searchfunction = (type, pages) => {
    console.log(pages, type, "ghjkfgdvxvxvcvcfgssdvbnm")
    if (type === "search") {
      console.log(pages, type, "ghjkfgdfgssdvbnm")
      setSearch(pages)
      setPage(0)
      dispatch(ProductForConsumerListURL(currentUser.data.company_uuid, category, 0, pages, currentUser.token, limit))
    }
    if (type === "prev") {
      setPage(page - 1)
      dispatch(ProductForConsumerListURL(currentUser.data.company_uuid, category, page - 1, search, currentUser.token, limit))
    }
    else if (type === "next") {
      setPage(page + 1)
      dispatch(ProductForConsumerListURL(currentUser.data.company_uuid, category, page + 1, search, currentUser.token, limit))
    }
    else if (type === "page") {
      setPage(page)
      dispatch(ProductForConsumerListURL(currentUser.data.company_uuid, category, page, search, currentUser.token, limit))
    }
    else if (type === "page+1") {
      setPage(page + 1)
      dispatch(ProductForConsumerListURL(currentUser.data.company_uuid, category, page + 1, search, currentUser.token, limit))
    }
    else if (type === "page+2") {
      setPage(page + 2)
      dispatch(ProductForConsumerListURL(currentUser.data.company_uuid, category, page + 2, search, currentUser.token, limit))
    }
    else if (type === "limit") {
      setLimit(pages)
      setPage(0)
      dispatch(ProductForConsumerListURL(currentUser.data.company_uuid, category, 0, search, currentUser.token, pages))
    }
  }

  const addToCart = (event) => {
    console.log(event, "fsdfcvbcvbsdfsdfs")
    const newItem = {
      // id: items.length + 1,
      item_uuid: event.uuid,
      item_name: event.name,
      quantity: event.quantity
    };
    setItems([...items, newItem]);
    setName('');
    setQuantity('');

    console.log(event.stock_quantity, "jhjjgjhgjgjhg")

  }



  console.log(items, "items")



  const deleteItem = (id1) => {
    console.log(id1, "sdfdfdsfds")
    const filteredItems = items.filter(item => item.item_uuid !== id1);
    setItems(filteredItems);
  };



  const IncrimentItem = (event, qnt) => {
    console.log(event, "adsdsadasdasd")
    const arr = []
    items.map((check) => {
      if (check.item_uuid === event.uuid) {
        arr.push({
          item_name
            :
            event.name,
          item_uuid
            :
            // "PROD-1478CF5C",
            event.uuid,
          quantity
            :
            check.quantity + 1
        })
      }
      else {
        arr.push(check)
      }
      setItems(arr)
      return items;
    })
    // setItems([...items, newItem]);
    // const selectedItem = items.find(item => item.id === event.item_uuid);
    // setName(selectedItem.name);
    // setQuantity(selectedItem.value1);
    // deleteItem(id1);
  };

  const decrimentItem = (event, qnt) => {
    console.log(event, "adsdsadasdasd")
    const arr = []
    items.map((check) => {
      if (check.item_uuid === event.uuid) {
        arr.push({
          item_name
            :
            event.name,
          item_uuid
            :
            // "PROD-1478CF5C",
            event.uuid,
          quantity
            :
            check.quantity - 1
        })
      }
      else {
        arr.push(check)
      }
      setItems(arr)
      return items;
    })
    // setItems([...items, newItem]);
    // const selectedItem = items.find(item => item.id === event.item_uuid);
    // setName(selectedItem.name);
    // setQuantity(selectedItem.value1);
    // deleteItem(id1);
  };

  const decrimentItem1 = (event, qnt) => {
    console.log(event, "adsdsadasddf43asd")
    const arr = []
    items.map((check) => {
      if (check.item_uuid === event.item_uuid
      ) {
        arr.push({
          item_name: event.item_name,
          item_uuid: event.item_uuid,
          quantity: check.quantity - 1
        })
      }
      else {
        arr.push(check)
      }
      setItems(arr)
      return items;
    })
    // setItems([...items, newItem]);
    // const selectedItem = items.find(item => item.id === event.item_uuid);
    // setName(selectedItem.name);
    // setQuantity(selectedItem.value1);
    // deleteItem(id1);
  };

  const IncrimentItem1 = (event, qnt) => {
    console.log(event, "adsdsadasdasd")
    const arr = []
    items.map((check) => {
      if (check.item_uuid === event.item_uuid) {
        arr.push({
          item_name: event.item_name,
          item_uuid: event.item_uuid,
          quantity: check.quantity + 1
        })
      }
      else {
        arr.push(check)
      }
      setItems(arr)
      return items;
    })
    // setItems([...items, newItem]);
    // const selectedItem = items.find(item => item.id === event.item_uuid);
    // setName(selectedItem.name);
    // setQuantity(selectedItem.value1);
    // deleteItem(id1);
  };
  const updateItem = () => {
    const updatedItems = items.map(item => {
      if (item.name === name && item.value === value) {
        return item;
      }
      return {
        ...item,
        name,
        value
      }
    });
    setItems(updatedItems);
    setName('');
    setQuantity('');
  };




  const submitOrder = async (event) => {

    // event.preventDefault()

    const payload = {
      "company_uuid": currentUser.data.company_uuid,
      "item": items
    }

    axios.post(`${process.env.REACT_APP_URL}/order/cashier/calculation`, payload,
      {
        headers: {
          "x-auth-token": currentUser.token
        }
      })
      .then((respons) => {
        console.log(respons.data, "fffgdsfsdfdsf")
        setAmount(respons.data)


      })
      .catch((err) => {
        console.log(err.response.data.message, "zasdsadasd")




      })

  }

  useEffect(() => {
    submitOrder()
  }, [items])

  const submitOrderPlased = async (event) => {

    event.preventDefault()

    const payload = {
      "payment_type": selectPaymentType.value,
      "company_uuid": currentUser.data.company_uuid,
      "item": items
    }

    axios.post(`${process.env.REACT_APP_URL}/order/cashier/create`, payload,
      {
        headers: {
          "x-auth-token": currentUser.token
        }
      })
      .then((respons) => {
        console.log(respons.data.message, "fffgdsfsdfdsf")
        setItems([])
        setMessage(respons.data.message)
        sethandleopen(false)
        setOpen(true)

      })
      .catch((err) => {
        console.log(err.response.data, "zasdsadasd")
        toast.error(err.response.data)
        setSuc(false)

      })

  }

  // const redirect = () => {
  //   history.push({
  //      pathname: "/cashierMenu",
    
  //   })
  // }





  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title Start */}
      <div className="page-title-container">
        <Row className="g-0">
          {/* Title Start */}
          <Col className="col-auto mb-3 mb-sm-0 me-auto">
            {/* <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/dashboard"> */}
            <CsLineIcons icon="chevron-left" size="20" />
            <span className="align-middle text-medium ms-1">Home</span>
            {/* </NavLink> */}
            <h1 className="mb-0 pb-0 display-4" id="title">
              {title}
            </h1>
          </Col>
          {/* Title End */}
          {/* <Form.Control type="text" onChange={(event) => searchfunction("search", event.target.value)} placeholder="Search" /> */}

          <Row className="mb-3">
            <Col md="5" lg="3" xxl="2" className="mb-1">
              {/* Search Start */}
              {/* <Form.Label/> */}
              <div className="d-inline-block float-md-start me-1 mb-1 search-input-container w-100 shadow bg-foreground">

                <Form.Control type="text" onChange={(event) => searchfunction("search", event.target.value)} placeholder="Search" />
                <span className="search-magnifier-icon">
                  <CsLineIcons icon="search" />
                </span>
                <span className="search-delete-icon d-none">
                  <CsLineIcons icon="close" />
                </span>
              </div>
              {/* Search End */}
            </Col>


            {/* <Col lg="3">
          <Form.Label>Category</Form.Label>
          <Select classNamePrefix="react-select"
            options={productList}
            value={categoryId}
            onChange={setCategoryId}
            placeholder="Select Category"
            // disabled={eventType}
          />
        </Col> */}
            <Col md="7" lg="3" xxl="10" className="mb-1 text-end">

              {/* Length Start */}

              {/* Length End */}
            </Col>
          </Row>






        </Row>
      </div>
      {/* Title End */}

      <Row>
        {isLgScreen && (
          <Col lg="4" xl="4" className="d-none d-lg-block">
            {/* Filters Start */}
            <Card
              // style={{ position: "fixed", zIndex: "1", width: "18%", height: "auto" }}
              className="mb-5">
              <Card.Body>
                <Cardsdetails />
              </Card.Body>
            </Card>
            {/* <Cart 
              item={items}
            /> */}
            {/* Filters End */}




            <div className="page-title-container">
              <Row className="g-0">
                {/* Title Start */}
                <Col className="col-auto mb-3 mb-sm-0 me-auto">
                  {/* <CsLineIcons icon="chevron-left" size="20" /> */}
                  <h1 className="mb-0 pb-0 display-4" id="title">
                    {title1}
                  </h1>
                </Col>
                {/* Title End */}
              </Row>
            </div>
            {items && items.map((item) => {
              console.log(item, "itemcxxxvxcvxcv")
              return <>
                <Card className={`mb-2 ${selectedItems.includes(1) && 'selected'}`}>
                  <Row className="g-0 h-100 sh-lg-9 position-relative">

                    <Col className="py-4 py-lg-0 ps-5 pe-4 h-100">
                      <Row className="g-0 h-100 ">

                        <Col lg="7" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                          <div className="lh-1 text-alternate">{item.item_name}</div>

                        </Col>

                        <Col lg="5" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                          {/* <div className="lh-1 text-alternate">{item.quantity}</div> */}
                          <InputGroup className="spinner sw-11 ">
                            <InputGroup.Text id="basic-addon1">
                              <button type="button" className="spin-down single px-2"
                                onClick={() => { decrimentItem1(item, item.quantity - 1) }}
                                // onClick={() => { editItem(items && items.find(data1 => data1.item_uuid === item.uuid) ? items && items.find(data1 => data1.item_uuid === item.uuid) : 0, items && items.find(data1 => data1.item_uuid === item.uuid) ? items && items.find(data1 => data1.item_uuid === item.uuid).quantity - 1 : 0) }}
                                // disabled={btndisabl}

                                // disabled={items &&  items.find(data1 => data1.item_uuid === item.uuid).quantity===1 ? true : ""}
                                disabled={item.quantity === 1 ? true : ""}
                              >
                                -
                              </button>
                            </InputGroup.Text>
                            <Form.Control
                              value={item.quantity}
                              onInput={onInput}
                              placeholder="Count"
                              className="text-center"

                            />
                            <InputGroup.Text id="basic-addon2">
                              <button type="button" className="spin-up single px-2"
                                // onClick={() => { updateCart(CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid === item.uuid) ? CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid === item.uuid) : 0, CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid === item.uuid) ? CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid === item.uuid).quantity + 1 : 0) }}
                                // disabled={CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid === item.uuid) && CartData.data.find(data1 => data1.item_uuid === item.uuid).quantity === item.stock_quantity ? true : ""}
                                // onClick={() => { editItem(item) }}
                                onClick={() => { IncrimentItem1(item, item.quantity + 1) }}
                              >
                                +
                              </button>
                            </InputGroup.Text>
                          </InputGroup>

                        </Col>




















                        <Button size="sm"
                          className="btn-icon btn-icon-only position-absolute t-2 e-2 "
                          variant="foreground-alternate"
                          // onClick={() => { deleteToCart(item) }}
                          onClick={() => deleteItem(item.item_uuid)}
                        >
                          <CsLineIcons icon="error-hexagon" />
                        </Button>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </>

            })}

            {/* {handleopen === true ?  */}
            
              <Col xs="12" md="12" lg="12" xl="12">
                <Card className="h-100 hover-scale-up cursor-pointer sh-26">
                  <Card.Body className="pb-3">
                  <Row >
                    {/* <img src={item.image_url} alt="GreenDot" style={{ width: "10%" }} className="heading mb-3 d-flex" crossOrigin="anonymous" />
                    <Row >
                      <Form.Check className="form-check" checked={selectedItems.includes(1)} onChange={() => checkItem(1)} />
                      <Col xs="8" sm="8" md="8" lg="8">
                        <NavLink to="#" className="body-link d-block sh-4 mb-0 h6 heading">
                          <Clamp tag="span" clamp="2">
                            Total Amount
                          </Clamp>
                        </NavLink>

                      </Col>
                      <Col xs="4" sm="4" md="4" lg="4">
                        <NavLink to="#" className="body-link d-block sh-4 mb-0 h6 heading">
                          <Clamp tag="span" clamp="2">
                            ₹{amount.total_amount}
                          </Clamp>
                        </NavLink>

                      </Col> */}
                      <div className="mb-4">
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">ITEMS</p>
                  <p>
                    <span className="text-alternate"> {amount.count}</span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">TOTAL</p>
                  <p>
                    <span className="text-alternate">
                      <span className="text-small text-muted">₹</span>
                      {amount.amount}
                    </span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">SHIPPING</p>
                  <p>
                    <span className="text-alternate">
                      <span className="text-small text-muted">₹</span>
                      0
                    </span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">CGST(%)</p>
                  <p>
                    <span className="text-alternate">
                      <span className="text-small text-muted">₹</span>
                      {amount.cgst_tax} 
                    </span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">SGST(%)</p>
                  <p>
                    <span className="text-alternate">
                      <span className="text-small text-muted">₹</span>
                      {amount.sgst_tax} 
                    </span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-small text-muted mb-1">GRAND TOTAL</p>
                  <div className="cta-2">
                    <span>
                      <span className="text-small text-muted cta-2">₹</span>
                      {amount.total_amount}
                    </span>
                  </div>
                </div>
              </div>

                      <Col xs="12" sm="12" md="12" lg="12">

                        <Select classNamePrefix="react-select" options={optionsPayment} value={selectPaymentType} onChange={setSelectPaymentType} placeholder="select Payment Type" />

                      </Col>
                      <br />
                      <br />
                      <Col xs="12" sm="12" md="12" lg="12">
                        <Button className="btn-icon btn-icon-end w-100" variant="primary"
                          onClick={submitOrderPlased}
                        >
                          <span>Proceed to checkout</span> <CsLineIcons icon="chevron-right" />
                        </Button>
                      </Col>
                    </Row>

                  </Card.Body>
                </Card>

              </Col>
              : ""
            {/* } */}
          </Col>
          
        )}
       
        <Col style={{ position: "sticky" }} lg="8" xl="8">

          <div id="firstcolumn">
            {/* <Form className="mb-5">
              <p className="text-large text-muted mb-2">Happy New Year 2023 Combos</p>
            </Form> */}
            {/* Product Thumbnails Start */}
            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-2 row-cols-xl-3 g-2 mb-5">
              {ProductForConsumer && ProductForConsumer.data && ProductForConsumer.data.map((item, index) => {
                console.log(item, "sfsdfdsfsdfsdf")
                return <>

                  <Col xs="12" md="4" lg="4" xl="4">
                    <Card className="h-100 hover-scale-up cursor-pointer sh-26">
                      <Card.Body className="pb-3">
                        {/* <img src={item.image_url} alt="GreenDot" style={{ width: "10%" }} className="heading mb-3 d-flex" crossOrigin="anonymous" /> */}
                        <Row >
                          {/* <Form.Check className="form-check" checked={selectedItems.includes(1)} onChange={() => checkItem(1)} /> */}
                          <Col xs="7" sm="7" md="7" lg="7">
                            <NavLink to="#" className="body-link d-block sh-4 mb-0 h6 heading">
                              <Clamp tag="span" clamp="2">
                                {item.name}
                              </Clamp>
                            </NavLink>
                            ₹{item.sellng_price}
                          </Col>
                          {/* <Col> &nbsp;</Col> */}
                          {/*                          
                          <Col xs="6" sm="4" md="4" lg="4">
                          <img src={item.image_url} alt="GreenDot" style={{ width: "80%", height: "auto" }} className="heading d-flex fluid-img" crossOrigin="anonymous" />
                         </Col> */}

                          <Col xs="5" sm="5" md="5" lg="5">
                            {/* <NavLink  to="/"> */}
                            {/* <img src={item.image_url} alt="GreenDot" style={{ width: "80%", height: "auto" }} className="heading d-flex fluid-img" crossOrigin="anonymous" /> */}
                            <div>
                              {
                                item.stock_quantity <= 0 ?
                                  <Col style={{ color: "red" }}>
                                    Out of Stock
                                  </Col>
                                  :
                                  <div>
                                    {item.stock_quantity <= 5 ?
                                      <Col style={{ color: "red" }}>
                                        Only {item.stock_quantity} Item Left
                                      </Col>
                                      :
                                      null
                                    }

                                    {
                                      items && items.find(data1 => data1.item_uuid === item.uuid) !== undefined ?


                                        <InputGroup className="spinner sw-11">
                                          <InputGroup.Text id="basic-addon1">
                                            <button type="button" className="spin-down single px-2"
                                              onClick={() => { decrimentItem(item, item.quantity - 1) }}
                                              // onClick={() => { editItem(items && items.find(data1 => data1.item_uuid === item.uuid) ? items && items.find(data1 => data1.item_uuid === item.uuid) : 0, items && items.find(data1 => data1.item_uuid === item.uuid) ? items && items.find(data1 => data1.item_uuid === item.uuid).quantity - 1 : 0) }}
                                              // disabled={btndisabl}

                                              disabled={items && items.find(data1 => data1.item_uuid === item.uuid).quantity === 1 ? true : ""}

                                            >
                                              -
                                            </button>
                                          </InputGroup.Text>
                                          <Form.Control
                                            value={items && items.find(data1 => data1.item_uuid === item.uuid) ? items && items.find(data1 => data1.item_uuid === item.uuid).quantity : 0}
                                            onInput={onInput}
                                            placeholder="Count"
                                            className="text-center"

                                          />
                                          <InputGroup.Text id="basic-addon2">
                                            <button type="button" className="spin-up single px-2"
                                              // onClick={() => { updateCart(CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid === item.uuid) ? CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid === item.uuid) : 0, CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid === item.uuid) ? CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid === item.uuid).quantity + 1 : 0) }}
                                              // disabled={CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid === item.uuid) && CartData.data.find(data1 => data1.item_uuid === item.uuid).quantity === item.stock_quantity ? true : ""}
                                              // onClick={() => { editItem(item) }}
                                              onClick={() => { IncrimentItem(item, item.quantity + 1) }}
                                            >
                                              +
                                            </button>
                                          </InputGroup.Text>
                                        </InputGroup>
                                        :
                                        <Button variant="outline-primary"
                                          className="btn-icon btn-icon-start ms-0 ms-xs-auto ms-sm-auto w-100 w-md-auto"
                                          onClick={() => { addToCart(item) }}
                                        >
                                          <CsLineIcons icon="plus" /><span>Add</span>
                                        </Button>
                                    }

                                  </div>
                              }
                            </div>
                            {
                              console.log(CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid === item.uuid) ? CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid === item.uuid).quantity : "0", "dfsfsdf")

                            }




                            {/* <InputGroup className="spinner sw-11">
                              <InputGroup.Text id="basic-addon1">
                                <button type="button" className="spin-down single px-2"
                                  // onClick={updateCart(item)}
                                  onClick={() => { updateCart(CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid===item.uuid)?CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid===item.uuid):0,CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid===item.uuid)?CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid===item.uuid).quantity-1:0) }}
                                // disabled={btndisabl}
                                >
                                  -
                                </button>
                              </InputGroup.Text>
                              <Form.Control
                                value={CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid===item.uuid)?CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid===item.uuid).quantity:0}
                                onInput={onInput}
                                placeholder="Count"
                                className="text-center"

                              />
                              <InputGroup.Text id="basic-addon2">
                                <button type="button" className="spin-up single px-2"
                                   onClick={() => { updateCart(CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid===item.uuid)?CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid===item.uuid):0,CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid===item.uuid)?CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid===item.uuid).quantity+1:0) }}
                                >
                                  +
                                </button>
                              </InputGroup.Text>
                            </InputGroup> */}
                          </Col>




                        </Row>

                      </Card.Body>
                    </Card>
                    <Card.Footer>

                      {/* <div className="mb-2">

                    <Rating
                      initialRating={5}
                      readonly
                      emptySymbol={<i className="cs-star text-primary" />}
                      fullSymbol={<i className="cs-star-full text-primary" />}
                    />
                    <div className="text-muted d-inline-block text-small align-text-top ms-1">(22)</div>
                  </div> */}
                      <div className="card-text">
                        {/* <div className="text-muted text-overline text-small">
                      <del>$ 14.25</del>
                    </div> */}

                      </div>
                    </Card.Footer>
                  </Col>
                </>

              })}


            </Row>
          </div>














          {/* Product Thumbnails End */}


          {/* Pagination Start */}
          <div className="d-flex justify-content-center mt-5">
            <Pagination>
              <Pagination.Prev className="shadow" disabled={page === 0} onClick={() => searchfunction("prev")}>
                <CsLineIcons icon="chevron-left" />
              </Pagination.Prev>
              <Pagination.Item className="shadow" active onClick={() => searchfunction("page")} >
                {page + 1}
              </Pagination.Item>
              <Pagination.Item className="shadow" disabled={Math.ceil(ProductForConsumer && ProductForConsumer.count / limit) <= page + 1} onClick={() => searchfunction("page+1", page + 1)}>{page + 2}</Pagination.Item>
              <Pagination.Item className="shadow" disabled={Math.ceil(ProductForConsumer && ProductForConsumer.count / limit) <= page + 2} onClick={() => searchfunction("page+2", page + 2)}>{page + 3}</Pagination.Item>

              {Math.ceil(ProductForConsumer && ProductForConsumer.count / limit) > page + 3 &&
                <>
                  <Pagination.Item className="shadow" >...</Pagination.Item>
                </>

              }
              <Pagination.Next className="shadow" disabled={Math.ceil(ProductForConsumer && ProductForConsumer.count / limit) <= page + 1} onClick={() => searchfunction("next")}>
                <CsLineIcons icon="chevron-right" />
              </Pagination.Next>
            </Pagination>
          </div>
          {/* Pagination End */}
        </Col>
      </Row>

      {/* Filters Modal Start */}
      {!isLgScreen && (
        <>

          <div className='settings-buttons-container'
            style={{
              marginTop: "130px",
              marginRight: "20px",
            }}
          >
            <Button
              style={{ borderRadius: "50%", width: "65px", height: "65px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", border: "2px solid #fff", }}

              onClick={() => setIsOpenFiltersModal(true)}
            >
              <CsLineIcons icon="menu" style={{ width: "80%", height: "auto" }} />
              <h6>Menu</h6>
            </Button>
          </div>
          <Modal className="modal-bottom" show={isOpenFiltersModal} onHide={() => setIsOpenFiltersModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title as="div">Menu</Modal.Title>
            </Modal.Header>
            <Modal.Body >
              <Cardsdetails
                onClose={handleModel}
              />
            </Modal.Body>
          </Modal>

        </>
      )}
      {/* Filters Modal End */}


      {/* edit view popup start */}
      {/* <div> */}
      <Dialog
        open={open}
        onClose={() => {setOpen(false);sethandleopen(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ padding: "30px" }}

      >


        <DialogContent style={{ width: "100%", height: "100%" }}>
          {/* <QrReader
            delay={delay}
            style={previewStyle}
            onError={handleError}
            onScan={handleScan}
          /> */}
          {message}
          <br />
          <br />
          {/* <Button styele={{ width: "100%"}} onClick={() => setOpen(false)}>Close</Button> */}


          <Col lg="12" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
            <Button className="btn-icon btn-icon-end w-100" variant="primary"
              onClick={() =>{setOpen(false);sethandleopen(false)}}
            >
              <span>Close</span> <CsLineIcons icon="chevron-right" />
            </Button>
          </Col>
        </DialogContent>
      </Dialog>
      {/* </div> */}
    </>
  );
};

export default MenuForCashier;
