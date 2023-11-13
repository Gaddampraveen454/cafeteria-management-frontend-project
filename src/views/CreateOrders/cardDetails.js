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
import { CompanyProductionListURL } from 'Redux/AdminRedux/Production/production';

const Cardsdetails = ({ onClose, selectStore ,companyuuid}) => {
  console.log(companyuuid,"gfsfgsgs76567567fgsg")
  const dispatch = useDispatch()
  const [suc, setSuc] = useState(false);
  const { id } = useParams();
  console.log(id, "asdadadasd")
  const [companyId, setCompanyId] = useState(id)

  // const [cmpid,companyId]=id.split("=")

  // console.log(companyId,"companyId")

  // useEffect(() => {
  //   localStorage.setItem('companyId', (companyId));
  // }, [companyId]);

  const { categorylist } = useSelector((state) => state.cotegoryList)

  console.log(categorylist, "bhdfbgdhbjfkhj")


  const [items, setItems] = useState();
  console.log(items, "itemsitemsitems")
  useEffect(() => {
    const getcompanyId = (localStorage.getItem('companyId'));
    setItems(getcompanyId)
  }, [])


  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = useState("")

  useEffect(() => {
    localStorage.setItem('categoryId', (category));
  }, [category])

  const { currentUser } = useSelector((state) => state.auth)
  const { createList } = useSelector((state) => state.cotegoryList)
  //   const { ProductForConsumer, notification } = useSelector((state) => state.ProductForConsumerList)
  console.log(createList, "currentUser")

  useEffect(() => {
    dispatch(CategorycreateList(companyuuid === undefined ? "" :companyuuid))
  }, [])

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
    onClose()
  }

  const Handlechangeproducts = (categoryid) => {

    console.log(categoryid, "sfghfghdfgdfghjd567547hy")

    dispatch(CompanyProductionListURL("", "", currentUser?.token, "", companyuuid === undefined ? "" : companyuuid, categoryid=== undefined ? "" :categoryid, selectStore === undefined ? "" : selectStore));

  }




  return (
    <>
      <div>
        <Form className="mb-5">
          {/* <p className="text-large text-muted mb-2">Menu</p> */}
          {categorylist ?
            <div>
              {categorylist.data?.length > 0 && categorylist && categorylist.data && categorylist.data.map((item) => {
                console.log(item, "itemitemitem6456")
                return <>
                  {/* <a href="#firstcolumn"> */}
                  <label style={{ cursor: "pointer" }} title className="form-check-label  mb-3 d-flex justify-content-left align-items-left"
                    onClick={() => {
                      //  setCategory(item.uuid); 
                      Handlechangeproducts(item.uuid)
                      closeFunction()
                    }}
                  // onClick={closeFunction}
                  >
                    <div>
                      {item.name}
                    </div>
                  </label>
                  {/* </a> */}
                  {/* <br /> */}
                </>
              })}
            </div>

            :
            null
          }

          {/* <Form.Check  label="Happy New Year 2023 Combos" />
        <Form.Check  label="No Added Sugar" />
        <Form.Check  label="100 ml Ice creams" />
        <Form.Check  label="500 ml Ice creams" />
        <Form.Check  label="750 ml Ice creams" />
        <Form.Check  label="Kulfi" /> */}
        </Form>
      </div>
      {/* <Form className="mb-5">
        <p className="text-small text-muted mb-2">CATEGORY</p>
        <Form.Check type="radio" label="Biscuit" id="categoryRadio1" name="categoryRadios" />
        <Form.Check type="radio" label="Bun" id="categoryRadio2" name="categoryRadios" />
        <Form.Check type="radio" label="Cornbread" id="categoryRadio3" name="categoryRadios" />
        <Form.Check type="radio" label="Crispy Bread" id="categoryRadio4" name="categoryRadios" />
        <Form.Check type="radio" label="Flatbread" id="categoryRadio5" name="categoryRadios" />
        <Form.Check type="radio" label="Leavened" id="categoryRadio6" name="categoryRadios" />
        <Form.Check type="radio" label="Sourdough" id="categoryRadio7" name="categoryRadios" />
        <Form.Check type="radio" label="Rye" id="categoryRadio8" name="categoryRadios" />
        <Form.Check type="radio" label="White Wheat" id="categoryRadio9" name="categoryRadios" />
        <Form.Check type="radio" label="Whole Wheat" id="categoryRadio10" name="categoryRadios" />
        <Form.Check type="radio" label="Yeast Bread" id="categoryRadio11" name="categoryRadios" />
      </Form>
      <Form className="mb-5">
        <p className="text-small text-muted mb-2">CONTENTS</p>
        <Form.Check type="checkbox" label="Dairy Free" id="contentsCheckbox1" />
        <Form.Check type="checkbox" label="Gluten Free" id="contentsCheckbox2" />
        <Form.Check type="checkbox" label="Nut Free" id="contentsCheckbox3" />
        <Form.Check type="checkbox" label="Sugar Free" id="contentsCheckbox4" />
        <Form.Check type="checkbox" label="Vegan" id="contentsCheckbox5" />
        <Form.Check type="checkbox" label="Vegetarian" id="contentsCheckbox6" />
      </Form>
      <Form className="mb-5">
        <p className="text-small text-muted mb-2">PRICE</p>
        <Row className="g-1">
          <Col>
            <Form.Control type="text" placeholder="Min" />
          </Col>
          <Col>
            <Form.Control type="text" placeholder="Max" />
          </Col>
          <Col xs="auto">
            <Button variant="outline-primary" className="btn-icon btn-icon-only">
              <CsLineIcons icon="chevron-right" />
            </Button>
          </Col>
        </Row>
      </Form>
      <Form className="mb-5">
        <p className="text-small text-muted mb-2">SEARCH</p>
        <Row className="g-1">
          <Col>
            <Form.Control type="text" placeholder="Keyword" />
          </Col>
          <Col xs="auto">
            <Button variant="outline-primary" className="btn-icon btn-icon-only">
              <CsLineIcons icon="chevron-right" />
            </Button>
          </Col>
        </Row>
      </Form>
      <Form className="mb-5">
        <p className="text-small text-muted mb-2">RATING</p>
        <div className="form-check">
          <input type="radio" className="form-check-input" name="ratings" id="rating1" />
          <label className="form-check-label" htmlFor="rating1">
            <Rating initialRating={5} readonly emptySymbol={<i className="cs-star text-muted" />} fullSymbol={<i className="cs-star-full text-primary" />} />
          </label>
        </div>
        <div className="form-check">
          <input type="radio" className="form-check-input" name="ratings" id="rating2" />
          <label className="form-check-label" htmlFor="rating2">
            <Rating initialRating={4} readonly emptySymbol={<i className="cs-star text-muted" />} fullSymbol={<i className="cs-star-full text-primary" />} />
          </label>
        </div>
        <div className="form-check">
          <input type="radio" className="form-check-input" name="ratings" id="rating3" />
          <label className="form-check-label" htmlFor="rating3">
            <Rating initialRating={3} readonly emptySymbol={<i className="cs-star text-muted" />} fullSymbol={<i className="cs-star-full text-primary" />} />
          </label>
        </div>
        <div className="form-check">
          <input type="radio" className="form-check-input" name="ratings" id="rating4" />
          <label className="form-check-label" htmlFor="rating4">
            <Rating initialRating={2} readonly emptySymbol={<i className="cs-star text-muted" />} fullSymbol={<i className="cs-star-full text-primary" />} />
          </label>
        </div>
        <div className="form-check">
          <input type="radio" className="form-check-input" name="ratings" id="rating5" />
          <label className="form-check-label" htmlFor="rating5">
            <Rating initialRating={1} readonly emptySymbol={<i className="cs-star text-muted" />} fullSymbol={<i className="cs-star-full text-primary" />} />
          </label>
        </div>
      </Form>
      <div className="d-flex flex-row justify-content-between w-100 w-sm-50 w-xl-100">
        <Button variant="outline-primary" className="w-100 me-2">
          Clear
        </Button>
        <Button variant="primary" className="w-100 me-2">
          Filter
        </Button>
      </div> */}
    </>
  );
};

export default Cardsdetails;
