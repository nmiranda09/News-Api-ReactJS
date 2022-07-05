import { configureStore } from '@reduxjs/toolkit';
import { newsApiSlice } from '../features/news/newsApi';

export const store = configureStore({
  reducer: {
    [newsApiSlice.reducerPath]: newsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(newsApiSlice.middleware);
  },
});
