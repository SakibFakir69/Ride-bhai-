import { configureStore } from '@reduxjs/toolkit';
import { baseAPi } from './baseApi';


export const store = configureStore({
  reducer: {
    [baseAPi.reducerPath]: baseAPi.reducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
