import React, { useState, useEffect } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { OtpVerify } from 'auth/ConsumerAuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import axios from 'axios';
import logo from "../../Assests/images/cafe.png"



const OtpVerification = () => {
    const title = 'Register';
    const description = 'Register Page';

    const [otp, setOtp] = useState('');

    const [count, setCount] = useState(0);

    const dispatch = useDispatch()
    const location = useLocation();
    console.log(location, "location65465yrth")

    const { currentUser, isLogin, loginDetailes } = useSelector((state) => state.auth);
    console.log(currentUser, "gfdshvsgcvdgc")

    const history = useHistory();

    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if (success === true) {
            history.push('/Checkout')
            localStorage.setItem('token', currentUser)
        }
    }, [success])

    const initialValues = { phone: '', otp: '' };
    const onSubmit = (values) => {
        const payLoad = {
            "mobile": location?.state?.mobile,
            "email": location?.state?.email,
            "otp": otp
        }
        dispatch(OtpVerify(payLoad))
        setSuccess(true)
    };

    const formik = useFormik({ initialValues, onSubmit });
    const { handleSubmit, handleChange, values, touched, errors } = formik;


    const ResendOTP = () => {
        const payLoad = {
            "mobile": location?.state?.mobile
        }
        axios.post(`${process.env.REACT_APP_URL}/user/resend/otp`, payLoad)
            .then((res) => {
                toast.success('OTP Sent Successfully!')
            })
            .catch((err) => {
                console.log(err, "fgaegaerg")
                toast.error(err?.response?.data)
            })
    }

    const otpChange = event => {
        const result = event.target.value.replace(/\D/g, '');
        setOtp(result);
    };

    const leftSide = (
        <div className="min-h-100 d-flex align-items-center">
            <div className="w-100 w-lg-75 w-xxl-50">
                <div>
                    <div className="mb-5">
                        <h1 className="display-3 text-white">Multiple Niches</h1>
                        <h1 className="display-3 text-white">Ready for Your Project</h1>
                    </div>
                    <p className="h6 text-white lh-1-5 mb-5">
                        Dynamically target high-payoff intellectual capital for customized technologies. Objectively integrate emerging core competencies before
                        process-centric communities...
                    </p>
                    <div className="mb-5">
                        <Button size="lg" variant="outline-white" href="/">
                            Learn More
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

    const rightSide = (
        <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
            <div className="sw-lg-50 px-5">
                <div className="sh-11">
                    <NavLink to="/">
                        {/* <div className="logo-default" /> */}
                        <img src={logo} alt="logo" style={{ width: "100px", height: "auto" }} />
                    </NavLink>
                </div>
                <div className="mb-5">
                    <h2 className="cta-1 mb-0 text-primary">Welcome,</h2>
                    <h2 className="cta-1 text-primary">let's get the ball rolling!</h2>
                </div>
                <div className="mb-5">
                    <p className="h6">Please use the form to register.</p>
                    <p className="h6">
                        If you are a member, please <NavLink to="/login">login</NavLink>.
                    </p>
                </div>


                <div>
                    <form id="registerForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>

                        <div className="mb-3 filled form-group tooltip-end-top">
                            <CsLineIcons icon="mobile" />
                            <Form.Control type="text" name="mobile" placeholder="Enter OTP" minLength={4} maxLength={6} value={otp} onChange={otpChange} />
                            {errors.mobile && touched.mobile && <div className="d-block invalid-tooltip">{errors.mobile}</div>}
                        </div>
                        {count === 0 ?
                            <Button size="md" type="submit" style={{ marginBottom: "10px" }}>
                                Verify
                            </Button>
                            :
                            <Button disabled size="md" type="submit" style={{ marginBottom: "10px" }}>
                                Verify
                            </Button>
                        }
                        &nbsp;&nbsp;&nbsp;
                        <Button size="md" onClick={ResendOTP} style={{ marginBottom: "10px" }}>
                            Resend OTP
                        </Button>
                    </form>
                </div>
            </div>

        </div>
    );

    return (
        <>
            <HtmlHead title={title} description={description} />
            <LayoutFullpage left={leftSide} right={rightSide} />
        </>
    );
};

export default OtpVerification;
