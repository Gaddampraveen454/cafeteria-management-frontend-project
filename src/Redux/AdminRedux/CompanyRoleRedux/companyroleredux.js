import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  companyRoleData: [],
 notification: {}
};

const CompanyRoleSlice = createSlice({
  name: 'companyRole',
  initialState,
  reducers: {
    setCompanyRoleData(state, action) {
      state.companyRoleData = action.payload;
    },
    setToast(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { setCompanyRoleData, setToast } = CompanyRoleSlice.actions;

export const CompanyRoleListURL = ( page,search,token,limit,group) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/company/list/cashier/manager?page=${page}&limit=${limit}&search=${search}&group=${group}`, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
    dispatch(setCompanyRoleData(res.data));
  })
    .catch((err) => {
      console.log("err");
    })
  //   console.log(response.data.data, "dfghj")
  //   dispatch(setProductData(response.data));
};

// export const CompanyProductsList = (token, companyId, storeId, search , type) => async (dispatch) => {
//   const response = await axios.get(`${process.env.REACT_APP_URL}/product/company/order/list?search=${search}&company_uuid=${companyId}&store_uuid=${storeId}&type=${type}`, {
//     headers: {
//       "x-auth-token": token
//     }
//   }).then((res) => {
//     console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
//     dispatch(setCompanyProductsList(res.data));
//   })
//     .catch((err) => {
//       console.log("err");
//     })

// };

export const CompanyRoleAddURL = (payload, token) => async (dispatch) => {
  const response = await axios.post(`${process.env.REACT_APP_URL}/company/add/cashier/manager`, payload, {
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
// export const ProductBulkUplodURL = (payload, token) => async (dispatch) => {
//   const response = await axios.post(`${process.env.REACT_APP_URL}/product/upload/bulk`, payload, {
//     headers: {
//       "x-auth-token": token
//     }
//   })
//     .then((res) => {
//       console.log(res, "xcvxxvxcvxcvxv")
//       dispatch(setToast({ status: true, message: res && res.data && res.data.message ? res.data.message : " file Uploaded successfully" }))
//     })
//     .catch((err) => {
//       console.log(err.response, "sdfsdfsdfs")
//       dispatch(setToast({ status: false, message: err && err.response && err.response.data && err.response.data.message ? err.response.data.message : "Something went wrong" }))

//     })

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
//       console.log(err && err.response, "hjgjghgjhghj")
//       dispatch(setToast({ status: false, message: err && err.response ? err && err.response.data : "Something went wrong" }))

//     })
//   // console.log(response, "sdfsfsdfs")

// };

export const CompanyRoleUpdateURL = (uuid, payload, token) => async (dispatch) => {
  const response = await axios.put(`${process.env.REACT_APP_URL}/company/role/update/${uuid}`, payload, {
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


export const RoleStatusUpdateURL = (payload, token,uuid) => async (dispatch) => {
  const response = await axios.put(`${process.env.REACT_APP_URL}/company/status/update/${uuid}`, payload, {
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
const CompanyRoleReducer = CompanyRoleSlice.reducer;

export default CompanyRoleReducer;
