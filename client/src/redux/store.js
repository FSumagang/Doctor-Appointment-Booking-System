import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./features/alertSlice";
import { globalSlice } from "../assets/states/index";

export default configureStore({
  reducer: {
    alerts: alertSlice.reducer,
    global: globalSlice.reducer,
  },
});