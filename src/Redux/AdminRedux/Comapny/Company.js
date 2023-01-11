import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  companyData: [],
};

const catSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCatData(state, action) {
      state.companyData = action.payload;
    },
  },
});

export const { setCatData } = catSlice.actions;


export const categoryListURL = (token) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/company/list?pagenum=0&limit=10&search=`,{headers:{
    "x-auth-token" : token
  }});
  console.log(response.data.data, "dfghj")
  dispatch(setCatData(response.data));
};

export const categoryAddURL = (payload,token) => async (dispatch) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/category/create`,payload,{headers:{
      "x-auth-token" : token
    }});
    console.log(response, "dfghj")
    categoryListURL(token)
  };

export const catgoryUpdateURL = (uuid,payload, token) => async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/category/${uuid}`,payload,{headers:{
      "x-auth-token" : token
    }});
    console.log(response, "dfghj")
  };
const companyReducer = catSlice.reducer;

export default companyReducer;
