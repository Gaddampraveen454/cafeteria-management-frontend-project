import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Card, Button, Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { useDispatch, useSelector } from 'react-redux';
import { AdminProductAddURL, AdminProductCategoryDropDownListURL, AdminProductStoreDropDownList, AdminProductStoreDropDownListURL } from "Redux/IcafeAdminRedux/ProductManagement/productmanagementredux";
import { ActiveCompnyURL } from 'Redux/AdminRedux/Comapny/ActiveCompany';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ICafeAdminCategoryDropDownListURL, ICafeAdminCategoryStoreDropDownListURL } from 'Redux/IcafeAdminRedux/CategoryManagement/admincategorymanagementredux';
import { AdminBannersAddURL } from 'Redux/IcafeAdminRedux/IcafeBanners/icafebanners';

const addbanners = () => {

    const dispatch = useDispatch()
    const history = useHistory();
    const title = 'Add Banners';
    // const description = 'Ecommerce Product Management Page';

    const [UploadedFile, setUploadedFile] = useState("")
    console.log(UploadedFile, "UploadedFile")
    const { currentUser } = useSelector((state) => state.auth)
    const { notification } = useSelector((state) => state.adminbanners);
    const [suc, setSuc] = useState(false);
    const [titlee, setTitle] = useState("")
    const [sortOrder, setSortOrder] = useState('');

    const AddBanner = (event) => {
        event.preventDefault()
       if(sortOrder <= 0){
        toast.error('Sort order must be greater than Zero');
        return;
       }
        const payload = {
            "title": titlee,
            "image": UploadedFile,
            "sort_order":sortOrder
        }
        dispatch(AdminBannersAddURL(payload, currentUser.token))
        setSuc(true)


    }

    useEffect(() => {
        if (suc === true) {
            if (notification.status === true) {
                toast.success(notification.message, {
                    position: "top-right",
                    duration: 1000
                })
                setSuc(false)
                setTimeout(() => {
                    // dispatch(ProductListURL(page, search,currentUser.token,limit))
                    history.push(({
                        pathname: "/banner",
                        // state : {detail : id,fullname : name, pic :image, type:"edit"},
                    }))
                }, 2000)
            }
            else if (notification.status === false) {
                toast.error(notification.message)
                setSuc(false)
            }
        }

    }, [notification])




    const [image, setImage] = useState(null);


    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };




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
            <HtmlHead title={title} />
            {/* Title Start */}
            <div className="page-title-container">
                <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back mb-2" to="/banner">
                    <CsLineIcons icon="chevron-left" size="20" />
                    <span className="align-middle text-medium ms-1">Banner</span>
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
                            <Form onSubmit={AddBanner}>
                                <Row className="g-3">
                                    <Col lg="4">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text" onChange={(e) => { setTitle(e.target.value) }} />
                                    </Col>
                                    <Col lg="4">
                                        <Form.Label>Sort</Form.Label>
                                        <Form.Control type="number" rows={1} onChange={(e) => { setSortOrder(e.target.value) }} />
                                    </Col>
                                    <Col lg="4">
                                        <div>
                                            <Form.Label>Image</Form.Label>
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
                                    {/* </Col> */}
                                    <Col lg="12">
                                        <Col lg="3">
                                            <Button variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto" type="submit">
                                                <CsLineIcons /> <span>Submit</span>
                                            </Button>
                                        </Col>
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

export default addbanners;
