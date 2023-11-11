import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  AdminReportData: [],
  notification: {}
};

const adminReportSlice = createSlice({
  name: 'AdminReportList',
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

export const { setAdminReportData, setToast } = adminReportSlice.actions;


export const AdminReportListURL = (page,search,token,limit,id) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/report/list/company?pagenum=${page}&limit=${limit}&search=${search}&company_uuid=${id}&store_uuid=&strat_date=&end_date=`, {
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
export const ExportAdminReportURL = (companyId,startDate, endDate, token) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/report/list/admin/export?pagenum=0&limit=10&search=&company_uuid=${companyId}&user_uuid=&strat_date=${startDate}&end_date=${endDate}`, {
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



const AdminReportReducer = adminReportSlice.reducer;

export default AdminReportReducer;
