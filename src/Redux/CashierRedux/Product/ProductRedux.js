import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  ProductData: [],
  CreateProductData: [],
  notification: {}
};

const StoreproductSlice = createSlice({
  name: 'StoreproductSlice',
  initialState,
  reducers: {
    setProductData(state, action) {
      state.ProductData = action.payload;
    },
    setCraeteProductData(state, action) {
      state.CreateProductData = action.payload
    },
    setToast(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { setProductData, setToast } = StoreproductSlice.actions;


export const StoreProductListURL = (pageNUm, search, token, limit,storId,catId) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/product/store/list?pagenum=${pageNUm}&limit=${limit}&search=${search}&store_uuid=${storId}&category_uuid=${catId}`, {
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

// export const StoreCreateProductListURL = (pageNUm, search, token, limit,storId,catId) => async (dispatch) => {
//   const response = await axios.get(`http://localhost:5000/api/v1/product/store/list?pagenum=0&limit=10&search=&category_uuid=CAT-A3849129&store_uuid=STOR-1A2DDC43'`, {
//     headers: {
//       "x-auth-token": token
//     }
//   }).then((res) => {
//     console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
//     dispatch(setCraeteProductData(res.data));
//   })
//     .catch((err) => {
//       console.log("err");
//     })
//   //   console.log(response.data.data, "dfghj")
//   //   dispatch(setProductData(response.data));
// };

export const StoreProductAddURL = (payload, token) => async (dispatch) => {
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
      dispatch(setToast({ status: false, message: err && err.response? err && err.response.data:"Something went wrong" }))

    })

};

export const StoreProductBulkUplodURL = (payload, token) => async (dispatch) => {
  const response = await axios.post(`${process.env.REACT_APP_URL}/product/upload/bulk`, payload, {
    headers: {
      "x-auth-token": token
    }
  })
  .then((res) => {
    console.log(res, "xcvxxvxcvxcvxv")
    dispatch(setToast({ status: true, message:res && res.data && res.data.message?res.data.message: " file Uploaded successfully"  }))
  })
  .catch((err) => {
    console.log(err.response,"sdfsdfsdfs")
    dispatch(setToast({ status: false, message: err && err.response && err.response.data &&  err.response.data.message ? err.response.data.message:"Something went wrong" }))

  })

};

export const StoreProductUpdateURL = (uuid, payload, token) => async (dispatch) => {
  const response = await axios.put(`${process.env.REACT_APP_URL}/product/update/${uuid}`, payload, {
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
const StoreProductReducer = StoreproductSlice.reducer;

export default StoreProductReducer;
