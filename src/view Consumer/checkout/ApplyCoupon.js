import * as React from "react";
import { Row, Col, Button, Dropdown, Form, Card, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CouponList, CouponApply } from "Redux/ConsumerRedux/Coupons/CouponsRedux";
import InputPromoCode from "./InputButton";
// import { CartListURL, removeCoupon, setCoupon, setDiscountAmount } from "./CartRedux/CartRedux";

function TabPanel(props) {
    console.log(props, "props")
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const ApplyCoupons = ({ show, onHide, CartData }) => {


    const [value, setValue] = React.useState(0);
    const [apply, setApply] = React.useState('');
    const [suc, setSuc] = React.useState()
    const [notcouponapply, setCouponNotApply] = React.useState('')
    const [discount, setDiscount] = React.useState(0)
    const [couppon, setCouppon] = React.useState([])
    const [promoCode, setPromoCode] = React.useState("");
    const [buttonClicked, setButtonClicked] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [customerid, setCustomerid] = React.useState('');

    const { currentUser, isLogin } = useSelector((state) => state.auth);
    const { CouponData, discountAmount, coupon, notification } = useSelector((state) => state.coupons)

    console.log(notification?.message, "gdjsgfhbfjkdhfkj")

    const StoreData = JSON.parse(localStorage.getItem("storeDatiles"));

    React.useEffect(() => {
        setDiscount(discountAmount)
        setCouppon(coupon)
    }, [discountAmount, coupon])

    React.useEffect(() => {
        setCustomerid(currentUser.uuid);
    }, [currentUser]);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(CouponList(currentUser?.data?.token, StoreData?.company_uuid, StoreData?.uuid))
    }, [customerid])
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const setApplyCoupon = (e) => {
        console.log(e, "apply")
        setApply(e)
        localStorage.setItem("couponid", (e))
        const payload = {

            "company_uuid": StoreData?.company_uuid,
            "store_uuid": StoreData?.uuid,
            "user_uuid": currentUser.data.uuid,
            "code": e?.code,
            "amount": CartData.total_amount
        }

        console.log(payload, "jbhbbj")
        dispatch(CouponApply(payload, currentUser?.data?.token))
        setSuc(true)
    }

    const isCouponValid = (coupons) => {

        return coupons.code.startsWith('VALID_COUPON_');
    };

    const handleApplyPromoCode = (e) => {
        e.preventDefault();
        setButtonClicked(true);

        if (promoCode === '') {
            setErrorMessage('Please enter a valid promo code.');
            return;
        }
        const payload = {

            "code": promoCode,
            "company_uuid": StoreData?.company_uuid,
            "store_uuid": StoreData?.uuid,
            "user_uuid": currentUser.data.uuid,
            "amount": CartData.total_amount
        }
        console.log(payload, "payload")
        dispatch(CouponApply(payload, currentUser?.data?.token))
        setSuc(true)
    };


    const setNotApplyCoupon = (e) => {
        console.log(e, "yutr")
        if (CartData?.total_amount < e?.minimum_purchase) {
            setCouponNotApply("Coupon is not Eligible")
        }
    }

    React.useEffect(() => {
        if (suc === true) {
            if (notification.status === true) {
                toast.success(notification.message, {
                    position: "top-right",
                    duration: 2000
                })
                setSuc(false)
                dispatch(CouponList(currentUser?.data?.token, StoreData?.company_uuid, StoreData?.uuid))
            }
            else if (notification.status === false) {
                toast.error(notification.message, {
                    position: "top-right",
                    duration: 2000
                })
                setSuc(false)
            }
        }

    }, [notification])

    return (
        <Box sx={{ width: "100%" }} >
            {/* <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "space-around" }}> */}
                {/* <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab style={{ color: "yellowgreen" }} label="Store Offers  " {...a11yProps(0)} />
                    <Tab style={{ color: "red" }} label=" / Offline Coupon Apply" {...a11yProps(1)} />
                </Tabs> */}
            {/* </Box> */}
            <TabPanel value={value} index={0}>
                <InputPromoCode apply={apply} CartData={CartData} />
                {CouponData?.data?.map((coup, id) => {
                    console.log(coup, "coupy")
                    return <>
                        {CartData?.total_amount < coup?.minimum_purchase ?

                            <div key={id} className="mt-5 mb-5  "
                                onClick={(e) => e.preventDefault()}
                                style={{
                                    display: 'flex',
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    padding: "20px 0px 20px 0px ",
                                    background: "#f5f5f5",
                                    boxShadow: "0 0 5px 0 rgba(0,0,0,0.09)",
                                }}
                            >
                                <div style={{ float: "left" }}>
                                    <Button className="mb-2" style={{ fontSize: "12px", padding: "7px" }}>{coup.code}</Button>
                                    <p style={{ fontSize: "14px", width: "330px" }}>{coup.description}</p>

                                    {coup.type === "flat" ?
                                        <span style={{ fontSize: "10px", color: "#BF0B02", marginTop: "1px" }}>Get Flat {coup.upto_discount} | Minimum amount ₹{coup.minimum_purchase} | {notcouponapply}</span>
                                        :
                                        <span style={{ fontSize: "10px", color: "#BF0B02", marginTop: "1px" }}>Get Upto {coup.upto_discount} | Minimum amount ₹{coup.minimum_purchase} | {notcouponapply}</span>
                                    }
                                </div>

                                {apply.uuid === coup.uuid ?
                                    <div style={{ float: "right", cursor: "pointer", border: "1px dashed black", padding: "5px 10px 5px 10px", borderRadius: "5px" }}>
                                        Applied
                                    </div>
                                    :
                                    <div style={{
                                        float: "right",
                                        cursor: "pointer",
                                        border: "1px dashed black",
                                        padding: "5px 10px 5px 10px",
                                        borderRadius: "5px"
                                    }}
                                        onClick={() => setNotApplyCoupon(coup)}>
                                        Apply
                                    </div>
                                }
                            </div>
                            :
                            <div key={id} className="mt-5 mb-5 "
                                style={{
                                    display: 'flex',
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    padding: "20px 0px 20px 0px ",
                                    background: "#ffffff",
                                    boxShadow: "0 0 5px 0 rgba(0,0,0,0.09)",
                                }}
                            >
                                <div style={{ float: "left" }}>
                                    <Button className="mb-2" style={{ fontSize: "12px", padding: "7px" }}>{coup.code}</Button>
                                    <p style={{ fontSize: "14px", width: "330px" }}>{coup.description}</p>
                                    {coup.type === "flat" ?
                                        <span style={{ fontSize: "10px", color: "#BF0B02", marginTop: "1px" }}>Get Flat {coup.upto_discount} | Minimum amount ₹{coup.minimum_purchase}</span>
                                        :
                                        <span style={{ fontSize: "10px", color: "#BF0B02", marginTop: "1px" }}>Get Upto {coup.upto_discount} | Minimum amount ₹{coup.minimum_purchase}</span>
                                    }

                                </div>

                                {apply.uuid === coup.uuid
                                    && Object.keys(coupon).length > 0
                                    ?
                                    <div style={{ float: "right", cursor: "pointer", border: "1px dashed black", padding: "5px 10px 5px 10px", borderRadius: "5px" }}
                                    // onClick={() => dispatch(removeCoupon())}
                                    >
                                        Remove
                                    </div>
                                    :
                                    <div style={{
                                        float: "right",
                                        cursor: "pointer",
                                        border: "1px dashed black",
                                        padding: "5px 10px 5px 10px",
                                        borderRadius: "5px"
                                    }}

                                        onClick={() => { setApplyCoupon(coup); onHide(); }}
                                    >
                                        Apply
                                    </div>
                                }
                            </div>

                        }

                    </>
                })}


            </TabPanel>
            <TabPanel value={value} index={1} style={{ overflowY: "scroll", height: "40vh" }}>
                <Form onSubmit={handleApplyPromoCode} id="demo">
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Enter promo code here"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            required
                        />
                        {buttonClicked && promoCode === '' && (
                            <div className="text-danger mt-2">Enter a valid promo code.</div>
                        )}
                        {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3"
                        onClick={(e) => {
                            if (promoCode === '') {
                                e.preventDefault();
                                setErrorMessage('Enter a valid promo code.');
                            } else {
                                setErrorMessage('');
                                onHide();
                            }
                        }}
                    >
                        Apply
                    </Button>

                </Form>

            </TabPanel>
        </Box>
    );
};

export default ApplyCoupons;