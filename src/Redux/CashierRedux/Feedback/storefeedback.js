import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  storeFeedback: [],
  storeProductName:{},
  storeProductList:{},
storeProductView:{},
  notification: {}
};

const storeFeedbackSlice = createSlice({
  name: 'storefeedback',
  initialState,
  reducers: {
    setStoreFeedback(state, action) {
      state.storeFeedback = action.payload;
    },
    setStoreProductName(state, action) {
      state.storeProductName = action.payload;
    },
    setStoreProductList(state, action) {
      state.storeProductList = action.payload;
    },
    setStoreProductView(state, action) {
      state.storeProductView = action.payload;
    },
    setToast(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { setStoreFeedback,setStoreProductName,setStoreProductList,setStoreProductView,setToast } = storeFeedbackSlice.actions;


export const StoreFeedbackListURL = (page,search,token,limit,storeId) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/feedback/store/list?pagenum=${page}&limit=${limit}&search=${search}&store_uuid=${storeId}&start_date=&end_date=`, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
    dispatch(setStoreFeedback(res.data));
  })
    .catch((err) => {
      console.log("err");
    })

};
export const StoreProductNameURL = (orderId,token) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/feedback/order/${orderId}`, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
    dispatch(setStoreProductName(res.data));
  })
    .catch((err) => {
      console.log("err");
    })

};

export const StoreProductList = (page1,search1,token,limit1,storeId) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/feedback/product/store/list?pagenum=${page1}&limit=${limit1}&search=${search1}&store_uuid=${storeId}`, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
    dispatch(setStoreProductList(res.data));
  })
    .catch((err) => {
      console.log("err");
    })

};

// export const StoreProductViewURL = (page,search,token,limit,productId,rating) => async (dispatch) => {
//   const response = await axios.get(`${process.env.REACT_APP_URL}/feedback/user/product?pagenum=${page}&limit=${limit}&search=${search}&product_uuid=${productId}&rating=${rating}`, {
//     headers: {
//       "x-auth-token": token
//     }
//   }).then((res) => {
//     console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
//     dispatch(setStoreProductView(res.data));
//   })
//     .catch((err) => {
//       console.log("err");
//     })

// };




const StoreFeedbackReducer = storeFeedbackSlice.reducer;

export default StoreFeedbackReducer;
