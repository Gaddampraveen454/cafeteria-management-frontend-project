import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Card, Button, Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import { ProductStoreListURL } from 'Redux/AdminRedux/Product/ProductRedux';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { CategoryListURL, CategoryAddURL, CategoryUpdateURL, } from 'Redux/AdminRedux/Cataogy/categoryRedux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

const addcategory = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const title = 'Add Balance';
    const description = 'Ecommerce Category Management Page';

    const { currentUser } = useSelector((state) => state.auth)
    console.log(currentUser, 'currentUsercurrentUser')

    const [selectValueState, setSelectValueState] = useState();
    const optionsState = [
        { value: 'Fougasse', label: 'Fougasse' },
        { value: 'Lefse', label: 'Lefse' },
    ];

    const [selectValueCity, setSelectValueCity] = useState();
    const optionsCity = [
        { value: 'Breadstick', label: 'Breadstick' },
        { value: 'Biscotti', label: 'Biscotti' },
    ];

    const [selectValueMonth, setSelectValueMonth] = useState();
    const optionsMonth = [
        { value: '01', label: '01' },
        { value: '02', label: '02' },
        { value: '03', label: '03' },
        { value: '04', label: '04' },
        { value: '05', label: '05' },
        { value: '06', label: '06' },
        { value: '07', label: '07' },
        { value: '08', label: '08' },
        { value: '09', label: '09' },
        { value: '10', label: '10' },
        { value: '11', label: '11' },
        { value: '12', label: '12' },
    ];

    const [selectValueYear, setSelectValueYear] = useState();
    const optionsYear = [
        { value: '21', label: '21' },
        { value: '22', label: '22' },
        { value: '23', label: '23' },
        { value: '24', label: '24' },
        { value: '25', label: '25' },
        { value: '26', label: '26' },
        { value: '27', label: '27' },
        { value: '28', label: '28' },
        { value: '29', label: '29' },
        { value: '30', label: '30' },
    ];

    const [name, setName] = useState("")
    const [sortorder, setSortOrder] = useState("")
    const [error, setError] = useState("");
    const [suc, setSuc] = useState(false);
    const [amount, setAmount] = useState("100")
    const [cashData, setCashData] = useState([])
    console.log(amount, "amount")

    const handleButtonClick = (clickedAmount) => {
        setAmount(clickedAmount);
        setError(""); // Clear any existing error
    };

    const handleInputChange = (e) => {
        const enteredValue = e.target.value;
        if (enteredValue !== "0") {
            setAmount(enteredValue);
            setError("");
        } else {
            setError("Amount cannot be 0");
        }
    };


    const displayRazorpay = async () => {

        if (cashData) {
            const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
            if (!res) {
                alert("err")
                return
            }
            const amountInPaisa = parseInt(cashData.total, 10);
            const options = {
                "key": process.env.RAZORPAY_KEY_ID,
                "amount": amountInPaisa,
                "currency": "INR",
                "name": "Cafeteria",
                "description": "Cafeteria",
                "image": "https://images.pexels.com/photos/66997/pexels-photo-66997.jpeg?auto=compress&cs=tinysrgb&w=600",
                "order_id": cashData?.razorpay_id,
                handler: (response) => {
                    const payLoad = {
                        "cash_uuid": cashData?.cash_uuid,
                        "transaction_uuid": cashData && cashData?.transaction_uuid,
                        "payment_status": "paid",
                        "razorpay_order_id": response.razorpay_order_id,
                        "razorpay_payment_id": response.razorpay_payment_id,
                        "razorpay_signature": response.razorpay_signature,
                    }
                    axios.put(`${process.env.REACT_APP_URL}/cash/payment/update`, payLoad, {
                        headers: {
                            "x-auth-token": currentUser.data?.token
                        }
                    })
                        .then((resp) => {
                            console.log(resp.data, "jhgfdhfkjhdskj")
                            history.push({
                                pathname: "/Icash"
                            })
                        })
                        .catch((err) => {
                            console.log(err.response.data, "sdfsdfsdffsd")
                        })
                },
                "prefill": {
                    "name": currentUser.data?.name,
                    "email": currentUser.data?.email,
                    "contact": currentUser.data?.mobile
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open()
        }
    }

    const AddBalanceApi = async (event) => {
        event.preventDefault()
        const value = event.target.elements
        const payload = {
            "user_uuid": currentUser?.data?.uuid,
            "amount": amount
        }

        axios.post(`${process.env.REACT_APP_URL}/cash/add`, payload,
            {
                headers: {
                    "x-auth-token": currentUser.data?.token
                }
            })
            .then((respons) => {
                console.log(respons, "fffgdsfsdfdsf")
                setCashData(respons.data)
            })
            .catch((err) => {
                console.log(err.response, "zasdsadasdewe")
                toast.error(err.response.data)
                setSuc(false)
            })
    }

    useEffect(() => {
        if (cashData) {
            displayRazorpay()
        }
    }, [cashData])



    return (
        <>
            <HtmlHead title={title} description={description} />
            {/* Title Start */}
            <div className="page-title-container">
                <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back mb-2" to="/Icash">
                    <CsLineIcons icon="chevron-left" size="20" />
                    <span className="align-middle text-medium ms-1">Icash</span>
                </NavLink>
                <h1 className="mb-0 pb-0 display-4" id="title">
                    {title}
                </h1>
            </div>
            {/* Title End */}

            <Row>
                <Col xs="12" className="col-lg order-1 order-lg-0">
                    {/* Address Start */}
                    <Card className="mb-5">
                        <Card.Body>
                            <Form onSubmit={AddBalanceApi}>
                                <Row className="g-3">
                                    <Col lg="6">
                                        <Form.Label>Enter Amount</Form.Label>
                                        <Form.Control type="number" onChange={handleInputChange} value={amount} />
                                        {error && <div style={{ color: 'red' }}>{error}</div>}
                                    </Col>
                                    <div style={{ display: "flex" }}>
                                        <Button className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto" onClick={() => handleButtonClick("100")}>
                                            ₹ 100
                                        </Button>
                                        <Button className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto" onClick={() => handleButtonClick("250")}>
                                            ₹ 250
                                        </Button>
                                        <Button className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto" onClick={() => handleButtonClick("500")}>
                                            ₹ 500
                                        </Button>
                                        <Button className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto" onClick={() => handleButtonClick("1000")}>
                                            ₹ 1000
                                        </Button>
                                    </div>
                                    <Col lg="12" className='mt-4'>
                                        <Button variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto" type="submit">
                                            <CsLineIcons /> <span>Proceed To Add Balance</span>
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                    {/* Address End */}

                </Col>
            </Row>
        </>
    );
};

export default addcategory;
