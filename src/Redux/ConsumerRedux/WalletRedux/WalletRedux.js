import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  WalletData: [],
  notification: {}
};

const WalletSlice = createSlice({
  name: 'Wallet',
  initialState,
  reducers: {
    setWalletData(state, action) {
      state.WalletData = action.payload;
    },
    setToast(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { setWalletData, setToast } = WalletSlice.actions;


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


const WalletReducer = WalletSlice.reducer;

export default WalletReducer;
