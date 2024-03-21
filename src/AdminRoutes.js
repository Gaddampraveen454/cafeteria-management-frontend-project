/* eslint-disable */
import { lazy } from 'react';
import { USER_ROLE } from 'constants.js';
import { DEFAULT_PATHS } from 'config.js';

const dashboard = lazy(() => import('views/dashboard/Dashboard'));

const Company = lazy(() => import('views/company Management/Company'));
const addcompany = lazy(() => import('views/company Management/addcompany'));
const User = lazy(() => import('views/User Management/User'));
const adduser = lazy(() => import('views/User Management/adduser'));
const executive = lazy(() => import('views/Front Desk Executive/executive'));
const addexecutive = lazy(() => import('views/Front Desk Executive/addexecutive'));
const category = lazy(() => import('views/Category Management/category'));
const addcategory = lazy(() => import('views/Category Management/addcategory'));
const product = lazy(() => import('views/Product Management/product'));
const addproduct = lazy(() => import('views/Product Management/addproduct'));
const NICorders = lazy(() => import('views/NICorders/NICorders'));
const PendingOrder = lazy(() => import('views/NICorders/PendingOrder'));
const Viewordercompany = lazy(() => import('views/NICorders/Viewordercmpy'))
const ScanOrderDetails = lazy(() => import('views/NICorders/ScanOrderdetails'))
const addNICorder = lazy(() => import('views/NICorders/addNICorder'));
const report = lazy(() => import('views/Reports/report'));
const addreport = lazy(() => import('views/Reports/addreport'));
const adddetails = lazy(() => import('views/Add details/adddetails'));
const CreateOrder = lazy(() => import('views/CreateOrders/createorder'));
const changepassword = lazy(() => import('views/ChangePassword/changepassword'))
const CompanyNotifications = lazy(() => import('views/CompanyNotifications/companynotifications'))
const CompanyRole = lazy(()=>import('views/CompanyRoles/role'));
const CompanyAddRole = lazy(()=>import('views/CompanyRoles/addrole'));
const CompanyFeedback=lazy(()=>import('views/CompanyFeedback/companyfeedback'));
const CompanyProductView = lazy(()=>import('views/CompanyFeedback/companyproductview'));


const Cards = lazy(() => import('views/company Management/Cards'));
const Cardcart = lazy(() => import('views/company Management/Cardcart'));

const products = {
  list: lazy(() => import('views/products/list/ProductsList')),
  detail: lazy(() => import('views/products/detail/ProductsDetail')),
};
const orders = {
  list: lazy(() => import('views/orders/list/OrdersList')),
  detail: lazy(() => import('views/orders/detail/OrdersDetail')),
};
const customers = {
  list: lazy(() => import('views/customers/list/CustomersList')),
  detail: lazy(() => import('views/customers/detail/CustomersDetail')),
};

const storefront = {
  home: lazy(() => import('views/storefront/home/Home')),
  filters: lazy(() => import('views/storefront/filters/Filters')),
  categories: lazy(() => import('views/storefront/categories/Categories')),
  detail: lazy(() => import('views/storefront/detail/Detail')),
  cart: lazy(() => import('views/storefront/cart/Cart')),
  checkout: lazy(() => import('views/storefront/checkout/Checkout')),
  invoice: lazy(() => import('views/storefront/invoice/Invoice')),
};
const shipping = lazy(() => import('views/shipping/Shipping'));
const discount = lazy(() => import('views/discount/Discount'));


const settings = {
  home: lazy(() => import('views/settings/home/Home')),
  general: lazy(() => import('views/settings/general/General')),
};

const FooterRoutes = {
  terms: lazy(() => import('views/default/footer/TermsConditions')),
  refund: lazy(() => import('views/default/footer/RefundReturn')),
  ShippingPolicy: lazy(() => import('views/default/footer/ShippingPolicy')),
  contact: lazy(() => import('views/default/footer/contactus')),
  about: lazy(() => import('views/default/footer/aboutus')),
  privacy: lazy(() => import('views/default/footer/privacyPolicy'))
}

const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;

const OrderId = localStorage.getItem('OrderCompanyDetails');
let compNeworderId = !OrderId ? "" : OrderId


const adminRoutesAndMenuItems = {
  mainMenuItems: [
    {
      path: DEFAULT_PATHS.APP,
      exact: true,
      redirect: true,
      to: `${appRoot}/dashboard`,
    },
    {
      path: `${appRoot}/dashboard`,
      component: dashboard,
      label: 'Dashboard',
      icon: 'shop',
    },

    // {
    //   path: `${appRoot}/Cards`,
    //   component: Cards,
    //   label: 'Cards',
    //   icon: 'shipping',
    // },
    // {
    //   path: `${appRoot}/Cardcart`,
    //   component: Cardcart,
    //   label: 'Cardcart',
    //   icon: 'shipping',
    // },
    {
      path: `${appRoot}/addcompany`,
      component: addcompany,
      // label: 'User Management',
      // icon: 'user',
    },
    {
      path: `${appRoot}/User`,
      component: User,
      label: 'User Management',
      icon: 'user',
    },
    {
      path: `${appRoot}/adduser`,
      component: adduser,
      // label: 'User Management',
      // icon: 'user',
    },
    {
      path: `${appRoot}/Company`,
      component: Company,
      label: 'Store Management',
      icon: 'shipping',
    },
    // {
    //   path: `${appRoot}/executive`,
    //   component: executive,
    //   label: 'Front Desk Executive',
    //   icon: 'laptop',
    // },
    {
      path: `${appRoot}/addexecutive`,
      component: addexecutive,
      // label: 'Front Desk Executive',
      // icon: 'user',
    },
    {
      path: `${appRoot}/category`,
      component: category,
      label: 'Category Management',
      icon: 'save',
    },
    {
      path: `${appRoot}/addcategory`,
      component: addcategory,
      // label: 'Category Management',
      // icon: 'user',
    },
    {
      path: `${appRoot}/product`,
      component: product,
      label: 'Product Management',
      icon: 'web-page',
    },
    {
      path: `${appRoot}/addproduct`,
      component: addproduct,
      // label: 'Product Management',
      // icon: 'user',
    },
    {
      path: `${appRoot}/company_role_list`,
      component: CompanyRole,
      label: 'Roles',
      icon: 'save',
    },
    {
      path: `${appRoot}/add_role`,
      component: CompanyAddRole,
      // label: 'Category Management',
      // icon: 'user',
    },
    {
      path: `${appRoot}/create_order`,
      component: CreateOrder,
      label: 'Create Order',
      icon: 'user',
    },
    {
      path: `${appRoot}/orders`,
      component: NICorders,
      label: 'Orders',
      icon: 'wallet',
    },
    {
      path: `${appRoot}/Pendingorders`,
      component: PendingOrder,
      label: 'Pending List',
      icon: 'wallet',
    },
    {
      path: `${appRoot}/companyViewOrder/:id`,
      component: Viewordercompany,
    },
    {
      path: `${appRoot}/scanorderdetails/${compNeworderId}`,
      component: ScanOrderDetails
    },
    {
      path: `${appRoot}/addNICorder`,
      component: addNICorder,
      // label: 'Orders',
      // icon: 'user',
    },
    {
      path: `${appRoot}/report`,
      component: report,
      label: 'Report',
      icon: 'news',
    },
    {
      path: `${appRoot}/feedback`,
      component: CompanyFeedback,
      label: 'Feedback',
      icon: 'user',
    },
    {
      path: `${appRoot}/product_view`,
      component: CompanyProductView,
      // label: 'User Management',
      // icon: 'user',
    },
    {
      path: `${appRoot}/changepassword`,
      component: changepassword,
      label: 'Change Password',
      icon: 'lock-off',
    },
    // changepassword
    {
      path: `${appRoot}/companynotifications`,
      component: CompanyNotifications,
      label: 'Notifications',
      icon: 'news',
    },
    {
      path: `${appRoot}/addreport`,
      component: addreport,
      // label: 'Report',
      // icon: 'news',
    },
    {
      path: `${appRoot}/termsconditions`,
      component: FooterRoutes.terms
    },
    {
      path: `${appRoot}/refund`,
      component: FooterRoutes.refund
    },
    {
      path: `${appRoot}/shippingpolicy`,
      component: FooterRoutes.ShippingPolicy
    },
    {
      path: `${appRoot}/privacy`,
      component: FooterRoutes.privacy
    },
    {
      path: `${appRoot}/contact`,
      component: FooterRoutes.contact
    },
    {
      path: `${appRoot}/about`,
      component: FooterRoutes.about
    }
    // {
    //   path: `${appRoot}/discount`,
    //   component: discount,
    //   label: 'discount',
    //   icon: 'discount',
    // },
    // {
    //   path: `${appRoot}/adddetails`,
    //   component: adddetails,
    //   label: 'User Management',
    //   icon: 'user',
    // },

    // // {
    // //   path: `${appRoot}/Cards`,
    // //   component: Cards,
    // //   label: 'Menu',
    // //   icon: 'news',
    // // },
    // // {
    // //   path: `${appRoot}/Cardcart`,
    // //   component: Cardcart,
    // //   // label: 'Menu',
    // //   // icon: 'news',
    // // },
    // {
    //   path: `${appRoot}/products`,
    //   exact: true,
    //   redirect: true,
    //   to: `${appRoot}/products/list`,
    //   label: 'menu.products',
    //   icon: 'cupcake',
    //   subs: [
    //     { path: '/list', label: 'menu.list', component: products.list },
    //     { path: '/detail', label: 'menu.detail', component: products.detail },
    //   ],
    // },
    // {
    //   path: `${appRoot}/orders`,
    //   exact: true,
    //   redirect: true,
    //   to: `${appRoot}/orders/list`,
    //   label: 'menu.orders',
    //   icon: 'cart',
    //   subs: [
    //     { path: '/list', label: 'menu.list', component: orders.list },
    //     { path: '/detail', label: 'menu.detail', component: orders.detail },
    //   ],
    // },
    // {
    //   path: `${appRoot}/customers`,
    //   exact: true,
    //   redirect: true,
    //   to: `${appRoot}/customers/list`,
    //   label: 'menu.customers',
    //   icon: 'user',
    //   subs: [
    //     { path: '/list', label: 'menu.list', component: customers.list },
    //     { path: '/detail', label: 'menu.detail', component: customers.detail },
    //   ],
    // },
    // {
    //   path: `${appRoot}/storefront`,
    //   exact: true,
    //   redirect: true,
    //   to: `${appRoot}/storefront/home`,
    //   label: 'menu.storefront',
    //   icon: 'screen',
    //   subs: [
    //     { path: '/home', label: 'menu.home', component: storefront.home },
    //     { path: '/filters', label: 'menu.filters', component: storefront.filters },
    //     { path: '/categories', label: 'menu.categories', component: storefront.categories },
    //     { path: '/detail', label: 'menu.detail', component: storefront.detail },
    //     { path: '/cart', label: 'menu.cart', component: storefront.cart },
    //     { path: '/checkout', label: 'menu.checkout', component: storefront.checkout },
    //     { path: '/invoice', label: 'menu.invoice', component: storefront.invoice },
    //   ],
    // },
    // {
    //   path: `${appRoot}/shipping`,
    //   component: shipping,
    //   label: 'menu.shipping',
    //   icon: 'shipping',
    // },
    // {
    //   path: `${appRoot}/discount`,
    //   component: discount,
    //   label: 'menu.discount',
    //   icon: 'tag',
    // },
    // {
    //   path: `${appRoot}/settings`,
    //   component: settings.home,
    //   label: 'menu.settings',
    //   icon: 'gear',
    //   subs: [{ path: '/general', component: settings.general, hideInMenu: true }],
    // },
  ],
  sidebarItems: [],
};
export default adminRoutesAndMenuItems;
