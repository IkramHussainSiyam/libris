import Container from "~/components/common/others/Container";
import Sidebar, { SidebarLinks } from "~/components/common/others/Sidebar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links: SidebarLinks[] = [
    {
      id: 1,
      name: "General",
      href: "/settings",
    },
    {
      id: 2,
      name: "Account",
      href: "/settings/account",
    },
    {
      id: 4,
      name: "Booklist",
      href: "/settings/book-list",
    },
    {
      id: 5,
      name: "Import / Export Lists",
      href: "/settings/import-export-lists",
    },
  ];

  return (
    <Container className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/5">
        <Sidebar links={links} heading="Settings" />
      </div>

      <div className="flex-1 bg-light dark:bg-muted p-5 h-fit">{children}</div>
    </Container>
  );
}
