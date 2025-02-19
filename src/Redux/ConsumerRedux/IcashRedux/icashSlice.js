import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVICE_URL } from 'config.js';

const initialState = {
    icashdata:[],
    notificationValue: {}
};

const IcashSlice = createSlice({
    name: 'usericash',
    initialState,
    reducers: {
        seticashdata(state, action) {
            state.icashdata = action.payload;
        },
    },
});

export const { seticashdata } = IcashSlice.actions;

// export const fetchNotifications = () => async (dispatch) => {
//   dispatch(notificationsLoading());
//   const response = await axios.get(`${SERVICE_URL}/notifications`);
//   dispatch(notificationsLoaded(response.data));
// };

export const UserIcashUrl = (page, limit, userid, token) => async (dispatch) => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/cash/list/consumer?pagenum=${page}&limit=${limit}&user_uuid=${userid}`, {
        headers: {
            "x-auth-token": token
        }
    })
        .then((res) => {
            dispatch(seticashdata(res.data));
        })
        .catch((err) => {
            // dispatch(notificationsLoaded(err.data));
        })
};

const IcashSliceUserReducer = IcashSlice.reducer;
export default IcashSliceUserReducer;
