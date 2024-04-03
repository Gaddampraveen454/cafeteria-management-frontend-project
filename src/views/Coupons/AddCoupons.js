import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Card, Button, Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import axios from 'axios';

import { ProductStoreListURL } from 'Redux/AdminRedux/Product/ProductRedux';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryListURL, CategoryAddURL, CategoryUpdateURL, } from 'Redux/AdminRedux/Cataogy/categoryRedux';
import { AllLoginAddCoupon } from 'Redux/IcafeAdminRedux/CouponsRedux/coponscompanyredux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const addcategory = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const title = 'Add Coupon';
    const description = 'Ecommerce Category Management Page';
    const { StoreList } = useSelector((state) => state.products)
    const [selectValueState, setSelectValueState] = useState();
    const optionsoffertype = [
        { value: 'special', label: 'special' },
        { value: 'normal', label: 'normal' },
    ];

    const optionstype = [
        { value: 'flat', label: 'Flat' },
        { value: 'percentage', label: 'Percentage' },
    ];
    const [startdate, setStartDate] = useState("");
    const [enddate, setEndDate] = useState("");
    const [description1, setDescription] = useState('')

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
    const [amount, setamount] = useState('')
    const [couponcode, setcouponcode] = useState('')
    const [maxuser, setmaxuser] = useState('')
    const [sortorder, setSortOrder] = useState("")
    const [error, setError] = useState("");
    const [suc, setSuc] = useState(false);
    const [uptodiscount, setUptoDiscount] = useState('')

    const { currentUser } = useSelector((state) => state.auth)
    console.log(currentUser, 'currentUsercurrentUser')
    const { categoryData, notification } = useSelector((state) => state.companycoupons)
    // const { categoryData, notification } = useSelector((state) => state.companycoupons)
    // companycoupons
    // const { cashierData } = useSelector((state) => state.cashierList)
    //   const { categoryData } = useSelector((state) => state.cotegoryList)
    // useEffect(() => {
    //   dispatch(CategoryListURL(currentUser.token))
    // }, [])

    const StoreUUid = []
    if (StoreList?.data?.length > 0) {
        StoreList?.data?.map((text) => {
            return StoreUUid.push({ label: text?.store_name, value: text?.uuid })
        }, [])
    }

    const [storeuuid, setStoreUUID] = useState('');
    const [offertype, setoffertype] = useState('')
    const [type, settype] = useState('')
    const [UploadedFile, setUploadedFile] = useState("")
    const [image, setImage] = useState(null);
    const [minpuches, setminpurches] = useState('')
    // const [image,setimage] = useState('')
    const SelectStoreName = (event) => {
        console.log(event)
        setStoreUUID(event)
    }
    const SelectoffertypeName = (event) => {
        console.log(event, "gtsdfgd54645")
        setoffertype(event)
        // setStoreUUID(event)
    }
    const selecttype = (event) => {
        console.log(event, "gtsdfgd54645")
        settype(event)
        // setStoreUUID(event)
    }

    useEffect(() => {
        dispatch(ProductStoreListURL(currentUser?.token, currentUser?.data?.uuid))
    }, [])

    const Addcoupon = (event) => {
        event.preventDefault()

        // if (sortorder <= 0) {
        //     toast.error("Sort order must be greater than zero");
        //     return; // Stop the function if validation fails
        // }
        const payload = {
            "company_uuid": currentUser?.data?.uuid,
            "store_uuid": storeuuid?.value,
            // "sort_order": sortorder,
            "offer_type": offertype?.value,
            "type": type?.value,
            "amount": amount,
            "code": couponcode,
            "max_use_per_user": maxuser,
            "from_date": startdate,
            "to_date": enddate,
            "image": UploadedFile,
            "description": description1,
            "minimum_purchase": minpuches,
            "upto_discount": Number(uptodiscount)
        }
        dispatch(AllLoginAddCoupon(payload, currentUser.token))
        // dispatch(CompanyListURL(currentUser.token))
        setSuc(true)
    }



    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const imagecoupon = (event) => {
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
            imagecoupon()
        }

    }, [image])

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
                        pathname: "/couponslist",
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
    const selectstartdate = (strdate) => {
        console.log(strdate, "strdatestrdate")
        setStartDate(strdate)
    }
    const selectenddate = (enddat) => {
        setEndDate(enddat)
    }


    return (
        <>
            <HtmlHead title={title} description={description} />
            {/* Title Start */}
            <div className="page-title-container">
                <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back mb-2" to="/couponslist">
                    <CsLineIcons icon="chevron-left" size="20" />
                    <span className="align-middle text-medium ms-1">Coupons list</span>
                </NavLink>
                <h1 className="mb-0 pb-0 display-4" id="title">
                    {title}
                </h1>
            </div>
            {/* Title End */}

            <Row>
                <Col xs="12" className="col-lg order-1 order-lg-0">

                    <Card className="mb-5">
                        <Card.Body>
                            <Form onSubmit={Addcoupon}>
                                <Row className="g-3">
                                    <Col lg='6' className="mb-1">
                                        <Form.Label>Select Store</Form.Label>
                                        <Select
                                            classNamePrefix="react-select"
                                            className=""
                                            name="categery"
                                            options={StoreUUid}
                                            value={storeuuid}
                                            onChange={SelectStoreName}
                                            placeholder="Select Store"
                                            required
                                            style={{ borderRadius: '10px' }}
                                        />
                                    </Col>
                                    <Col lg='6' className="mb-1">
                                        <Form.Label>Offer Type</Form.Label>
                                        <Select
                                            classNamePrefix="react-select"
                                            className=""
                                            name="offer_type"
                                            options={optionsoffertype}
                                            value={offertype}
                                            onChange={SelectoffertypeName}
                                            placeholder="Select Store"
                                            required
                                            style={{ borderRadius: '10px' }}
                                        />
                                    </Col>
                                    <Col lg='6' className="mb-1">
                                        <Form.Label>Type</Form.Label>
                                        <Select
                                            classNamePrefix="react-select"
                                            className=""
                                            name="type"
                                            options={optionstype}
                                            value={type}
                                            onChange={selecttype}
                                            placeholder="Select Store"
                                            required
                                            style={{ borderRadius: '10px' }}
                                        />
                                    </Col>
                                    {/* optionstype */}
                                    {type?.label === "Percentage" &&
                                        <Col lg="6">
                                            <Form.Label> Upto Discount</Form.Label>
                                            <Form.Control type="text" value={uptodiscount} onChange={(e) => { setUptoDiscount(e.target.value) }} />
                                        </Col>
                                    }
                                    <Col lg="6">
                                        <Form.Label>Amount</Form.Label>
                                        <Form.Control type="text" onChange={(e) => { setamount(e.target.value) }} />
                                    </Col>
                                    <Col lg="6">
                                        <Form.Label>Coupon Code</Form.Label>
                                        <Form.Control type="text" onChange={(e) => { setcouponcode(e.target.value) }} />
                                    </Col>
                                    <Col lg="6">
                                        <Form.Label>max_use_per_user</Form.Label>
                                        <Form.Control type="text" onChange={(e) => { setmaxuser(e.target.value) }} />
                                    </Col>
                                    <Col lg="6">
                                        <Form.Label>Min Purches</Form.Label>
                                        <Form.Control type="text" onChange={(e) => { setminpurches(e.target.value) }} />
                                    </Col>
                                    {/* setminpurches */}
                                    <Col xs="6" md="2" lg="2">
                                        <Form.Label >Start Date</Form.Label>
                                        <input type="date"
                                            onChange={(e) => selectstartdate(e.target.value)} value={startdate}
                                            id="folder" className="form-control" />
                                    </Col>
                                    <Col xs="6" md="2" lg="2">
                                        <Form.Label >End Date</Form.Label>
                                        <input type="date"
                                            onChange={(e) => selectenddate(e.target.value)} value={enddate}
                                            id="folder" className="form-control" />
                                    </Col>
                                    {/* setmaxuser */}
                                    {/* <Col lg="6">
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
                                    </Col> */}
                                    <Col xs="12" md="4" >
                                        <Form.Group >
                                            <Form.Label className='mb-2'>Image </Form.Label>
                                            <Form.Control className='mb-2' type="file" name="name" onChange={handleImageChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs="12" md="4" >
                                        <Form.Label className='mb-2'>Description</Form.Label>
                                        <Form.Control className='mb-2' type="textArea" placeholder="Enter" name="name" onChange={(e) => setDescription(e.target.value)} />
                                    </Col>
                                    <Col lg="12" className='mt-4'>
                                        {/* <Form.Label >hello</Form.Label> */}
                                        <Button variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto" type="submit">
                                            <CsLineIcons /> <span>Submit</span>
                                        </Button>
                                    </Col>


                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>



                </Col>

            </Row>
        </>
    );
};

export default addcategory;
