import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
    cmpyNotification: {}
};

const companyNotify = createSlice({
    name: 'companyNotify',
    initialState,
    reducers: {
        setCmpyNotification(state, action) {
            state.cmpyNotification = action.payload;
        },
    },
});

export const { setCmpyNotification } = companyNotify.actions;


export const CompanyNotificationsURL = (page, search, token, limit, Id) => async (dispatch) => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/notification/company/list?page=${page}&limit=${limit}&company_uuid=${Id}`, {
        headers: {
            "x-auth-token": token
        }
    }).then((res) => {
        console.log(res)
        dispatch(setCmpyNotification(res?.data))
    })
        .catch((err) => {
            console.log(err.response, "sdfsdfsdfs")
        })
};

const companyNotificationReducer = companyNotify.reducer;

export default companyNotificationReducer;
