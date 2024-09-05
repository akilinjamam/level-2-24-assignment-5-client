import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import bookingSlice from "./features/booking.slice";
import controllModalSlice from "./features/modal.slice";

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    booking: bookingSlice,
    modal: controllModalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
