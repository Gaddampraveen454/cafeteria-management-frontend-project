import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  consumerData: [],
};

const consumerSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setConsumerData(state, action) {
      state.consumerData = action.payload;
    },
  },
});

export const { setConsumerData } = consumerSlice.actions;


export const consumerListURL = (token) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/user/consumer/list?pagenum=0&limit=10&search=`,{headers:{
    "x-auth-token" : token
  }});
  console.log(response.data.data, "dfghj")
  dispatch(setConsumerData(response.data));
};

export const consumerAddURL = (payload,token) => async (dispatch) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/user/register/cashier`,payload,{headers:{
      "x-auth-token" : token
    }});
    console.log(response, "dfghj")
    consumerListURL(token)
  };

export const consumerUpdateURL = (uuid,payload, token) => async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/user/update/cashier/${uuid}`,payload,{headers:{
      "x-auth-token" : token
    }});
    console.log(response, "ffdgddfgdgdfgffgdf")
    if (response.status===200){
      consumerListURL(token)
    }
   
  };
const consumerReducer = consumerSlice.reducer;

export default consumerReducer;
