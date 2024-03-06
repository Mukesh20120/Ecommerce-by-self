import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers,{getState}) => {
    const {userInfo} = (getState()).auth;
    if (userInfo) {
        headers.set('Authorization', `Bearer ${userInfo.token}`);
    }
    headers.set('ngrok-skip-browser-warning', 'true');
      return headers;
  },
});

export const apiSlice = createApi({
  baseQuery, // Use the customized baseQuery
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: (builder) => ({}),
  credentials: 'include',
});
