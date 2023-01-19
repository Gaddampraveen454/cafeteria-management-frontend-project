import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  consumerData: [],
  notification: {}
};

const consumerSlice = createSlice({
  name: 'consumer',
  initialState,
  reducers: {
    setConsumerData(state, action) {
      state.consumerData = action.payload;
    },
    setToast(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { setConsumerData , setToast} = consumerSlice.actions;


export const consumerListURL = (token) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/user/consumer/list?pagenum=0&limit=10&search=`,{headers:{
    "x-auth-token" : token
  }});
  console.log(response.data.data, "dfghj")
  dispatch(setConsumerData(response.data));
};

export const consumerAddURL = (payload,token) => async (dispatch) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/user/create/consumer`,payload,{headers:{
      "x-auth-token" : token
    }}).then((res) => {
      console.log(res, "sdfsdfszvzxxczxcdff")
      dispatch(setToast({ status: true, message: res.data.message  }))
    })
    .catch((err) => {
      dispatch(setToast({ status: false, message: err && err.response? err && err.response.data:"Something went wrong" }))

    })
  };

export const consumerUpdateURL = (uuid,payload, token) => async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/user/update/consumer/${uuid}`,payload,{headers:{
      "x-auth-token" : token
    }}).then((res) => {
      console.log(res, "sfsdsdfsdf")
      dispatch(setToast({ status: true, message: res.data.message }))
    })
    .catch((err) => {
      dispatch(setToast({ status: false, message: err && err.response? err && err.response.data:"Something went wrong" }))

    })
   
  };
const consumerReducer = consumerSlice.reducer;

export default consumerReducer;
