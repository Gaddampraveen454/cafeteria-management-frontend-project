import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import Select from 'react-select';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ProductListURL, ProductAddURL, ProductUpdateURL, ProductBulkUplodURL, ProductStatusUpdateURL, ProductStoreListURL } from 'Redux/AdminRedux/Product/ProductRedux';
import { AdminProductCategoryDropDownListURL } from 'Redux/IcafeAdminRedux/ProductManagement/productmanagementredux';
// import { ActiveCompnyURL } from 'Redux/AdminRedux/Comapny/ActiveCompany';
import { CategoryListURL, CategorycreateList, CategoryAddURL, CategoryUpdateURL, CategoryStatusUpdateURL } from 'Redux/AdminRedux/Cataogy/categoryRedux';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { CompanyProductionListURL } from 'Redux/AdminRedux/Production/production';

const product = () => {
  const dispatch = useDispatch()
  const title = 'Product Management';
  const description = 'Ecommerce Product Management Page';

  const [selectValueState, setSelectValueState] = useState();
  const optionsState = [
    { value: 'Fougasse', label: 'Fougasse' },
    { value: 'Lefse', label: 'Lefse' },
  ];
  const optionsType = [
    { value: 'veg', label: 'veg' },
    { value: 'non-veg', label: 'non-veg' },
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

  const [open, setOpen] = React.useState(false);
  const [openEditViewOpupup, setOpenEditViewOpupup] = React.useState(false);
  const [eventType, setEventType] = useState(false)

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")

  const [stockQuantity, setStockQuantity] = useState("")
  const [cgst, setCgst] = useState("")
  const [sgst, setSgst] = useState("")

  const [descriptionvalue, setDescription] = useState('')

  const [selectType, setSelectType] = useState();
  const [selectCategory, setSelectCategory] = useState('');
  const [selectCompany, setSelectCompany] = useState('');
  const [productId, setProductId] = useState("")
  const [imageUrl, setimageUrl] = useState("")
  const [store, setStore] = useState('');
  const [store1, setStore1] = useState('');
  const [StoreUpload, setStoreUpload] = useState('');

  console.log(selectCompany && selectCompany.value, selectCategory && selectCategory.value, "selectCompanyselectCategory")

  const [suc, setSuc] = useState(false);

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('')

  const [compnayId, setCompnayId] = useState('')
  const [categoryId, setCategoryId] = useState([])
  const [categoryId123, setCategoryId123] = useState([])

  let categoryId1
  if (categoryId?.value === undefined) {
    categoryId1 = '';
  } else {
    categoryId1 = categoryId?.value;
  }

  console.log(compnayId.value, categoryId.value, "dfgdfgdfgdd")

  const [UploadedFile, setUploadedFile] = useState()
  const [image, setImage] = useState(null);


  const allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [selectedItems, setSelectedItems] = useState([]);
  const checkItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((x) => x !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  const toggleCheckAll = (allSelect) => {
    if (allSelect) {
      setSelectedItems(allItems);
    } else {
      setSelectedItems([]);
    }
  };

  //  const {StoreList} = useSelector((state)=>state.)
  const { currentUser } = useSelector((state) => state.auth)
  console.log(currentUser, 'djhfvghdb')
  const { categoryData, categoryDropdown, createList } = useSelector((state) => state.cotegoryList)
  const { companyData } = useSelector((state) => state.companyList)
  const { ActiveCompnayData } = useSelector((state) => state.ActiveCompnayList)

  console.log(createList, "createList")

  const ActivcompanyList = ActiveCompnayData && ActiveCompnayData.data && ActiveCompnayData.data.map((item) => { return { label: item.company_name, value: item.uuid } })

  useEffect(() => {

    // dispatch(ActiveCompnyURL(currentUser.token))
    dispatch(CategoryListURL(page, search, currentUser.token, limit, currentUser?.data?.uuid, store))
    dispatch(AdminProductCategoryDropDownListURL(currentUser?.data?.uuid, store))
  }, [])

  const { StoreList, notification } = useSelector((state) => state.products)
  const { companyProductionData } = useSelector((state) => state.compamyProduction)
  const { categoryList } = useSelector((state) => state.adminproducts)

  console.log(categoryList, 'categoryList')
  useEffect(() => {
    // dispatch(ProductListURL(page, search, currentUser.token, limit, currentUser?.data?.uuid, categoryId1))
    dispatch(CompanyProductionListURL(page, search, currentUser.token, limit, currentUser?.data?.uuid, categoryId, store))
  }, [compnayId, categoryId])
  console.log(companyProductionData, "ProductDatasdfdsfdsf");
  useEffect(() => {
    if (suc === true) {
      if (notification.status === true) {
        toast.success(notification.message, {
          position: "top-right",
        })
        setSuc(false)
        setTimeout(() => {
          // dispatch(ProductListURL(page, search, currentUser.token, limit, currentUser?.data?.uuid, categoryId1))
          dispatch(CompanyProductionListURL(page, search, currentUser.token, limit, currentUser?.data?.uuid, categoryId, store))
          setOpenEditViewOpupup(false)
          setTimeout(() => {
            setImage(null)
          }, 1000)

        }, 1000)

      }
      else if (notification.status === false) {
        toast.error(notification.message)
        setSuc(false)
      }
    }

  }, [notification])
  console.log(notification, "ProductDataProductData")






  useEffect(() => {
    dispatch(ProductStoreListURL(currentUser?.token, currentUser?.data?.uuid))
  }, [])

  useEffect(() => {
    dispatch(CategorycreateList(currentUser?.data?.uuid))
  }, [])



  // // const { currentUser } = useSelector((state) => state.auth)
  // const { categoryData } = useSelector((state) => state.cotegoryList)
  const Catogery = createList && createList.data && createList.data.map((item) => { return { label: item.name, value: item.uuid } })
  const companyList = companyData && companyData.data && companyData.data.map((item) => { return { label: item.company_name, value: item.uuid } })
  const productList = categoryDropdown && categoryDropdown.data && categoryDropdown.data.map((item) => { return { label: item.name, value: item.uuid } })
  // console.log(productList,"categoryDatacategoryData")


  // const { companyData } = useSelector((state) => state.companyList)

  // const companyList= companyData && companyData.data && companyData.data.map((item) =>{return {label:item.company_name, value:item.uuid}})



  const [selectStore, setSelectStore] = useState('');



  // useEffect(() => {
  //   dispatch(ProductStoreListURL(currentUser?.token, currentUser?.data?.uuid))
  // }, [])

  const StoreData = [];

  StoreList?.data?.map((text) => {
    return StoreData.push({ label: text?.store_name, value: text?.uuid })
  }, [])

  const handleEvent = (event) => {
    console.log(event, 'hvdhdf')
    setSelectStore(event)
    dispatch(AdminProductCategoryDropDownListURL(currentUser?.data?.uuid, event?.value))
  }

  const companyStore = [];

  StoreList?.data?.map((text) => {
    return companyStore.push({ label: text?.store_name, value: text?.uuid })

  }, [])

  const CategoryUUid = []

  if (categoryList?.data?.length > 0) {
    categoryList?.data?.map((item) => {
      return CategoryUUid?.push({ label: item?.name, value: item?.uuid })
    })
  }

  const handleChangeCategory = (text) => {
    setCategoryId(text?.value)
    setCategoryId123(text)
    dispatch(CompanyProductionListURL(page, search, currentUser.token, limit, currentUser?.data?.uuid, text?.value, store))
  }


  const handleStore = (text) => {
    console.log(text, 'hbvhjdahbhjfv')
    setStore(text?.value)
    setStore1(text)
    setCategoryId123('')
    dispatch(CompanyProductionListURL(page, search, currentUser.token, limit, currentUser?.data?.uuid, categoryId, text?.value))
    dispatch(AdminProductCategoryDropDownListURL(currentUser?.data?.uuid, text?.value))
  }


  const uploadStore = [];

  StoreList?.data?.map((text) => {
    return uploadStore.push({ label: text?.store_name, value: text?.uuid })

  }, [])

  const uploadHandle = (text) => {
    console.log(text, 'sdghvghsdv')
    setStoreUpload(text?.value)
  }





  const eventHandler = (event) => {
    setOpenEditViewOpupup(true)

    console.log(event, "sdfssdfsdfsf")
    setName(event.name)
    setSelectCompany({ label: event.company_name, value: event.company_uuid })
    setSelectCategory({ label: event.category_name, value: event.category_uuid })
    setSelectType({ label: event.type, value: event.type })
    setSelectStore({ label: event?.store_name, value: event?.store_uuid })
    setPrice(event.price)
    setQuantity(event.quantity)
    setProductId(event.uuid)
    setimageUrl(event.image_url)
    setStockQuantity(event.stock_quantity)
    setSgst(event.sgst_tax)
    setCgst(event.cgst_tax)
    setDescription(event?.description)

  };


  const updateProduct = (event) => {
    event.preventDefault()
    if (UploadedFile) {
      const payload = {
        "name": name,
        "type": selectType.value,
        "category_uuid": selectCategory.value,
        "price": price,
        "quantity": quantity,
        "company_uuid": currentUser?.data?.uuid,
        "image": UploadedFile,
        "stock_quantity": stockQuantity,
        "cgst_tax": cgst,
        "sgst_tax": sgst,
        "store_uuid": selectStore?.value,
        "description": descriptionvalue
      }


      dispatch(ProductUpdateURL(productId, payload, currentUser.token))

      // dispatch(CompanyListURL(currentUser.token))
      setSuc(true)

    } else {
      const payload = {
        "name": name,
        "type": selectType.value,
        "category_uuid": selectCategory.value,
        "price": price,
        "quantity": quantity,
        "company_uuid": currentUser?.data?.uuid,
        "stock_quantity": stockQuantity,
        "cgst_tax": cgst,
        "sgst_tax": sgst,
        "store_uuid": selectStore?.value,
        "description": descriptionvalue
      }


      dispatch(ProductUpdateURL(productId, payload, currentUser.token))
      // dispatch(CompanyListURL(currentUser.token))
      setSuc(true)


    }



  }





  const [file, setFile] = useState()
  console.log(file, "dfsfsdfsffsfs");
  function handleChange(event) {
    setFile(event.target.files[0])
  }

  function handleSubmit(event) {
    if (!file) {
      console.log("zxczxczxcz")
      toast.error("Please Select File")
    }
    else {


      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      formData.append('company_uuid', currentUser?.data?.uuid)
      formData.append('store_uuid', StoreUpload);
      dispatch(ProductBulkUplodURL(formData, currentUser?.token))
      setSuc(true)
    }
  }




  const searchfunction = (type, pages) => {
    if (type === "search") {
      console.log(pages, "ghjkvbnm")
      setSearch(pages)
      setPage(0)
      // dispatch(ProductListURL(0, pages, currentUser.token, limit, currentUser?.data?.uuid, categoryId1))
      dispatch(CompanyProductionListURL(page, pages, currentUser.token, limit, currentUser?.data?.uuid, categoryId, store))
    }
    if (type === "prev") {
      setPage(page - 1)
      // dispatch(ProductListURL(page - 1, search, currentUser.token, limit, currentUser?.data?.uuid, categoryId1))
      dispatch(CompanyProductionListURL(page - 1, search, currentUser.token, limit, currentUser?.data?.uuid, categoryId, store))
    }
    else if (type === "next") {
      setPage(page + 1)
      // dispatch(ProductListURL(page + 1, search, currentUser.token, limit, currentUser?.data?.uuid, categoryId1))
      dispatch(CompanyProductionListURL(page + 1, search, currentUser.token, limit, currentUser?.data?.uuid, categoryId, store))
    }
    else if (type === "page") {
      setPage(page)
      // dispatch(ProductListURL(page, search, currentUser.token, limit, currentUser?.data?.uuid, categoryId1))
      dispatch(CompanyProductionListURL(page, search, currentUser.token, limit, currentUser?.data?.uuid, categoryId, store))
    }
    else if (type === "page+1") {
      setPage(page + 1)
      // dispatch(ProductListURL(page + 1, search, currentUser.token, limit, currentUser?.data?.uuid, categoryId1))
      dispatch(CompanyProductionListURL(page + 1, search, currentUser.token, limit, currentUser?.data?.uuid, categoryId, store))
    }
    else if (type === "page+2") {
      setPage(page + 2)
      // dispatch(ProductListURL(page + 2, search, currentUser.token, limit, currentUser?.data?.uuid ,categoryId1))
      dispatch(CompanyProductionListURL(page + 2, search, currentUser.token, limit, currentUser?.data?.uuid, categoryId, store))
    }
    else if (type === "limit") {
      setLimit(pages)
      setPage(0)
      // dispatch(ProductListURL(0, search, currentUser.token, pages, currentUser?.data?.uuid, categoryId1))
      dispatch(CompanyProductionListURL(page, search, currentUser.token, pages, currentUser?.data?.uuid, categoryId, store))
    }
  }


  const HandleProductStatus = (event) => {
    console.log(event, "eventxcvvxcvv")
    // if (event.is_delivered)
    const payload = {
      "uuid": event.uuid,
      "status": !event.is_active
    }
    dispatch(ProductStatusUpdateURL(payload, currentUser.token))
    setSuc(true)

  };










  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };


  const handleUpdateImage = () => {

    const formData = new FormData();
    formData.append('image', image);
    axios.post(`${process.env.REACT_APP_URL}/product/upload/image`, formData,
      {
        headers: {
          "x-access-token": `${currentUser.token}`,
        }
      })
      .then(res => {
        console.log(res.data.image, "resp00");
        setUploadedFile(res.data.image.filename)

      })
      .catch(err => {
        console.log(err, "err00")

      });
  }

  useEffect(() => {
    if (image !== null) {
      handleUpdateImage()
    }

  }, [image])



  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          Hello India
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent style={{ width: "550px", height: "230px" }}>
          <DialogActions style={{ cursor: "pointer" }} onClick={() => setOpen(false)} >
            <CsLineIcons icon="close" />
          </DialogActions>
          <DialogContentText >
            <Form.Label>Select Store</Form.Label>
            {/* <Select classNamePrefix="react-select" options={optionsState} value={selectValueState} onChange={setSelectValueState} placeholder="" /> */}
            <Select classNamePrefix="react-select" options={uploadStore} onChange={uploadHandle} placeholder="" />
          </DialogContentText><br />

          <DialogContentText >
            <input type="file" onChange={handleChange} className="form-control" />
          </DialogContentText>


        </DialogContent>
        <DialogActions>
          {/* <Button onClick={() => setOpen(false)}>Disagree</Button>
          <Button  onClick={() => handleSubmit()}   autoFocus>
            submit
          </Button> */}
          <Row
            className="g-3"
            style={{ width: "100%" }}
          >
            <Col lg="6">

              <p><a href="https://cmsapi.scienstechnologies.com/api/v1/product/download/productdata/excel/format">Download Sample File <CsLineIcons icon="download" /> </a> </p>
            </Col>
            <Col lg="6" align="right">
              {/* <Button onClick={() => setOpen(false)}>Disagree</Button> */}
              <Button onClick={() => handleSubmit()} autoFocus>
                submit
              </Button>
            </Col>
          </Row>
        </DialogActions>
      </Dialog>
      <HtmlHead title={title} description={description} />
      <div className="page-title-container">
        <Row className="g-0">
          {/* Title Start */}
          <Col className="col-auto mb-3 mb-sm-0 me-auto">
            <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back mb-2" to="/">
              <CsLineIcons icon="chevron-left" size="20" />
              <span className="align-middle text-medium ms-1">Home</span>
            </NavLink>
            <h1 className="mb-0 pb-0 display-4" id="title">
              {title}
            </h1>
          </Col>
          {/* Title End */}

          {/* Top Buttons Start */}
          <Col xs="12" sm="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
            <Button variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto" onClick={() => setOpen(true)}>
              <CsLineIcons icon="plus" /> <span>Upload Product</span>
            </Button>
            <NavLink to="/addproduct">
              <Button variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto">
                <CsLineIcons icon="plus" /> <span>Add Product</span>
              </Button>
            </NavLink>
            <Button variant="outline-primary" className="btn-icon btn-icon-only ms-1 d-inline-block d-lg-none">
              <CsLineIcons icon="sort" />
            </Button>
            {/* <div className="btn-group ms-1 check-all-container">
              <CheckAll
                allItems={allItems}
                selectedItems={selectedItems}
                onToggle={toggleCheckAll}
                inputClassName="form-check"
                className="btn btn-outline-primary btn-custom-control py-0"
              />
              <Dropdown align="end">
                <Dropdown.Toggle className="dropdown-toggle dropdown-toggle-split" variant="outline-primary" />
                <Dropdown.Menu>
                  <Dropdown.Item>Move</Dropdown.Item>
                  <Dropdown.Item>Archive</Dropdown.Item>
                  <Dropdown.Item>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div> */}
          </Col>
          {/* Top Buttons End */}
        </Row>
      </div>

      <Row className="mb-3">
        <Col md="3" lg="3" xxl="2" className="mb-1">
          {/* Search Start */}
          {/* <Form.Label/> */}
          <div className="d-inline-block float-md-start me-1 mb-1 search-input-container w-100 shadow bg-foreground">

            <Form.Control type="text" onChange={(event) => searchfunction("search", event.target.value)} placeholder="Search" />
            <span className="search-magnifier-icon">
              <CsLineIcons icon="search" />
            </span>
            <span className="search-delete-icon d-none">
              <CsLineIcons icon="close" />
            </span>
          </div>
          {/* Search End */}
        </Col>

        <Col md="3" lg="3">
          {/* <Form.Label>Company</Form.Label> */}
          <Select classNamePrefix="react-select"
            options={companyStore}
            value={store1}
            onChange={handleStore}
            placeholder="Select Store"
          // disabled={eventType}
          />
        </Col>
        <Col md="3" lg="3">
          {/* <Form.Label>Category</Form.Label> */}
          <Select classNamePrefix="react-select"
            options={CategoryUUid}
            value={categoryId123}
            onChange={handleChangeCategory}
            placeholder="Select Category"
          // disabled={eventType}
          />
        </Col>
        <Col md="3" lg="3" className="mb-1 text-end">


          <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1">
            <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Item Count</Tooltip>}>
              <Dropdown.Toggle variant="foreground-alternate" className="shadow sw-13">
                {limit} Items
              </Dropdown.Toggle>
            </OverlayTrigger>
            <Dropdown.Menu className="shadow dropdown-menu-end">
              <Dropdown.Item onClick={() => searchfunction("limit", 5)}>5 Items</Dropdown.Item>
              <Dropdown.Item onClick={() => searchfunction("limit", 10)}>10 Items</Dropdown.Item>
              <Dropdown.Item onClick={() => searchfunction("limit", 20)}>20 Items</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </Col>
      </Row>

      {/* List Header Start */}
      <Row className="g-0 mb-2 d-none d-lg-flex">
        {/* <Col xs="auto" className="sw-11 d-none d-lg-flex" /> */}
        <Col>
          <Row className="g-0 h-100 align-content-center custom-sort ps-5 pe-4 h-100">
            <Col xs="2" lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">Name</div>
            </Col>
            <Col xs="2" lg="1" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Category</div>
            </Col>
            <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Store</div>
            </Col>
            <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Veg/Non Veg</div>
            </Col>
            <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">stock quantity</div>
            </Col>
            <Col xs="2" lg="1" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Price</div>
            </Col>
            <Col xs="2" lg="1" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Quantity</div>
            </Col>
            <Col xs="2" lg="1" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer " />
            </Col>
            <Col xs="2" lg="1" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Action</div>
            </Col>

          </Row>
        </Col>
      </Row>
      {/* List Header End */}

      {/* List Items Start */}
      {companyProductionData?.data?.length > 0 && companyProductionData && companyProductionData?.data && companyProductionData?.data?.map((item, index) => {
        // {ProductData && ProductData.data && ProductData.data.map((item, index) => {
        console.log(item, "hgdsfgsjhasj")
        return <div key="">
          <Card className={`mb-2 ${selectedItems.includes(1) && 'selected'}`}>
            <Row className="g-0 h-100 sh-lg-9 position-relative">

              <Col className="py-4 py-lg-0 ps-5 pe-4 h-100">
                <Row className="g-0 h-100 ">

                  <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item.name}</div>
                  </Col>
                  <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item.category_name}</div>
                  </Col>
                  <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item.store_name}</div>
                  </Col>

                  <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item.type}</div>
                  </Col>
                  <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item.stock_quantity}</div>
                  </Col>
                  <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item.price}</div>
                  </Col>
                  <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">{item.quantity}</div>
                  </Col>
                  <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">
                      <div className="mb-n1">
                        {/* <Form.Check type="switch" id="quantitySwitch1" label="Allow out of stock purchase" /> */}
                        <Form.Check
                          type="switch"
                          checked={item.is_active}
                          onClick={() => { HandleProductStatus(item) }}

                        />
                        {/* <Form.Check type="switch" id="quantitySwitch3" label="Display quantity at storefront" /> */}
                      </div>
                    </div>
                  </Col>
                  <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                    <div className="lh-1 text-alternate">
                      <div className="lh-1 text-alternate">
                        <table>
                          <tr>

                            <td>
                              <Button title="VIEW" variant="outline-primary" className="btn px-2 py-2"
                                onClick={() => { eventHandler(item); setEventType(true) }}
                              >
                                <CsLineIcons icon="eye" />
                              </Button>
                            </td>
                            <td>
                              <Button title="EDIT" variant="outline-success" className="btn px-2 py-2"
                                onClick={() => { eventHandler(item); setEventType(false) }}
                              >
                                <CsLineIcons icon="edit-square" />
                              </Button>
                            </td>

                          </tr>
                        </table>
                      </div>
                    </div>
                  </Col>

                </Row>
              </Col>
            </Row>
          </Card>
        </div>
      })}

      {/* List Items End */}

      {/* Pagination Start */}
      {/* <div className="d-flex justify-content-center mt-5">
        <Pagination>
          <Pagination.Prev className="shadow" disabled>
            <CsLineIcons icon="chevron-left" />
          </Pagination.Prev>
          <Pagination.Item className="shadow" active>
            1
          </Pagination.Item>
          <Pagination.Item className="shadow">2</Pagination.Item>
          <Pagination.Item className="shadow">3</Pagination.Item>
          <Pagination.Next className="shadow">
            <CsLineIcons icon="chevron-right" />
          </Pagination.Next>
        </Pagination>
      </div> */}
      <div className="d-flex justify-content-center mt-5">
        <Pagination>
          <Pagination.Prev className="shadow" disabled={page === 0} onClick={() => searchfunction("prev")}>
            <CsLineIcons icon="chevron-left" />
          </Pagination.Prev>
          <Pagination.Item className="shadow" active onClick={() => searchfunction("page")} >
            {page + 1}
          </Pagination.Item>
          <Pagination.Item className="shadow" disabled={Math.ceil(companyProductionData && companyProductionData.count / limit) <= page + 1} onClick={() => searchfunction("page+1", page + 1)}>{page + 2}</Pagination.Item>
          <Pagination.Item className="shadow" disabled={Math.ceil(companyProductionData && companyProductionData.count / limit) <= page + 2} onClick={() => searchfunction("page+2", page + 2)}>{page + 3}</Pagination.Item>

          {Math.ceil(companyProductionData && companyProductionData.count / limit) > page + 3 &&
            <>
              <Pagination.Item className="shadow" >...</Pagination.Item>
            </>

          }
          <Pagination.Next className="shadow" disabled={Math.ceil(companyProductionData && companyProductionData.count / limit) <= page + 1} onClick={() => searchfunction("next")}>
            <CsLineIcons icon="chevron-right" />
          </Pagination.Next>
        </Pagination>
      </div>
      {/* Pagination End */}


      {/* View And Edit Popup Start */}
      <div>
        <Dialog
          open={openEditViewOpupup}
          onClose={() => setOpenEditViewOpupup(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* <DialogTitle id="alert-dialog-title">
          Hello India
          {"Use Google's location service?"}
        </DialogTitle> */}
          <DialogContent style={{ width: "500px", height: "auto" }}>
            <Form
              onSubmit={updateProduct}
            >
              <Row className="g-3">
                <Col lg="6">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text"
                    onChange={(e) => { setName(e.target.value) }}
                    value={name}
                    disabled={eventType}
                  />
                </Col>
                {/* <Col lg="6">
                  <Form.Label>Company</Form.Label>
                  <Select classNamePrefix="react-select"
                    options={companyList}
                    value={selectCompany}
                    onChange={setSelectCompany}
                    placeholder=""
                    disabled={eventType}
                  />
                </Col> */}
                <Col lg="6">
                  <Form.Label>Store</Form.Label>
                  <Select classNamePrefix="react-select"
                    options={StoreData}
                    value={selectStore}
                    onChange={handleEvent}
                    placeholder=""
                    disabled={eventType}
                  />
                </Col>
                <Col lg="6">
                  <Form.Label>Category</Form.Label>
                  <Select classNamePrefix="react-select"
                    options={CategoryUUid}
                    value={selectCategory}
                    onChange={setSelectCategory}
                    placeholder=""
                    disabled={eventType}
                  />
                </Col>
                <Col lg="6">
                  <Form.Label>Veg/Non Veg</Form.Label>

                  <Select classNamePrefix="react-select"
                    options={optionsType}
                    value={selectType}
                    onChange={setSelectType}
                    placeholder=""
                    disabled={eventType}
                  />
                </Col>
                <Col lg="6">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="text"
                    onChange={(e) => { setPrice(e.target.value) }}
                    disabled={eventType}
                    value={price}
                  />
                </Col>
                <Col lg="6">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type="text" rows={1}
                    onChange={(e) => { setQuantity(e.target.value) }}
                    value={quantity}

                    disabled={eventType}
                  />
                </Col>
                <Col lg="6">
                  <Form.Label>Stock Quantity</Form.Label>
                  <Form.Control type="text"
                    rows={1}
                    value={stockQuantity}
                    onChange={(e) => { setStockQuantity(e.target.value) }}
                    disabled={eventType}
                  />
                </Col>
                <Col lg="6">
                  <Form.Label>CGST(%)</Form.Label>
                  <Form.Control type="text"
                    rows={1}
                    value={cgst}
                    onChange={(e) => { setCgst(e.target.value) }}
                    disabled={eventType}
                  />
                </Col>
                <Col lg="6">
                  <Form.Label>SGST(%)</Form.Label>
                  <Form.Control type="text"
                    rows={1} value={sgst}
                    onChange={(e) => { setSgst(e.target.value) }}
                    disabled={eventType}
                  />
                </Col>
                <Col lg="6">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text"
                    rows={1} value={descriptionvalue}
                    onChange={(e) => { setDescription(e.target.value) }}
                    disabled={eventType}
                  />
                </Col>




                <Col lg="12">
                  {image ? null

                    :
                    <img src={imageUrl} alt="product image" crossOrigin="anonymous" style={{ width: "200px", height: "200px" }} />
                  }

                </Col>
                {/* <Col lg="12">
                    <Col lg="3">
                    <Button variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto" type="submit">
                    <CsLineIcons /> <span>Submit</span>
                    </Button>
                    </Col>
                  </Col> */}


                {eventType ?
                  null
                  :
                  <Col lg="12">
                    <div>
                      {image && (
                        <div >
                          <img src={URL.createObjectURL(image)} alt="Preview" style={{ width: "200px", height: "200px" }} />
                        </div>
                      )}
                      {/* <input type="file" onChange={handleImageChange} /> */}
                      <Form.Control type="file" onChange={handleImageChange} />

                    </div>
                  </Col>


                }






                <Col lg="6">
                  <Col lg="3">
                    {eventType ?
                      null
                      :
                      <Button variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto" type="submit">Submit</Button>
                    }
                  </Col>

                </Col>





                <Col lg="6" align="right">
                  {/* <Col lg="3"> */}
                  <Button onClick={() => setOpenEditViewOpupup(false)} autoFocus>
                    Cancel
                  </Button>
                  {/* </Col> */}

                </Col>

              </Row>
            </Form>

          </DialogContent>

        </Dialog>
      </div>
      {/* View And Edit Popup end */}
    </>
  );
};

export default product;
