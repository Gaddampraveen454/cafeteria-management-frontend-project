import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Tooltip, OverlayTrigger } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { LogOutURL } from 'auth/authSlice';


const ChangepasswordStore = () => {

    const title = 'Change Password';
    const description = 'Ecommerce Orders List Page';

    const dispatch = useDispatch()

    const history = useHistory();

    const { currentUser, notification } = useSelector((state) => state.auth)
    console.log(currentUser, notification, "ghvdshfhdskjfhdsk")

    const [validated, setValidated] = useState(false);
    const [suc, setSuc] = useState(false);

    const redirect = () => {
        return history.push("/")
    }


    const Logout = () => {
        dispatch(LogOutURL())
        history.push('/login')
    }

    const setpassword = (event) => {
        event.preventDefault();

        const form = event.currentTarget;

        const details = event.target.elements;

        if (form.checkValidity() === true) {
            event.preventDefault();
            event.stopPropagation();

            if (details.newpassword.value === details.confirmpassword.value) {
                const payload = {
                    "user_uuid": currentUser?.data?.uuid,
                    "old_password": details.oldpassword.value,
                    "new_password": details.newpassword.value
                }
                axios.put(`${process.env.REACT_APP_URL}/company/password/change`, payload, {
                    headers: { "x-auth-token": currentUser?.token }
                })
                    .then((res) => {
                        console.log(res, "hjfdhkfjdhdjf")
                        toast.success(res.data.message);

                        setTimeout(() => Logout(), 1500)
                    })
                    .catch((err) => {
                        console.log(err.response, "hdkfjds")
                        toast.error(err.response.data || err.response.data.message);
                    })
            }
        }

        setValidated(true);
    }
    const Back = () => {
        history.goBack()
    }

    return (
        <>
            <HtmlHead title={title} description={description} />
            <div className="page-title-container">
                <Row className="g-0">
                    {/* Title Start */}
                    <Col className="col-auto mb-3 mb-sm-0 me-auto">
                        <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/">
                            <CsLineIcons icon="chevron-left" size="13" />
                            <span className="align-middle text-small ms-1">Dashboard</span>
                        </NavLink>
                        <h1 className="mb-0 pb-0 display-4" id="title">
                            {title}
                        </h1>
                    </Col>

                </Row>
            </div>

            <Row>
                <Col xs="12" className="col-lg order-1 order-lg-0">
                    <Col xs="12" className="col-lg order-1 order-lg-0">
                        <Card className="mb-5">
                            <Card.Body>
                                <Form noValidate validated={validated} onSubmit={setpassword} autoComplete='off'>
                                    <Row className="g-3">
                                        <Row className="g-3">
                                            <Col lg="6">
                                                <Form.Group as={Col} lg="12" controlId="validationCustom03" >
                                                    <Form.Label > Old Password </ Form.Label>
                                                    <Form.Control type="password" name="oldpassword" className="form-control" required />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please provide a valid Old password.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className="g-3">
                                            <Col lg="6">
                                                <Form.Group as={Col} lg="12" controlId="validationCustom03">
                                                    <Form.Label > New Password </ Form.Label>
                                                    <Form.Control type="password" name="newpassword" className="form-control" required />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please provide a valid New password.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row className="g-3">
                                            <Col lg="6">
                                                <Form.Group as={Col} lg="12" controlId="validationCustom03">
                                                    <Form.Label > Confirm Password </ Form.Label>
                                                    <Form.Control type="password" name="confirmpassword" className="form-control" required />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please provide a valid Confirm password.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Col lg="1"><br />
                                            <Button type="submit" className="btn-icon btn-icon-start  align-items-center  ms-0 ms-sm-1 w-100 w-md-auto" >
                                                <CsLineIcons /> <span>Submit</span>
                                            </Button>
                                        </Col>
                                        &nbsp;&nbsp;
                                        {/* <Col lg="1"><br />
                                            <Button onClick={Back} className="btn-icon btn-icon-start  align-items-center  ms-0 ms-sm-1 w-100 w-md-auto" >
                                                <CsLineIcons /> <span>Cancel</span>
                                            </Button>
                                        </Col> */}
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Col>
            </Row>
        </>
    );
}

export default ChangepasswordStore;


