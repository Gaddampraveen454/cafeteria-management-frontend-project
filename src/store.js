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
// import consumerReducer from 'Redux/AdminRedux/Consumer/ConsumerRedux';
import consumerReducer from 'Redux/AdminRedux/Consumer/ConsumerRedux';
import categoryReducer from 'Redux/AdminRedux/Cataogy/categoryRedux';
import productReducer from 'Redux/AdminRedux/Product/ProductRedux';
import OrderReducer from 'Redux/AdminRedux/OrderRedux/OrderRedux';
import OrderReducerCashier from 'Redux/CashierRedux/OrderRedux/OrderRedux';
import CashierConsumerReducer from 'Redux/CashierRedux/Consumer/ConsumerRedux';
import CashierProductReducer from 'Redux/CashierRedux/Product/ProductRedux';
import cashierDashbordCountReducer from 'Redux/CashierRedux/DashBoard/DashCountRedux';
import AdminDashbordCountReducer from 'Redux/AdminRedux/DashBoard/DashCountRedux';
import AdminReportReducer from 'Redux/AdminRedux/Reports/ReportRedux';
import CashierReportReducer from 'Redux/CashierRedux/Reports/ReportRedux'; 
import ProductForConsumerReducer from 'Redux/ConsumerRedux/Product/ProductRedux';
import categoryForConsumerReducer from 'Redux/ConsumerRedux/Category/CategoryRedux';
import CartReducer from 'Redux/ConsumerRedux/Cart/CartRedux';
import checkoutReducer from 'Redux/ConsumerRedux/Checkout/CheckoutRedux';
// import persist key
import { REDUX_PERSIST_KEY } from 'config.js';

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
    scrollspy: scrollspyReducer,
    companyList: companyReducer,
    cashierList:cashierReducer,
    consumerList:consumerReducer,
    cotegoryList:categoryReducer,
    productList:productReducer,
    orderList:OrderReducer,
    orderListCashier:OrderReducerCashier,
    CashierConsumerList:CashierConsumerReducer,
    CashierProductList:CashierProductReducer,
    CashierDashbordCountList:cashierDashbordCountReducer,
    AdminDashbordCountList:AdminDashbordCountReducer,
    AdminReportList:AdminReportReducer,
    CashierReportList:CashierReportReducer,
    ProductForConsumerList:ProductForConsumerReducer,
    categoryForConsumerList:categoryForConsumerReducer,
    CartList:CartReducer,
    checkoutdata:checkoutReducer,
    

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
