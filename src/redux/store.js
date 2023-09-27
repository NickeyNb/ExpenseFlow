import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/authSlice";
import { loadSlice } from "./features/loadSlice";
import { userSlice } from "./features/userSlice";
export default configureStore({
  reducer: {
    auths: authSlice.reducer,
    loads: loadSlice.reducer,
    users: userSlice.reducer,
  },
});
