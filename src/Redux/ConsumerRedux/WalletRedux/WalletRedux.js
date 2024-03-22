import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  WalletData: [],
  Profiledatap:[],
  notification: {}

};

const WalletSlice = createSlice({
  name: 'Wallet',
  initialState,
  reducers: {
    setWalletData(state, action) {
      state.WalletData = action.payload;
    },
    setprofiledata(state, action) {
      state.Profiledatap = action.payload;
    },
    setToast(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { setWalletData, setprofiledata,setToast } = WalletSlice.actions;

// /user/consumer/profile/CN-458FBF7C
export const getWalletURL = (id, token) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/user/consumer/wallet/${id}`, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "ssdfsfsd")
    dispatch(setWalletData(res.data));
  })
    .catch((err) => {
      console.log("err");
    })

};

export const ProfileData = (id, token) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/user/consumer/profile/${id}`, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "ssdfsfsd")
    dispatch(setprofiledata(res.data));
  })
    .catch((err) => {
      console.log("err");
    })

};

export const ProfileUpdate = (uuid, payload, token) => async (dispatch) => {
  const response = await axios.put(`${process.env.REACT_APP_URL}/user/update/profile/${uuid}`, payload, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "sdfsdfsdff")
    dispatch(setToast({ status: true, message: res.data.message }))
  })
    .catch((err) => {
      dispatch(setToast({ status: false, message: err && err.response ? err && err.response.data : "Something went wrong" }))

    })
};


const WalletReducer = WalletSlice.reducer;

export default WalletReducer;
