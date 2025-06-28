import Show from "~/components/helpers/Show";
import { adminEmail } from "~/lib/db/_config/main";
import { getSessionUser_query } from "~/lib/db/_config/session";
import { getUsersAccountSettings_query } from "~/lib/db/settings/getAccountSettings.query";
import { getAllUsers_query } from "~/lib/db/users/getAllUsers.query";
import SettingsItem from "../_components/SettingsItem";
import AccountSettingsForm from "./_components/AccountSettingsForm";
import DeleteAccount from "./_components/DeleteAccount";

export default async function GeneralSettingsPage() {
  const sessionUser = await getSessionUser_query({ select: { email: true } });
  const allUsersPromise = getAllUsers_query();
  const accountSettingsPromise = getUsersAccountSettings_query();

  return (
    <div className="space-y-6">
      <AccountSettingsForm
        accountSettingsPromise={accountSettingsPromise}
        allUsersPromise={allUsersPromise}
      />
      <Show when={sessionUser?.email !== adminEmail}>
        <SettingsItem heading="Danger Zone" className="text-sm">
          <h4 className="text-destructive mb-1.5">Delete User Account</h4>
          <p className="text-accent-foreground mb-3">
            Warning! This will permanently delete all your account data.
          </p>
          <DeleteAccount />
        </SettingsItem>
      </Show>
    </div>
  );
}

export const metadata = {
  title: "Account Settings",
  openGraph: {
    title: "Account Settings",
    url: `https://libris-app.onrender.com/account`,
  },
};
