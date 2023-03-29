import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { messagesApi } from "../../../features/messages/messagesApi";
import Message from "./Message";

export default function Messages({
  messages = [],
  totalCount,
  conversationId,
}) {
  const { user } = useSelector((state) => state.auth) || {};
  const dispatch = useDispatch();
  const { email } = user || {};
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1) {
      dispatch(
        messagesApi.endpoints.getMoreMessages.initiate({
          conversationId,
          page,
        })
      );
    }
  }, [page, email, dispatch, conversationId]);

  useEffect(() => {
    if (totalCount > 0) {
      const more =
        Math.ceil(
          totalCount / import.meta.env.VITE_REACT_APP_MESSAGES_PER_PAGE
        ) > page;
      setHasMore(more);
    }
  }, [page, totalCount]);
  return (
    <div
      id="scrollableDiv"
      className="relative w-full h-[calc(100vh_-_197px)] p-6 overflow-y-auto flex flex-col-reverse"
    >
      <ul className="space-y-2">
        <InfiniteScroll
          dataLength={messages.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          inverse={true}
          scrollableTarget="scrollableDiv"
          style={{ display: "flex", flexDirection: "column-reverse" }}
        >
          {messages
            .slice()
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((message, idx) => {
              const { message: lastMessage, id, sender } = message || {};
              const justify = sender.email !== email ? "start" : "end";
              const style =
                sender.email !== email
                  ? "text-gray-700"
                  : "bg-indigo-600 text-gray-200";
              return (
                <Message
                  style={style}
                  key={idx}
                  justify={justify}
                  message={lastMessage}
                />
              );
            })}
        </InfiniteScroll>
      </ul>
    </div>
  );
}
