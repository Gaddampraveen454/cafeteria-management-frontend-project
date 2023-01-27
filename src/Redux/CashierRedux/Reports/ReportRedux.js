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


export const CashierReportListURL = (token) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/report/list/cashier?pagenum=0&limit=10&search=&user_uuid=&strat_date=&end_date=`, {
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
