import { redirect } from "next/navigation";
import Container from "~/components/common/others/Container";
import EmptyMessage from "~/components/common/others/EmptyMessage";
import For from "~/components/helpers/For";
import If from "~/components/helpers/If";
import { getSessionUser_query } from "~/lib/db/_config/session";
import { getAllUsers_query } from "~/lib/db/users/getAllUsers.query";
import UserCard from "./_components/UserCard";

export default async function AllUsersPage() {
  const { allUsers } = await getAllUsers_query();
  const sessionUser = await getSessionUser_query();

  if (allUsers.length === 0) {
    redirect("/");
  }

  return (
    <Container className="space-y-3">
      <h4 className="text-xl text-foreground">All Users</h4>
      <If
        condition={allUsers.length > 0}
        then={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <For
              each={allUsers}
              render={(user) => (
                <UserCard key={user.id} user={user} sessionUser={sessionUser} />
              )}
            />
          </div>
        }
        otherwise={<EmptyMessage variant="light">No users found.</EmptyMessage>}
      />
    </Container>
  );
}

export const metadata = {
  title: "Explore Users",
  keywords: "libris, libris user, find libris user, explore user",
  openGraph: {
    title: "Explore Users",
    url: "https://libris.up.railway.app/users",
  },
};
