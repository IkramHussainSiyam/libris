import Sidebar, { SidebarLinks } from "~/components/common/others/Sidebar";
import { routes } from "~/lib/static-data/routes";

export default async function UserProfileSocialLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { userName: string };
}) {
  const links: SidebarLinks[] = [
    {
      id: 1,
      name: "Following",
      href: routes.user.social.following(params.userName),
    },
    {
      id: 2,
      name: "Followers",
      href: routes.user.social.followers(params.userName),
    },
    {
      id: 3,
      name: "Activities",
      href: routes.user.social.activities(params.userName),
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/6">
        <Sidebar links={links} heading={"Social"} />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
