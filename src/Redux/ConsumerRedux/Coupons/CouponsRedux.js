import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
    CouponData: [],
    discountAmount: 0,
    coupon: {},
    notification: {}
};

const CouponSlice = createSlice({
    name: 'coupons',
    initialState,
    reducers: {
        setCouponData(state, action) {
            state.CouponData = action.payload;
        },
        setDiscountAmount(state, action) {
            state.discountAmount = action.payload;
        },
        setCoupon(state, action) {
            state.coupon = action.payload;
        },
        setToast(state, action) {
            state.notification = action.payload;
        }
    },
});

export const { setCouponData, setDiscountAmount, setCoupon, setToast } = CouponSlice.actions;

export const CouponList = (token, companyId, storeId, userId) => async (dispatch) => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/coupon/list/consumer?company_uuid=${companyId}&store_uuid=${storeId}&user_uuid=${userId}`,
        {
            headers: {
                "x-auth-token": token
            }
        }
    )
        .then((res) => {
            console.log(res, "sdfdsfsdfsdfsdfdsf")
            dispatch(setCouponData(res.data));
            dispatch(setToast({ status: true, message: res.data.message }))
        })
        .catch((err) => {
            dispatch(setToast({ status: false, message: err && err.response ? err && err.response.data : "Something went wrong" }))
            dispatch(setCouponData({}));
        })
};

export const CouponApply = (payload, token) => async (dispatch) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/coupon/code`, payload,
        {
            headers: {
                "x-auth-token": token
            }
        }
    )
        .then((res) => {
            console.log(res, "sdfsdfsdff")
            dispatch(setDiscountAmount(res.data.discount_amount));
            dispatch(setCoupon(res.data))
            dispatch(setToast({ status: true, message: res.data.message }))
        })
        .catch((err) => {
            dispatch(setToast({ status: false, message: err && err.response ? err && err.response.data : "Something went wrong" }))
            dispatch(setDiscountAmount(0));
            dispatch(setCoupon({}))
        })
};

export const removeCoupon = () => (dispatch) => {
    // Dispatch an action to clear the coupon data and discount amount
    dispatch(setCoupon({}));
    dispatch(setDiscountAmount(0));
};


const usercouponsReducer = CouponSlice.reducer;

export default usercouponsReducer;
