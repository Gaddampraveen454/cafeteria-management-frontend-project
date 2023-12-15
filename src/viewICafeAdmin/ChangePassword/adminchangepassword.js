import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Tooltip, OverlayTrigger } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import { LogOutURL, LoginURL } from 'auth/authSlice';
// import { LogoutApi } from 'auth/authSlice';
import CheckAll from 'components/check-all/CheckAll';


const AdminChangepassword = () => {

    const title = 'Change Password';
    const description = 'Ecommerce Orders List Page';

    const dispatch = useDispatch()

    const history = useHistory();

    const { isLogin, currentUser } = useSelector((state) => state.auth);

    console.log(currentUser,"currentUsercurrentUser")

    const [validated, setValidated] = useState(false);
    const [suc, setSuc] = useState(false);
    const [oldpassword, oldsentpassword] = useState('')
    const [newpassword1, newsentpassword1] = useState('')
    const [ConformPassword, setconformpassword] = useState('')


    const redirect = () => {
        return history.push("/login")
    }

    // useEffect(() => {
    //     if(suc === true){
    //         if(notification?.status === "success"){
    //             setTimeout(() => {
    //                 history.push("/")
    //             },[1000])
    //         }
    //     }
    // },[suc, notification])

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

            if (newpassword1 === ConformPassword) {
                const payload = {
                    // "old_password": oldpassword,
                    // "new_password": newpassword1
                    "user_uuid": currentUser.data.uuid,
                    "old_password": oldpassword,
                    "new_password": newpassword1
                }
                axios.put(`${process.env.REACT_APP_URL}/company/password/change`, payload, {
                    headers: {
                        "x-auth-token": currentUser?.token
                    }
                })
                    .then((res) => {
                        toast.success("Password Changed Successfully");

                        setTimeout(() => {
                            Logout()
                        }, 1500)
                    })
                    .catch((err) => {
                        toast.error(err.response.data);
                    })
            }
            else {
                toast.warning('New Password and Confirm Not Matched !')
            }
        }
        setValidated(true);
    }
    const Back = () => {
        history.goBack()
    }

    const oldpossword = (event) => {
        oldsentpassword(event)
    }

    const newpossword = (event) => {
        newsentpassword1(event)
    }

    const posswordfonform = (event) => {
        setconformpassword(event)
    }

    return (
        <>
            <HtmlHead title={title} description={description} />
            <div className="page-title-container">
                <Row className="g-0">
                    {/* Title Start */}
                    <Col className="col-auto mb-3 mb-sm-0 me-auto">
                        <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/">
                            {/* <CsLineIcons icon="chevron-left" size="13" />
                            <span className="align-middle text-small ms-1">Home</span> */}
                        </NavLink>
                        <h1 className="mb-0 pb-0 display-4" id="title">
                            {title}
                        </h1>
                    </Col>
                    {/* <Col xs="12" sm="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
                  <Button variant="outline-primary"  className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto" onClick={AssignmentAdd}>
                    <CsLineIcons icon="plus" /> <span>Add </span>
                  </Button>
              </Col> */}
                    {/* Title End */}
                    {/* Top Buttons Start */}
                    {/* <Col xs="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
                  <Button variant="outline-primary" className="btn-icon btn-icon-only ms-1 d-inline-block d-lg-none">
                    <CsLineIcons icon="sort" />
                  </Button>
                  <div className="btn-group ms-1 check-all-container">
                    <CheckAll
                      allItems={allItems}
                      selectedItems={selectedItems}
                      onToggle={toggleCheckAll}
                      inputClassName="form-check"
                      className="btn btn-outline-primary btn-custom-control py-0"
                    />
                    <Dropdown align="end">
                      <Dropdown.Toggle className="dropdown-toggle dropdown-toggle-split" variant="outline-primary" />
                      <Dropdown.Menu>
                        <Dropdown.Item>Move</Dropdown.Item>
                        <Dropdown.Item>Archive</Dropdown.Item>
                        <Dropdown.Item>Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Col> */}
                    {/* Top Buttons End */}
                </Row>
            </div>

            <Row>
                <Col xs="12" className="col-lg order-1 order-lg-0">
                    <Col xs="12" className="col-lg order-1 order-lg-0">
                        <Card className="mb-5">
                            <Card.Body>
                                <Form noValidate validated={validated} onSubmit={setpassword} autoComplete='off'>
                                    <Row className="g-3">
                                        {/* <Row className="g-3">
                                            <Col lg="6">
                                                <Form.Group as={Col} lg="12" controlId="validationCustom03" >
                                                    <Form.Label > Old Password </ Form.Label>
                                                    <Form.Control type="password" name="oldpassword" className="form-control" required />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please provide a valid Old password.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row> */}
                                        <Row className="g-3">
                                            <Col lg="6">
                                                <Form.Group as={Col} lg="12" controlId="validationCustom03">
                                                    <Form.Label > Old Password </ Form.Label>
                                                    <Form.Control type="password" className="form-control" value={oldpassword} onChange={(event) => oldpossword(event?.target?.value)} required />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please provide a valid old password.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row className="g-3">
                                            <Col lg="6">
                                                <Form.Group as={Col} lg="12" controlId="validationCustom03">
                                                    <Form.Label > New Password</ Form.Label>
                                                    <Form.Control type="password" className="form-control" value={newpassword1} onChange={(event) => newpossword(event?.target?.value)} required />
                                                    <Form.Control.Feedback type="invalid">
                                                        {/* posswordfonform */}
                                                        Please provide a valid new password.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className="g-3">
                                            <Col lg="6">
                                                <Form.Group as={Col} lg="12" controlId="validationCustom03">
                                                    <Form.Label > Confirm Password </ Form.Label>
                                                    <Form.Control type="text" className="form-control" value={ConformPassword} onChange={(event) => posswordfonform(event?.target?.value)} required />
                                                    <Form.Control.Feedback type="invalid">
                                                        {/* posswordfonform */}
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
                                        <Col lg="1"><br />
                                            <Button onClick={Back} className="btn-icon btn-icon-start  align-items-center  ms-0 ms-sm-1 w-100 w-md-auto" >
                                                <CsLineIcons /> <span>Cancel</span>
                                            </Button>
                                        </Col>
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

export default AdminChangepassword;


