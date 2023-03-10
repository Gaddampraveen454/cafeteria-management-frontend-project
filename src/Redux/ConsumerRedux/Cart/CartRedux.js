import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  CartData: [],
  notification:{}
};

const CartSlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCartData(state, action) {
      state.CartData = action.payload;
    },
    setToast(state, action) {
      state.notification = action.payload;
    }
  },
});

export const { setCartData, setToast } = CartSlice.actions;


export const CartListURL = (ip, search, token, limit) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/cart/list?ip_address=${ip}`,{headers:{
    "x-auth-token" : token
  }});
  console.log(response.data.data, "dfgcvvcvcvbchj")
  dispatch(setCartData(response.data));
};

export const ConsumerCartListURL = (uuid, search, token, limit) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/cart/list?user_uuid=${uuid}`,{headers:{
    "x-auth-token" : token
  }});
  console.log(response.data.data, "dfgcvvcvcvbchj")
  dispatch(setCartData(response.data));
};


export const addToCartURL = (payload,token) => async (dispatch) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/cart/add`,payload,
    {headers:{
      "x-auth-token" : token
    }}
    )
    .then((res) => {
      console.log(res, "sdfsdfsdff")
      dispatch(setToast({ status: true, message: res.data.message }))
    })
    .catch((err) => {
      dispatch(setToast({ status: false, message: err && err.response? err && err.response.data:"Something went wrong" }))

    })
  };

export const updateCartURL = (payload, token) => async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/cart/quantity/update`,payload,{headers:{
      "x-auth-token" : token
    }}).then((res) => {
      console.log(res, "sdfsddffsdff")
      dispatch(setToast({ status: true, message: res.data.message }))
    })
      .catch((err) => {
        dispatch(setToast({ status: false, message: err && err.response? err && err.response.data:"Something went wrong" }))
  
      })
   
  };


  export const deleteToCartURL = (uuid,token) => async (dispatch) => {
    const response = await axios.delete(`${process.env.REACT_APP_URL}/cart/delete/${uuid}`,
   
    )
    .then((res) => {
      console.log(res, "sdfsdfsdff")
      dispatch(setToast({ status: true, message: res.data.message }))
    })
    .catch((err) => {
      dispatch(setToast({ status: false, message: err && err.response? err && err.response.data:"Something went wrong" }))

    })
  };

  export const IfLogedinUpdateCartURL = (payload, token) => async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/cart/update/login/user`,payload,{headers:{
      "x-auth-token" : token
    }}).then((res) => {
      console.log(res, "sdfsddffsdff")
      dispatch(setToast({ status: true, message: res.data.message }))
    })
      .catch((err) => {
        dispatch(setToast({ status: false, message: err && err.response? err && err.response.data:"Something went wrong" }))
  
      })
   
  };



const CartReducer = CartSlice.reducer;

export default CartReducer;
