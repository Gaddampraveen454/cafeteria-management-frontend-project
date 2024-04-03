import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
    IcashListData: [],
    notification: {}
};

const adminIcashSlice = createSlice({
    name: 'adminIcash',
    initialState,
    reducers: {
        setIcashListData(state, action) {
            state.IcashListData = action.payload;
        },
        setToast(state, action) {
            state.notification = action.payload;
        },
    },
});

export const { setIcashListData, setToast } = adminIcashSlice.actions;


export const AdminICashListURL = (pageNUm, token, limit, userId, type) => async (dispatch) => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/cash/list/admin?pagenum=${pageNUm}&limit=${limit}&user_uuid=${userId}&type=${type}`, {
        headers: {
            "x-auth-token": token
        }
    }).then((res) => {
        console.log(res, "sdfsdfsdsdfsdfsdfsdfff")
        dispatch(setIcashListData(res.data));
    })
        .catch((err) => {
            console.log("err");
        })

};

const adminICashReducer = adminIcashSlice.reducer;

export default adminICashReducer;
