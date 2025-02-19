import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  ActiveCompnayData: [],
  notification: {}
};

const ActiveCompanySlice = createSlice({
  name: 'active company',
  initialState,
  reducers: {
    setActiveCompnayData(state, action) {
      state.ActiveCompnayData = action.payload;
    },
    setToast(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { setActiveCompnayData, setToast } = ActiveCompanySlice.actions;


export const ActiveCompnyURL = (token) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/company/lists?pagenum=0&limit=10&search=`, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
    dispatch(setActiveCompnayData(res.data));
  })
    .catch((err) => {
      console.log("err");
    })

};


const ActiveCompnayReducer = ActiveCompanySlice.reducer;

export default ActiveCompnayReducer;
