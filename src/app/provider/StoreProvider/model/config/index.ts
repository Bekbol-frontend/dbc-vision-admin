import { userReducer } from "@/entities/User";
import { loginReducer } from "@/features/Login";
import API from "@/shared/api";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          API,
        },
      },
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
