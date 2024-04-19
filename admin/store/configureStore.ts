import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

import uiReducer from './slices/ui';
import blogsReducer from './slices/blogs';
import profileReducer from './slices/profile';
import productsReducer from './slices/products';

import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    ui: uiReducer,
    blogs: blogsReducer,
    profile: profileReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// @ts-ignore
store.sagaTask = sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
