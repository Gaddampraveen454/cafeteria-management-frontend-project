import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  StoreForConsumer: [],
  notification: {}
};

const StoreForConsumerSlice = createSlice({
  name: 'StoreForConsumerSlice',
  initialState,
  reducers: {
    setStoreForConsumer(state, action) {
      state.StoreForConsumer = action.payload;
    },
    setToast(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { setStoreForConsumer, setToast } = StoreForConsumerSlice.actions;


export const StoresForConsumerLIST = (comslug) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/company/get/stores?company_slug=${comslug}`, {
    // headers: {
    //   "x-auth-token": token
    // }
  }).then((res) => {
    console.log(res, "storeconsu")
    dispatch(setStoreForConsumer(res.data));
  })
    .catch((err) => {
      console.log("err");
    })
  //   console.log(response.data.data, "dfghj")
  //   dispatch(setProductForConsumer(response.data));
};

// export const ProductAddURL = (payload, token) => async (dispatch) => {
//   const response = await axios.post(`${process.env.REACT_APP_URL}/product/create`, payload, {
//     headers: {
//       "x-auth-token": token
//     }
//   })
//     .then((res) => {
//       console.log(res, "sdfsdfsdff")
//       dispatch(setToast({ status: true, message: res.data.message }))
//     })
//     .catch((err) => {
//       dispatch(setToast({ status: false, message: err && err.response? err && err.response.data:"Something went wrong" }))

//     })

// };
// export const ProductBulkUplodURL = (payload, token) => async (dispatch) => {
//   const response = await axios.post(`${process.env.REACT_APP_URL}/product/upload/bulk`, payload, {
//     headers: {
//       "x-auth-token": token
//     }
//   })
//   .then((res) => {
//     console.log(res, "xcvxxvxcvxcvxv")
//     dispatch(setToast({ status: true, message:res && res.data && res.data.message?res.data.message: " file Uploaded successfully"  }))
//   })
//   .catch((err) => {
//     console.log(err.response,"sdfsdfsdfs")
//     dispatch(setToast({ status: false, message: err && err.response && err.response.data &&  err.response.data.message ? err.response.data.message:"Something went wrong" }))

//   })

// };

// export const ProductUpdateURL = (uuid, payload, token) => async (dispatch) => {
//   const response = await axios.put(`${process.env.REACT_APP_URL}/product/update/${uuid}`, payload, {
//     headers: {
//       "x-auth-token": token
//     }
//   }).then((res) => {
//     console.log(res, "sdfsddffsdff")
//     dispatch(setToast({ status: true, message: res.data.message }))
//   })
//     .catch((err) => {
//       console.log(err && err.response,"hjgjghgjhghj")
//       dispatch(setToast({ status: false, message: err && err.response? err && err.response.data:"Something went wrong" }))

//     })
//   // console.log(response, "sdfsfsdfs")

// };
const StoresForConsumersReducer = StoreForConsumerSlice.reducer;

export default StoresForConsumersReducer;
