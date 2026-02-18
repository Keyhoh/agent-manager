// RTK Query base API configuration
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Initialize an empty api service that we'll inject endpoints into later
export const emptySplitApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  }),
  tagTypes: ['Product', 'BacklogItem', 'Sprint', 'Agent', 'Review'],
  endpoints: () => ({}),
});
