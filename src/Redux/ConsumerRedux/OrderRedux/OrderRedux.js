import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  ConsumerOrderData: [],
  OrderView: {},
  consumerfeedback: {},
  consumerOrderReview: {},
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
    setConsumerFeedback(state, action) {
      state.consumerfeedback = action.payload;
    },
    setConsumerOrderReview(state, action) {
      state.consumerOrderReview = action.payload;
    },
    setToast(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { setConsumerOrderData, setConsumerOrderView, setConsumerOrderReview, setConsumerFeedback, setToast } = consumerOrderSlice.actions;


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
  dispatch(setConsumerOrderView({}));
  const response = await axios.get(`${process.env.REACT_APP_URL}/order/view/${OrderId}?company_uuid=`, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
    dispatch(setConsumerOrderView(res.data));
  })
    .catch((err) => {
      console.log("err");
    dispatch(setConsumerOrderView({}));
    })

};

export const ConsumerFeedback = (token, payload) => async (dispatch) => {
  const response = await axios.post(`${process.env.REACT_APP_URL}/feedback/create`, payload, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
    dispatch(setConsumerFeedback(res.data));
    dispatch(setToast({ status: true, message: res.data.message }))
  })
    .catch((err) => {
      console.log("err");
      dispatch(setToast({ status: false, message: err && err.response ? err && err.response.data : "Something went wrong" }))
    })

};

export const ConsumerOrderReview = (token, payload) => async (dispatch) => {
  const response = await axios.post(`${process.env.REACT_APP_URL}/review/order`, payload, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
    dispatch(setConsumerOrderReview(res.data));
    dispatch(setToast({ status: true, message: res.data.message }))
  })
    .catch((err) => {
      console.log("err");
      dispatch(setToast({ status: false, message: err && err.response ? err && err.response.data : "Something went wrong" }))
    })

};


const ConsumerOrderReducer = consumerOrderSlice.reducer;

export default ConsumerOrderReducer;
