import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useHistory, useParams, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from 'hooks/useWindowSize';
import { ProductForConsumerListURL } from 'Redux/ConsumerRedux/Product/ProductRedux';
import { categoryForConsumerListURL } from 'Redux/ConsumerRedux/Category/CategoryRedux';
import { CartListURL, addToCartURL, updateCartURL, deleteToCartURL, ConsumerCartListURL } from 'Redux/ConsumerRedux/Cart/CartRedux';
import { StoresForConsumerLIST } from 'Redux/ConsumerRedux/StoreList/storelist';
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
import Cardsdetails from './Cardsdetails';
import GreenDot from '../../Assests/images/GreenDot.png';

// import FilterMenuContent from "../storefront/filters/components/FilterMenuContent";
const Menu = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const title = 'Menu';
  const description = 'Ecommerce Storefront Filters Page';
  const { id, id1 } = useParams();
  console.log(id, id1, "dsfsdfsdfsdf")
  const { themeValues } = useSelector((state) => state.settings);
  const lgBreakpoint = parseInt(themeValues.lg.replace('px', ''), 10);
  const { width } = useWindowSize();
  const [isLgScreen, setIsLgScreen] = useState(false);
  const [isOpenFiltersModal, setIsOpenFiltersModal] = useState(true);
  const [categoryID, setCategoryID] = useState("")
  const [suc, setSuc] = useState(false);
  const [value, setValue] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [result1, setResult1] = useState();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('')
  // const [data, setData] = useState('No result');
  const delay = 500;
  const previewStyle = {
    // height: 200,
    width: 280
  };
  const { currentUser } = useSelector((state) => state.auth)
  const handleScan = (result) => {
    const Compuuid = result?.data?.split("menu/company/")
    const slugRoute = result?.data?.replace(`${process.env.REACT_APP_WEB_APP_URL}`, '')
    const routeStartPath = slugRoute?.replace("/menu/", "")

    console.log(Compuuid, "routeStartPath")

    if (routeStartPath?.startsWith("company")) {
      localStorage.setItem('companyId', Compuuid[1]);
    }
    if (result) {
      setResult1(result.data);
    }
  };
  const handleError = (error) => {
    console.log(error);
  };

  const StoreData = JSON.parse(localStorage.getItem("storeDatiles"));


  useEffect(() => {
    console.log(result1, "result1")
    if (result1) {

      const Compuuid = result1.split("menu/company/")
      const slugRoute = result1?.replace(`${process.env.REACT_APP_WEB_APP_URL}`, '')
      const routeStartPath = slugRoute?.replace("/menu/", "")
      if (routeStartPath?.startsWith("store")) {
        history.push(({
          pathname: `${slugRoute}`,
        }));
      }
      else {
        history.push(({
          pathname: `${slugRoute}`,
        }));
      }
      window.location.reload(false);
    }
  }, [result1])
  useEffect(() => {
    dispatch(StoresForConsumerLIST(id1))
  }, [])
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
    if (currentUser && currentUser.data && currentUser.data.group === "consumer") {
      dispatch(ConsumerCartListURL(currentUser && currentUser.data && currentUser.data.uuid))
      setSuc(false)
    } else if (ip) {
      //  if (ip)
      dispatch(CartListURL(ip, StoreData?.company_uuid, "", currentUser?.token, ""))
    }
  }, [ip])
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
  const { StoreForConsumer } = useSelector((state) => state.StoreForConsumerSlice)
  const { categoryForConsumer } = useSelector((state) => state.categoryForConsumerList)
  const { ProductForConsumer } = useSelector((state) => state.ProductForConsumerList)
  const { CartData, notification } = useSelector((state) => state.CartList)

  console.log(currentUser, "currentUser")
  const { IpAddressData } = useSelector((state) => state.IpAddressList);
  const addToCart = (event) => {
    console.log(event.stock_quantity, "jhjjgjhgjgjhg")
    if (currentUser && currentUser.data && currentUser.data.group === "consumer") {
      const payload = {
        "item_uuid": event.uuid,
        "quantity": 1,
        "user_uuid": currentUser && currentUser.data && currentUser.data.uuid,
      }
      dispatch(addToCartURL(payload))
      setSuc(true)
    }
    else {
      const payload = {
        "item_uuid": event.uuid,
        "quantity": 1,
        "ip_address": ip
      }
      dispatch(addToCartURL(payload))
      setSuc(true)
    }
    // event.preventDefault()
    // const value = event.target.elements
    // const payload = {
    //   "item_uuid": event.uuid,
    //   "quantity": 1,
    //   "ip_address": ip
    // }
    // dispatch(addToCartURL(payload))
    // setSuc(true)
    // dispatch(ProductForConsumerListURL(currentUser.token))
  }
  const check = CartData && CartData.data && CartData.data.every(({ uuid }) => uuid);
  console.log(check, "asdsdssasds");
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
          dispatch(ConsumerCartListURL(currentUser && currentUser.data && currentUser.data.uuid))
          setSuc(false)
        } else {
          dispatch(CartListURL(ip, StoreData?.company_uuid, "", currentUser?.token, ""))
          setSuc(false)
        }
        // setTimeout(() => {
        //   // dispatch(ProductForConsumerListURL(currentUser.token))
        //   history.push(({
        //     pathname: "/Cardcart",
        //   }));
        // }, 1000)
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

  // useEffect(() => {
  //   localStorage.setItem('companyId', (id1));
  // }, [id1]);

  useEffect(() => {
    if (window.location.pathname === "/menu/qr" || window.location.pathname === "/menu/undefined") {
      toast.error("Please Scan the QR code")
    }
  }, [window.location.pathname])
  // useEffect(() => {
  //   if (window.location.pathname.startsWith('/menu')) {
  //     const getcompanyId = (localStorage.getItem('companyId'));
  //     if (getcompanyId) {
  //       localStorage.setItem('companyId', (getcompanyId));
  //     }
  //     else {
  //       const checkMenu = window.location.pathname.split("menu/")
  //       console.log(checkMenu, "checkMenu")
  //       localStorage.setItem('companyId', checkMenu[2]);
  //     }
  //   }
  // }, [window.location.pathname]);
  // useEffect(()=>{
  //   dispatch(categoryForConsumerListURL())
  // },[])
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

  const OrderNow = (data, values) => {
    console.log(data, values, "dghxcsjdgcsh")
    history.push({
      pathname: data,
      state: values
    })
  }

  const disableStore = (data) => {
    toast.warning("Selected Store Currently Not accepting Orders")
  }

  useEffect(() => {
    const categoryId = (localStorage.getItem('categoryId'));
    console.log(categoryId, "bgdhhgfjghhfhgfhhg")
    setCategoryID(categoryId)
    // setItems(getcompanyId)
  }, [ProductForConsumer])
  const searchfunction = (type, pages) => {
    console.log(pages, type, "ghjkfgdvxvxvcvcfgssdvbnm")
    if (type === "search") {
      console.log(pages, type, "ghjkfgdfgssdvbnm")
      setSearch(pages)
      setPage(0)
      dispatch(ProductForConsumerListURL(id, categoryID, 0, pages, currentUser.token, limit))
    }
    if (type === "prev") {
      setPage(page - 1)
      dispatch(ProductForConsumerListURL(id, categoryID, page - 1, search, currentUser.token, limit))
    }
    else if (type === "next") {
      setPage(page + 1)
      dispatch(ProductForConsumerListURL(id, categoryID, page + 1, search, currentUser.token, limit))
    }
    else if (type === "page") {
      setPage(page)
      dispatch(ProductForConsumerListURL(id, categoryID, page, search, currentUser.token, limit))
    }
    else if (type === "page+1") {
      setPage(page + 1)
      dispatch(ProductForConsumerListURL(id, categoryID, page + 1, search, currentUser.token, limit))
    }
    else if (type === "page+2") {
      setPage(page + 2)
      dispatch(ProductForConsumerListURL(id, categoryID, page + 2, search, currentUser.token, limit))
    }
    else if (type === "limit") {
      setLimit(pages)
      setPage(0)
      dispatch(ProductForConsumerListURL(id, categoryID, 0, search, currentUser.token, pages))
    }
  }
  return (
    <>
      <HtmlHead title={title} description={description} />
      <div className="page-title-container">
        <Row className="g-0">
          <Col className="col-auto mb-3 mb-sm-0 me-auto">
            {/* <CsLineIcons icon="chevron-left" size="20" /> */}
            {/* <span className="align-middle text-medium ms-1">Home</span> */}
            <h1 className="mb-0 pb-0 display-4" id="title">
              {title}
            </h1>
          </Col>
          <Col xs="12" sm="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
            <Button xs="4" variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto"
              onClick={() => setOpen(true)}>
              <CsLineIcons icon="scanner" /><span>Scan QR Code</span>
            </Button>
            &nbsp;&nbsp;
            <NavLink to="/Cardcart">
              <Button xs="4" variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto">
                <CsLineIcons icon="cart" />
                <span> Cart {CartData && CartData.count !== 0 ? CartData.count : null}</span>
              </Button>
            </NavLink>&nbsp;&nbsp;
          </Col>
        </Row>
      </div>
      <Row>
        <Col style={{ position: "sticky" }} lg="9" xl="9">
          <div id="firstcolumn">
            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-2 row-cols-xl-3 g-2 mb-5">
              {StoreForConsumer && StoreForConsumer.data && StoreForConsumer.data.map((item, index) => {
                console.log(item, "sfsdfdsfsdfsdf")
                return <>
                  <Col xs="12" md="6" lg="6" xl="6">
                    <Card className="h-100 hover-scale-up cursor-pointer sh-26">
                      <Card.Body className="pb-3">
                        <Row >
                          <Col xs="6" sm="8" md="8" lg="8">
                            {/* <NavLink to="#" className="body-link d-block sh-4 mb-0 h6 heading"> */}
                            <Clamp tag="span" clamp="2">
                              {item.store_name}
                            </Clamp>
                            {/* </NavLink> */}
                          </Col>
                          {item?.is_active === false ?
                            <Col xs="6" sm="4" md="4" lg="4">
                              <img src={item?.logo} alt="GreenDot" style={{ width: "80%", height: "auto" }} className="heading d-flex fluid-img" crossOrigin="anonymous" />
                              <Button variant="outline-primary"
                                className="btn-icon btn-icon-start ms-0 ms-xs-auto ms-sm-auto w-100 w-md-auto"
                                onClick={() => { disableStore() }}
                                disabled={item?.is_active === false}
                              >
                                <span>Order Now</span>
                              </Button>
                            </Col>
                            :
                            <Col xs="6" sm="4" md="4" lg="4">
                              <img src={item?.logo} alt="GreenDot" style={{ width: "80%", height: "auto" }} className="heading d-flex fluid-img" crossOrigin="anonymous" />
                              <Button variant="outline-primary"
                                className="btn-icon btn-icon-start ms-0 ms-xs-auto ms-sm-auto w-100 w-md-auto"
                                disabled={item?.is_active === false}
                                onClick={() => { OrderNow(`/products/store/${item?.slug}`, item) }}
                              >
                                <span>Order Now</span>
                              </Button>
                            </Col>
                          }
                        </Row>
                      </Card.Body>
                    </Card>
                    <Card.Footer>
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
      {/* {!isLgScreen && (
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
      )} */}
      {/* Filters Modal End */}
      {/* edit view popup start */}
      {/* <div> */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* qr code start */}
        <DialogContent style={{ width: "100%", height: "100%" }}>
          <QrReader
            delay={delay}
            style={previewStyle}
            onError={handleError}
            onScan={handleScan}
          />
        </DialogContent>
        <p>{result1}</p>
      </Dialog>
      {/* </div> */}
    </>
  );
};
export default Menu;