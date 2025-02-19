import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  CheckoutData: [],
  OrderData:[],
  checkoutnotification:{}
};

const CartSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setCheckoutData(state, action) {
      state.CheckoutData = action.payload;
    },
    setOrderData(state, action) {
      state.OrderData = action.payload;
    },
    setToast(state, action) {
      state.checkoutnotification = action.payload;
    }
  },
});

export const { setCheckoutData, setOrderData, setToast } = CartSlice.actions;

export const CreateCheckOutURL = (payload,token) => async (dispatch) => {
  const response = await axios.post(`${process.env.REACT_APP_URL}/checkout`,payload,
  {headers:{
    "x-auth-token" : token
  }}
  )
  .then((res) => {
    console.log(res, "sdfdsfsdfsdfsdfdsf")
    dispatch(setCheckoutData(res.data));
    dispatch(setToast({ status: true, message: res.data.message}))
  })
  .catch((err) => {
    dispatch(setToast({ status: false, message: err && err.response? err && err.response.data:"Something went wrong" }))
    dispatch(setCheckoutData({}));
  })
};

export const CreateCheckOutGuestURL = (payload,token) => async (dispatch) => {
  const response = await axios.post(`${process.env.REACT_APP_URL}/checkout/guest`,payload,
  {headers:{
    "x-auth-token" : token
  }}
  )
  .then((res) => {
    console.log(res, "sdfdsfsdfsdfsdfdsf")
    dispatch(setCheckoutData(res.data));
    dispatch(setToast({ status: true, message: res.data.message}))
  })
  .catch((err) => {
    dispatch(setToast({ status: false, message: err && err.response? err && err.response.data:"Something went wrong" }))

  })
};

export const createOrderURL = (payload,token) => async (dispatch) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/order/create`,payload,
    {headers:{
      "x-auth-token" : token
    }}
    )
    .then((res) => {
      console.log(res, "sdfsdfsdff")
      dispatch(setOrderData(res.data));
      dispatch(setToast({ status: true, message: res.data.message }))
    })
    .catch((err) => {
      dispatch(setToast({ status: false, message: err && err.response? err && err.response.data:"Something went wrong" }))

    })
  };
  export const createOrderAsGuestURL = (payload,token) => async (dispatch) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/order/create/guest`,payload,
    {headers:{
      "x-auth-token" : token
    }}
    )
    .then((res) => {
      console.log(res, "sdfsdfhghfhfhfhgfhfsdff")
      dispatch(setToast({ status: true, message: res.data.message }))
    })
    .catch((err) => {
      dispatch(setToast({ status: false, message: err && err.response? err && err.response.data:"Something went wrong" }))
      console.log(err, "zxczczxczxczxcz")
    })
  };

const checkoutReducer = CartSlice.reducer;

export default checkoutReducer;
