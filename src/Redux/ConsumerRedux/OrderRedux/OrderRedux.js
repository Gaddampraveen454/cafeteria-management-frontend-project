import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  ConsumerOrderData: [],
  OrderView: {},
  notification: {}
};

const consumerOrderSlice = createSlice({
  name: 'consumer order',
  initialState,
  reducers: {
    setConsumerOrderData(state, action) {
      state.ConsumerOrderData = action.payload;
    },
    setConsumerOrderView(state, action) {
      state.OrderView = action.payload;
    },
    setToast(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { setConsumerOrderData, setConsumerOrderView, setToast } = consumerOrderSlice.actions;


export const ConsumerOrderListURL = (pageNUm, search, token, limit, consumerId) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/order/list/consumer?pagenum=${pageNUm}&limit=${limit}&user_uuid=${consumerId}&search=${search}`, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
    dispatch(setConsumerOrderData(res.data));
  })
    .catch((err) => {
      console.log("err");
    })

};

export const ConsumerOrderView = (token, OrderId) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/order/view/${OrderId}`, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
    dispatch(setConsumerOrderView(res.data));
  })
    .catch((err) => {
      console.log("err");
    })

};


const ConsumerOrderReducer = consumerOrderSlice.reducer;

export default ConsumerOrderReducer;
