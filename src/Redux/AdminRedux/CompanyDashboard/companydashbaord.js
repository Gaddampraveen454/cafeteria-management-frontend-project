import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  companyDashboard: [],
  notification: {}
};

const dashCountSlice = createSlice({
  name: 'companyDashbaord',
  initialState,
  reducers: {
    setcompanyDashbaord(state, action) {
      state.companyDashboard = action.payload;
    },
    setToast(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { setcompanyDashbaord, setToast } = dashCountSlice.actions;


export const DashbaordCompany = (token, typeofvalue) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/report/company/dashbaord?type=${typeofvalue}`, {
    headers: {
      "x-auth-token": token
    }
  }).then((res) => {
    console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
    dispatch(setcompanyDashbaord(res.data));
  })
    .catch((err) => {
      console.log("err");
    })

};



const CompanyDashboard = dashCountSlice.reducer;

export default CompanyDashboard;
