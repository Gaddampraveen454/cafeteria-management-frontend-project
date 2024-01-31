/* eslint-disable */
import { lazy } from 'react';
import { USER_ROLE } from 'constants.js';
import { DEFAULT_PATHS } from 'config.js';

const IcafeDashboard = lazy(()=>import('viewICafeAdmin/Dashboard/dashboard'))
const CompanyManagement = lazy(()=>import('viewICafeAdmin/CompanyManagement/companymanagement'))
const UserManagement = lazy(()=>import('viewICafeAdmin/AdminUserManagement/adminuser'));
const UserAdd = lazy(()=>import('viewICafeAdmin/AdminUserManagement/adminadduser'));
const addAdimcafeCompany = lazy(() => import('viewICafeAdmin/CompanyManagement/addAdminCompany'));
const StoreManagement = lazy(()=> import('viewICafeAdmin/StoreManagement/storemanagement'));
const addAdminStore = lazy(()=>import('viewICafeAdmin/StoreManagement/addAdminStoreManagement'));
const AdminCategory = lazy(()=>import('viewICafeAdmin/AdminCategoryManagement/admincategory'));
const AdminAddCategory = lazy(()=>import('viewICafeAdmin/AdminCategoryManagement/adminaddcategory'));
const AdminProduct = lazy(()=>import('viewICafeAdmin/AdminProductManagement/productmanagement'));
const AdminAddProduct = lazy(()=>import('viewICafeAdmin/AdminProductManagement/addproductmanagement'));
const OrderList=lazy(()=>import('viewICafeAdmin/Order/Order'));
const Reports = lazy(()=>import('viewICafeAdmin/Reports/adminreports'));
const AdminOrderView = lazy(()=>import('viewICafeAdmin/Order/orderview'));
const AdminNotification = lazy(()=>import('viewICafeAdmin/AdminNotifications/adminnotifications'));
const AdminChangePassword=lazy(()=>import('viewICafeAdmin/ChangePassword/adminchangepassword'));
const Roles = lazy(()=>import('viewICafeAdmin/Roles/roles'));
const AddRoles = lazy(()=>import('viewICafeAdmin/Roles/addroles'));
const FeedBack=lazy(()=>import('viewICafeAdmin/FeedBack/feedback'));
// const ViewReview = lazy(()=>import('viewICafeAdmin/FeedBack/viewreview'));
const ProductReview = lazy(()=>import('viewICafeAdmin/FeedBack/productreview'));


const FooterRoutes = {
  terms: lazy(() => import('views/default/footer/TermsConditions')),
  refund: lazy(() => import('views/default/footer/RefundReturn')),
  ShippingPolicy: lazy(() => import('views/default/footer/ShippingPolicy')),
  contact: lazy(() => import('views/default/footer/contactus')),
  about: lazy(() => import('views/default/footer/aboutus')),
  privacy: lazy(() => import('views/default/footer/privacyPolicy'))

}

// const dashboard = lazy(() => import('views/dashboard/Dashboard'));

// const Company = lazy(() => import('views/company Management/Company'));
// const addcompany = lazy(() => import('views/company Management/addcompany'));
// const User = lazy(() => import('views/User Management/User'));
// const adduser = lazy(() => import('views/User Management/adduser'));
// const executive = lazy(() => import('views/Front Desk Executive/executive'));
// const addexecutive = lazy(() => import('views/Front Desk Executive/addexecutive'));
// const category = lazy(() => import('views/Category Management/category'));
// const addcategory = lazy(() => import('views/Category Management/addcategory'));
// const product = lazy(() => import('views/Product Management/product'));
// const addproduct = lazy(() => import('views/Product Management/addproduct'));
// const NICorders = lazy(() => import('views/NICorders/NICorders'));
// const addNICorder = lazy(() => import('views/NICorders/addNICorder'));
// const report = lazy(() => import('views/Reports/report'));
// const addreport = lazy(() => import('views/Reports/addreport'));
// const adddetails = lazy(() => import('views/Add details/adddetails'));

// const Cards = lazy(() => import('views/company Management/Cards'));
// const Cardcart = lazy(() => import('views/company Management/Cardcart'));

// const products = {
//   list: lazy(() => import('views/products/list/ProductsList')),
//   detail: lazy(() => import('views/products/detail/ProductsDetail')),
// };
// const orders = {
//   list: lazy(() => import('views/orders/list/OrdersList')),
//   detail: lazy(() => import('views/orders/detail/OrdersDetail')),
// };
// const customers = {
//   list: lazy(() => import('views/customers/list/CustomersList')),
//   detail: lazy(() => import('views/customers/detail/CustomersDetail')),
// };

// const storefront = {
//   home: lazy(() => import('views/storefront/home/Home')),
//   filters: lazy(() => import('views/storefront/filters/Filters')),
//   categories: lazy(() => import('views/storefront/categories/Categories')),
//   detail: lazy(() => import('views/storefront/detail/Detail')),
//   cart: lazy(() => import('views/storefront/cart/Cart')),
//   checkout: lazy(() => import('views/storefront/checkout/Checkout')),
//   invoice: lazy(() => import('views/storefront/invoice/Invoice')),
// };
// const shipping = lazy(() => import('views/shipping/Shipping'));
// const discount = lazy(() => import('views/discount/Discount'));


// const settings = {
//   home: lazy(() => import('views/settings/home/Home')),
//   general: lazy(() => import('views/settings/general/General')),
// };

const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;

const iCafeAdminRoutesAndMenuItems = {
  mainMenuItems: [
    {
      path: DEFAULT_PATHS.APP,
      exact: true,
      redirect: true,
      to: `${appRoot}/icafe_dashboard`,
    },
    {
      path: `${appRoot}/icafe_dashboard`,
      component: IcafeDashboard,
      label: 'Dashboard',
      icon: 'shop',
    },
    {
      path: `${appRoot}/company_management`,
      component: CompanyManagement,
      label: 'Company Management',
      icon: 'shop',
    },
    {
      path: `${appRoot}/addadmincompany`,
      component: addAdimcafeCompany,
      // label: 'User Management',
      // icon: 'user',
    },
    {
      path: `${appRoot}/user_management`,
      component: UserManagement,
      label: 'User Management',
      icon: 'shop',
    },
    {
      path: `${appRoot}/add_user`,
      component: UserAdd,
      // label: 'User Management',
      // icon: 'user',
    },
    {
      path: `${appRoot}/store_management`,
      component: StoreManagement,
      label: 'Store Management',
      icon: 'shop',
    },
    {
      path: `${appRoot}/add_store`,
      component: addAdminStore,
      // label: 'User Management',
      // icon: 'user',
    },
    {
      path: `${appRoot}/category_management`,
      component: AdminCategory,
      label: 'Category Management',
      icon: 'shop',
    },
    {
      path: `${appRoot}/add_category`,
      component: AdminAddCategory,
      // label: 'User Management',
      // icon: 'user',
    },
    {
      path: `${appRoot}/product_management`,
      component: AdminProduct,
      label: 'Product Management',
      icon: 'shop',
    },
    {
      path: `${appRoot}/add_product`,
      component: AdminAddProduct,
      // label: 'User Management',
      // icon: 'user',
    },
    // {
    //   path: `${appRoot}/roles_list`,
    //   component: Roles,
    //   label: 'Roles',
    //   icon: 'shop',
    // },
    // {
    //   path: `${appRoot}/add_roles`,
    //   component: AddRoles,
    //   // label: 'User Management',
    //   // icon: 'user',
    // },
    {
      path: `${appRoot}/orders`,
      component: OrderList,
      label: 'Order List',
      icon: 'shop',
    },
    {
      path: `${appRoot}/order_view`,
      component: AdminOrderView,
      // label: 'User Management',
      // icon: 'user',
    },
    {
      path: `${appRoot}/reports`,
      component: Reports,
      label: 'Reports',
      icon: 'shop',
    },
    {
      path: `${appRoot}/feedback`,
      component: FeedBack,
      label: 'Feedbacks',
      icon: 'shop',
    },
    {
      path: `${appRoot}/feedback_by_product`,
      component: FeedBack,
      // label: 'Feedback',
      // icon: 'shop',
    },
    {
      path: `${appRoot}/product_view`,
      component: ProductReview,
      // label: 'User Management',
      // icon: 'user',
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
    },
    {
      path: `${appRoot}/admin_notifications`,
      component: AdminNotification,
      label: 'Notifications',
      icon: 'shop',
    },
    {
      path: `${appRoot}/change_password`,
      component: AdminChangePassword,
      label: 'ChangePassword',
      icon: 'shop',
    },
    //     {
    //   path: `${appRoot}/Company`,
    //   component: Company,
    //   label: 'Company Management',AdminProduct
    //   icon: 'shipping',
    // },
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
    // {
    //   path: `${appRoot}/addcompany`,
    //   component: addcompany,
      // label: 'User Management',
      // icon: 'user',
    // },
    // {
    //   path: `${appRoot}/User`,
    //   component: User,
    //   label: 'User Management',
    //   icon: 'user',
    // },
    // {
    //   path: `${appRoot}/adduser`,
    //   component: adduser,
      // label: 'User Management',
      // icon: 'user',
    // },
    // {
    //   path: `${appRoot}/executive`,
    //   component: executive,
    //   label: 'Front Desk Executive',
    //   icon: 'laptop',
    // },
    // {
    //   path: `${appRoot}/addexecutive`,
    //   component: addexecutive,
      // label: 'Front Desk Executive',
      // icon: 'user',
    // },
    // {
    //   path: `${appRoot}/category`,
    //   component: category,
    //   label: 'Category Management',
    //   icon: 'save',
    // },
    // {
    //   path: `${appRoot}/addcategory`,
    //   component: addcategory,
      // label: 'Category Management',
      // icon: 'user',
    // },
    // {
    //   path: `${appRoot}/product`,
    //   component: product,
    //   label: 'Product Management',
    //   icon: 'web-page',
    // },
    // {
    //   path: `${appRoot}/addproduct`,
    //   component: addproduct,
    //   // label: 'Product Management',
    //   // icon: 'user',
    // },
    // {
    //   path: `${appRoot}/orders`,
    //   component: NICorders,
    //   label: 'Orders',
    //   icon: 'wallet',
    // },
    // {
    //   path: `${appRoot}/addNICorder`,
    //   component: addNICorder,
    //   // label: 'Orders',
    //   // icon: 'user',
    // },
    // {
    //   path: `${appRoot}/report`,
    //   component: report,
    //   label: 'Report',
    //   icon: 'news',
    // },
    // {
    //   path: `${appRoot}/addreport`,
    //   component: addreport,
    //   // label: 'Report',
    //   // icon: 'news',
    // },
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
export default iCafeAdminRoutesAndMenuItems;