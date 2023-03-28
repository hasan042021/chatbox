export default function Message({ style, justify, message }) {
  return (
    <li className={`flex justify-${justify}`}>
      <div className={`relative max-w-xl px-4 py-2 ${style} rounded shadow`}>
        <span className="block">{message}</span>
      </div>
    </li>
  );
}
