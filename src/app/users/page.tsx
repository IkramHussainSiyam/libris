import { redirect } from "next/navigation";
import Container from "~/components/common/others/Container";
import For from "~/components/helpers/For";
import { getSessionUser_query } from "~/lib/db/_config/session";
import { getAllUsers_query } from "~/lib/db/users/getAllUsers.query";
import UserCard from "./_components/UserCard";

export default async function AllUsersPage() {
  const { allUsers } = await getAllUsers_query();
  const sessionUser = await getSessionUser_query();

  if (allUsers.length === 0) {
    redirect("/");
  }

  // show all users except the logged in user
  const userList = allUsers.filter(
    (user) => user.user_name !== sessionUser?.user_name
  );

  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <For
          each={userList}
          render={(user) => (
            <UserCard key={user.id} user={user} sessionUser={sessionUser} />
          )}
        />
      </div>
    </Container>
  );
}

export const metadata = {
  title: "Explore Users",
  keywords: "libris, libris user, find libris user, explore user",
  openGraph: {
    title: "Explore Users",
    url: "https://libris.vercel.app/users",
  },
};
