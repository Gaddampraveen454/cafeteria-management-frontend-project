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
import { CategorycreateList } from 'Redux/AdminRedux/Cataogy/categoryRedux';
import { CompanyProductionListURL, CompanyProductsList } from 'Redux/AdminRedux/Production/production';

const Cardsdetails = ({ handleClose, onClose, selectStore, companyuuid }) => {
  console.log(selectStore, 'gfsfgsgs76567567fgsg');
  const dispatch = useDispatch();
  const [suc, setSuc] = useState(false);
  const { id } = useParams();
  console.log(id, 'asdadadasd');
  const [companyId, setCompanyId] = useState(id);

  // const [cmpid,companyId]=id.split("=")

  // console.log(companyId,"companyId")

  // useEffect(() => {
  //   localStorage.setItem('companyId', (companyId));
  // }, [companyId]);

  const { categorylist } = useSelector((state) => state.cotegoryList);

  console.log(categorylist, 'bhdfbgdhbjfkhj');

  const [items, setItems] = useState();
  console.log(items, 'itemsitemsitems');
  useEffect(() => {
    const getcompanyId = localStorage.getItem('companyId');
    setItems(getcompanyId);
  }, []);

  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = useState('');
  const [categoryuuid, setCategoryuuid] = useState('');
  console.log(categoryuuid, 'ghdsjhgch');
  useEffect(() => {
    localStorage.setItem('categoryId', category);
  }, [category]);

  const { currentUser } = useSelector((state) => state.auth);
  const { createList } = useSelector((state) => state.cotegoryList);
  //   const { ProductForConsumer, notification } = useSelector((state) => state.ProductForConsumerList)
  console.log(currentUser, 'currentUser');

  useEffect(() => {
    dispatch(CategorycreateList(currentUser?.data?.uuid));
  }, []);
  const [selectedCategory, setSelectedCategory] = useState(null);
  // useEffect(() => {
  //   if (categoryForConsumer) {
  //       setCategory(categoryForConsumer && categoryForConsumer.data && categoryForConsumer.data[0] && categoryForConsumer.data[0].uuid)
  //   }
  // }, [categoryForConsumer])

  //   useEffect(()=>{
  //     dispatch(categoryForConsumerListURL(currentUser.data.company_uuid))

  //     // currentUser.data.company_uuid
  //     // setCategory(categoryForConsumer && categoryForConsumer.data[0] && categoryForConsumer.data[0].uuid)
  //   },[])

  //   useEffect(()=>{
  // if(categoryForConsumer){
  //   setCategory(categoryForConsumer && categoryForConsumer.data && categoryForConsumer.data[0] && categoryForConsumer.data[0].uuid)
  // }
  //   },[categoryForConsumer])

  //   useEffect(() => {
  //     // if (category===!""){
  //       if(category){
  //         dispatch(ProductForConsumerListURL(currentUser.data.company_uuid,category,0,""))

  //       }

  //   }, [category])

  const closeFunction = () => {
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  // useEffect(() => {
  //   if (categorylist) {
  //     setCategoryuuid(categorylist && categorylist.data && categorylist.data[0] && categorylist.data[0].uuid)
  //   }
  // }, [categorylist])

  useEffect(() => {
    // dispatch(CompanyProductionListURL("", "", currentUser?.token, "", currentUser?.data?.uuid, categoryuuid || "CAT-423624E7", selectStore === undefined ? "" : selectStore));
    dispatch(CompanyProductsList(currentUser?.token, currentUser?.data?.uuid, selectStore === undefined ? '' : selectStore, '', ''));
  }, []);

  const Handlechangeproducts = (categoryid) => {
    setCategoryuuid(categoryid);
    console.log(categoryid, 'sfghfghdfgdfghjd567547hy');

    // dispatch(CompanyProductionListURL("", "", currentUser?.token, "", companyuuid === undefined ? "" : companyuuid, categoryid === undefined ? "" : categoryid, selectStore === undefined ? "" : selectStore));
  };

  useEffect(() => {
    if (categorylist) {
      setSelectedCategory(categorylist && categorylist.data && categorylist.data[0] && categorylist.data[0].uuid);
    }
  }, [categorylist]);

  return (
    <>
      <div>
        <Form className="mb-5">
          {categorylist ? (
            <div>
              {categorylist?.data?.length > 0 &&
                categorylist?.data?.map((item) => {
                  return (
                    <a
                      key={item?.uuid}
                      className={`text-alternate mb-2 ${selectedCategory === item?.uuid ? 'selected-category' : ''}`}
                      href={`#${item?.name}`}
                      onClick={() => {
                        Handlechangeproducts(item?.uuid);
                        setSelectedCategory(item?.uuid);
                        console.log(item?.uuid, 'vcghefvhgevfghr');
                        closeFunction();
                      }}
                      style={{
                        marginBottom: '15px',
                        fontWeight: '500',
                        fontSize: '1rem',
                        color: selectedCategory === item?.uuid ? '#772804' : '',
                        lineHeight: '0.8rem',
                        fontFamily: 'proxima-nova, sans-serif',
                      }}
                    >
                      <p onClick={handleClose}>{item?.name}</p>
                    </a>
                  );
                })}
            </div>
          ) : null}
        </Form>
      </div>
    </>
  );
};

export default Cardsdetails;
