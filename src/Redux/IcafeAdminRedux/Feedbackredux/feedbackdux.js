import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  FeedbackData: [],
  ProductName:{},
  ProductList:{},
  ProductView:{},
  notification: {}
};

const iCafeFeedbackSlice = createSlice({
  name: 'adminfeedback',
  initialState,
  reducers: {
    setFeedbackData(state, action) {
      state.FeedbackData = action.payload;
    },
    setProductName(state, action) {
      state.ProductName = action.payload;
    },
    setProductList(state, action) {
      state.ProductList = action.payload;
    },
    setProductView(state, action) {
      state.ProductView = action.payload;
    },
    setToast(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { setFeedbackData,setProductName,setProductList,setProductView, setToast } = iCafeFeedbackSlice.actions;


export const ICafeFeedbackListURL = (page,search,token,limit,company,store,start,end) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/feedback/admin/list?pagenum=${page}&limit=${limit}&search=${search}&company_uuid=${company}&store_uuid=${store}&start_date=${start}&end_date=${end}`, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
    dispatch(setFeedbackData(res.data));
  })
    .catch((err) => {
      console.log("err");
    })

};
export const ICafeAdminProductNameURL = (orderId,token) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/feedback/order/${orderId}`, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
    dispatch(setProductName(res.data));
  })
    .catch((err) => {
      console.log("err");
    })

};

export const ICafeAdminProductList = (page1,search1,token,limit1,companyid,storeid) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/feedback/product/admin/list?pagenum=${page1}&limit=${limit1}&search=${search1}&company_uuid=${companyid}&store_uuid=${storeid}`, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
    dispatch(setProductList(res.data));
  })
    .catch((err) => {
      console.log("err");
    })

};

// export const ICafeAdminProductViewURL = (page,search,token,limit,productId,rating) => async (dispatch) => {
//   const response = await axios.get(`${process.env.REACT_APP_URL}/feedback/user/product?pagenum=${page}&limit=${limit}&search=${search}&product_uuid=${productId}&rating=${rating}`, {
//     headers: {
//       "x-auth-token": token
//     }
//   }).then((res) => {
//     console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
//     dispatch(setProductView(res.data));
//   })
//     .catch((err) => {
//       console.log("err");
//     })

// };




const ICafeFeedbackReducer = iCafeFeedbackSlice.reducer;

export default ICafeFeedbackReducer;
