import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  companyData: [],
  notification:{}
};

const iCafeAdmincompanySlice = createSlice({
  name: 'companymanagement',
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

export const { setCatData, setToast } = iCafeAdmincompanySlice.actions;


export const ICafeAdminCompanyListURL = (pageNUm, search, token, limit) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/company/list?pagenum=${pageNUm}&limit=${limit}&search=${search}`,
  {headers:{
    "x-auth-token" : token
  }});
  console.log(response.data.data, "dfghj")
  dispatch(setCatData(response.data));
};

export const IcafeAdminCompanyAddURL = (payload,token) => async (dispatch) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/company/create`,payload,
    {headers:{
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
  

export const ICafeAdminCompnayUpdateURL = (uuid,payload, token) => async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/company/update/${uuid}`,payload,
    {headers:{
      "x-auth-token" : token
    }}).then((res) => {
      console.log(res, "sdfsddffsdff")
      dispatch(setToast({ status: true, message: res.data.message }))
    })
      .catch((err) => {
        dispatch(setToast({ status: false, message: err && err.response? err && err.response.data:"Something went wrong" }))
  
      })
   
  };
  export const ICafeAdminCompanyStatusUpdateURL = (payload, token ,uuid) => async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/company/status/update/${uuid}`, payload, {
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




const iCafeAdminCompanyReducer = iCafeAdmincompanySlice.reducer;

export default iCafeAdminCompanyReducer;
