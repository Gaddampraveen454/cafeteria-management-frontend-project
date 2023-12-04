import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// import { LoginURL } from '../../auth/authSlice'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConsumerLoginURL } from '../../auth/ConsumerAuthSlice';
import logo from "../../Assests/images/cafe.png"

const Login = () => {
    const title = 'Login';
    const description = 'Login Page';
    const [suc, setSuc] = useState(false);
    const [directLogin, setDirectLogin] = useState(false)
    const { currentUser, isLogin, notification } = useSelector((state) => state.auth);
    console.log(currentUser, isLogin, "currentUdfddsfsdfdser")
    const history = useHistory()
    const location = useLocation();
    console.log(location.state, "sdffsdfsdfdsfdsf")

    const [mobile, setMobile] = useState("")
    const [namevalue, setNameValue] = useState("")
    const [emailvalue, setEmailValue] = useState("")

    const [Checkapiresponse, setCheckapiResponse] = useState(false)

    useEffect(() => {
        if (location.state === undefined) {
            setDirectLogin(false)
        } else {
            setDirectLogin(true)
        }

    }, [])

    const CheckWithMobile = (e) => {
        e.preventDefault()

        const payLoad = {
            "mobile": mobile
        }

        axios.post(`${process.env.REACT_APP_URL}/user/check`, payLoad)
            .then((res) => {
                console.log(res, "gjdsfjdsh")
                toast.success(res?.data?.message)
                setTimeout(() => {
                    history.push({
                        pathname: "/otp-verification",
                        state: res?.data?.data
                    })
                }, 2000)

            })
            .catch((err) => {
                console.log(err)
                toast.error(err?.response?.data?.message)
                setCheckapiResponse(true)
            })
    }

    const [check, setCheck] = useState(false)

    const change = () => {
        if (check === false) {
            setCheck(true)
        }
        else {
            setCheck(false)
        }
    }

    const Signupfunction = (e) => {
        e.preventDefault()

        const payLoad = {
            "mobile": mobile,
            "email": emailvalue,
            "name": namevalue
        }
        if (check === true) {
            axios.post(`${process.env.REACT_APP_URL}/user/signup`, payLoad)
                .then((res) => {
                    console.log(res, "gjdsfjdsh")
                    toast.success(res?.data?.message)
                    setTimeout(() => {
                        history.push({
                            pathname: "/otp-verification",
                            state: res?.data?.data
                        })
                    }, 2000)

                })
                .catch((err) => {
                    console.log(err)
                    toast.error(err?.response?.data?.message)
                })
        }
        else {
            toast.error("Please Select Terms and Conditions!")
        }
    }


    //   useEffect(()=> {

    // if(isLogin === true && currentUser && currentUser.data && currentUser.data.group === "consumer"){
    //   // history.push('/dashboard')
    //   history.push(({
    //     // pathname: "/consumer/login",
    //     pathname: "/Checkout",
    //     state:{
    //       userType:"consumer"
    //     }

    //   }));
    //   localStorage.setItem('token',currentUser)
    // }
    // else if(isLogin === true && currentUser && currentUser.data && currentUser.data.group === "admin"){
    //   history.push('/dashboard')
    //   localStorage.setItem('token',currentUser)
    // }
    //   },[currentUser])





    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required('Email is required'),
        password: Yup.string().min(6, 'Must be at least 6 chars!').required('Password is required'),
    });
    const initialValues = { emp_id: '', password: '' };
    const onSubmit = (values) => console.log('submit form', values);

    const formik = useFormik({ initialValues, validationSchema, onSubmit });
    const { handleSubmit, handleChange, values, touched, errors } = formik;

    const dispatch = useDispatch();

    console.log(values, "values")
    // const LoginAPI = (event) => {
    //     event.preventDefault()
    //     dispatch(ConsumerLoginURL(values));
    //     setSuc(true)
    //     console.log(event.target.elements, "dfghhjj")
    // }
    const Guest = () => {
        if (directLogin === true) {
            history.push('/');
        }

        else {
            history.push(({
                // pathname: "/consumer/login",
                pathname: "/Checkout",
                state: {
                    userType: "guest"
                }

            }));
        }
    }



    const EmployeeLogin = () => {
        history.push({
            pathname: '/employee/login'
        })
    }


    const leftSide = (
        <div className="min-h-100 d-flex align-items-center">
            <div className="w-100 w-lg-75 w-xxl-50">
                {/* <div> */}
                <div className="mb-5">
                    <h2 className='text-white'> An efficient and user-centric way to handle all your orders, through QR code scanning and smooth cashless payments</h2>
                    {/* <h1 className="display-3 text-white">Ready for Your Project</h1> */}
                </div>
                {/* <p className="h6 text-white lh-1-5 mb-5">
            Dynamically target high-payoff intellectual capital for customized technologies. Objectively integrate emerging core competencies before
            process-centric communities...
          </p>
          <div className="mb-5">
            <Button size="lg" variant="outline-white" href="/">
              Learn More
            </Button>
          </div> */}
                {/* </div> */}
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
                    <h2 className="cta-1 text-primary">let's get started!</h2>
                </div>
                <div className="mb-5">
                    <p className="h6">Please use your credentials to login.</p>
                    <p className="h6">
                        If you are not a member, please <NavLink to="/register">register</NavLink>.
                    </p>
                </div>
                <div>
                    <form id="loginForm" className="tooltip-end-bottom"
                    // onSubmit={CheckWithMobile}
                    // onSubmit={handleLogin}
                    >
                        <div className="mb-3 filled form-group tooltip-end-top">
                            <CsLineIcons icon="mobile" />
                            <Form.Control type="text" name="mobile" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                            {errors.email && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
                        </div>
                        {Checkapiresponse === true &&
                            <>
                                <div className="mb-3 filled form-group tooltip-end-top">
                                    <CsLineIcons icon="user" />
                                    <Form.Control type="text" name="name" placeholder="Name" value={namevalue} onChange={(e) => setNameValue(e.target.value)} />
                                    {errors.email && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
                                </div>
                                <div className="mb-3 filled form-group tooltip-end-top">
                                    <CsLineIcons icon="email" />
                                    <Form.Control type="text" name="email" placeholder="Email" value={emailvalue} onChange={(e) => setEmailValue(e.target.value)} />
                                    {errors.email && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
                                </div>

                                <div className="form-check mb-4">
                                    <input type="checkbox" className="form-check-input" name="terms" checked={check === true} onClick={change} />
                                    <label className="form-check-label">
                                        I have read and accept the{' '}
                                        <NavLink to="/" target="_blank">
                                            terms and conditions.
                                        </NavLink>
                                    </label>
                                </div>
                            </>
                        }
                        {Checkapiresponse === true ?
                            <Button size="lg" type="submit" className="mb-2" onClick={Signupfunction}>
                                Signup
                            </Button>
                            :
                            <Button size="lg" type="submit" className="mb-2" onClick={CheckWithMobile}>
                                Login
                            </Button>
                        }&nbsp;
                        <Button size="lg" type="submit" className="mb-2" onClick={EmployeeLogin}>
                            Employee
                        </Button>
                        {/* <Button size="lg"
                            // type="submit" 
                            onClick={Guest}
                            className="mb-2"
                            style={{ marginLeft: "10px" }}
                        >
                            Checkout as a guest
                        </Button> */}
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

export default Login;
