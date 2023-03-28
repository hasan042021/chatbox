import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetConversationsQuery } from "../../features/conversations/conversationsApi";
import getPartnerInfo from "../../utils/getPartnerInfo";
import Error from "../ui/Error";
import ChatItem from "./ChatItem";

export default function ChatItems() {
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};
  const {
    data: conversations,
    isLoading,
    isError,
    error,
  } = useGetConversationsQuery(email);

  // useEffect(() => {
  //   console.log(conversations);
  // }, [conversations]);
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <li className="m-2 text-center">Loading...</li>;
  } else if (!isLoading && isError) {
    content = (
      <li className="m-2 text-center">
        <Error message={error?.data} />
      </li>
    );
  } else if (!isLoading && !isError && conversations?.length === 0) {
    content = <li className="m-2 text-center">No conversations found!</li>;
  } else if (!isLoading && !isError && conversations?.length > 0) {
    content = conversations
      .slice()
      .sort((a, b) => b.timestamp - a.timestamp)
      .map((conversation) => {
        const { id, message, timestamp } = conversation;
        const { email } = user || {};
        const { name, email: partnerEmail } = getPartnerInfo(
          conversation.users,
          email
        );
        return (
          <li key={id}>
            <Link to={`/inbox/${id}`}>
              <ChatItem
                partnerName={name}
                partnerEmail={partnerEmail}
                conversation={conversation}
              />
            </Link>
          </li>
        );
      });
  }

  return <ul>{content}</ul>;
}
