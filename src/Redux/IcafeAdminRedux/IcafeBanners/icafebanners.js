import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  bannersData: [],
//   storeDropdown: {},
//   categoryList: {},
//   storeList: {},
  notification: {}
};

const adminBannersSlice = createSlice({
  name: 'adminbanners',
  initialState,
  reducers: {
    setBannersData(state, action) {
      state.bannersData = action.payload;
    },
    // setStoreDropdown(state, action) {
    //   state.storeDropdown = action.payload;
    // },
    // setCategoryList(state, action) {
    //   state.categoryList = action.payload;
    // },
    // setStoreList(state, action) {
    //   state.storeList = action.payload;
    // },
    setToast(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { setBannersData, setToast } = adminBannersSlice.actions;


export const AdminBannersListURL = (pageNUm, search, token, limit) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/banner/list/admin?pagenum=${pageNUm}&limit=${limit}&search=${search}`, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
    dispatch(setBannersData(res.data));
  })
    .catch((err) => {
      console.log("err");
    })
  //   console.log(response.data.data, "dfghj")
  //   dispatch(setProductData(response.data));
};

// export const AdminProductStoreDropDownListURL = () => async (dispatch) => {
//   const response = await axios.get(`${process.env.REACT_APP_URL}/company/store/dropdown/list`)
//   // {
//   //     headers: {
//   //         "x-auth-token": token
//   //     }
//   // });
//   console.log(response.data, "dhbhjrfgbdfvfvfjgnr")
//   dispatch(setStoreDropdown(response.data));

// };

// export const AdminProductStoreDropDownList = (companyId) => async (dispatch) => {
//   const response = await axios.get(`${process.env.REACT_APP_URL}/company/get/order/stores?company_uuid=${companyId}`)
//   // {
//   //     headers: {
//   //         "x-auth-token": token
//   //     }
//   // });
//   console.log(response.data, "dhbhjrfgbdfvfvfjgnr")
//   dispatch(setStoreList(response.data));

// };

// export const AdminProductCategoryDropDownListURL = (companyid, storeid) => async (dispatch) => {
//   const response = await axios.get(`${process.env.REACT_APP_URL}/category/dropdown/list?company_uuid=${companyid}&store_uuid=${storeid}`)
//   // {
//   //     headers: {
//   //         "x-auth-token": token
//   //     }
//   // });
//   console.log(response.data, "dhbhjrfgbdfvfvfjgnr")
//   dispatch(setCategoryList(response.data));

// };

export const AdminBannersAddURL = (payload, token) => async (dispatch) => {
  const response = await axios.post(`${process.env.REACT_APP_URL}/banner/add`, payload, {
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
// export const AdminProductBulkUplodURL = (payload, token) => async (dispatch) => {
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

export const AdminBannersUpdateURL = (uuid, payload, token) => async (dispatch) => {
  const response = await axios.put(`${process.env.REACT_APP_URL}/banner/${uuid}`, payload, {
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


export const AdminBannersStatusUpdateURL = (payload, token) => async (dispatch) => {
  const response = await axios.put(`${process.env.REACT_APP_URL}/banner/change/status`, payload, {
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
const adminBannersReducer = adminBannersSlice.reducer;

export default adminBannersReducer;
