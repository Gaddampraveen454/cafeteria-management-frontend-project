import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
// import { Pagination, PaginationItem } from "@material-ui/lab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Row, Col, Button, Dropdown, Form, Card, Badge, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { UserNotificationsURL } from 'Redux/ConsumerRedux/NotificationRedux/notification';
import CheckAll from 'components/check-all/CheckAll';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Select from 'react-select';
import axios from 'axios';
import moment from 'moment';
import { Item } from 'react-contexify';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Notification = () => {
    const title = 'Notification';
    const description = 'Ecommerce Notification Page';
    const dispatch = useDispatch()
    const history = useHistory()



    // const { subscriptionData } = useSelector((state) => state.subscription)


    const { currentUser } = useSelector((state) => state.auth)


    const { notificationValue } = useSelector((state) => state.Usernotification)
    console.log(notificationValue, "dsghsjgsh")

    const allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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

    const [page, setPage] = useState(0)
    const [pageNumber, setPageNumber] = useState(0);
    const [limit, setLimit] = useState(5)
    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = useState('')
    const [uuid, setUuid] = useState('')
    // useEffect(() => {
    //   dispatch(subscriptionListURL(page, limit, currentUser.token))
    // }, [])


    const [userData, setUserData] = useState([])

    const handleClickOpen1 = (event) => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false);
    };

    // useEffect(()=>{
    //   dispatch(notification(pageNumber, limit,currentUser.token))
    // })

    const pageChange = (type) => {
        if (type === "prev") {
            setPage(page - 1)
            dispatch(UserNotificationsURL(page - 1, limit, currentUser?.data?.token, currentUser?.data?.uuid));
        }
        else if (type === "next") {
            setPage(page + 1)
            dispatch(UserNotificationsURL(page + 1, limit, currentUser?.data?.token, currentUser?.data?.uuid));
        }
        else if (type === "page") {
            setPage(page)
            dispatch(UserNotificationsURL(page, limit, currentUser.data.token, currentUser.data.uuid))
        }
        else if (type === "page+1") {
            setPage(page + 1)
            dispatch(UserNotificationsURL(page + 1, limit, currentUser.data.token, currentUser.data.uuid))
        }
        else if (type === "page+2") {
            setPage(page + 2)
            dispatch(UserNotificationsURL(page + 2, limit, currentUser.data.token, currentUser.data.uuid))
        }
        else if (type === "5Items") {
            setLimit(5)
            setPage(0)
            dispatch(UserNotificationsURL(0, 5, currentUser?.data?.token, currentUser?.data?.uuid));
        }
        else if (type === "10Items") {
            setLimit(10)
            setPage(0)
            dispatch(UserNotificationsURL(0, 10, currentUser?.data?.token, currentUser?.data?.uuid));

        }
        else if (type === "20Items") {
            setLimit(20)
            setPage(0)
            dispatch(UserNotificationsURL(0, 20, currentUser?.data?.token, currentUser?.data?.uuid));

        }

    }
    const handleChange = (e, p) => {
        setPage(p);
        // _DATA.jump(p);
        setPageNumber(p - 1)
        // GetList(p-1)
    };
    const notificationsDatas = () => {
        dispatch(UserNotificationsURL(page, limit, currentUser?.data?.token, currentUser?.data?.uuid));
    }
    useEffect(() => {
        notificationsDatas()
    }, [page])






    return (
        <>
            {/* <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth="sm"
        fullWidth='true'
        aria-describedby="alert-dialog-slide-description"
        xs="12" sm="12" md="12" lg="12" xl="12"
      >
        <DialogTitle  >
          <div style={{ float: "right", cursor: "pointer" }} onClick={handleClose}><i className="cs-close text-primary" /></div>
        </DialogTitle >
        <DialogContent style={{ width: "100%", height: "100%", backgroundColor:"ash" }}>
          <DialogContentText id="alert-dialog-slide-description" >

            <Row>
              vhfch
            </Row>
          </DialogContentText>
        </DialogContent>
      </Dialog> */}
            <HtmlHead title={title} description={description} />
            <div className="page-title-container">
                <Row className="g-0">
                    {/* Title Start */}
                    <Col className="col-auto mb-3 mb-sm-0 me-auto">
                        <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/dashboard">
                            <CsLineIcons icon="chevron-left" size="13" />
                            <span className="align-middle text-small ms-1">Home</span>
                        </NavLink>
                        <h1 className="mb-0 pb-0 display-4" id="title">
                            {title}
                        </h1>
                    </Col>
                    {/* Title End */}
                    {/* <Col xs="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
            <Button type="button" >Add</Button>
          </Col> */}

                    {/* Top Buttons Start */}
                    <Col xs="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
                        <Button variant="outline-primary" className="btn-icon btn-icon-only ms-1 d-inline-block d-lg-none">
                            <CsLineIcons icon="sort" />
                        </Button>
                        <div className="btn-group ms-1 check-all-container">
                            {/* <CheckAll
                allItems={allItems}
                selectedItems={selectedItems}
                onToggle={toggleCheckAll}
                inputClassName="form-check"
                className="btn btn-outline-primary btn-custom-control py-0"
              /> */}
                            {/* <Dropdown align="end">
                <Dropdown.Toggle className="dropdown-toggle dropdown-toggle-split" variant="outline-primary" />
                <Dropdown.Menu>
                  <Dropdown.Item>Move</Dropdown.Item>
                  <Dropdown.Item>Archive</Dropdown.Item>
                  <Dropdown.Item>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
                        </div>
                    </Col>
                    {/* Top Buttons End */}
                </Row>
            </div>
            <Row className="mb-3">
                <Col md="5" lg="3" xxl="2" className="mb-1">
                    {/* Search Start */}
                    {/* <div className="d-inline-block float-md-start me-1 mb-1 search-input-container  ">
          <Select
            classNamePrefix="react-select"
            className="sw-20"
            isSearchable={false}
            // options={Data}
            // value={statusValue}
            // onChange={handleCatogoryFilter}
            placeholder="Select Category"
          />
          </div> */}
                    {/* Search End */}
                </Col>
                <Col md="7" lg="9" xxl="10" className="mb-1 text-end">
                    {/* Print Button Start */}
                    {/* <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Print</Tooltip>}>
            <Button variant="foreground-alternate" className="btn-icon btn-icon-only shadow">
              <CsLineIcons icon="print" />
            </Button>
          </OverlayTrigger> */}
                    {/* Print Button End */}

                    {/* Export Dropdown Start */}
                    {/* <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1">
            <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Export</Tooltip>}>
              <Dropdown.Toggle variant="foreground-alternate" className="dropdown-toggle-no-arrow btn btn-icon btn-icon-only shadow">
                <CsLineIcons icon="download" />
              </Dropdown.Toggle>
            </OverlayTrigger>
            <Dropdown.Menu className="shadow dropdown-menu-end">
              <Dropdown.Item href="#">Copy</Dropdown.Item>
              <Dropdown.Item href="#">Excel</Dropdown.Item>
              <Dropdown.Item href="#">Cvs</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
                    {/* Export Dropdown End */}

                    {/* Length Start */}
                    <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1">
                        <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Item Count</Tooltip>}>
                            <Dropdown.Toggle variant="foreground-alternate" className="shadow sw-13">
                                {limit} items
                            </Dropdown.Toggle>
                        </OverlayTrigger>
                        <Dropdown.Menu className="shadow dropdown-menu-end">

                            <Dropdown.Item onClick={() => pageChange("5Items")}>5 Items</Dropdown.Item>
                            <Dropdown.Item onClick={() => pageChange("10Items")}>10 Items</Dropdown.Item>
                            <Dropdown.Item onClick={() => pageChange("20Items")}>20 Items</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    {/* Length End */}
                </Col>
            </Row>

            {/* List Header Start */}
            <Row className="g-0 h-100 align-content-center d-none d-lg-flex ps-5 pe-5 mb-2 custom-sort">
                <Col md="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                    <div className="text-muted text-small cursor-pointer ">S NO.</div>
                </Col>
                <Col md="3" className="d-flex flex-column pe-1 justify-content-center">
                    <div className="text-muted text-small cursor-pointer ">TITLE</div>
                </Col>
                <Col md="5" className="d-flex flex-column pe-1 justify-content-center">
                    <div className="text-muted text-small cursor-pointer ">DESCRIPTION</div>
                </Col>
                <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
                    <div className="text-muted text-small cursor-pointer ">DATE</div>
                </Col>
                {/* <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
          <div className="text-muted text-small cursor-pointer ">TYPE</div>
        </Col> */}
                {/* <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
          <div className="text-muted text-small cursor-pointer ">ISDELETE</div>
        </Col> */}
            </Row>
            {/* List Header End */}

            {/* List Items Start */}
            {notificationValue && notificationValue?.data?.map((item, index) => {
                console.log(item, "hgsdfgsjhgsdj")
                return <Card key="" className='mb-2'>
                    <Card.Body className="pt-0 pb-0 sh-35 sh-md-8">
                        <NavLink to={item?.link.startsWith('/Orderrating/') ? `${item?.link}` : `/OrderView/${item?.link}`}>
                            <Row className="g-0 h-100 align-content-center cursor-default" onClick={() => checkItem(0)}>
                                <Col xs="11" md="1" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                                    <div className="text-muted text-small d-md-none">S NO.</div>
                                    <div className="text-truncate h-100 d-flex align-items-center">
                                        {index + 1}
                                    </div>
                                </Col>
                                <Col xs="3" md="3" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                                    <div className="text-muted text-small d-md-none">TITLE</div>
                                    <div className="text-alternate">
                                        {item?.title}
                                    </div>
                                </Col>
                                <Col xs="5" md="5" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                                    <div className="text-muted text-small d-md-none">DESCRIPTION</div>
                                    <div className="text-alternate">
                                        <span>
                                            {item?.message}
                                        </span>
                                    </div>
                                </Col>
                                <Col xs="3" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                                    <div className="text-muted text-small d-md-none">DATE</div>
                                    <div className="text-alternate">
                                        <span>
                                            {(moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss"))}
                                        </span>
                                    </div>
                                </Col>
                                {/* <Col xs="3" md="1" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-5 order-md-4">
                <div className="text-muted text-small d-md-none">EDIT</div>
                <div className="text-alternate">
                  
                  <Button type="button" variant="outline-primary" ><CsLineIcons icon="edit" /></Button>
                </div>
              </Col> */}
                                {/* <Button type="button" variant="outline-primary" ><CsLineIcons icon="edit" /></Button> */}
                                {/* <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                <div className="text-muted text-small d-md-none"></div>
                <div className="text-alternate"> </div>
              </Col> */}
                                {/* <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-5 order-md-4">
                <div className="text-muted text-small d-md-none">ISDELETE</div>
                <div className="text-alternate">

                <Button type="button" variant="outline-primary"><CsLineIcons icon="edit" /></Button>
                </div>
              </Col> */}
                                {/* <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                <div className="text-muted text-small d-md-none">Status</div>
                <div className="text-alternate">hgfvh</div>
              </Col>
              <Col xs="6" lg="1" className="d-flex flex-column justify-content-center mb-2 mb-lg-0 order-last order-lg-5">
              <div className="text-muted text-small d-md-none">Status</div>
                <div className="text-alternate">fdghc</div>
                </Col> */}

                                {/* <Col xs="1" md="1" className="d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-2 text-end order-md-last">
&nbsp; */}
                                {/* </Col> */}
                            </Row>
                        </NavLink>
                    </Card.Body>
                </Card>
            })}





            {/* List Items End */}

            {/* Pagination Start */}
            <div className="d-flex justify-content-center mt-5">
                <Pagination>
                    <Pagination.Prev className="shadow" disabled={page === 0} onClick={() => pageChange("prev")}>
                        <CsLineIcons icon="chevron-left" />
                    </Pagination.Prev>
                    <Pagination.Item className="shadow" active onClick={() => pageChange("page")} >
                        {page + 1}
                    </Pagination.Item>
                    <Pagination.Item className="shadow" disabled={Math.ceil(notificationValue && notificationValue.count / limit) <= page + 1} onClick={() => pageChange("page+1", page + 1)}>{page + 2}</Pagination.Item>
                    <Pagination.Item className="shadow" disabled={Math.ceil(notificationValue && notificationValue.count / limit) <= page + 2} onClick={() => pageChange("page+2", page + 2)}>{page + 3}</Pagination.Item>

                    {Math.ceil(notificationValue && notificationValue.count / limit) > page + 3 &&
                        <>
                            <Pagination.Item className="shadow" >...</Pagination.Item>
                        </>

                    }
                    <Pagination.Next className="shadow" disabled={Math.ceil(notificationValue && notificationValue.count / limit) <= page + 1} onClick={() => pageChange("next")}>
                        <CsLineIcons icon="chevron-right" />
                    </Pagination.Next>
                </Pagination>
            </div>
            {/* Pagination End */}
            {/* Pagination Start */}

            {/* <div className="d-flex justify-content-center mt-5">
                <Pagination
                    size="small"
                    defaultPage={1}
                    boundaryCount={1}
                    page={page}
                    color="primary"
                    onChange={handleChange}
                    count={Math.ceil(items.count/ limit)}
                    renderItem={(item) =>(
                        <PaginationItem
                            components={{
                                next: ArrowForwardIcon,
                                previous: ArrowBackIcon,
                            }}
                            {...item}
                        />
                    )}
                />
            </div> */}

            {/* Pagination End */}
        </>
    );
};
export default Notification;
