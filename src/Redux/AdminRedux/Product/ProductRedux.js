import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  ProductData: [],
  StoreList: {},
  notification: {}
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductData(state, action) {
      state.ProductData = action.payload;
    },
    setStoreList(state, action) {
      state.StoreList = action.payload;
    },
    setToast(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { setProductData, setStoreList, setToast } = productSlice.actions;


export const ProductListURL = (pageNUm, search, token, limit, companyId, categoryId, storeId) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/product/company/list?pagenum=${pageNUm}&limit=${limit}&search=${search}&store_uuid=${companyId}&category_uuid=${categoryId}&store_uuid=${storeId}`, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
    dispatch(setProductData(res.data));
  })
    .catch((err) => {
      console.log("err");
    })
  //   console.log(response.data.data, "dfghj")
  //   dispatch(setProductData(response.data)); /company/get/order/stores?company_uuid=COMP-3581F6AC'
};


export const ProductStoreListURL = (token, id) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/company/get/order/stores?company_uuid=${id}`, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
    dispatch(setStoreList(res.data));
  })
    .catch((err) => {
      console.log("err");
    })
  //   console.log(response.data.data, "dfghj")
  //   dispatch(setProductData(response.data));
};

export const ProductAddURL = (payload, token) => async (dispatch) => {
  const response = await axios.post(`${process.env.REACT_APP_URL}/product/create`, payload, {
    headers: {
      "x-auth-token": token
    }
  })
    .then((res) => {
      console.log(res, "sdfsdfsdff")
      dispatch(setToast({ status: true, message: res.data.message }))
    })
    .catch((err) => {
      dispatch(setToast({ status: false, message: err && err.response ? err && err.response.data : "Something went wrong" }))

    })

};
export const ProductBulkUplodURL = (payload, token) => async (dispatch) => {
  const response = await axios.post(`${process.env.REACT_APP_URL}/product/upload/bulk`, payload, {
    headers: {
      "x-auth-token": token
    }
  })
    .then((res) => {
      console.log(res, "xcvxxvxcvxcvxv")
      dispatch(setToast({ status: true, message: res && res.data && res.data.message ? res.data.message : " file Uploaded successfully" }))
    })
    .catch((err) => {
      console.log(err.response, "sdfsdfsdfs")
      dispatch(setToast({ status: false, message: err && err.response && err.response.data && err.response.data.message ? err.response.data.message : "Something went wrong" }))

    })

};

export const ProductUpdateURL = (uuid, payload, token) => async (dispatch) => {
  const response = await axios.put(`${process.env.REACT_APP_URL}/product/update/${uuid}`, payload, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "sdfsddffsdff")
    dispatch(setToast({ status: true, message: res.data.message }))
  })
    .catch((err) => {
      console.log(err && err.response, "hjgjghgjhghj")
      dispatch(setToast({ status: false, message: err && err.response ? err && err.response.data : "Something went wrong" }))

    })
  // console.log(response, "sdfsfsdfs")

};


export const ProductStatusUpdateURL = (payload, token) => async (dispatch) => {
  const response = await axios.put(`${process.env.REACT_APP_URL}/product/change/status`, payload, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "sdfsddffsdff")
    dispatch(setToast({ status: true, message: res.data.message }))
  })
    .catch((err) => {
      console.log(err && err.response, "hjgjghgjhghj")
      dispatch(setToast({ status: false, message: err && err.response ? err && err.response.data : "Something went wrong" }))

    })
};
const productReducer = productSlice.reducer;

export default productReducer;
