import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';
 
 
const initialState = {
    storeData: [],
    dropdownList: {},
    notification: {}
};
 
const iCafeAdminStoreSlice = createSlice({
    name: 'iCafeAdminStoreSlice',
    initialState,
    reducers: {
        setCatData(state, action) {
            state.storeData = action.payload;
        },
        setDropdownData(state, action) {
            state.dropdownList = action.payload;
        },
        setToast(state, action) {
            state.notification = action.payload;
        }
    },
});
 
export const { setCatData, setToast, setDropdownData } = iCafeAdminStoreSlice.actions;
 
 
export const ICafeAdminStoreListURL = (pageNUm, search, token, limit, id) => async (dispatch) => {
    console.log("Enter............")
    const response = await axios.get(`${process.env.REACT_APP_URL}/company/store/admin/list?page=${pageNUm}&limit=${limit}&search=${search}&company_uuid=${id}`,
        {
            headers: {
                "x-auth-token": token
            }
        });
    console.log(response.data, "kkkkkk")
    dispatch(setCatData(response.data));
 
};
 
export const ICafeAdminStoreDropDownListURL = () => async (dispatch) => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/company/dropdown/list`)
        // {
        //     headers: {
        //         "x-auth-token": token
        //     }
        // });
    console.log(response.data.data, "dfghj")
    dispatch(setDropdownData(response.data));
 
};
 
export const IcafeAdminStoreAddURL = (payload, token) => async (dispatch) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/company/store/create`, payload,
        {
            headers: {
                "x-auth-token": token
            }
        })
        .then((res) => {
            console.log(res, "sdfsdfsdff")
            dispatch(setToast({ status: true, message: res.data.message }))
        })
        .catch((err) => {
            dispatch(setToast({ status: false, message: err && err.response ? err && err.response.data : "Something went wrong" }))
 
        })
};
 
 
 
 
export const ICafeAdminStoreUpdateURL = (uuid, payload, token) => async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/company/store/update/${uuid}`, payload,
        {
            headers: {
                "x-auth-token": token
            }
        }).then((res) => {
            console.log(res, "sdfsddffsdff")
            dispatch(setToast({ status: true, message: res.data.message }))
        })
        .catch((err) => {
            dispatch(setToast({ status: false, message: err && err.response ? err && err.response.data : "Something went wrong" }))
 
        })
 
};
export const ICafeAdminStoreStatusUpdateURL = (payload, token, uuid) => async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/company/store/status/update/${uuid}`, payload, {
        headers: {
            "x-auth-token": token
        }
    }).then((res) => {
        console.log(res, "sdfsddffsdff")
        dispatch(setToast({ status: true, message: res.data.message }))
    })
        .catch((err) => {
            console.log(err && err.response, "hjgjghgjhghj")
            dispatch(setToast({ status: false, message: err && err.response ? err && err.response.data : "Something went wrong" }))
 
        })
    // console.log(response, "sdfsfsdfs")
 
};
 
 
 
 
const iCafeAdminStoreReducer = iCafeAdminStoreSlice.reducer;
 
export default iCafeAdminStoreReducer;
