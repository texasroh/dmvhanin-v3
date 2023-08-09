import clsx from "clsx";
import Image from "next/image";
import { BsFillPersonFill } from "react-icons/bs";

interface AvatarProps {
  photoURL?: string;
  alt?: string;
  size?: "medium" | "large";
}
const Avatar = ({ photoURL, alt = "", size = "medium" }: AvatarProps) => {
  return photoURL ? (
    <Image
      src={photoURL}
      alt={alt}
      className={clsx("rounded-full", {
        "h-8 w-8": size === "medium",
        "h-24 w-24": size === "large",
      })}
    />
  ) : (
    <div
      className={clsx(
        "flex items-center justify-center overflow-hidden rounded-full bg-gray-400 p-1",
        { "h-8 w-8": size === "medium", "h-24 w-24": size === "large" }
      )}
    >
      <BsFillPersonFill size="30" color="white" />
    </div>
  );
};

export default Avatar;
