import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  AdminReportData: [],
  notification: {}
};

const iCafeAdminReportSlice = createSlice({
  name: 'admindashbord',
  initialState,
  reducers: {
    setAdminReportData(state, action) {
      state.AdminReportData = action.payload;
    },
    setToast(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { setAdminReportData, setToast } = iCafeAdminReportSlice.actions;


export const ICafeAdminReportListURL = (pagNum, search, token, limit, comapnyId, storeId, startdate, enddate) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/report/list/admin?pagenum=${pagNum}&limit=${limit}&search=${search}&company_uuid=${comapnyId}&store_uuid=${storeId}&user_uuid=&start_date=${startdate}&end_date=${enddate}`, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
    dispatch(setAdminReportData(res.data));
  })
    .catch((err) => {
      console.log("err");
    })

};
export const ICafeExportAdminReportURL = (companyId, startDate, endDate, token) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/report/list/admin/export?pagenum=0&limit=10&search=&company_uuid=${companyId}&user_uuid=&start_date=${startDate}&end_date=${endDate}`, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
    dispatch(setAdminReportData(res.data));
  })
    .catch((err) => {
      console.log("err");
    })

};



const ICafeAdminReportReducer = iCafeAdminReportSlice.reducer;

export default ICafeAdminReportReducer;
