import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  consumerData: [],
  companyData:{},
  notification:{}
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCatData(state, action) {
      state.companyData = action.payload;
    },
    setComDropDown(state, action) {
      state.companyDropData = action.payload;
    },
    setToast(state, action) {
      state.notification = action.payload;
    }
  },
});

export const { setCatData,setComDropDown, setToast } = companySlice.actions;


export const CompanyListURL = (pageNUm, search, token, limit,id) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/company/store/list?page=${pageNUm}&limit=${limit}&search=${search}&company_uuid=${id}`,
  {headers:{
    "x-auth-token" : token
  }});
  console.log(response, "dfggfhdfghfghhj")
  dispatch(setCatData(response.data));
};

export const CompanyDropDown = (token) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/company/dropdown/list`,
  // {headers:{
  //   "x-auth-token" : token
  // }}
  );
  console.log(response.data.data, "dfghj")
  dispatch(setComDropDown(response.data));
};

export const companyAddURL = (payload,token) => async (dispatch) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/company/store/create`,payload,
    {headers:{
      "x-auth-token" : token
    }}
    )
    .then((res) => {
      console.log(res, "sdfsdfsdff")
      dispatch(setToast({ status: true, message: res.data.message }))
    })
    .catch((err) => {
      dispatch(setToast({ status: false, message: err && err.response? err && err.response.data:"Something went wrong" }))

    })
  };
  

export const compnayUpdateURL = (uuid,payload, token) => async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/company/store/update/${uuid}`,payload,
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
  export const CompanyStatusUpdateURL = (payload, token,id) => async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/company/status/update/${id}`, payload, {
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




const companyReducer = companySlice.reducer;

export default companyReducer;
