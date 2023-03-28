import { useSelector } from "react-redux";
import Avatar from "../../ui/Avatar";

export default function ChatHead({ message }) {
  const { user } = useSelector((state) => state.auth);
  const { email } = user || {};
  const { sender, receiver } = message;

  const partnerEmail = sender.email === email ? receiver.email : sender.email;
  const partnerName = sender.email === email ? receiver.name : sender.name;

  return (
    <div className="relative flex items-center p-3 border-b border-gray-300">
      <Avatar identifier={partnerEmail} />
      <span className="block ml-2 font-bold text-gray-600">{partnerName}</span>
    </div>
  );
}
