import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  CashierReportData: [],
  notification: {}
};

const cashierReportSlice = createSlice({
  name: 'Report',
  initialState,
  reducers: {
    setCashierReportData(state, action) {
      state.CashierReportData = action.payload;
    },
    setToast(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { setCashierReportData, setToast } = cashierReportSlice.actions;


export const CashierReportListURL = (page, limit, search, storId, startDate, endDate, token) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/report/list/store?pagenum=${page}&limit=${limit}&search=${search}&store_uuid=${storId}&start_date=${startDate}&end_date=${endDate}`, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
    dispatch(setCashierReportData(res.data));
  })
    .catch((err) => {
      console.log("err");
    })

};



const CashierReportReducer = cashierReportSlice.reducer;

export default CashierReportReducer;
