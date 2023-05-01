import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  IpAddressData: [],
  notification: {}
};

const IpAddressSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setIpAddressData(state, action) {
      state.IpAddressData = action.payload;
    },
    setToast(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { setIpAddressData, setToast } = IpAddressSlice.actions;


export const IpAddressDataURL = () => async (dispatch) => {
  const response = await axios.get(`https://ipapi.co/json/`, {
    // headers: {
    //   "x-auth-token": token
    // }
  }).then((res) => {
    console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
    dispatch(setIpAddressData(res.data));
  })
    .catch((err) => {
      console.log("err");
    })
  //   console.log(response.data.data, "dfghj")
  //   dispatch(setIpAddressData(response.data));
};


const IpAddressReducer = IpAddressSlice.reducer;

export default IpAddressReducer;
