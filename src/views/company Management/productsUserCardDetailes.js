// productsUserCardDetailes
import React, { useEffect, useState } from 'react';
import Rating from 'react-rating';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';

import { categoryForConsumerListURL } from 'Redux/ConsumerRedux/Category/CategoryRedux';
import { ProductForConsumerListURL } from 'Redux/ConsumerRedux/Product/ProductRedux';

import { Row, Col, Button, Form } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Cards.css';
import { StoresForConsumerLIST } from 'Redux/ConsumerRedux/StoreList/storelist';
import axios from 'axios';

const productsUserCardDetailes = ({ onClose }) => {
    // console.log(onClose,"gfsfgsgsfgsg")
    const dispatch = useDispatch()
    const [suc, setSuc] = useState(false);
    const { id, id1 } = useParams();
    console.log(id, id1, "asdadadasd")
    const [companyId, setCompanyId] = useState(id)


    // useEffect(() => {
    //     localStorage.setItem('companyId', (companyId));
    // }, [companyId]);


    const [items, setItems] = useState();
    console.log(items, "itemsitemsitems")
    // useEffect(() => {
    //     const getcompanyId = (localStorage.getItem('companyId'));
    //     setItems(getcompanyId)
    // }, [])


    const [open, setOpen] = React.useState(false);
    const [category, setCategory] = useState("")

    useEffect(() => {
        localStorage.setItem('categoryId', (category));
    }, [category])

    const { categoryForConsumer } = useSelector((state) => state.categoryForConsumerList)
    const { ProductForConsumer, notification } = useSelector((state) => state.ProductForConsumerList)
    console.log(categoryForConsumer, "sdfsdfsdfsdfsd")

    useEffect(() => {
        // dispatch(StoresForConsumerLIST(companyId))
        dispatch(ProductForConsumerListURL(companyId, "", 0, "", "", 10, id1, ""))
    }, [])


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/company/store/slug/${id1}`)
            .then((res) => {
                console.log("dgvhgsdfj", res?.data)
                localStorage.setItem("storeDatiles", JSON.stringify(res.data))
                localStorage.setItem('companyId', res?.data?.company_slug ? res?.data?.company_slug : "");
                dispatch(categoryForConsumerListURL(res.data?.company_uuid, res?.data?.uuid))
            })
            .catch((err) => {
                console.log("Err")
            })
    }, [id1])

    useEffect(() => {
        if (categoryForConsumer) {
            setCategory(categoryForConsumer && categoryForConsumer.data && categoryForConsumer.data[0] && categoryForConsumer.data[0].uuid)
        }
    }, [categoryForConsumer])

    useEffect(() => {
        if (category) {
            //   dispatch(ProductForConsumerListURL(companyId, category, 0, ""))
            dispatch(ProductForConsumerListURL(companyId, "", 0, "", "", 10, id1, ""))

        }
    }, [category])

    const closeFunction = () => {
        onClose()
    }

    return (
        <>
            <div>
                <Form className="mb-5">
                    {categoryForConsumer ? (
                        <div>
                            {categoryForConsumer?.data &&
                                categoryForConsumer?.data?.map((item) => (
                                    <a
                                        key={item?.uuid}
                                        className={`text-alternate mb-2 ${category === item?.uuid ? 'selectedCategory' : ''}`}
                                        href={`#${item?.name}`}
                                        onClick={(event) => {
                                            setCategory(item?.uuid);
                                            closeFunction();
                                        }}
                                        style={{
                                            marginBottom: '15px',
                                            fontWeight: '500',
                                            fontSize: '1rem',
                                            color: category === item?.uuid ? 'red' : 'rgb(72 72 72/1)',
                                            lineHeight: '1.25rem',
                                            fontFamily: 'proxima-nova,sans-serif',
                                        }}
                                    >
                                        <p>{item.name}</p>
                                    </a>

                                ))}
                        </div>
                    ) : null}
                </Form>
            </div>
        </>
    );
};

export default productsUserCardDetailes;
