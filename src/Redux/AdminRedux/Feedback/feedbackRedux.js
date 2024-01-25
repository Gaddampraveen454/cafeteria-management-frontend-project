import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  companyFeedback: [],
  companyProductName:{},
  companyProductList:{},
companyProductView:{},
  notification: {}
};

const companyFeedbackSlice = createSlice({
  name: 'companyfeedback',
  initialState,
  reducers: {
    setCompanyFeedback(state, action) {
      state.companyFeedback = action.payload;
    },
    setCompanyProductName(state, action) {
      state.companyProductName = action.payload;
    },
    setCompanyProductList(state, action) {
      state.companyProductList = action.payload;
    },
    setCompanyProductView(state, action) {
      state.companyProductView = action.payload;
    },
    setToast(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { setCompanyFeedback,setCompanyProductName,setCompanyProductList,setCompanyProductView,setToast } = companyFeedbackSlice.actions;


export const CompanyFeedbackListURL = (page,search,token,limit,companyId,storeId,start,end) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/feedback/company/list?pagenum=${page}&limit=${limit}&search=${search}&company_uuid=${companyId}&store_uuid=${storeId}&start_date=${start}&end_date=${end}`, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
    dispatch(setCompanyFeedback(res.data));
  })
    .catch((err) => {
      console.log("err");
    })

};
export const CompanyProductNameURL = (orderId,token) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/feedback/order/${orderId}`, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
    dispatch(setCompanyProductName(res.data));
  })
    .catch((err) => {
      console.log("err");
    })

};

export const CompanyProductList = (page1,search1,token,limit1,companyId,store) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/feedback/product/company/list?pagenum=${page1}&limit=${limit1}&search=${search1}&company_uuid=${companyId}&store_uuid=${store}`, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
    dispatch(setCompanyProductList(res.data));
  })
    .catch((err) => {
      console.log("err");
    })

};

// export const CompanyProductViewURL = (page,search,token,limit,productId,rating) => async (dispatch) => {
//   const response = await axios.get(`${process.env.REACT_APP_URL}/feedback/user/product?pagenum=${page}&limit=${limit}&search=${search}&product_uuid=${productId}&rating=${rating}`, {
//     headers: {
//       "x-auth-token": token
//     }
//   }).then((res) => {
//     console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
//     dispatch(setCompanyProductView(res.data));
//   })
//     .catch((err) => {
//       console.log("err");
//     })

// };




const CompanyFeedbackReducer = companyFeedbackSlice.reducer;

export default CompanyFeedbackReducer;
