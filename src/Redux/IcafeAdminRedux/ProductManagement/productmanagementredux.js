import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  ProductData: [],
  storeDropdown: {},
  categoryList: {},
  storeList: {},
  notification: {}
};

const adminProductSlice = createSlice({
  name: 'adminproducts',
  initialState,
  reducers: {
    setProductData(state, action) {
      state.ProductData = action.payload;
    },
    setStoreDropdown(state, action) {
      state.storeDropdown = action.payload;
    },
    setCategoryList(state, action) {
      state.categoryList = action.payload;
    },
    setStoreList(state, action) {
      state.storeList = action.payload;
    },
    setToast(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { setProductData, setCategoryList, setStoreList, setStoreDropdown, setToast } = adminProductSlice.actions;


export const AdminProductListURL = (pageNUm, search, token, limit, companyId, storeId) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/product/list?pagenum=${pageNUm}&limit=${limit}&search=${search}&company_uuid=${companyId}&store_uuid=${storeId}`, {
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
  //   dispatch(setProductData(response.data));
};

export const AdminProductStoreDropDownListURL = () => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/company/store/dropdown/list`)
  // {
  //     headers: {
  //         "x-auth-token": token
  //     }
  // });
  console.log(response.data, "dhbhjrfgbdfvfvfjgnr")
  dispatch(setStoreDropdown(response.data));

};

export const AdminProductStoreDropDownList = (companyId) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/company/get/order/stores?company_uuid=${companyId}`)
  // {
  //     headers: {
  //         "x-auth-token": token
  //     }
  // });
  console.log(response.data, "dhbhjrfgbdfvfvfjgnr")
  dispatch(setStoreList(response.data));

};

export const AdminProductCategoryDropDownListURL = (companyid, storeid) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/category/dropdown/list?company_uuid=${companyid}&store_uuid=${storeid}`)
  // {
  //     headers: {
  //         "x-auth-token": token
  //     }
  // });
  console.log(response.data, "dhbhjrfgbdfvfvfjgnr")
  dispatch(setCategoryList(response.data));

};

export const AdminProductAddURL = (payload, token) => async (dispatch) => {
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
export const AdminProductBulkUplodURL = (payload, token) => async (dispatch) => {
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

export const AdminProductUpdateURL = (uuid, payload, token) => async (dispatch) => {
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


export const AdminProductStatusUpdateURL = (payload, token, id) => async (dispatch) => {
  const response = await axios.put(`${process.env.REACT_APP_URL}/product/status/update/${id}`, payload, {
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
const adminProductReducer = adminProductSlice.reducer;

export default adminProductReducer;
