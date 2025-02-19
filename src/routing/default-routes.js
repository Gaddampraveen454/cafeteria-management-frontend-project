import { lazy } from 'react';
import { DEFAULT_PATHS } from 'config.js';

const NotFound = lazy(() => import('views/default/NotFound'));
const Login = lazy(() => import('views/default/Login'));
// const ConsumerLogin = lazy(() => import('views/default/ConsumerLogin'));
const checkwithmobile = lazy(() => import('views/default/Checkwithmobile'));
const EmployeeLogin = lazy(() => import('views/default/EmployeeLogin'));
const ForgotPassword = lazy(() => import('views/default/ForgotPassword'));
const ForgotEmailOtp =lazy(()=>import('views/default/ForgotPasswordOtp'));
const Register = lazy(() => import('views/default/Register'));
const OtpVerification = lazy(() => import('views/default/OtpVerification'));
const ResetPassword = lazy(() => import('views/default/ResetPassword'));
const Unauthorized = lazy(() => import('views/default/Unauthorized'));
const InvalidAccess = lazy(() => import('views/default/InvalidAccess'));
const App = lazy(() => import('App.js'));
const Home = lazy(() => import('views/default/Home'));

/*
{ path: "/path", exact: true, component: ViewHome },
// or
{ path: "/path", component: ViewHome},
// or
{ path: "/path", exact: true, redirect: true, to: "/redirectPath" },
*/
const defaultRoutes = [
  { path: DEFAULT_PATHS.NOTFOUND, exact: true, component: NotFound },
  { path: DEFAULT_PATHS.LOGIN, exact: true, component: Login },
  // { path: DEFAULT_PATHS.LOGIN1, exact: true, component: ConsumerLogin },
  { path: DEFAULT_PATHS.CHECKWITHMOBILELOGIN, exact: true, component: checkwithmobile },
  { path: DEFAULT_PATHS.EMPLOYEELOGIN, exact: true, component: EmployeeLogin },
  { path: DEFAULT_PATHS.REGISTER, exact: true, component: Register },
  { path: DEFAULT_PATHS.FORGOT_PASSWORD, exact: true, component: ForgotPassword },
  { path: DEFAULT_PATHS.FORGOT_EMAIL_OTP, exact: true, component: ForgotEmailOtp },
  { path: DEFAULT_PATHS.OTPVERIFICATION, exact: true, component: OtpVerification },
  { path: DEFAULT_PATHS.RESET_PASSWORD, exact: true, component: ResetPassword },
  { path: DEFAULT_PATHS.UNAUTHORIZED, exact: true, component: Unauthorized },
  { path: DEFAULT_PATHS.INVALID_ACCESS, exact: true, component: InvalidAccess },
  { path: DEFAULT_PATHS.APP, component: App },
  { path: '/', exact: true, component: Home },
];

export default defaultRoutes;
