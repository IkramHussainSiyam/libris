import Link from "~/components/common/others/Link";
import { $Enums } from "~/lib/prisma/generated/client";
import { routes } from "~/lib/static-data/routes";

export default function NotificationMessage({
  type,
  fromUsername,
  activity_ID,
  review_ID,
}: Props) {
  let message: string;

  switch (type) {
    case "like":
      message = "liked your";
      break;
    case "comment":
      message = "commented on your";
      break;
    case "status_post":
      message = "has posted a new";
      break;
    case "follow":
      message = "started following you";
      break;
  }

  const navigate = activity_ID
    ? routes.social.details(activity_ID)
    : routes.review.details(review_ID ?? "");

  return (
    <span>
      <Link href={routes.user.profile(fromUsername ?? "")} className="link">
        {fromUsername}
      </Link>{" "}
      {message}{" "}
      {type === "follow" ? (
        ""
      ) : (
        <Link href={navigate} className="link">
          {activity_ID ? "status" : "review"}
        </Link>
      )}
    </span>
  );
}

type Props = {
  type: $Enums.NotificationType;
  fromUsername: string | null | undefined;
  activity_ID: string | null | undefined;
  review_ID: string | null | undefined;
};
