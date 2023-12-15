import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ForgetOtpVerifyFormApi } from 'Redux/ForgetPassword/forgetpassword';
import logo from "../../Assests/images/cafe.png"




const ResetPassword = () => {
    const title = 'Reset Password';
    const description = 'Reset Password Page';
    const location = useLocation('');
    console.log(location, 'shvghqsfhfv')
    const history=useHistory('');
    const { forgetOtpVerify, notification } = useSelector((state) => state.forgetpassword);
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch('');
    const validationSchema = Yup.object().shape({
        otp: Yup.string().min(4, 'otp Must be 4 digits!').required('Otp is required'),
        password: Yup.string().min(6, 'Must be at least 6 chars!').required('Password is required'),
        passwordConfirm: Yup.string()
            .required('Password Confirm is required')
            .oneOf([Yup.ref('password'), null], 'Must be same with password!'),
    });
    const initialValues = { otp: '', email: location?.state, password: '', passwordConfirm: '' };
    const onSubmit = (values) => {
        console.log('submit form', values);
        if(values.password === values.passwordConfirm){
        dispatch(ForgetOtpVerifyFormApi(values))
        setSuccess(true)
        }
        else {
            toast.error("Confirm Password must be same as  Password !")
        }
    }
    const formik = useFormik({ initialValues, validationSchema, onSubmit });
    const { handleSubmit, handleChange, values, touched, errors } = formik;
    const validateMobileInput = (value) => {
        // Use a regular expression to check if the input contains only digits
        const regex = /^[0-9]+$/;
        return regex.test(value);
    };

    // Event handler for mobile input change
    const handleMobileInputChange = (e) => {
        const { name, value } = e.target;

        // Check if the input contains only digits
        if (validateMobileInput(value) || value === '') {
            formik.handleChange(e); // Update the formik state
        }
    };
    useEffect(() => {
        if (success === true) {
            if (notification?.status === true) {
                toast.success(notification?.message)
                setTimeout(() => {
                    history.push({
                        pathname: '/login'
                    })
                }, 2000)
            }
            else if (notification?.status === false) {
                toast.error(notification?.message)
            }
        }
    }, [notification])
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
                    <h2 className="cta-1 mb-0 text-primary">Password trouble?</h2>
                    <h2 className="cta-1 text-primary">Renew it here!</h2>
                </div>
                <div className="mb-5">
                    <p className="h6">Please use below form to reset your password.</p>
                    <p className="h6">
                        If you are a member, please <NavLink to="/login">login</NavLink>.
                    </p>
                </div>
                <div>
                    <form id="resetForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
                        <div className="mb-3 filled">
                            <CsLineIcons icon="mobile" />
                            <Form.Control type="text" name="otp" onChange={handleMobileInputChange} value={values.otp} minlength={4} maxlength={4} placeholder="Enter OTP" />
                            {errors.otp && touched.otp && <div className="d-block invalid-tooltip">{errors.otp}</div>}
                        </div>
                        <div className="mb-3 filled">
                            <CsLineIcons icon="lock-off" />
                            <Form.Control type="password" name="password" onChange={handleChange} value={values.password} placeholder="Password" />
                            {errors.password && touched.password && <div className="d-block invalid-tooltip">{errors.password}</div>}
                        </div>
                        <div className="mb-3 filled">
                            <CsLineIcons icon="lock-on" />
                            <Form.Control type="password" name="passwordConfirm" onChange={handleChange} value={values.passwordConfirm} placeholder="Confirm Password" />
                            {errors.passwordConfirm && touched.passwordConfirm && <div className="d-block invalid-tooltip">{errors.passwordConfirm}</div>}
                        </div>
                        <Button size="lg" type="submit">
                            Reset Password
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

export default ResetPassword;
