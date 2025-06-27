import Image from "next/image";
import { routes } from "~/lib/static-data/routes";
import { cn } from "~/lib/utils/utils";
import Link from "./Link";

export default function UserInfoLink({
  avatar,
  userName,
  linkClassName,
  containerClassName,
  imageContainerClassName,
  imageClassName,
  width = 24,
  height = 24,
}: Props) {
  return (
    <div className={cn("flex items-center gap-1.5", containerClassName)}>
      <div
        className={cn(
          "size-6 overflow-hidden rounded-full border",
          imageContainerClassName
        )}
      >
        <Image
          className={cn("size-full object-cover", imageClassName)}
          src={avatar}
          alt={userName}
          width={width}
          height={height}
        />
      </div>
      <Link
        href={routes.user.profile(userName)}
        className={cn("link text-base", linkClassName)}
      >
        {userName}
      </Link>
    </div>
  );
}

type Props = {
  avatar: string;
  userName: string;
  width?: number;
  height?: number;
  linkClassName?: string;
  containerClassName?: string;
  imageContainerClassName?: string;
  imageClassName?: string;
};
