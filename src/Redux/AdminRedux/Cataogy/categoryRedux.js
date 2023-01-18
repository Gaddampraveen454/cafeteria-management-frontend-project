import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  categoryData: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategoryData(state, action) {
      state.categoryData = action.payload;
    },
  },
});

export const { setCategoryData } = categorySlice.actions;


export const CategoryListURL = (token) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/category/list?pagenum=0&limit=10&search=`,{headers:{
    "x-auth-token" : token
  }});
  console.log(response.data.data, "dfghj")
  dispatch(setCategoryData(response.data));
};

export const CategoryAddURL = (payload,token) => async (dispatch) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/category/create`,payload,{headers:{
      "x-auth-token" : token
    }});
    console.log(response, "dfghj")
    CategoryListURL(token)
  };

export const CategoryUpdateURL = (uuid,payload, token) => async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/category/update/${uuid}`,payload,{headers:{
      "x-auth-token" : token
    }});
    console.log(response, "ffdgddfgdgdfgffgdf")
    if (response.status===200){
      CategoryListURL(token)
    }
   
  };
const categoryReducer = categorySlice.reducer;

export default categoryReducer;
