import { configureStore } from '@reduxjs/toolkit';
import { projectsApiSlice } from '@/services/projects';

export const store = configureStore({
  reducer: {
    [projectsApiSlice.reducerPath]: projectsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(projectsApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
