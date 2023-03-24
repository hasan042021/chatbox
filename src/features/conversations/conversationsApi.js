import { apiSlice } from "../api/apiSlice";

export const conversationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: (email) =>
        `/conversations?participants_like=${email}&_sort=timestamp&order=desc&page=1&limit=${
          import.meta.env.VITE_REACT_APP_CONVERSATION_PER_PAGE
        }`,
    }),
  }),
});

export const { useGetConversationsQuery } = conversationsApi;
