import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConsumerSignUpURL } from 'auth/ConsumerAuthSlice';
import logo from "../../Assests/images/cafe.png"


const Register = () => {
  const title = 'Register';
  const description = 'Register Page';

  const [suc, setSuc] = useState(false);
  const { currentUser, isLogin, notification } = useSelector((state) => state.auth);
  console.log(currentUser, isLogin, notification, "currentUdfddsfsdfdser")
  const history = useHistory()
  const location = useLocation();

  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email().required('Email is required'),
    // mobile: Yup.string().min(6, 'Must be at least 6 chars!').required('Password is required'),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, 'Invalid mobile number') // Assumes a 10-digit mobile number
      .required('Mobile number is required'),

    // terms: Yup.bool().required().oneOf([true], 'Terms must be accepted'),
  });
  const initialValues = { name: '', email: '', mobile: '' };

  const [namevalue, setNameValue] = useState('');
  const [mobilevalue, setMobileValue] = useState('');
  const [emailvalue, setEmailValue] = useState('');


  const onSubmit = (values) => {
    values.preventDefault()

    const payload = {
      "mobile": mobilevalue,
      "email": emailvalue,
      "name": namevalue
    }
    dispatch(ConsumerSignUpURL(payload));
    setSuc(true)
  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors } = formik;


  useEffect(() => {
    if (suc === true) {
      if (notification.status === true) {
        toast.success(notification.message, {
          position: "top-right",
        })
        // setSuc(false)
        setTimeout(() => {
          history.push(({
            pathname: "/otp-verification",
            // state : {detail : id,fullname : name, pic :image, type:"edit"},
            state : {
              mobile : mobilevalue,
              email : emailvalue
            }
          }))
        }, 2000)
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

      }
      else if (notification.status === false) {
        toast.error(notification.message)
        setSuc(false)
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
          <form id="registerForm" className="tooltip-end-bottom" onSubmit={onSubmit}>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="user" />
              <Form.Control type="text" name="name" placeholder="Name" value={namevalue} onChange={(e) => setNameValue(e.target.value)} />
              {errors.name && touched.name && <div className="d-block invalid-tooltip">{errors.name}</div>}
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="email" />
              <Form.Control type="text" name="email" placeholder="Email" value={emailvalue} onChange={(e) => setEmailValue(e.target.value)} />
              {errors.email && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="mobile" />
              <Form.Control type="mobile" name="mobile" value={mobilevalue} onChange={(e) => setMobileValue(e.target.value)} placeholder="mobile" />
              {errors.mobile && touched.mobile && <div className="d-block invalid-tooltip">{errors.mobile}</div>}
            </div>
            {/* <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="lock-off" />
              <Form.Control type="mobile" name="mobile" onChange={handleChange} value={values.mobile} placeholder="Password" />
              {errors.mobile && touched.mobile && <div className="d-block invalid-tooltip">{errors.mobile}</div>}
            </div> */}
            <div className="mb-3 position-relative form-group">
              {/* <div className="form-check">
                <input type="checkbox" className="form-check-input" name="terms" onChange={handleChange} value={values.terms} />
                <label className="form-check-label">
                  I have read and accept the{' '}
                  <NavLink to="/" target="_blank">
                    terms and conditions.
                  </NavLink>
                </label>
                {errors.terms && touched.terms && <div className="d-block invalid-tooltip">{errors.terms}</div>}
              </div> */}
            </div>
            <Button size="lg" type="submit">
              Signup
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

export default Register;
