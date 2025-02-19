import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVICE_URL } from 'config.js';

const initialState = {
  status: 'idle',
  items: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationsLoading(state) {
      state.status = 'loading';
    },
    notificationsLoaded(state, action) {
      state.items = action.payload;
      state.status = 'idle';
    },
  },
});

export const { notificationsLoading, notificationsLoaded } = notificationSlice.actions;

// export const fetchNotifications = () => async (dispatch) => {
//   dispatch(notificationsLoading());
//   const response = await axios.get(`${SERVICE_URL}/notifications`);
//   dispatch(notificationsLoaded(response.data));
// };

export const fetchNotifications = (page, limit,token, uuid) => async (dispatch) => {
  dispatch(notificationsLoading());
  const response = await axios.get(`${process.env.REACT_APP_URL}/notification/consumer/list?page=${page}&limit=${limit}&user_uuid=${uuid}`,{
    headers: {
      "x-auth-token": token
    }
  })
  .then((res) => {
    dispatch(notificationsLoaded(response.data));
  })
  .catch((err) => {
    // dispatch(notificationsLoaded(err.data));
  })
};

const notificationReducer = notificationSlice.reducer;
export default notificationReducer;
