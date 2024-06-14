import { combineReducers, createStore } from 'redux';
import { userReducer } from '../Reducer/reducer';
import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);