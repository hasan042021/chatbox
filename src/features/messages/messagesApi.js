import { apiSlice } from "../api/apiSlice";

export const messagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (id) =>
        `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=1&_limit=${
          import.meta.env.REACT_APP_MESSAGES_PER_PAGE
        }`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create socket
        const socket = io("http://localhost:9000", {
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
            console.log(arg, data);
            updateCachedData((draft) => {
              console.log("From get messages");
              const alreadyAdded = draft.findIndex(
                (c) => c.id == data?.data?.id
              );
              console.log(alreadyAdded);
              if (arg == data?.data?.conversationId) {
                if (alreadyAdded === -1) {
                  console.log("here");
                  draft.push(data.data);
                }
              } else {
                //do nothing
              }
            });
          });
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
