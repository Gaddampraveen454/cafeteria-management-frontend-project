import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';


const initialState = {
    Couponsdata: [],
    AdmincategoryDropdown: {},
    storeDropdown: {},
    storeDropdownByCompanyId: {},
    notification: {}
};

const companycouponslistSlice = createSlice({
    name: 'companycoupons',
    initialState,
    reducers: {
        setCouponsdata(state, action) {
            state.Couponsdata = action.payload;
        },
        // setCategoryDropdown(state, action) {
        //     state.AdmincategoryDropdown = action.payload;
        // },
        // setStoreDropdown(state, action) {
        //     state.storeDropdown = action.payload;
        // },
        // setstoreDropdownByCompanyId(state, action) {
        //     state.storeDropdownByCompanyId = action.payload;
        // },
        setToast(state, action) {
            state.notification = action.payload;
        },
    },
});

export const { setCouponsdata, setCategoryDropdown, setstoreDropdownByCompanyId, setStoreDropdown, setToast } = companycouponslistSlice.actions;


// export const companycouponslist = (page, search, limit,type, companyuuid, storeuuid) => async (dispatch) => {
//     const response = await axios.get(`${process.env.REACT_APP_URL}/coupon/list?page=${page}&limit=${limit}&search=${search}&type=${type}&offer_type&company_uuid=${companyuuid}&store_uuid=${storeuuid}`,{
//         //         headers: {
//         //             "x-auth-token": token
//         //         }
//     )
//     console.log(response.data, "jhjbhbjhbj")
//     dispatch(setCouponsdata(response.data));
// };


export const companycouponslist = (page, search, limit, type, companyuuid, storeuuid, token) => async (dispatch) => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/coupon/list?page=${page}&limit=${limit}&search=${search}&type=${type}&offer_type&company_uuid=${companyuuid}&store_uuid=${storeuuid}`, {
        headers: {
            "x-auth-token": token
        }
    }).then((res) => {
        console.log(res, "resresres")
        dispatch(setCouponsdata(res.data));
    })
        .catch((err) => {
            console.log(err)

        })
};




export const companyAddCoupon = (payload, token) => async (dispatch) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/coupon/add`, payload, {
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

export const companyUpdateCoupon = (uuid, payload, token) => async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/coupon/update/${uuid}`, payload, {
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
export const companyCouponStatus = (payload, token) => async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/coupon/status/change`, payload, {
        headers: {
            "x-auth-token": token
        }
    }).then((res) => {
        console.log(res, "sdfsdfsdff")
        dispatch(setToast({ status: true, message: res?.data?.message }))
    })
        .catch((err) => {
            dispatch(setToast({ status: false, message: err && err.response ? err && err.response.data : "Something went wrong" }))

        })
};
// /coupon/status/change

// export const AdminCategoryUpdateURL = (uuid, payload, token) => async (dispatch) => {
//     const response = await axios.put(`${process.env.REACT_APP_URL}/category/update/${uuid}`, payload, {
//         headers: {
//             "x-auth-token": token
//         }
//     }).then((res) => {
//         console.log(res, "sdfsdfsdff")
//         dispatch(setToast({ status: true, message: res.data.message }))
//     })
//         .catch((err) => {
//             dispatch(setToast({ status: false, message: err && err.response ? err && err.response.data : "Something went wrong" }))

//         })

// };

// export const AdminCategoryStatusUpdateURL = (payload, token, id) => async (dispatch) => {
//     const response = await axios.put(`${process.env.REACT_APP_URL}/category/status/update/${id}`, payload, {
//         headers: {
//             "x-auth-token": token
//         }
//     }).then((res) => {
//         console.log(res, "sdfsddffsdff")
//         dispatch(setToast({ status: true, message: res.data.message }))
//     })
//         .catch((err) => {
//             console.log(err && err.response, "hjgjghgjhghj")
//             dispatch(setToast({ status: false, message: err && err.response ? err && err.response.data : "Something went wrong" }))

//         })

// };
const couponCompanyReducer = companycouponslistSlice.reducer;

export default couponCompanyReducer;
