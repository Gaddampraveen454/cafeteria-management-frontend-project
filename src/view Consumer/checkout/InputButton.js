import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap';
import { CouponApply } from 'Redux/ConsumerRedux/Coupons/CouponsRedux';



export default function InputPromoCode({ apply, CartData }) {
    const dispatch = useDispatch();
    const [coupon, setCoupon] = useState('')
    console.log(coupon, "bn")
    const [data, setData] = React.useState()

    const [suc, setSuc] = React.useState()
    console.log(apply, "apply")
    console.log(data, "ata")

    const { currentUser, isLogin } = useSelector((state) => state.auth)
    const customerid = currentUser.uuid
    const { notification } = useSelector((state) => state.coupons)

    const StoreData = JSON.parse(localStorage.getItem("storeDatiles"));

    useEffect(() => {
        setCoupon(apply)
    }, [apply])

    const CreateProduct = (e) => {
        e.preventDefault()
        console.log("jhdcjac")
    }

    const HandleInputChange = (e) => {
        console.log(e, "ciuy")
        // setData(e.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const payload = {

            "company_uuid": StoreData?.company_uuid,
            "store_uuid": StoreData?.uuid,
            "user_uuid": currentUser.data.uuid,
            "code": coupon,
            "amount": CartData.total_amount

        }
        dispatch(CouponApply(payload, currentUser?.data?.token))
        setSuc(true)
    };

    useEffect(() => {
        if (suc === true) {
            if (notification.status === true) {
                toast.success(notification.message, {
                    position: "top-right",
                })
                setSuc(false)
            }
            else if (notification.status === false) {
                toast.error(notification.message)
                setSuc(false)
            }
        }

    }, [notification])
    console.log(notification, "ProductDataProductData")

    return (
        <Form onSubmit={handleSubmit} id="demo" style={{ display: "flex" }}>
            <Form.Control
                sx={{ '--Input-decoratorChildHeight': '45px' }}
                placeholder="Enter promo code here"
                type="text"
                required
                value={coupon.code}
                onChange={(e) => setCoupon(e.target.value)}
                style={{ width: "60%" }}
            // endDecorator={

            // }
            />
            <Button variant="primary" color="#000" type="submit" style={{ marginLeft: "18%" }}>
                Apply
            </Button>
        </Form>
    );
}