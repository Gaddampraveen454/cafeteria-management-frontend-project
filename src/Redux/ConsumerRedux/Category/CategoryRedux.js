import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
  categoryForConsumer: [],
  notification: {}
};

const categoryForConsumerSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setcategoryForConsumer(state, action) {
      state.categoryForConsumer = action.payload;
    },
    setToast(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { setcategoryForConsumer, setToast } = categoryForConsumerSlice.actions;


export const categoryForConsumerListURL = (compnayId, pageNUm, search, token, limit,) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/category/lists?company_uuid=${compnayId}`,{
    // headers: {
    //   "x-auth-token": token
    // }
  }).then((res) => {
    console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
    dispatch(setcategoryForConsumer(res.data));
  })
    .catch((err) => {
      console.log("err");
    })
  //   console.log(response.data.data, "dfghj")
  //   dispatch(setcategoryForConsumer(response.data));
};


const categoryForConsumerReducer = categoryForConsumerSlice.reducer;

export default categoryForConsumerReducer;
