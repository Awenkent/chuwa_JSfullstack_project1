import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import userProduct from "./productSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    product: userProduct
  },
});
