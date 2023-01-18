import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  ProductData: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductData(state, action) {
      state.ProductData = action.payload;
    },
  },
});

export const { setProductData } = productSlice.actions;


export const ProductListURL = (token) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/product/list?pagenum=0&limit=10&search=`,{headers:{
    "x-auth-token" : token
  }});
  console.log(response.data.data, "dfghj")
  dispatch(setProductData(response.data));
};

export const ProductAddURL = (payload,token) => async (dispatch) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/product/create`,payload,{headers:{
      "x-auth-token" : token
    }});
    console.log(response, "dfghj")
    ProductListURL(token)
  };

export const ProductUpdateURL = (uuid,payload, token) => async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/product/update/${uuid}`,payload,{headers:{
      "x-auth-token" : token
    }});
    console.log(response, "ffdgddfgdgdfgffgdf")
    if (response.status===200){
      ProductListURL(token)
    }
   
  };
const productReducer = productSlice.reducer;

export default productReducer;
