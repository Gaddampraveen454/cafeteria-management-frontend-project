import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  consumerData: [],
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCatData(state, action) {
      state.companyData = action.payload;
    },
  },
});

export const { setCatData } = companySlice.actions;


export const CompanyListURL = (token) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/company/list?pagenum=0&limit=10&search=`,{headers:{
    "x-auth-token" : token
  }});
  console.log(response.data.data, "dfghj")
  dispatch(setCatData(response.data));
};

export const companyAddURL = (payload,token) => async (dispatch) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/company/create`,payload,{headers:{
      "x-auth-token" : token
    }});
    console.log(response, "dfghj")
    CompanyListURL(token)
  };

export const compnayUpdateURL = (uuid,payload, token) => async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/company/update/${uuid}`,payload,{headers:{
      "x-auth-token" : token
    }});
    console.log(response, "ffdgddfgdgdfgffgdf")
    if (response.status===200){
      CompanyListURL(token)
    }
   
  };
const companyReducer = companySlice.reducer;

export default companyReducer;
