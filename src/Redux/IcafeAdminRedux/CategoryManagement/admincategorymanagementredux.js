import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';
 
 
const initialState = {
    categoryData: [],
    categoryDropdown: {},
    storeDropdown: {},
    notification: {}
};
 
const adminCategorySlice = createSlice({
    name: 'adminCategorySlice',
    initialState,
    reducers: {
        setCategoryData(state, action) {
            state.categoryData = action.payload;
        },
        setCategoryDropdown(state, action) {
            state.categoryDropdown = action.payload;
        },
        setStoreDropdown(state, action) {
            state.storeDropdown = action.payload;
        },
        setToast(state, action) {
            state.notification = action.payload;
        },
    },
});
 
export const { setCategoryData, setCategoryDropdown, setStoreDropdown, setToast } = adminCategorySlice.actions;
 
 
export const AdminCategoryListURL = (pageNUm, search, limit,companyuuid,storeuuid) => async (dispatch) => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/category/company/list?pagenum=${pageNUm}&limit=${limit}&search=${search}&company_uuid=${companyuuid}&store_uuid=${storeuuid}`
    )
    console.log(response.data, "jhjbhbjhbj")
    dispatch(setCategoryData(response.data));
};
 
export const ICafeAdminCategoryDropDownListURL = () => async (dispatch) => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/company/dropdown/list`)
    // {
    //     headers: {
    //         "x-auth-token": token
    //     }
    // });
    console.log(response.data, "dhbhjr")
    dispatch(setCategoryDropdown(response.data));
 
};
 
export const ICafeAdminCategoryStoreDropDownListURL = () => async (dispatch) => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/company/store/dropdown/list`)
    // {
    //     headers: {
    //         "x-auth-token": token
    //     }
    // });
    console.log(response.data, "dhbhjrjgnr")
    dispatch(setStoreDropdown(response.data));
 
};
 
export const AdminCategoryAddURL = (payload, token) => async (dispatch) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/category/create`, payload, {
        headers: {
            "x-auth-token": token
        }
    }).then((res) => {
        console.log(res, "sdfsdfsdff")
        dispatch(setToast({ status: true, message: res.data.message }))
    })
        .catch((err) => {
            dispatch(setToast({ status: false, message: err && err.response ? err && err.response.data : "Something went wrong" }))
 
        })
};
 
export const AdminCategoryUpdateURL = (uuid, payload, token) => async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/category/update/${uuid}`, payload, {
        headers: {
            "x-auth-token": token
        }
    }).then((res) => {
        console.log(res, "sdfsdfsdff")
        dispatch(setToast({ status: true, message: res.data.message }))
    })
        .catch((err) => {
            dispatch(setToast({ status: false, message: err && err.response ? err && err.response.data : "Something went wrong" }))
 
        })
 
};
 
export const AdminCategoryStatusUpdateURL = (payload, token ,id) => async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/category/status/update/${id}`, payload, {
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
 
};
const adminCategoryReducer = adminCategorySlice.reducer;
 
export default adminCategoryReducer;
