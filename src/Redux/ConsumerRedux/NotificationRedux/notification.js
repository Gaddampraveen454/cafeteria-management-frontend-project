import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVICE_URL } from 'config.js';

const initialState = {
    notificationValue: {}
};

const notificationSlice = createSlice({
    name: 'Usernotification',
    initialState,
    reducers: {
        setNotificationValue(state, action) {
            state.notificationValue = action.payload;
        },
    },
});

export const { setNotificationValue } = notificationSlice.actions;

// export const fetchNotifications = () => async (dispatch) => {
//   dispatch(notificationsLoading());
//   const response = await axios.get(`${SERVICE_URL}/notifications`);
//   dispatch(notificationsLoaded(response.data));
// };

export const UserNotificationsURL = (page, limit, token, uuid) => async (dispatch) => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/notification/consumer/list?page=${page}&limit=${limit}&user_uuid=${uuid}`, {
        headers: {
            "x-auth-token": token
        }
    })
        .then((res) => {
            dispatch(setNotificationValue(res.data));
        })
        .catch((err) => {
            // dispatch(notificationsLoaded(err.data));
        })
};

const notificationUserReducer = notificationSlice.reducer;
export default notificationUserReducer;
