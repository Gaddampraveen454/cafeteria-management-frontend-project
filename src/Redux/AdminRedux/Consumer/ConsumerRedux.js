import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  companyUser: [],
  notification: {}
};

const comapnuserSlice = createSlice({
  name: 'CompanyUser',
  initialState,
  reducers: {
    setCompanyUser(state, action) {
      state.companyUser = action.payload;
    },
    setToast(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { setCompanyUser , setToast} = comapnuserSlice.actions;


export const CompanyConsumerListURL = (pageNUm, search, token, limit,id) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/user/company/consumer/list?pagenum=${pageNUm}&limit=${limit}&search=${search}&company_uuid=${id}`,{headers:{
    "x-auth-token" : token
  }});
  console.log(response.data.data, "dfghj")
  dispatch(setCompanyUser(response.data));
};

export const CompanyConsumerAddURL = (payload,token) => async (dispatch) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/user/create/consumer`,payload,{headers:{
      "x-auth-token" : token
    }}).then((res) => {
      console.log(res, "sdfsdfszvzxxczxcdff")
      dispatch(setToast({ status: true, message: res.data.message  }))
    })
    .catch((err) => {
      dispatch(setToast({ status: false, message: err && err.response? err && err.response.data:"Something went wrong" }))

    })
  };


  export const CompanyConsumerBulkUploadURL = (payload,token) => async (dispatch) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/user/upload/bulk`,payload,{headers:{
      "x-auth-token" : token
    }}).then((res) => {
      console.log(res, "xcvxxvxcvxcvxv")
      dispatch(setToast({ status: true, message:res && res.data && res.data.message?res.data.message: " file Uploaded successfully"  }))
    })
    .catch((err) => {
      console.log(err.response,"sdfsdfsdfs")
      dispatch(setToast({ status: false, message: err && err.response && err.response.data &&  err.response.data.message ? err.response.data.message:"Something went wrong" }))

    })
  };

export const CompanyConsumerUpdateURL = (uuid,payload, token) => async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/user/update/consumer/${uuid}`,payload,{headers:{
      "x-auth-token" : token
    }}).then((res) => {
      console.log(res, "sfsdsdfsdf")
      dispatch(setToast({ status: true, message: res.data.message }))
    })
    .catch((err) => {
      dispatch(setToast({ status: false, message: err && err.response? err && err.response.data:"Something went wrong" }))

    })
   
  };

  export const CompanyConsumerStatusUpdateURL = (payload, token) => async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/user/change/consumer/status`, payload, {
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
 
  };
const companyUserReducer = comapnuserSlice.reducer;

export default companyUserReducer;
