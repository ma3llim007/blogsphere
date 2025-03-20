import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";

// Slices
import adminAuthSlice from "./features/admin/admin/adminAuthSlice";

// Persistence Configuration For Admin Auth
const adminAuthPersistentConfig = {
    key: "adminAuth",
    version: 1,
    storage: sessionStorage,
};

// persist the slice
const persistedAdminAuthReducer = persistReducer(adminAuthPersistentConfig, adminAuthSlice);

// create a root reducer
const rootReducer = combineReducers({
    adminAuth: persistedAdminAuthReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

const storePersistor = persistStore(store);

export { store, storePersistor };
