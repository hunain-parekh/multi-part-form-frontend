import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./slices/formSlice";
import { userApi } from "./services/userApi";

export const store = configureStore({
  reducer: {
    form: formReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
