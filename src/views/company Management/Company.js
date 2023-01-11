import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import { categoryListURL, catgoryUpdateURL, categoryAddURL } from 'Redux/AdminRedux/Comapny/Company';

const Company = () => {
  const title = 'Company Management';
  const description = 'Ecommerce Company Management Page';

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

  const dispatch = useDispatch()

  const { currentUser } = useSelector((state) => state.auth)
  const { companyData} = useSelector((state) => state.companyList)




  useEffect(() => {
    dispatch(categoryListURL(currentUser.token))
}, [])


  console.log(companyData,"currentUsersdffscurrentUser")




  const eventHandler = (event) => {
    console.log(event, "event")
    // setData(event)
    // setOpen(true);
};
  return (
    <>
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
            <NavLink to="/addcompany">
            <Button variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto">
            <CsLineIcons icon="plus" /> <span>Add Company</span>
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
        <Col md="5" lg="3" xxl="2" className="mb-1">
          {/* Search Start */}
          <div className="d-inline-block float-md-start me-1 mb-1 search-input-container w-100 shadow bg-foreground">
            <Form.Control type="text" placeholder="Search" />
            <span className="search-magnifier-icon">
              <CsLineIcons icon="search" />
            </span>
            <span className="search-delete-icon d-none">
              <CsLineIcons icon="close" />
            </span>
          </div>
          {/* Search End */}
        </Col>
        <Col md="7" lg="9" xxl="10" className="mb-1 text-end">
          {/* Print Button Start */}
          {/* <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Print</Tooltip>}>
            <Button variant="foreground-alternate" className="btn-icon btn-icon-only shadow">
              <CsLineIcons icon="print" />
            </Button>
          </OverlayTrigger> */}
          {/* Print Button End */}

          {/* Export Dropdown Start */}
          {/* <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1">
            <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Export</Tooltip>}>
              <Dropdown.Toggle variant="foreground-alternate" className="dropdown-toggle-no-arrow btn btn-icon btn-icon-only shadow">
                <CsLineIcons icon="download" />
              </Dropdown.Toggle>
            </OverlayTrigger>
            <Dropdown.Menu className="shadow dropdown-menu-end">
              <Dropdown.Item href="#">Copy</Dropdown.Item>
              <Dropdown.Item href="#">Excel</Dropdown.Item>
              <Dropdown.Item href="#">Cvs</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
          {/* Export Dropdown End */}

          {/* Length Start */}
          <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1">
            <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Item Count</Tooltip>}>
              <Dropdown.Toggle variant="foreground-alternate" className="shadow sw-13">
                10 Items
              </Dropdown.Toggle>
            </OverlayTrigger>
            <Dropdown.Menu className="shadow dropdown-menu-end">
              <Dropdown.Item href="#">5 Items</Dropdown.Item>
              <Dropdown.Item href="#">10 Items</Dropdown.Item>
              <Dropdown.Item href="#">20 Items</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* Length End */}
        </Col>
      </Row>

      {/* List Header Start */}
      <Row className="g-0 mb-2 d-none d-lg-flex">
        {/* <Col xs="auto" className="sw-11 d-none d-lg-flex" /> */}
        <Col>
          <Row className="g-0 h-100 align-content-center custom-sort ps-5 pe-4 h-100">
            <Col xs="2" lg="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-medium cursor-pointer sort">Company Name</div>
            </Col>
            <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Location</div>
            </Col>
            {/* <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Address</div>
            </Col> */}
            <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Contact No</div>
            </Col>
            <Col xs="2" lg="2" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Email</div>
            </Col>
            <Col xs="2" lg="1" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Wallet Amount</div>
            </Col>
            <Col xs="2" lg="1" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer" />
            </Col>
            <Col xs="2" lg="1" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-medium cursor-pointer sort">Active</div>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* List Header End */}

      {/* List Items Start */}



      {companyData && companyData.data &&  companyData.data.map((item, index) => {
                return <div key="">
                <Card className={`mb-2 ${selectedItems.includes(1) && 'selected'}`}>
        <Row className="g-0 h-100 sh-lg-9 position-relative">
          {/* <Col xs="auto" className="positio-relative">
            <NavLink to="/products/detail">
              <img src="/img/product/small/product-1.webp" alt="product" className="card-img card-img-horizontal sw-11 h-100" />
            </NavLink>
          </Col> */}
          <Col className="py-4 py-lg-0 ps-5 pe-4 h-100">
            <Row className="g-0 h-100 ">
              {/* <Col xs="11" lg="3" className="d-flex flex-column mb-lg-0 mb-3 pe-3 d-flex order-1 h-lg-100 justify-content-center">
                <NavLink to="/products/detail">
                  Anpan
                  <div className="text-small text-muted text-truncate">#2342</div>
                </NavLink>
              </Col> */}
              <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">{item.company_name}</div>
              </Col>
              <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">{item.location}</div>
              </Col>
              {/* <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">{item.address}</div>
              </Col> */}
              <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">{item.mobile}</div>
              </Col>
              <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">{item.email}</div>
              </Col>
              <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4">
                <div className="lh-1 text-alternate">₹ {item.wallet_amount}</div>
              </Col>
              <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4">
                <div className="lh-1 text-alternate">
                <div className="mb-n1">
                  {/* <Form.Check type="switch" id="quantitySwitch1" label="Allow out of stock purchase" /> */}
                  <Form.Check type="switch" id="quantitySwitch2"  defaultChecked />
                  {/* <Form.Check type="switch" id="quantitySwitch3" label="Display quantity at storefront" /> */}
                </div>
                </div>
              </Col>
              <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4">
              <div className="lh-1 text-alternate">
              <table>
                <tr>
                {/* <ToggleButton
                value={ items.is_active }
                onToggle={()=>activefunct(items)}
                 /> */}
                  <td>
                  <Button title="VIEW" variant="outline-primary" className="btn px-2 py-2" onClick={() => eventHandler(item)}> 
                  <CsLineIcons icon="eye" />                  
                 </Button>
                  </td>
                  <td>
                  <Button title="EDIT" variant="outline-success"  className="btn px-2 py-2">
                 <CsLineIcons icon="edit-square" />
                 </Button>
                  </td>
                  {/* <td>
                  <Button title="ACTIVATE" variant="outline-info"  className="btn px-2 py-2">
                 <CsLineIcons icon="check" />
                 </Button>
                  </td>
                  <td>
                  <Button title="DEACTIVATE" variant="outline-danger"  className="btn px-2 py-2">
                 <CsLineIcons icon="close" />
                 </Button>
                  </td> */}
                  {/* <td>
                  <Button title="DELETE" variant="outline-danger" className="btn px-2 py-2">
                 <CsLineIcons icon="bin" />
                 </Button>
                  </td> */}
                </tr>
              </table>
              </div>
            </Col>
              {/* <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 align-items-start justify-content-center order-5">
                <Badge bg="outline-primary">SALE</Badge>
              </Col> */}
              {/* <Col xs="1" className="d-flex flex-column mb-2 mb-lg-0 align-items-end order-2 order-lg-last justify-content-lg-center">
                <Form.Check className="form-check mt-2 ps-7 ps-md-2" type="checkbox" checked={selectedItems.includes(1)} onChange={() => checkItem(1)} />
              </Col> */}
            </Row>
          </Col>
        </Row>
      </Card>
                </div>
            })}



      {/* <Card className={`mb-2 ${selectedItems.includes(1) && 'selected'}`}>
        <Row className="g-0 h-100 sh-lg-9 position-relative">
          <Col xs="auto" className="positio-relative">
            <NavLink to="/products/detail">
              <img src="/img/product/small/product-1.webp" alt="product" className="card-img card-img-horizontal sw-11 h-100" />
            </NavLink>
          </Col>
          <Col className="py-4 py-lg-0 ps-5 pe-4 h-100">
            <Row className="g-0 h-100 ">
              <Col xs="11" lg="3" className="d-flex flex-column mb-lg-0 mb-3 pe-3 d-flex order-1 h-lg-100 justify-content-center">
                <NavLink to="/products/detail">
                  Anpan
                  <div className="text-small text-muted text-truncate">#2342</div>
                </NavLink>
              </Col>
              <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">ABCD</div>
              </Col>
              <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">Yousufguda</div>
              </Col>
              <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">Ayyappa Society</div>
              </Col>
              <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">9897654323</div>
              </Col>
              <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                <div className="lh-1 text-alternate">sciens2023@gmail.com</div>
              </Col>
              <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4">
                <div className="lh-1 text-alternate">₹ 250</div>
              </Col>
              <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4">
                <div className="lh-1 text-alternate">
                <div className="mb-n1">
                  <Form.Check type="switch" id="quantitySwitch1" label="Allow out of stock purchase" />
                  <Form.Check type="switch" id="quantitySwitch2"  defaultChecked />
                  <Form.Check type="switch" id="quantitySwitch3" label="Display quantity at storefront" />
                </div>
                </div>
              </Col>
              <Col lg="1" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4">
              <div className="lh-1 text-alternate">
              <table>
                <tr>
                <ToggleButton
                value={ items.is_active }
                onToggle={()=>activefunct(items)}
                 />
                  <td>
                  <Button title="VIEW" variant="outline-primary" className="btn px-2 py-2">
                  <CsLineIcons icon="eye" />                  
                 </Button>
                  </td>
                  <td>
                  <Button title="EDIT" variant="outline-success"  className="btn px-2 py-2">
                 <CsLineIcons icon="edit-square" />
                 </Button>
                  </td>
                  <td>
                  <Button title="ACTIVATE" variant="outline-info"  className="btn px-2 py-2">
                 <CsLineIcons icon="check" />
                 </Button>
                  </td>
                  <td>
                  <Button title="DEACTIVATE" variant="outline-danger"  className="btn px-2 py-2">
                 <CsLineIcons icon="close" />
                 </Button>
                  </td>
                  <td>
                  <Button title="DELETE" variant="outline-danger" className="btn px-2 py-2">
                 <CsLineIcons icon="bin" />
                 </Button>
                  </td>
                </tr>
              </table>
              </div>
            </Col>
              <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 align-items-start justify-content-center order-5">
                <Badge bg="outline-primary">SALE</Badge>
              </Col>
              <Col xs="1" className="d-flex flex-column mb-2 mb-lg-0 align-items-end order-2 order-lg-last justify-content-lg-center">
                <Form.Check className="form-check mt-2 ps-7 ps-md-2" type="checkbox" checked={selectedItems.includes(1)} onChange={() => checkItem(1)} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card> */}
  
      {/* List Items End */}

      {/* Pagination Start */}
      <div className="d-flex justify-content-center mt-5">
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
      </div>
      {/* Pagination End */}
    </>
  );
};

export default Company;
