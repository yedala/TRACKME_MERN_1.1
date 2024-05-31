import {configureStore,combineReducers} from "@reduxjs/toolkit"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from "./userSlice"
import toasterSlice from "./toasterSlice";


const persistConfig = {
    key: 'root',
    storage,
    
};
const userPersistReducer = combineReducers({
    user : userReducer,
    toaster: toasterSlice,
})
const persistedReducer = persistReducer(persistConfig, userPersistReducer);

const appStore = configureStore({
    reducer: persistedReducer
});

export default appStore;