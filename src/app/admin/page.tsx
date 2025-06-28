import Card from "~/components/common/card/Card";
import EmptyMessage from "~/components/common/others/EmptyMessage";
import UserInfoLink from "~/components/common/others/UserInfoLink";
import For from "~/components/helpers/For";
import If from "~/components/helpers/If";
import { adminEmail } from "~/lib/db/_config/main";
import { getAllUsers_query } from "~/lib/db/users/getAllUsers.query";
import { formatDate } from "~/lib/utils/date-formatter";

export default async function AdminUsersPage() {
  const { allUsers } = await getAllUsers_query();

  return (
    <If
      condition={allUsers.length > 0}
      then={
        <div className="space-y-3 max-h-screen scroll-area">
          <For
            each={allUsers.filter((user) => user.email !== adminEmail)}
            render={(user) => (
              <Card.Root key={user.id}>
                <Card.Image
                  containerClassName="size-20"
                  src={user.image!}
                  alt={user.user_name!}
                  width={80}
                  height={80}
                />

                <Card.Content>
                  <Card.Header>
                    <Card.Title asChild>
                      <UserInfoLink
                        avatar={user.image!}
                        userName={user.user_name!}
                        imageContainerClassName="size-5"
                        linkClassName="text-sm"
                        width={20}
                        height={20}
                      />
                    </Card.Title>

                    <Card.Stats asChild>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-accent-foreground capitalize">
                          Visibility: {user.account_visibility}
                        </span>
                        <span className="text-xs text-accent-foreground">
                          Joined on: {formatDate(user.createdAt!, "mm/dd/yyyy")}
                        </span>
                      </div>
                    </Card.Stats>
                  </Card.Header>

                  <Card.Description>Email: {user.email}</Card.Description>
                </Card.Content>
              </Card.Root>
            )}
          />
        </div>
      }
      otherwise={<EmptyMessage variant="light">No users found.</EmptyMessage>}
    />
  );
}

export const metadata = {
  title: "Users • Admin",
  openGraph: {
    title: "Users • Admin",
    url: `https://libris-app.onrender.com/admin`,
  },
};
