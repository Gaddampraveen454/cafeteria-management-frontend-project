import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DEFAULT_USER, IS_DEMO } from 'config.js';
import { toast } from 'react-toastify';

// const initialState = {
//   isLogin: IS_DEMO,
//   currentUser: IS_DEMO ? DEFAULT_USER : {},
// };

const initialState = {
    forgetPassword: {},
    forgetOtpVerify: {},
    notification: {}
}

const forgetPasswordAd = createSlice({
    name: 'forgetpassword',
    initialState,
    reducers: {
        setForgetPassword(state, action) {
            state.forgetPassword = action.payload;
        },
        setForgetOtpVerify(state, action) {
            state.forgetOtpVerify = action.payload;
        },
        setToast(state, action) {
            state.notification = action.payload;
        }
    },
});

export const { setForgetPassword, setForgetOtpVerify, setToast } = forgetPasswordAd.actions;

export const ForgetPasswordApi = (payload) => async (dispatch) => {
    const Forgetpayload = {
        "email" : payload?.email,

    }
    const response = axios.post(`${process.env.REACT_APP_URL}/company/forgot/password`, Forgetpayload)
        .then((res) => {
            console.log(res, 'hjgdtkvbhj')
            dispatch(setForgetPassword(res?.data))
            dispatch(setToast({ status: true, message: res?.data?.message }))
        })
        .catch((err) => {
            console.log(err?.response,'dhfbhsdfhdgdfg')
            dispatch(setToast({ status: false, message: err?.response?.data }))
        })
}

export const ForgetOtpVerifyFormApi = (payload) => async (dispatch) => {
    const ForgetOtpVerifypayload = {
        "email": payload?.email,
        "otp": payload?.otp,
        "newPassword": payload?.password,
    }
    const response = axios.post(`${process.env.REACT_APP_URL}/company/verify/otp`, ForgetOtpVerifypayload)
        .then((res) => {
            console.log(res, 'gfghbcwhbe')
            dispatch(setForgetOtpVerify(res?.data))
            dispatch(setToast({ status: true, message: res?.data?.message }))
        })
        .catch((err) => {
            console.log(err?.response,'bsdhvbdhv')
            dispatch(setToast({ status: false, message: err?.response?.data }))
        })
}



const forgetPasswordReducer = forgetPasswordAd.reducer;

export default forgetPasswordReducer;
