import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from 'hooks/useWindowSize';
import { ProductForConsumerListURL } from 'Redux/ConsumerRedux/Product/ProductRedux';
import { categoryForConsumerListURL } from 'Redux/ConsumerRedux/Category/CategoryRedux';
import { addToCartURL } from 'Redux/ConsumerRedux/Cart/CartRedux';
import Rating from 'react-rating';
import Clamp from 'components/clamp';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Pagination, Modal } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cardsdetails from './Cardsdetails';
import GreenDot from '../../Assests/images/GreenDot.png';
// import FilterMenuContent from "../storefront/filters/components/FilterMenuContent";





const Menu = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const title = 'Menu';
  const description = 'Ecommerce Storefront Filters Page';

  const { themeValues } = useSelector((state) => state.settings);
  const lgBreakpoint = parseInt(themeValues.lg.replace('px', ''), 10);
  const { width } = useWindowSize();
  const [isLgScreen, setIsLgScreen] = useState(false);
  const [isOpenFiltersModal, setIsOpenFiltersModal] = useState(false);
  const [category, setCategory] = useState("")
  const [suc, setSuc] = useState(false);



  const [ip, setIP] = useState('');
  console.log(ip, "dsfsdfdsfdsfsd")
  const getData = async () => {
    const res = await axios.get('https://ipapi.co/json/')
    console.log(res.data);
    setIP(res.data.ip)
  }

  useEffect(() => {
    getData()
  }, [])

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
  console.log(categoryForConsumer, "sjdfjsffsfdfsf")





  const addToCart = (event) => {
    console.log(event, "jhjjgjhgjgjhg")
    // event.preventDefault()
    // const value = event.target.elements
    const payload = {
      "item_uuid": event.uuid,
      "quantity": 1,
      "ip_address": ip
    }
    dispatch(addToCartURL(payload))
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
            pathname: "/Cardcart",

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

  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title Start */}
      <div className="page-title-container">
        <Row className="g-0">
          {/* Title Start */}
          <Col className="col-auto mb-3 mb-sm-0 me-auto">
            <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/dashboard">
              <CsLineIcons icon="chevron-left" size="20" />
              <span className="align-middle text-medium ms-1">Home</span>
            </NavLink>
            <h1 className="mb-0 pb-0 display-4" id="title">
              {title}
            </h1>
          </Col>
          {/* Title End */}

          {/* Top Buttons Start */}

          <Col xs="12" sm="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
            <NavLink to="/Cardcart">
              <Button variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto">
                <CsLineIcons icon="cart" /><span> Cart</span>
              </Button>
            </NavLink>
            <Dropdown className="ms-1 w-100 w-md-auto" align="end">
              <Dropdown.Toggle variant="outline-primary" className="w-100 w-md-auto">
                Order: Default
              </Dropdown.Toggle>
              <Dropdown.Menu align="end" className="w-100 w-md-auto">
                <Dropdown.Item>Default</Dropdown.Item>
                <Dropdown.Item>Price Asc</Dropdown.Item>
                <Dropdown.Item>Price Desc</Dropdown.Item>
                <Dropdown.Item>Rating</Dropdown.Item>
                <Dropdown.Item>Newest</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
           
          </Col>
          {/* <Col 
         
          >
           
          </Col> */}
          {/* Top Buttons End */}
        </Row>
      </div>
      {/* Title End */}

      <Row>
        {isLgScreen && (
          <Col lg="4" xl="3" className="d-none d-lg-block">
            {/* Filters Start */}
            <Card style={{ position: "fixed", zIndex: "1" }} className="mb-5">
              <Card.Body>
                <Cardsdetails />
              </Card.Body>
            </Card>
            {/* Filters End */}
          </Col>
        )}

        <Col style={{ position: "sticky" }} lg="8" xl="9">

          <div id="firstcolumn">
            <Form className="mb-5">
              <p className="text-large text-muted mb-2">Happy New Year 2023 Combos</p>
            </Form>
            {/* Product Thumbnails Start */}
            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-2 row-cols-xl-3 g-2 mb-5">
              {ProductForConsumer && ProductForConsumer.data && ProductForConsumer.data.map((item) => {
                return <>
                  <Col xs="12" md="6" lg="6" xl="6">
                    <Card className="h-100 hover-scale-up cursor-pointer">
                      <Card.Body className="pb-3">
                        <img src={item.image_url} alt="GreenDot" style={{ width: "50%" }} className="heading mb-3 d-flex" crossOrigin="anonymous" />
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} className="heading mb-0 d-flex">

                          {/* <Form.Check className="form-check" checked={selectedItems.includes(1)} onChange={() => checkItem(1)} /> */}
                          <div style={{ float: "left" }}>
                            <NavLink to="#" className="body-link d-block sh-5 mb-0 h6 heading lh-1-5">
                              <Clamp tag="span" clamp="2">
                                {item.name}
                              </Clamp>
                            </NavLink>
                          </div>
                          <div style={{ float: "right" }}>
                            {/* <NavLink  to="/"> */}
                            <Button variant="outline-primary"
                              className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto"
                              onClick={() => { addToCart(item) }}
                            >
                              <CsLineIcons icon="plus" /><span>Add</span>
                            </Button>
                            {/* </NavLink> */}
                          </div>

                        </div> <br />
                        <div>₹{item.price}</div>
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
              <Pagination.Prev className="shadow" disabled>
                <CsLineIcons icon="chevron-left" />
              </Pagination.Prev>
              <Pagination.Item className="shadow" active>
                1
              </Pagination.Item>
              <Pagination.Item className="shadow">2</Pagination.Item>
              <Pagination.Item className="shadow">3</Pagination.Item>
              <Pagination.Next className="shadow">
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
             style={{marginTop:"-200px"}}
            >
              <Button
              style={{padding:"10px"}}
              
                onClick={() => setIsOpenFiltersModal(true)}
                >
                <CsLineIcons icon="menu" /> <br />
                <h5>Menu</h5>
              </Button>
            </div>
        <Modal className="modal-left" show={isOpenFiltersModal} onHide={() => setIsOpenFiltersModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title as="div">Filters</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Cardsdetails
            // onClose={setIsOpenFiltersModal(false)}
             />
          </Modal.Body>
        </Modal>
        </>
      )}
      {/* Filters Modal End */}
    </>
  );
};

export default Menu;
