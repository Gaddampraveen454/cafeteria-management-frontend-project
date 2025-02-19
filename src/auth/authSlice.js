import { createSlice } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL, Data } from 'config.js';
import { useState } from 'react';
import axios from 'axios';


const initialState = {
  isLogin: false,
  currentUser:Data &&  Data.token ? Data : {},
  otpLogin:{},
  isLoginOTP: false,
  notification: {}
  // isLogin: IS_DEMO,
  // currentUser: IS_DEMO ? DEFAULT_USER : {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser =action.payload;
      state.isLogin = true;
    },
    setToast(state, action) {
      state.notification = action.payload;
    },
  
  },
});

export const { setCurrentUser, setToast } = authSlice.actions;



export const LoginURL = (values) => async (dispatch) => {

  
  const response = await axios.post(`${process.env.REACT_APP_URL}/company/login`,values)
   .then((res) => {
    console.log(res, "sdfsdfdfgdfgdgdfsdff")
    dispatch(setCurrentUser(res.data));
    console.log(localStorage.getItem('token'), JSON.stringify(res))
    dispatch(setToast({ status: true, message: res.data.message }))
    localStorage.setItem("user", JSON.stringify(res.data))
  })
  .catch((err) => {
    console.log(err.response, "dfgfsdfsfdsfsdhj")
    dispatch(setToast({ status: false,
       message:err && err.response? err && err.response.data.message:"Something went wrong" 
      }))
  })


  // console.log(localStorage.getItem('token'), JSON.stringify(response))
  // dispatch(setCurrentUser(response.data));

};

export const LogOutURL = () => async (dispatch) => {
  // const history = useHistory()
  console.log("enter")
  dispatch(setCurrentUser({}));
  // history.push('/login')
  localStorage.removeItem("user");
};


const authReducer = authSlice.reducer;

export default authReducer;