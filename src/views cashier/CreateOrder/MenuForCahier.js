import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useHistory, useParams, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from 'hooks/useWindowSize';
import { ProductForConsumerListURL } from 'Redux/ConsumerRedux/Product/ProductRedux';
import { StoreProductListURL, StoreProductsList } from 'Redux/CashierRedux/Product/ProductRedux';
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
import QrReader from 'react-web-qr-reader';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input } from '@mui/material';
import Select from 'react-select';
import Cardsdetails from './Cardsdetails';
import GreenDot from '../../Assests/images/GreenDot.png';
import Cart from './Cart';
import './MenuForCahier.css';

// import FilterMenuContent from "../storefront/filters/components/FilterMenuContent";

const MenuForCashier = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const title = 'Menu';
  const title1 = 'Cart list';
  const description = 'Ecommerce Storefront Filters Page';
  const { id } = useParams();
  console.log(id, 'dsfsdfsdfsdf');

  // const [cmpid, newid] = id.split("=")
  // console.log(newid, "sdfsdsdfsdfsdfdsfsdf")
  console.log(window.location.pathname, 'sdfsdfsdfsdfsdfsd');
  const { themeValues } = useSelector((state) => state.settings);
  const lgBreakpoint = parseInt(themeValues.lg.replace('px', ''), 10);
  const { width } = useWindowSize();
  const [isLgScreen, setIsLgScreen] = useState(false);
  const [isOpenFiltersModal, setIsOpenFiltersModal] = useState(true);
  const [categoryID, setCategoryID] = useState('');
  const [suc, setSuc] = useState(false);
  const [value, setValue] = useState(0);
  const [handleopen, sethandleopen] = useState(true);
  console.log(handleopen, 'handleopencsdfvdfv');

  const [open, setOpen] = React.useState(false);
  const [result, setResult] = useState(1);

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [amount, setAmount] = useState('');
  console.log(amount, 'amount');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');

  // const [data, setData] = useState('No result');
  const delay = 500;

  const previewStyle = {
    // height: 200,

    width: 280,
  };

  const [items, setItems] = useState([]);
  console.log(items, 'hgdssavj');

  const [name, setName] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [selectPaymentType, setSelectPaymentType] = useState({ value: 'CASH', label: 'Cash' });
  let selectPaymentType1;
  if (selectPaymentType?.value === undefined) {
    selectPaymentType1 = '';
  } else {
    selectPaymentType1 = selectPaymentType?.value;
  }
  const optionsPayment = [
    { value: 'CASH', label: 'Cash ' },
    { value: 'UPI', label: 'UPI' },
    { value: 'CREDIT_CARD', label: 'Credit Card' },
    { value: 'DEBID_CARD', label: 'Debit Card' },
  ];

  const { currentUser } = useSelector((state) => state.auth);

  console.log(currentUser, 'currentUserhj');
  const [print, setPrint] = useState(false);
  const [printData, setPrintData] = useState('');

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
  const { categoryForConsumer } = useSelector((state) => state.categoryForConsumerList);
  const { ProductForConsumer } = useSelector((state) => state.ProductForConsumerList);
  const { storeProductsList } = useSelector((state) => state.StoreproductSlice);
  console.log(ProductForConsumer, 'bhebfhwvefgveff');
  const { CartData, notification } = useSelector((state) => state.CartList);

  console.log(categoryForConsumer, 'categoryForConsumer');

  useEffect(() => {
    if (suc === true) {
      if (notification.status === true) {
        toast.success(
          notification.message,
          // "Successfully Added",
          {
            position: 'top-right',
          }
        );
        if (currentUser && currentUser.data && currentUser.data.group === 'consumer') {
          // dispatch(ConsumerCartListURL(currentUser && currentUser.data && currentUser.data.uuid))
          setSuc(false);
        } else {
          // dispatch(CartListURL(ip))
          setSuc(false);
        }
      } else if (notification.status === false) {
        toast.error(notification.message);
        setSuc(false);
      }
    }
  }, [notification]);

  console.log(notification, 'ProductDataProductData');

  const handleModel = () => {
    setIsOpenFiltersModal(false);
  };
  useEffect(() => {
    if (window.location.pathname === '/menu/qr' || window.location.pathname === '/menu/undefined') {
      toast.error('Please Scan the QR code');
    }
  }, [window.location.pathname]);

  const onInput = (event) => {
    setValue(event.target.value || 0);
  };

  const spinUp = () => {
    setValue(parseInt(typeof value === 'number' ? value : 0, 10) + 1);
  };

  const spinDown = () => {
    if (value === 1) {
      setValue(1);
    } else {
      setValue(parseInt(typeof value === 'number' ? value : 0, 10) - 1);
    }
  };

  const [vegtype, setVegType] = useState("");

  const optionsVegType = [
    { value: "", label: 'ALL' },
    { value: 'veg', label: 'VEG' },
    { value: 'non-veg', label: 'NON-VEG' },
  ];

  const SelectVegFunction = (type) => {
    console.log(type, "gsdhfgkdshkfjh")
    setVegType(type?.value)
    dispatch(StoreProductsList(currentUser?.token, currentUser?.data?.uuid, search, type?.value));
  }

  // const prod = ProductForConsumer && ProductForConsumer.data && ProductForConsumer.data.map((item) => {
  //   return item.uuid
  // })
  // const prod = ProductData && ProductData.data && ProductData.data.map((item) => {
  //   return item.uuid
  // })
  // console.log(prod, "sdfsdfsdfsdfsdfdsf")

  const prodCart =
    CartData &&
    CartData.data &&
    CartData.data.map((item) => {
      return item.item_uuid;
    });

  useEffect(() => {
    dispatch(categoryForConsumerListURL(currentUser?.data?.company_uuid, currentUser?.data?.uuid));

    // currentUser.data.company_uuid
  }, []);

  useEffect(() => {
    if (categoryForConsumer) {
      setCategory(categoryForConsumer && categoryForConsumer.data && categoryForConsumer.data[0] && categoryForConsumer.data[0].uuid);
    }
  }, [categoryForConsumer]);

  useEffect(() => {
    dispatch(StoreProductsList(currentUser?.token, currentUser?.data?.uuid, search, vegtype));
  }, []);

  const searchfunction = (type, pages) => {
    console.log(pages, type, 'ghjkfgdvxvxvcvcfgssdvbnm');
    if (type === 'search') {
      console.log(pages, type, 'ghjkfgdfgssdvbnm');
      setSearch(pages);
      setPage(0);
      // dispatch(ProductForConsumerListURL(currentUser.data.company_uuid, category, 0, pages, currentUser.token, limit))
      dispatch(StoreProductsList(currentUser?.token, currentUser?.data?.uuid, pages, vegtype));
    }
    // if (type === "prev") {
    //   setPage(page - 1)
    //   // dispatch(ProductForConsumerListURL(currentUser.data.company_uuid, category, page - 1, search, currentUser.token, limit))
    //   dispatch(StoreProductListURL(page, search, currentUser.token, limit, currentUser?.data?.uuid, ""))
    // }
    // else if (type === "next") {
    //   setPage(page + 1)
    //   // dispatch(ProductForConsumerListURL(currentUser.data.company_uuid, category, page + 1, search, currentUser.token, limit))
    //   dispatch(StoreProductListURL(page, search, currentUser.token, limit, currentUser?.data?.uuid, ""))
    // }
    // else if (type === "page") {
    //   setPage(page)
    //   // dispatch(ProductForConsumerListURL(currentUser.data.company_uuid, category, page, search, currentUser.token, limit))
    //   dispatch(StoreProductListURL(page, search, currentUser.token, limit, currentUser?.data?.uuid, ""))
    // }
    // else if (type === "page+1") {
    //   setPage(page + 1)
    //   // dispatch(ProductForConsumerListURL(currentUser.data.company_uuid, category, page + 1, search, currentUser.token, limit))
    //   dispatch(StoreProductListURL(page, search, currentUser.token, limit, currentUser?.data?.uuid, ""))
    // }
    // else if (type === "page+2") {
    //   setPage(page + 2)
    //   // dispatch(ProductForConsumerListURL(currentUser.data.company_uuid, category, page + 2, search, currentUser.token, limit))
    //   dispatch(StoreProductListURL(page, search, currentUser.token, limit, currentUser?.data?.uuid, ""))
    // }
    // else if (type === "limit") {
    //   setLimit(pages)
    //   setPage(0)
    //   // dispatch(ProductForConsumerListURL(currentUser.data.company_uuid, category, 0, search, currentUser.token, pages))
    //   dispatch(StoreProductListURL(page, search, currentUser.token, limit, currentUser?.data?.uuid, ""))
    // }
  };

  const addToCart = (event) => {
    console.log(event, 'fsdfcvbcvbsdfsdfs');
    const newItem = {
      // id: items.length + 1,
      item_uuid: event.uuid,
      item_name: event.name,
      quantity: result,
    };
    setItems([...items, newItem]);
    setName('');
    setQuantity('');

    console.log(event.stock_quantity, 'jhjjgjhgjgjhg');
  };

  console.log(items, 'items');

  const deleteItem = (id1) => {
    console.log(id1, 'sdfdfdsfds');
    const filteredItems = items.filter((item) => item.item_uuid !== id1);
    setItems(filteredItems);
  };

  const IncrimentItem = (event, qnt) => {
    console.log(event, 'adsdsadasdasd');
    const arr = [];
    items.map((check) => {
      console.log(items, 'bdvhcbdhgv');
      if (check.item_uuid === event.uuid) {
        arr.push({
          item_name: event.name,
          item_uuid:
            // "PROD-1478CF5C",
            event.uuid,
          quantity: check.quantity + 1,
        });
      } else {
        arr.push(check);
      }
      setItems(arr);
      return items;
    });
    // setItems([...items, newItem]);
    // const selectedItem = items.find(item => item.id === event.item_uuid);
    // setName(selectedItem.name);
    // setQuantity(selectedItem.value1);
    // deleteItem(id1);
  };

  const decrimentItem = (event, qnt) => {
    console.log(event, 'adsdsadasdasd');
    const arr = [];
    items.map((check) => {
      console.log(items, 'ebchevcghev');
      if (check.item_uuid === event.uuid) {
        arr.push({
          item_name: event.name,
          item_uuid:
            // "PROD-1478CF5C",
            event.uuid,
          quantity: check.quantity - 1,
        });
      } else {
        arr.push(check);
      }
      setItems(arr);
      return items;
    });
    // setItems([...items, newItem]);
    // const selectedItem = items.find(item => item.id === event.item_uuid);
    // setName(selectedItem.name);
    // setQuantity(selectedItem.value1);
    // deleteItem(id1);
  };

  const decrimentItem1 = (event, qnt) => {
    console.log(event, 'adsdsadasddf43asd');
    const arr = [];
    items.map((check) => {
      console.log(check, 'vheverrvdd');
      if (check.item_uuid === event.item_uuid) {
        arr.push({
          item_name: event.item_name,
          item_uuid: event.item_uuid,
          quantity: check.quantity - 1,
        });
      } else {
        arr.push(check);
      }
      setItems(arr);
      return items;
    });
    // setItems([...items, newItem]);
    // const selectedItem = items.find(item => item.id === event.item_uuid);
    // setName(selectedItem.name);
    // setQuantity(selectedItem.value1);
    // deleteItem(id1);
  };

  const IncrimentItem1 = (event, qnt) => {
    console.log(event, 'adsdsadasdasd');
    const arr = [];
    items.map((check) => {
      if (check.item_uuid === event.item_uuid) {
        arr.push({
          item_name: event.item_name,
          item_uuid: event.item_uuid,
          quantity: check.quantity + 1,
        });
      } else {
        arr.push(check);
      }
      setItems(arr);
      return items;
    });
    // setItems([...items, newItem]);
    // const selectedItem = items.find(item => item.id === event.item_uuid);
    // setName(selectedItem.name);
    // setQuantity(selectedItem.value1);
    // deleteItem(id1);
  };
  const updateItem = () => {
    const updatedItems = items.map((item) => {
      if (item.name === name && item.value === value) {
        return item;
      }
      return {
        ...item,
        name,
        value,
      };
    });
    setItems(updatedItems);
    setName('');
    setQuantity('');
  };

  const submitOrder = async (event) => {
    // event.preventDefault()

    const payload = {
      store_uuid: currentUser?.data?.uuid,
      company_uuid: currentUser.data.company_uuid,
      item: items,
    };

    axios
      .post(`${process.env.REACT_APP_URL}/order/store/calculation`, payload, {
        headers: {
          'x-auth-token': currentUser.token,
        },
      })
      .then((respons) => {
        console.log(respons.data, 'fffgdsfsdfdsf');
        setAmount(respons.data);
      })
      .catch((err) => {
        console.log(err.response.data.message, 'zasdsadasd');
      });
  };

  useEffect(() => {
    submitOrder();
  }, [items]);

  const submitOrderPlased = async (event) => {
    event.preventDefault();

    const payload = {
      payment_type: selectPaymentType1,
      company_uuid: currentUser.data.company_uuid,
      store_uuid: currentUser?.data?.uuid,
      item: items,
    };

    axios
      .post(`${process.env.REACT_APP_URL}/order/store/create`, payload, {
        headers: {
          'x-auth-token': currentUser.token,
        },
      })
      .then((respons) => {
        console.log(respons, 'fffgdsfsdfdsf');
        setItems([]);
        setPrint(true);
        setPrintData(respons.data.data);
        setMessage(respons.data.message);
        sethandleopen(false);
        setOpen(true);
      })
      .catch((err) => {
        console.log(err.response.data, 'zasdsadasd');
        setPrint(false);
        setPrintData('');
        toast.error(err.response.data);
        setSuc(false);
      });
  };

  // const redirect = () => {
  //   history.push({
  //      pathname: "/cashierMenu",

  //   })
  // }

  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);

  const [isNavbarFixed1, setIsNavbarFixed1] = useState(false);
  const [prevScrollY1, setPrevScrollY1] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const navbar1 = document.getElementById('nav-section1');
      const navOffset = navbar1.offsetTop;
      const currentScrollY = window.scrollY;

      if (currentScrollY > navOffset && currentScrollY > prevScrollY) {
        setIsNavbarFixed(true);
      } else {
        setIsNavbarFixed(false);
      }

      setPrevScrollY1(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollY1]);

  return (
    <>
      {print === true && printData !== '' && (
        <iframe
          title="Print Frame"
          srcDoc={printData}
          onLoad={() => {
            const iframe = document.querySelector('iframe');
            // iframe.style.display = "none"; // Hide the iframe
            // Check if the browser supports silent printing
            if ('requestMediaKeySystemAccess' in navigator) {
              try {
                // Attempt to silently print
                console.log('silently print');
                iframe.contentWindow.print({ silent: true });
                setTimeout(() => {
                  setPrint(false);
                  setPrintData('');
                }, 1000);
              } catch (error) {
                console.error('Error printing:', error);
                setPrint(false);
                setPrintData('');
              }
            } else {
              console.error('Silent printing is not supported in this browser.');
              setPrint(false);
              setPrintData('');
            }
          }}
        />
      )}
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
            <Col xs="12" md="6" className="mt-5">
              <div className="page-title-container">
                {/* Title Start */}
                <Col className="col-auto mb-3 mb-sm-0 me-auto">
                  {/* <CsLineIcons icon="chevron-left" size="20" /> */}
                  <h1 className="mb-0 pb-0 display-4" id="title">
                    {title1}
                  </h1>
                </Col>
                {/* Title End */}
              </div>

              <Card className="hover-scale-up cursor-pointer sh-26">
                <Card.Body>
                  <Row>
                    {items.length !== 0 ? (
                      <>
                        <div style={{ overflowY: 'auto', height: '250px' }}>
                          {items &&
                            items.map((item) => {
                              console.log(item, 'itemcxxxvxcvxcv');
                              return (
                                <>
                                  <Card className={`mb-2 ${selectedItems.includes(1) && 'selected'}`} style={{ border: '1px solid #ed6789' }}>
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
                                                <button
                                                  type="button"
                                                  className="spin-down single px-2"
                                                  onClick={() => {
                                                    decrimentItem1(item, item.quantity - 1);
                                                  }}
                                                  // onClick={() => { editItem(items && items.find(data1 => data1.item_uuid === item.uuid) ? items && items.find(data1 => data1.item_uuid === item.uuid) : 0, items && items.find(data1 => data1.item_uuid === item.uuid) ? items && items.find(data1 => data1.item_uuid === item.uuid).quantity - 1 : 0) }}
                                                  // disabled={btndisabl}

                                                  // disabled={items &&  items.find(data1 => data1.item_uuid === item.uuid).quantity===1 ? true : ""}
                                                  disabled={item.quantity === 1 ? true : ''}
                                                >
                                                  -
                                                </button>
                                              </InputGroup.Text>
                                              <Form.Control value={item.quantity} onInput={onInput} placeholder="Count" className="text-center" />
                                              <InputGroup.Text id="basic-addon2">
                                                <button
                                                  type="button"
                                                  className="spin-up single px-2"
                                                  // onClick={() => { updateCart(CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid === item.uuid) ? CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid === item.uuid) : 0, CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid === item.uuid) ? CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid === item.uuid).quantity + 1 : 0) }}
                                                  // disabled={CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid === item.uuid) && CartData.data.find(data1 => data1.item_uuid === item.uuid).quantity === item.stock_quantity ? true : ""}
                                                  // onClick={() => { editItem(item) }}
                                                  onClick={() => {
                                                    IncrimentItem1(item, item.quantity + 1);
                                                  }}
                                                >
                                                  +
                                                </button>
                                              </InputGroup.Text>
                                            </InputGroup>
                                          </Col>

                                          <Button
                                            size="sm"
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
                              );
                            })}
                        </div>
                      </>
                    ) : (
                      <h1>cart is empty</h1>
                    )}
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            <Col xs="12" md="6" style={{ marginTop: '5%' }}>
              <Card className="h-100 hover-scale-up cursor-pointer sh-26 ">
                <Card.Body>
                  <Row>
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

                    <Col xs="12" md="6">
                      <div className="mb-2">
                        <p className="text-small text-muted mb-1">TOTAL ITEMS</p>
                        <p>
                          <span className="text-alternate"> {amount?.details?.length}</span>
                        </p>
                      </div>
                    </Col>
                    <Col xs="12" md="6">
                      <div className="mb-2">
                        <p className="text-small text-muted mb-1">SHIPPING</p>
                        <p>
                          <span className="text-alternate">
                            <span className="text-small text-muted">₹</span>0
                          </span>
                        </p>
                      </div>
                    </Col>
                    <Col xs="12" md="6">
                      <div className="mb-2">
                        <p className="text-small text-muted mb-1">SUB TOTAL</p>
                        <p>
                          <span className="text-alternate">
                            <span className="text-small text-muted">₹</span>
                            {Math.round(amount.amount)}
                          </span>
                        </p>
                      </div>
                    </Col>

                    {/* <br />
                    <br /> */}
                    <Col xs="12" md="6">
                      <div className="mb-2">
                        <p className="text-small text-muted mb-1">CGST(%)</p>
                        <p>
                          <span className="text-alternate">
                            <span className="text-small text-muted">₹</span>
                            {amount.cgst_tax}
                          </span>
                        </p>
                      </div>
                    </Col>
                    <Col xs="12" md="6">
                      <div className="mb-2">
                        <p className="text-small text-muted mb-1">SGST(%)</p>
                        <p>
                          <span className="text-alternate">
                            <span className="text-small text-muted">₹</span>
                            {amount.sgst_tax}
                          </span>
                        </p>
                      </div>
                    </Col>
                    <Col xs="12" md="6">
                      <div className="mb-2">
                        <p className="text-small text-muted mb-1">GRAND TOTAL</p>
                        <div className="cta-2">
                          <span>
                            <span className="text-small text-muted cta-2">₹</span>
                            {amount.total_amount}
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col xs="12" md="6">
                      <div className="mb-2">
                        <p className="text-small text-muted mb-1">SELECT PAYMENT</p>
                        <Select
                          classNamePrefix="react-select"
                          options={optionsPayment}
                          value={selectPaymentType}
                          onChange={setSelectPaymentType}
                          placeholder="select Payment Type"
                        />
                      </div>
                    </Col>

                    <Col xs="12" md="6">
                      <div className="mb-2">
                        <p className="text-small text-muted mb-1">&nbsp;</p>
                        <Button className="btn-icon btn-icon-end w-100" variant="primary" onClick={submitOrderPlased}>
                          <span>PLACE ORDER</span> <CsLineIcons icon="chevron-right" />
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
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
            {/* <Col md="7" lg="3" xxl="10" className="mb-1 text-end"> */}

            {/* Length Start */}

            {/* Length End */}
            {/* </Col> */}
          </Row>
        </Row>
      </div>
      {/* Title End */}

      <Row>
        <Col xs="12" md="4">
          {isLgScreen && (
            <div>
              <div id="nav-section1" className={`navbar1 ${isNavbarFixed ? 'fixed-nav1' : ''}`}>
                <div className="nav1">

                  <Row>
                    <Col xs="12" md="12" lg="12" className="mb-3" style={{ marginTop: '40px' }}>
                      <div className="d-inline-block float-md-start me-1 mb-1 search-input-container w-100 shadow bg-foreground">
                        <Form.Control type="text" onChange={(event) => searchfunction('search', event.target.value)} placeholder="Search" />
                        <span className="search-magnifier-icon">
                          <CsLineIcons icon="search" />
                        </span>
                        <span className="search-delete-icon d-none">
                          <CsLineIcons icon="close" />
                        </span>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Select className="mb-4" classNamePrefix="react-select"
                        options={optionsVegType}
                        onChange={SelectVegFunction}
                        placeholder="Select Type" />
                    </Col>
                  </Row>

                  <Row>
                    <Col xs="12" md="12" lg="12">
                      <Card>
                        <Card.Body>
                          <Cardsdetails />
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>

                  {/* <Cart 
              item={items}
            /> */}
                  {/* Filters End */}
                </div>
              </div>
            </div>
          )}
        </Col>

        <Col style={{ position: 'sticky' }} xs="12" md="8">
          <div id="firstcolumn">
            {/* <Form className="mb-5">
              <p className="text-large text-muted mb-2">Happy New Year 2023 Combos</p>
            </Form> */}
            {/* Product Thumbnails Start */}
            {categoryForConsumer &&
              categoryForConsumer.data &&
              categoryForConsumer.data.map((text, ind) => {
                return (
                  <>
                    <Col key={ind} style={{ cursor: 'pointer' }}>
                      <p
                        id={text.name}
                        style={{
                          fontSize: '24px',
                          color: '#000',
                          fontWeight: '500',
                          marginBottom: '5px',
                          fontFamily: 'proxima-nova,sans-serif',
                        }}
                      >
                        {text.name}
                      </p>
                      <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-2 row-cols-xl-3 g-2 mb-5">
                        {storeProductsList &&
                          storeProductsList.data &&
                          storeProductsList.data.map((item, index) => {
                            console.log(item, 'storeprod');
                            return (
                              <>
                                {item.category_uuid === text.uuid && (
                                  <Col xs="12" md="4" lg="4" xl="4">
                                    <Card className="h-100 hover-scale-up cursor-pointer sh-26">
                                      <Card.Body className="pb-3">
                                        {/* <img src={item.image_url} alt="GreenDot" style={{ width: "10%" }} className="heading mb-3 d-flex" crossOrigin="anonymous" /> */}
                                        <Row>
                                          {/* <Form.Check className="form-check" checked={selectedItems.includes(1)} onChange={() => checkItem(1)} /> */}
                                          <Col xs="7" sm="7" md="7" lg="7">
                                            <Clamp tag="span" clamp="2">
                                              {item?.type === 'veg' && (
                                                <img
                                                  src="https://stage-couponportal.mistaeats.com/img/profile/profile-17.jpg"
                                                  alt=""
                                                  style={{ width: '15px' }}
                                                />
                                              )}
                                            </Clamp>
                                            <Clamp tag="span" clamp="2">
                                              {item?.type === 'non-veg' && (
                                                <img src="https://stage-couponportal.mistaeats.com/img/profile/non-veg.png" alt="" style={{ width: '17px' }} />
                                              )}
                                            </Clamp>
                                            <NavLink to="#" className="body-link d-block sh-4 mb-0 h6 heading">
                                              <Clamp tag="span" clamp="2">
                                                {item.name}
                                              </Clamp>
                                            </NavLink>
                                            ₹{Math.round(item.price)}
                                          </Col>
                                          {/* <Col> &nbsp;</Col> */}

                                          {/* <Col xs="6" sm="4" md="4" lg="4">
                          <img src={item.image_url} alt="GreenDot" style={{ width: "80%", height: "auto" }} className="heading d-flex fluid-img" crossOrigin="anonymous" />
                         </Col> */}

                                          <Col xs="5" sm="5" md="5" lg="5">
                                            {/* <NavLink  to="/"> */}
                                            <img
                                              src={item.image_url}
                                              alt="GreenDot"
                                              style={{ width: '80%', height: 'auto' }}
                                              className="heading d-flex fluid-img"
                                              crossOrigin="anonymous"
                                            />
                                            <div>
                                              {item.stock_quantity <= 0 ? (
                                                <Col style={{ color: 'red' }}>Out of Stock</Col>
                                              ) : (
                                                <div>
                                                  {item.stock_quantity <= 5 ? <Col style={{ color: 'red' }}>Only {item.stock_quantity} Item Left</Col> : null}

                                                  {items && items.find((data1) => data1.item_uuid === item.uuid) !== undefined ? (
                                                    <InputGroup className="spinner sw-11">
                                                      <InputGroup.Text id="basic-addon1">
                                                        <button
                                                          type="button"
                                                          className="spin-down single px-2"
                                                          onClick={() => {
                                                            decrimentItem(item, item.quantity - 1);
                                                          }}
                                                          // onClick={() => { editItem(items && items.find(data1 => data1.item_uuid === item.uuid) ? items && items.find(data1 => data1.item_uuid === item.uuid) : 0, items && items.find(data1 => data1.item_uuid === item.uuid) ? items && items.find(data1 => data1.item_uuid === item.uuid).quantity - 1 : 0) }}
                                                          // disabled={btndisabl}

                                                          disabled={items && items.find((data1) => data1.item_uuid === item.uuid).quantity === 1 ? true : ''}
                                                        >
                                                          -
                                                        </button>
                                                      </InputGroup.Text>
                                                      <Form.Control
                                                        value={
                                                          items && items.find((data1) => data1.item_uuid === item.uuid)
                                                            ? items && items.find((data1) => data1.item_uuid === item.uuid).quantity
                                                            : 0
                                                        }
                                                        onInput={onInput}
                                                        placeholder="Count"
                                                        className="text-center"
                                                      />
                                                      <InputGroup.Text id="basic-addon2">
                                                        <button
                                                          type="button"
                                                          className="spin-up single px-2"
                                                          // onClick={() => { updateCart(CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid === item.uuid) ? CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid === item.uuid) : 0, CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid === item.uuid) ? CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid === item.uuid).quantity + 1 : 0) }}
                                                          // disabled={CartData && CartData.data && CartData.data.find(data1 => data1.item_uuid === item.uuid) && CartData.data.find(data1 => data1.item_uuid === item.uuid).quantity === item.stock_quantity ? true : ""}
                                                          // onClick={() => { editItem(item) }}
                                                          onClick={() => {
                                                            IncrimentItem(item, item.quantity + 1);
                                                          }}
                                                        >
                                                          +
                                                        </button>
                                                      </InputGroup.Text>
                                                    </InputGroup>
                                                  ) : (
                                                    <Button
                                                      variant="outline-primary"
                                                      className="btn-icon btn-icon-start ms-0 ms-xs-auto ms-sm-auto w-100 w-md-auto"
                                                      onClick={() => {
                                                        addToCart(item);
                                                      }}
                                                    >
                                                      <CsLineIcons icon="plus" />
                                                      <span>Add</span>
                                                    </Button>
                                                  )}
                                                </div>
                                              )}
                                            </div>
                                            {console.log(
                                              CartData && CartData.data && CartData.data.find((data1) => data1.item_uuid === item.uuid)
                                                ? CartData && CartData.data && CartData.data.find((data1) => data1.item_uuid === item.uuid).quantity
                                                : '0',
                                              'dfsfsdf'
                                            )}

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
                                )}
                              </>
                            );
                          })}
                      </Row>
                    </Col>
                  </>
                );
              })}
          </div>

          {/* Product Thumbnails End */}

          {/* Pagination Start */}
          {/* <div className="d-flex justify-content-center mt-5">
            <Pagination>
              <Pagination.Prev className="shadow" disabled={page === 0} onClick={() => searchfunction("prev")}>
                <CsLineIcons icon="chevron-left" />
              </Pagination.Prev>
              <Pagination.Item className="shadow" active onClick={() => searchfunction("page")} >
                {page + 1}
              </Pagination.Item>
              <Pagination.Item className="shadow" disabled={Math.ceil(ProductData && ProductData.count / limit) <= page + 1} onClick={() => searchfunction("page+1", page + 1)}>{page + 2}</Pagination.Item>
              <Pagination.Item className="shadow" disabled={Math.ceil(ProductData && ProductData.count / limit) <= page + 2} onClick={() => searchfunction("page+2", page + 2)}>{page + 3}</Pagination.Item>

              {Math.ceil(ProductData && ProductData.count / limit) > page + 3 &&
                <>
                  <Pagination.Item className="shadow" >...</Pagination.Item>
                </>

              }
              <Pagination.Next className="shadow" disabled={Math.ceil(ProductData && ProductData.count / limit) <= page + 1} onClick={() => searchfunction("next")}>
                <CsLineIcons icon="chevron-right" />
              </Pagination.Next>
            </Pagination>
          </div> */}
          {/* Pagination End */}
        </Col>
      </Row>

      {/* Filters Modal Start */}
      {!isLgScreen && (
        <>
          <div
            className="settings-buttons-container"
            style={{
              marginTop: '130px',
              marginRight: '20px',
            }}
          >
            <Button
              style={{
                borderRadius: '50%',
                width: '65px',
                height: '65px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: '2px solid #fff',
              }}
              onClick={() => setIsOpenFiltersModal(true)}
            >
              <CsLineIcons icon="menu" style={{ width: '80%', height: 'auto' }} />
              <h6>Menu</h6>
            </Button>
          </div>
          <Modal className="modal-bottom" show={isOpenFiltersModal} onHide={() => setIsOpenFiltersModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title as="div">Menu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Cardsdetails onClose={handleModel} />
            </Modal.Body>
          </Modal>
        </>
      )}
      {/* Filters Modal End */}

      {/* edit view popup start */}
      {/* <div> */}
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          sethandleopen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ padding: '30px' }}
      >
        <DialogContent style={{ width: '100%', height: '100%' }}>
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
            <Button
              className="btn-icon btn-icon-end w-100"
              variant="primary"
              onClick={() => {
                setOpen(false);
                sethandleopen(false);
              }}
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
