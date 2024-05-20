import {configureStore,combineReducers} from "@reduxjs/toolkit"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from "./userSlice"


const persistConfig = {
    key: 'root',
    storage,
    
};
const userPersistReducer = combineReducers({
    user : userReducer,
})
const persistedReducer = persistReducer(persistConfig, userPersistReducer);

const appStore = configureStore({
    reducer: persistedReducer
});

export default appStore;