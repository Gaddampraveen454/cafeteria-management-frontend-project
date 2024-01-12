// import redux and persist plugins
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage';
import persistStore from 'reduxjs-toolkit-persist/es/persistStore';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'reduxjs-toolkit-persist/es/constants';

// import theme reducers
import settingsReducer from 'settings/settingsSlice';
import layoutReducer from 'layout/layoutSlice';
import langReducer from 'lang/langSlice';
import authReducer from 'auth/authSlice';
import menuReducer from 'layout/nav/main-menu/menuSlice';
import notificationReducer from 'layout/nav/notifications/notificationSlice';
import scrollspyReducer from 'components/scrollspy/scrollspySlice';
import companyReducer from 'Redux/AdminRedux/Comapny/Company';
import cashierReducer from 'Redux/AdminRedux/Cashier/CashierRedux';
import categoryReducer from 'Redux/AdminRedux/Cataogy/categoryRedux';
import productReducer from 'Redux/AdminRedux/Product/ProductRedux';
import OrderReducer from 'Redux/AdminRedux/OrderRedux/OrderRedux';
import OrderReducerCashier from 'Redux/CashierRedux/OrderRedux/OrderRedux';
import CashierConsumerReducer from 'Redux/CashierRedux/Consumer/ConsumerRedux';
import StoreProductReducer from 'Redux/CashierRedux/Product/ProductRedux';
import cashierDashbordCountReducer from 'Redux/CashierRedux/DashBoard/DashCountRedux';
import AdminDashbordCountReducer from 'Redux/AdminRedux/DashBoard/DashCountRedux';
// import AdminDashbordCountReducer from 'Redux/AdminRedux/DashBoard/DashCountRedux';
import AdminReportReducer from 'Redux/AdminRedux/Reports/ReportRedux';
import CashierReportReducer from 'Redux/CashierRedux/Reports/ReportRedux';
import ProductForConsumerReducer from 'Redux/ConsumerRedux/Product/ProductRedux';
import categoryForConsumerReducer from 'Redux/ConsumerRedux/Category/CategoryRedux';
import CompanyDashboard from 'Redux/AdminRedux/CompanyDashboard/companydashbaord';
import CartReducer from 'Redux/ConsumerRedux/Cart/CartRedux';
import checkoutReducer from 'Redux/ConsumerRedux/Checkout/CheckoutRedux';
import IpAddressReducer from 'Redux/ConsumerRedux/IpAddressRedux/IpAddress';
import WalletReducer from 'Redux/ConsumerRedux/WalletRedux/WalletRedux';
import ConsumerOrderReducer from 'Redux/ConsumerRedux/OrderRedux/OrderRedux';
import InvoiceReducer from 'Redux/AdminRedux/invoice/InvoiceRedux';
import ActiveCompnayReducer from 'Redux/AdminRedux/Comapny/ActiveCompany';
import iCafeAdminCompanyReducer from 'Redux/IcafeAdminRedux/CompanyManagement/companymanagement';

// import persist key
import { REDUX_PERSIST_KEY } from 'config.js';
import adminCategoryReducer from 'Redux/IcafeAdminRedux/CategoryManagement/admincategorymanagementredux';
import adminProductReducer from 'Redux/IcafeAdminRedux/ProductManagement/productmanagementredux';
import iCafeAdminStoreReducer from 'Redux/IcafeAdminRedux/StoreManagement/storemanagement';
import AdminOrderReducer from 'Redux/IcafeAdminRedux/Orders/orderredux';
import ICafeAdminReportReducer from 'Redux/IcafeAdminRedux/Reports/reportsredux';
import iCafeAdminConsumerReducer from 'Redux/IcafeAdminRedux/ICafeAdminUserManagement/adminuserredux';
import StorecategoryReducer from 'Redux/CashierRedux/StoreCategoryRedux/storeCategoryRedux';
import CompanyProductReducer from 'Redux/AdminRedux/Production/production';
import companyUserReducer from 'Redux/AdminRedux/Consumer/ConsumerRedux';
import StoresForConsumersReducer from 'Redux/ConsumerRedux/StoreList/storelist';
import companyNotificationReducer from 'Redux/AdminRedux/Companynotifications/companynotificationsRedux';
import storeNotificationReducer from 'Redux/CashierRedux/StoreNotifications/storenotifications';
import notificationUserReducer from 'Redux/ConsumerRedux/NotificationRedux/notification';
import adminNotificationReducer from 'Redux/IcafeAdminRedux/AdminNotifications/adminnotificationsredux';
import forgetPasswordReducer from 'Redux/ForgetPassword/forgetpassword';
import AdminRolesReducer from 'Redux/IcafeAdminRedux/AdminRoles/rolesredux';
import CompanyRoleReducer from 'Redux/AdminRedux/CompanyRoleRedux/companyroleredux';
import StoreRoleReducer from 'Redux/CashierRedux/StoreRoleredux/storeroleredux';
import ICafeFeedbackReducer from 'Redux/IcafeAdminRedux/Feedbackredux/feedbackdux';


const persistConfig = {
  key: REDUX_PERSIST_KEY,
  storage,
  // whitelist: ['menu', 'settings', 'lang'],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    settings: settingsReducer,
    layout: layoutReducer,
    lang: langReducer,
    auth: authReducer,
    menu: menuReducer,
    notification: notificationReducer,
    Usernotification: notificationUserReducer,
    scrollspy: scrollspyReducer,
    companyList: companyReducer,
    cashierList: cashierReducer,
    cotegoryList: categoryReducer,
    companymanagement: iCafeAdminCompanyReducer,
    storemanagement: iCafeAdminStoreReducer,
    adminfeedback: ICafeFeedbackReducer,
    adminorder: AdminOrderReducer,
    iCafeAdminStoreSlice: iCafeAdminStoreReducer,
    companyDashbaord: CompanyDashboard,
    admincategory: adminCategoryReducer,
    forgetpassword: forgetPasswordReducer,
    adminproducts: adminProductReducer,
    admindashbord: ICafeAdminReportReducer,
    adminNotify: adminNotificationReducer,
    iacfeadminconsumer: iCafeAdminConsumerReducer,
    comapnuserSlice: companyUserReducer,

    products: productReducer,
    compamyProduction: CompanyProductReducer,
    orderList: OrderReducer,
    orderListCashier: OrderReducerCashier,
    CashierConsumerList: CashierConsumerReducer,
    StoreproductSlice: StoreProductReducer,
    CashierDashbordCountList: cashierDashbordCountReducer,
    AdminDashbordCountList: AdminDashbordCountReducer,
    AdminReportList: AdminReportReducer,
    CashierReportList: CashierReportReducer,
    ProductForConsumerList: ProductForConsumerReducer,
    categoryForConsumerList: categoryForConsumerReducer,
    CartList: CartReducer,
    checkoutdata: checkoutReducer,
    IpAddressList: IpAddressReducer,
    WalletData: WalletReducer,
    OrderPlacedData: ConsumerOrderReducer,
    RolesSlice: AdminRolesReducer,
    InvoiceData: InvoiceReducer,
    ActiveCompnayList: ActiveCompnayReducer,
    StorecategorySlice: StorecategoryReducer,
    StoreForConsumerSlice: StoresForConsumersReducer,
    companyNotify: companyNotificationReducer,
    CompanyRoleSlice: CompanyRoleReducer,
    StoreRoleSlice: StoreRoleReducer,
    storeNotify: storeNotificationReducer

  })
);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persistedStore = persistStore(store);
export { store, persistedStore };


