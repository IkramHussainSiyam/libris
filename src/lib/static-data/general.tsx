import { MessageSquareText, ScanSearch, Star, Users } from "lucide-react";
import assets from "./assets";
import { routes } from "./routes";

export const navlinks = [
  {
    id: 2,
    name: "Social",
    href: routes.social.list,
    icon: <MessageSquareText />,
  },
  {
    id: 1,
    name: "Explore",
    href: routes.explore,
    icon: <ScanSearch />,
  },
  {
    id: 1,
    name: "Users",
    href: routes.users,
    icon: <Users />,
  },
  {
    id: 3,
    name: "Reviews",
    href: routes.review.list,
    icon: <Star />,
  },
];

export const heroFeatures = [
  {
    id: 1,
    imgSrc: assets.stats.src,
    imgAlt: assets.stats.alt,
    title: "Discover your favorite books",
    description:
      "What are your highest rated subjects or most read books? Follow your watching habits over time with statistics.",
  },
  {
    id: 2,
    imgSrc: assets.apps.src,
    imgAlt: assets.apps.alt,
    title: "Bring Libris anywhere",
    description:
      "Keep track of your progress on-the-go with any browser logged in to Libris Web app across iOS, Android, macOS, and Windows.",
  },
  {
    id: 3,
    imgSrc: assets.social.src,
    imgAlt: assets.social.alt,
    title: "Share your progress & thoughts",
    description:
      "Share your thoughts with our thriving community, follow friends and write reviews.",
  },
  {
    id: 4,
    imgSrc: assets.custom.src,
    imgAlt: assets.custom.alt,
    title: "Customize Libris to your liking",
    description:
      "Customize the color theme and profile with light and dark modes.",
  },
];
