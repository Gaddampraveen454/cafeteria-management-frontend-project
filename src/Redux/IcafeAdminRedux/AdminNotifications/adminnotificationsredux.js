import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
    adminNotification: {}
};

const adminNotifies = createSlice({
    name: 'adminNotify',
    initialState,
    reducers: {
        setadminNotification(state, action) {
            state.adminNotification = action.payload;
        },
    },
});

export const { setadminNotification } = adminNotifies.actions;


export const AdminNotificationsURL = (page, search, token, limit, Id) => async (dispatch) => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/notification/admin/list?page=${page}&limit=${limit}&admin_uuid=${Id}`, {
        headers: {
            "x-auth-token": token
        }
    }).then((res) => {
        console.log(res)
        dispatch(setadminNotification(res?.data))
    })
        .catch((err) => {
            console.log(err.response, "sdfsdfsdfs")
        })
};

const adminNotificationReducer = adminNotifies.reducer;

export default adminNotificationReducer;
