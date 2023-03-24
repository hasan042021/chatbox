import gravatarUrl from "gravatar-url";

const Avatar = ({ identifier }) => {
  const isEmail = String(identifier).includes("@");
  const gravatar = isEmail
    ? gravatarUrl(identifier, {
        default: "identicon",
        size: 80,
      })
    : null;

  return gravatar ? (
    <img
      className="object-cover w-10 h-10 rounded-full"
      src={gravatar}
      alt="avatar"
    />
  ) : null;
};

export default Avatar;
