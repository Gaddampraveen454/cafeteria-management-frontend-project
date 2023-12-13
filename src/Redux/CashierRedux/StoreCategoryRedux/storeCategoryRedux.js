import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  storecategoryData: [],
  categoryDropdown:[],
  notification: {}
};

const StorecategorySlice = createSlice({
  name: 'StorecategorySlice',
  initialState,
  reducers: {
    setCategoryData(state, action) {
      state.categoryData = action.payload;
    },
    setCategoryDropDownData(state, action) {
      state.categoryDropdown = action.payload;
    },
    setToast(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { setCategoryData,setCategoryDropDownData, setToast } = StorecategorySlice.actions;


export const StoreCategoryListURL = (pageNUm, search, token, limit,cmpid,strid) => async (dispatch) => {
  // `/category/list?pagenum=${pageNUm}&limit=${limit}&search=${search}&company_uuid=${cmpid}&store_uuid=${strid}`,
  const response = await axios.get(`${process.env.REACT_APP_URL}/category/store/list?pagenum=${pageNUm}&limit=${limit}&search=${search}&company_uuid=${cmpid}&store_uuid=${strid}`,
  {headers:{
    "x-auth-token" : token
  }});
  console.log(response.data.data, "dfghj")
  dispatch(setCategoryData(response.data));
};

export const StoreCategoryDropDownL = (storid) => async (dispatch) => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/category/store/dropdown/list?store_uuid=${storid}`,
    // const response = await axios.get(`${process.env.REACT_APP_URL}/category/dropdown/list?store_uuid=${storid}`,
    // {headers:{
    //   "x-auth-token" : token
    // }}
    );
    console.log(response.data.data, "dropdown")
    dispatch(setCategoryDropDownData(response.data));
  };

export const StoreCategoryAddURL = (payload,token) => async (dispatch) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/category/create`,payload,{headers:{
      "x-auth-token" : token
    }}) .then((res) => {
      console.log(res, "sdfsdfsdff")
      dispatch(setToast({ status: true, message: res.data.message }))
    })
    .catch((err) => {
      dispatch(setToast({ status: false, message: err && err.response? err && err.response.data:"Something went wrong" }))

    })
  };

export const StoreCategoryUpdateURL = (uuid,payload, token) => async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/category/update/${uuid}`,payload,{headers:{
      "x-auth-token" : token
    }}) .then((res) => {
      console.log(res, "sdfsdfsdff")
      dispatch(setToast({ status: true, message: res.data.message }))
    })
    .catch((err) => {
      dispatch(setToast({ status: false, message: err && err.response? err && err.response.data:"Something went wrong" }))

    })
   
  };

  export const  StoreCategoryStatusUpdateURL = (payload, token,id) => async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/category/status/update/${id}`, payload, {
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
const StorecategoryReducer = StorecategorySlice.reducer;

export default StorecategoryReducer;
