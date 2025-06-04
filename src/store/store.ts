import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "../reducers/index";

export const store=configureStore({
    reducer:rootReducer,
    devTools: process.env.NODE_ENV !== "production", // DevTools 연결
})

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];