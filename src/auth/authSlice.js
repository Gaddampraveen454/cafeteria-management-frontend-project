import { createSlice } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL, Data } from 'config.js';
import { useState } from 'react';
import axios from 'axios';


const initialState = {
  isLogin: false,
  currentUser:Data &&  Data.token ? Data : {},
  otpLogin:{},
  isLoginOTP: false
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
  
  },
});

export const { setCurrentUser } = authSlice.actions;



export const LoginURL = (values) => async (dispatch) => {

  
  const response = await axios.post(`${process.env.REACT_APP_URL}/user/admin/login`,values);
  console.log(response, "dfghj")
  console.log(localStorage.getItem('token'), JSON.stringify(response))
  dispatch(setCurrentUser(response.data));
};

export const LogOutURL = () => async (dispatch) => {
  // const history = useHistory()
  console.log("enter")
  dispatch(setCurrentUser({}));
  // history.push('/login')
};


const authReducer = authSlice.reducer;

export default authReducer;