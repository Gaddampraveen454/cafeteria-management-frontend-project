import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  consumerData: [],
  notification:{}
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCatData(state, action) {
      state.companyData = action.payload;
    },
    setToast(state, action) {
      state.notification = action.payload;
    }
  },
});

export const { setCatData, setToast } = companySlice.actions;


export const CompanyListURL = (pageNUm, search, token, limit) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/company/list?pagenum=${pageNUm}&limit=${limit}&search=${search}`,{headers:{
    "x-auth-token" : token
  }});
  console.log(response.data.data, "dfghj")
  dispatch(setCatData(response.data));
};

export const companyAddURL = (payload,token) => async (dispatch) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/company/create`,payload,{headers:{
      "x-auth-token" : token
    }})
    .then((res) => {
      console.log(res, "sdfsdfsdff")
      dispatch(setToast({ status: true, message: res.data.message }))
    })
    .catch((err) => {
      dispatch(setToast({ status: false, message: err && err.response? err && err.response.data:"Something went wrong" }))

    })
  };

export const compnayUpdateURL = (uuid,payload, token) => async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/company/update/${uuid}`,payload,{headers:{
      "x-auth-token" : token
    }}).then((res) => {
      console.log(res, "sdfsddffsdff")
      dispatch(setToast({ status: true, message: res.data.message }))
    })
      .catch((err) => {
        dispatch(setToast({ status: false, message: err && err.response? err && err.response.data:"Something went wrong" }))
  
      })
   
  };
const companyReducer = companySlice.reducer;

export default companyReducer;
