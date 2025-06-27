import Container from "~/components/common/others/Container";
import Sidebar, { SidebarLinks } from "~/components/common/others/Sidebar";

export default function AdminLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const links: SidebarLinks[] = [
    {
      id: 1,
      name: "Users",
      href: "/admin",
    },
    {
      id: 2,
      name: "Books",
      href: "/admin/books",
    },
    {
      id: 3,
      name: "Subjects",
      href: "/admin/subjects",
    },
  ];

  return (
    <Container className="flex flex-col lg:flex-row gap-6 lg:h-screen">
      <div className="w-full lg:w-1/5">
        <Sidebar links={links} heading="Admin" />
      </div>

      <div className="flex-1 h-fit">{children}</div>
    </Container>
  );
}
