import moment from "moment";
import Avatar from "../ui/Avatar";

export default function ChatItem({ partnerName, partnerEmail, conversation }) {
  const { message: lastMessage, timestamp } = conversation;
  return (
    <div
      className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
      to="/"
    >
      <Avatar identifier={partnerEmail} />

      <div className="w-full pb-2 hidden md:block">
        <div className="flex justify-between">
          <span className="block ml-2 font-semibold text-gray-600">
            {partnerName}
          </span>
          <span className="block ml-2 text-sm text-gray-600">
            {moment(timestamp).fromNow()}
          </span>
        </div>
        <span className="block ml-2 text-sm text-gray-600">{lastMessage}</span>
      </div>
    </div>
  );
}
