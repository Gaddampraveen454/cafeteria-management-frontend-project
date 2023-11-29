import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  categoryData: [],
  createList:{},
  categorylist:{},
  notification: {}
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategoryData(state, action) {
      state.categoryData = action.payload;
    },
    setCreateList(state, action) {
      state.createList = action.payload;
    },
    setcategorylist(state, action) {
      state.categorylist = action.payload;
    },
    // categorylist
    setToast(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { setCategoryData, setCreateList,setToast ,setcategorylist} = categorySlice.actions;


export const CategoryListURL = (pageNUm, search, token, limit, companyuuid, storeuuid) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/category/company/list?pagenum=${pageNUm}&limit=${limit}&search=${search}&company_uuid=${companyuuid}&store_uuid=${storeuuid}`,{headers:{
    "x-auth-token" : token
  }});
  console.log(response.data.data, "dfghj")
  dispatch(setCategoryData(response.data));
};

export const CategorycreateList = (id) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/category/company/dropdown/list?company_uuid=${id}`)
  console.log(response.data.data, "dfghj")
  dispatch(setCreateList(response.data));
};

export const Categotylist = (companyid,storeid) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/category/lists?company_uuid=${companyid}&store_uuid=${storeid}`)
  console.log(response.data.data, "dfghj")
  dispatch(setcategorylist(response.data));
};
// setcategorylist

export const CategoryAddURL = (payload,token) => async (dispatch) => {
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

export const CategoryUpdateURL = (uuid,payload, token) => async (dispatch) => {
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

  export const  CategoryStatusUpdateURL = (payload, token,id) => async (dispatch) => {
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
const categoryReducer = categorySlice.reducer;

export default categoryReducer;
