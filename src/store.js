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
