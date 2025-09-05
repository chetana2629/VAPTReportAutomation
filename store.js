import { configureStore } from "@reduxjs/toolkit";
import vulnReducer from "../features/vulns/vulnSlice";

export const store = configureStore({
  reducer: {
    vulns: vulnReducer,
  },
});
