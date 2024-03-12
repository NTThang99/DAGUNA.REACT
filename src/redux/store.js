import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducer/RootReducer";

const store = configureStore({ reducer: rootReducer });
export default store;
