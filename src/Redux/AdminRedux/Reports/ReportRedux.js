import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  AdminReportData: [],
  reportstorelist:[],
  userdropdown: {},
  notification: {}
};

const adminReportSlice = createSlice({
  name: 'AdminReportList',
  initialState,
  reducers: {
    setAdminReportData(state, action) {
      state.AdminReportData = action.payload;
    },
    setreportstorelist(state, action) {
      state.reportstorelist = action.payload;
    },
    setUserDropdown(state, action){
      state.userdropdown = action.payload;
    },
    // setCatData
    setToast(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { setAdminReportData,setreportstorelist,setUserDropdown, setToast } = adminReportSlice.actions;


export const AdminReportListURL = (page, search, token, limit, id,storeid,startdate,enddate) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/report/list/company?pagenum=${page}&limit=${limit}&search=${search}&company_uuid=${id}&store_uuid=${storeid}&start_date=${startdate}&end_date=${enddate}`, {
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

export const ReportstorelistApi = (pageNUm, search, token, limit, id) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/company/store/list?page=${pageNUm}&limit=${limit}&search=${search}&company_uuid=${id}`,
    {
      headers: {
        "x-auth-token": token
      }
    });
  console.log(response, "dfggfhdfghfghhj")
  dispatch(setreportstorelist(response.data));
};
export const ExportAdminReportURL = (companyId, startDate, endDate, token) => async (dispatch) => {
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

export const UserDropdownList = (token, companyID) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/user/dropdown?company_uuid=${companyID}`, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
    dispatch(setUserDropdown(res.data));
  })
    .catch((err) => {
      console.log("err");
    })

};



const AdminReportReducer = adminReportSlice.reducer;

export default AdminReportReducer;
