import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
    StoreNotification: {}
};

const storeNotify = createSlice({
    name: 'storeNotify',
    initialState,
    reducers: {
        setStoreNotification(state, action) {
            state.StoreNotification = action.payload;
        },
    },
});

export const { setStoreNotification } = storeNotify.actions;


export const StoreNotificationsURL = (page, search, token, limit, Id) => async (dispatch) => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/notification/store/list?page=${page}&limit=${limit}&store_uuid=${Id}`, {
        headers: {
            "x-auth-token": token
        }
    }).then((res) => {
        console.log(res)
        dispatch(setStoreNotification(res?.data))
    })
        .catch((err) => {
            console.log(err.response, "sdfsdfsdfs")
        })
};

const storeNotificationReducer = storeNotify.reducer;

export default storeNotificationReducer;
