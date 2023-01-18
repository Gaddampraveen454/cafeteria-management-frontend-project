import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  cashierData: [],
};

const catSlice = createSlice({
  name: 'cashier',
  initialState,
  reducers: {
    setCatData(state, action) {
      state.cashierData = action.payload;
    },
  },
});

export const { setCatData } = catSlice.actions;


export const cashierListURL = (token) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/user/list/cashier?pagenum=0&limit=10&search=`,{headers:{
    "x-auth-token" : token
  }});
  console.log(response.data.data, "dfghj")
  dispatch(setCatData(response.data));
};

export const cashierAddURL = (payload,token) => async (dispatch) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/user/register/cashier`,payload,{headers:{
      "x-auth-token" : token
    }});
    console.log(response, "dfghj")
    cashierListURL(token)
  };

export const cashierUpdateURL = (uuid,payload, token) => async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/company/update/${uuid}`,payload,{headers:{
      "x-auth-token" : token
    }});
    console.log(response, "ffdgddfgdgdfgffgdf")
    if (response.status===200){
      cashierListURL(token)
    }
   
  };
const cashierReducer = catSlice.reducer;

export default cashierReducer;
