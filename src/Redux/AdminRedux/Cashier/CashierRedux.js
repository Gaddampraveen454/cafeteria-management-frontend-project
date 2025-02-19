import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  cashierData: [],
  notification: {}
};

const catSlice = createSlice({
  name: 'cashier',
  initialState,
  reducers: {
    setCatData(state, action) {
      state.cashierData = action.payload;
    },
    setToast(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { setCatData , setToast} = catSlice.actions;


export const cashierListURL = (pageNUm, search, token, limit) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/user/list/cashier?pagenum=${pageNUm}&limit=${limit}&search=${search}`,{headers:{
    "x-auth-token" : token
  }});
  console.log(response.data.data, "dfghj")
  dispatch(setCatData(response.data));
};

export const cashierAddURL = (payload,token) => async (dispatch) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/user/register/cashier`,payload,{headers:{
      "x-auth-token" : token
    }}) .then((res) => {
      console.log(res, "sdfsdfsdff")
      dispatch(setToast({ status: true, message: res.data.message }))
    })
    .catch((err) => {
      dispatch(setToast({ status: false, message: err && err.response? err && err.response.data:"Something went wrong" }))

    })
  };

export const cashierUpdateURL = (uuid,payload, token) => async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/user/update/cashier/${uuid}`,payload,{headers:{
      "x-auth-token" : token
    }}) .then((res) => {
      console.log(res, "sdfsdfsdff")
      dispatch(setToast({ status: true, message: res.data.message }))
    })
    .catch((err) => {
      dispatch(setToast({ status: false, message: err && err.response? err && err.response.data:"Something went wrong" }))

    })
   
  };

  export const CashierStatusUpdateURL = (payload, token) => async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/user/change/cashier/status`, payload, {
      headers: {
        "x-auth-token": token
      }
    }).then((res) => {
      console.log(res, "sdfsddffsdff")
      dispatch(setToast({ status: true, message: res.data.message }))
    })
      .catch((err) => {
        console.log(err && err.response,"hjgjghgjhghj")
        dispatch(setToast({ status: false, message: err && err.response? err && err.response.data:"Something went wrong" }))
  
      })
    // console.log(response, "sdfsfsdfs")
  
  };
const cashierReducer = catSlice.reducer;

export default cashierReducer;
