import { apiSlice } from "../api/apiSlice";

export const messagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (id) =>
        `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=1&_limit=${
          import.meta.env.VITE_REACT_APP_MESSAGES_PER_PAGE
        }`,
      transformResponse(apiResponse, meta) {
        const totalCount = meta.response.headers.get("X-Total-Count");

        return {
          data: apiResponse,
          totalCount,
        };
      },
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create socket
        const socket = io(import.meta.env.VITE_REACT_APP_API_URL, {
          reconnectionDelay: 1000,
          reconnection: true,
          reconnectionAttempts: 10,
          transports: ["websocket"],
          agent: false,
          upgrade: true,
          rejectUnauthorized: false,
        });
        try {
          await cacheDataLoaded;
          socket.on("message", (data) => {
            updateCachedData((draft) => {
              if (arg == data?.data?.conversationId) {
                draft.data.push(data.data);
              } else {
                //do nothing
              }
            });
          });
        } catch (error) {}
      },
    }),
    getMoreMessages: builder.query({
      query: ({ conversationId, page }) =>
        `/messages?conversationId=${conversationId}&_sort=timestamp&_order=desc&_page=${page}&_limit=${
          import.meta.env.VITE_REACT_APP_MESSAGES_PER_PAGE
        }`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const messages = await queryFulfilled;

          if (messages?.data?.length > 0) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getMessages",
                arg.conversationId.toString(),
                (draft) => {
                  return {
                    data: [...draft.data, ...messages.data],
                    totalCount: Number(draft.totalCount),
                  };
                }
              )
            );
          }
        } catch (error) {}
      },
    }),
    addMessage: builder.mutation({
      query: (data) => ({
        url: "/messages",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;
