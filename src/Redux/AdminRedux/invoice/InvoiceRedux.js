import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  InvoiceData: [],
  notification: {}
};

const InvoiceSlice = createSlice({
  name: 'dashbord',
  initialState,
  reducers: {
    setInvoceData(state, action) {
      state.InvoiceData = action.payload;
    },
    setToast(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { setInvoceData, setToast } = InvoiceSlice.actions;


export const InvoiceListURL = (companyId,startDate, endDate, token) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/order/invoice/ORD-052669A2`, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "sdfsd")
    dispatch(setInvoceData(res.data));
  })
    .catch((err) => {
      console.log("err");
    })

};




const InvoiceReducer = InvoiceSlice.reducer;

export default InvoiceReducer;
