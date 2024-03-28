import React, { useState, useEffect } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { Card, Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryListURL, CategoryAddURL, CategoryUpdateURL, } from 'Redux/AdminRedux/Cataogy/categoryRedux';
import { AllLoginUpdateCoupon } from 'Redux/IcafeAdminRedux/CouponsRedux/coponscompanyredux';
import { ICafeAdminCategoryStoreDropDownList } from 'Redux/IcafeAdminRedux/CategoryManagement/admincategorymanagementredux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import axios from 'axios';
import moment from 'moment';
import { ProductStoreListURL } from 'Redux/AdminRedux/Product/ProductRedux';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';



const addcategory = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    console.log(location, "locationlocation")
    const history = useHistory();
    const title = 'Update Coupon';
    const description = 'Ecommerce Category Management Page';
    const { StoreList } = useSelector((state) => state.products)
    const [selectValueState, setSelectValueState] = useState();
    const [UploadedFile, setUploadedFile] = useState('')
    console.log(UploadedFile, "UploadedFile")
    const [image, setImage] = useState(null);
    const optionsoffertype = [
        { value: 'special', label: 'Special' },
        { value: 'normal', label: 'Normal' },
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
    const [amount, setamount] = useState(location?.state?.amount)
    const [companyUpdateDrop, setCompanyUpdateDrop] = useState({ label: location?.state?.company[0]?.company_name, value: location?.state?.company[0]?.uuid });
    const [couponcode, setcouponcode] = useState('')
    const [maxuser, setmaxuser] = useState('')
    const [uptodiscount, setUptoDiscount] = useState('')
    const [sortorder, setSortOrder] = useState("")
    const [error, setError] = useState("");
    const [suc, setSuc] = useState(false);

    const { currentUser } = useSelector((state) => state.auth)

    const { categoryData1, AdmincategoryDropdown, storeDropdownByCompanyId } = useSelector((state) => state.admincategory)
    const { categoryData, notification } = useSelector((state) => state.companycoupons)
    // const { categoryData, notification } = useSelector((state) => state.companycoupons)
    // companycoupons
    // const { cashierData } = useSelector((state) => state.cashierList)
    //   const { categoryData } = useSelector((state) => state.cotegoryList)
    // useEffect(() => {
    //   dispatch(CategoryListURL(currentUser.token))
    // }, [])

    const categoryDrop = [];

    AdmincategoryDropdown?.data?.map((text) => {
        console.log(text, 'sbdvhbsdvb')
        return categoryDrop.push({ value: text?.uuid, label: text?.company_name })
    })


    const StoreUUid = []
    if (storeDropdownByCompanyId?.data?.length > 0) {
        storeDropdownByCompanyId?.data?.map((text) => {
            return StoreUUid.push({ label: text?.store_name, value: text?.uuid })
        }, [])
    }
    console.log(StoreUUid, "StoreUUid")

    const [storeuuid, setStoreUUID] = useState({ value: location?.state?.store[0]?.uuid, label: location?.state?.store[0]?.store_name });
    const [offertype, setoffertype] = useState({ value: location?.state?.offer_type, label: location?.state?.offer_type })
    const [offertype1, setoffertype1] = useState(location?.state?.offer_type)
    const [type, settype] = useState({ value: location?.state?.type, label: location?.state?.type })
    const [type1, settype1] = useState(location?.state?.type)
    const [minpuches, setminpurches] = useState('')
    // const [image, setimage] = useState('')
    const SelectStoreName = (event) => {
        console.log(event)
        setStoreUUID(event)
    }
    const SelectoffertypeName = (event) => {
        console.log(event, "gtsdfgd54645")
        setoffertype(event)
        setoffertype1(event?.value)
        // setStoreUUID(event)
    }
    const selecttype = (event) => {
        console.log(event, "gtsdfgd54645")
        settype(event)
        settype1(event?.value)
        // setStoreUUID(event)
    }
    const selectstartdate = (strdate) => {
        console.log(strdate, "strdatestrdate")
        setStartDate(strdate)

    }
    const selectenddate = (enddat) => {
        setEndDate(enddat)
    }
    const handleUpdateDrop = (select) => {
        console.log(select, 'sbdvhbsdvjrthritb')
        setCompanyUpdateDrop(select)
        dispatch(ICafeAdminCategoryStoreDropDownList(select === null ? "" : select?.value));
        // dispatch(companycouponslist(page, search, limit, "", select?.value, "", currentUser?.token))
    }

    useEffect(() => {
        setoffertype({ value: location?.state?.offer_type, label: location?.state?.offer_type })
        settype({ value: location?.state?.type, label: location?.state?.type })
        setStoreUUID({ value: location?.state?.store[0]?.uuid, label: location?.state?.store[0]?.store_name })
        selectstartdate(moment(location?.state?.from_date).format("YYYY-MM-DD"))
        setEndDate(moment(location?.state?.to_date).format("YYYY-MM-DD"))
        setcouponcode(location?.state?.code)
        setmaxuser(location?.state?.max_use_per_user)
        setminpurches(location?.state?.minimum_purchase)
        setDescription(location?.state?.description)
        // setUploadedFile(location?.state?.image)
        setCompanyUpdateDrop({ label: location?.state?.company[0]?.company_name, value: location?.state?.company[0]?.uuid })
    }, [])

    useEffect(() => {
        dispatch(ICafeAdminCategoryStoreDropDownList(location?.state?.company[0]?.uuid))
    }, [])


    const Updatecoupon = (event) => {
        event.preventDefault()

        // if (sortorder <= 0) {
        //     toast.error("Sort order must be greater than zero");
        //     return; // Stop the function if validation fails
        // }

        const payload = {
            "company_uuid": companyUpdateDrop?.value,
            "store_uuid": storeuuid?.value,
            // "sort_order": sortorder,
            "offer_type": offertype1,
            "type": type1?.toLocaleLowerCase(),
            "amount": amount,
            "code": couponcode,
            "max_use_per_user": maxuser,
            "from_date": startdate,
            "to_date": enddate,
            "image": UploadedFile === '' ? location?.state?.image?.replace('https://cmsapi.scienstechnologies.com/product/images/', '') : UploadedFile,
            // UploadedFile === '' ? location?.state?.image?.replace(`${process.env.REACT_APP_IMAGE_URL}`, '') : UploadedFile
            "description": description1,
            "minimum_purchase": minpuches,
            "upto_discount": Number(uptodiscount)
        }
        dispatch(AllLoginUpdateCoupon(location?.state?.uuid, payload, currentUser.token))
        // dispatch(CompanyListURL(currentUser.token))
        setSuc(true)
    }

    // const imagecoupon = (event,evet1) => {
    //     console.log(event,evet1,"eventevent435")
    //     const data1 = event.target.files[0]
    //     const formData = new FormData();

    //     formData.append('image', data1);
    //     axios.post(`${process.env.REACT_APP_URL}/product/upload/image`, formData)
    //         .then((res) => {
    //             setimage(res.data.image.filename)
    //         })
    //         .catch((err) => {
    //             console.log(err, "err")
    //         })
    //     setimage(event?.type)

    // }
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
                        pathname: "/couponlist",
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
                <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back mb-2" to="/couponlist">
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
                            <Form onSubmit={Updatecoupon}>
                                <Row className="g-3">
                                    <Col lg='6' className="mb-1">
                                        <Form.Label>Select Company</Form.Label>
                                        <Select
                                            classNamePrefix="react-select"
                                            className=""
                                            name="categery"
                                            options={categoryDrop}
                                            defaultValue={companyUpdateDrop}
                                            onChange={handleUpdateDrop}
                                            placeholder="Select Company"
                                            required
                                            style={{ borderRadius: '10px' }}
                                        // isDisabled={eventType}
                                        />
                                    </Col>
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
                                            // offer_type
                                            defaultValue={location?.state?.offer_type}

                                            placeholder="Select offer type"
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
                                            defaultValue={location?.state?.type}
                                            value={type}
                                            onChange={selecttype}
                                            placeholder="Select type"
                                            required
                                            style={{ borderRadius: '10px' }}
                                        />
                                    </Col>
                                    {/* optionstype */}
                                    {type?.label === "Percentage" &&
                                        <Col lg="6">
                                            <Form.Label> Upto Discount</Form.Label>
                                            <Form.Control type="text" defaultValue={location?.state?.upto_discount} onChange={(e) => { setUptoDiscount(e.target.value) }} />
                                        </Col>
                                    }
                                    <Col lg="6">
                                        <Form.Label>Amount</Form.Label>
                                        <Form.Control type="text" onChange={(e) => { setamount(e.target.value) }} defaultValue={location?.state?.amount} />
                                    </Col>
                                    <Col lg="6">
                                        <Form.Label>Coupon Code</Form.Label>
                                        <Form.Control type="text" onChange={(e) => { setcouponcode(e.target.value) }} defaultValue={location?.state?.code} />code
                                    </Col>
                                    <Col lg="6">
                                        <Form.Label>Max Use Per User</Form.Label>
                                        <Form.Control type="text" onChange={(e) => { setmaxuser(e.target.value) }} defaultValue={location?.state?.max_use_per_user} />
                                    </Col>
                                    <Col lg="6">
                                        <Form.Label>Min Purchase</Form.Label>
                                        <Form.Control type="text" onChange={(e) => { setminpurches(e.target.value) }} defaultValue={location?.state?.minimum_purchase} />
                                    </Col>
                                    {/* setminpurches */}
                                    <Col xs="6" md="2" lg="2">
                                        <Form.Label >Start Date</Form.Label>
                                        <input type="date"
                                            onChange={(e) => selectstartdate(e.target.value)} value={startdate}
                                            defaultValue={moment(location?.state?.from_date).format("DD-MM-YYYY")}

                                            id="folder" className="form-control" />
                                    </Col>
                                    <Col xs="6" md="2" lg="2">
                                        <Form.Label >End Date</Form.Label>
                                        <input type="date"
                                            defaultValue={moment(location?.state?.to_date).format("DD-MM-YYYY")}

                                            onChange={(e) => selectenddate(e.target.value)} value={enddate}
                                            id="folder" className="form-control" />
                                    </Col>

                                    <Col xs="12" md="4" >
                                        <Form.Group as={Col} >
                                            <Form.Label className='mb-2'>Image </Form.Label>
                                            <Form.Control className='mb-2' type="file" name="name" onChange={handleImageChange} />
                                            <div>&nbsp;</div>
                                            <img crossOrigin="anonymous" src={location?.state?.image} alt="" style={{ width: "160px" }} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs="12" md="4" >
                                        <Form.Label className='mb-2'>Description</Form.Label>
                                        <Form.Control className='mb-2' type="text" placeholder="Enter" name="name" onChange={(e) => setDescription(e.target.value)} defaultValue={location?.state?.description} />
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
