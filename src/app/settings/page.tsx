import ThemeSwitcher from "~/components/common/footer/ThemeSwitcher";
import AsyncBoundary from "~/components/helpers/AsyncBoundary";
import { getGeneralSettings_query } from "~/lib/db/settings/getGeneralSettings.query";
import GeneralSettingsForm from "./_components/GeneralSettingsForm";
import SettingsItem from "./_components/SettingsItem";

export default function ProfileSettingsPage() {
  const generalSettingsPromise = getGeneralSettings_query();

  return (
    <div className="space-y-8">
      <SettingsItem heading="Site Theme">
        {/* connect with db */}
        <ThemeSwitcher size="lg" variant="light" showTitle={false} />
      </SettingsItem>
      <AsyncBoundary>
        <GeneralSettingsForm generalSettingsPromise={generalSettingsPromise} />
      </AsyncBoundary>
    </div>
  );
}

export const metadata = {
  title: "Settings",
  openGraph: {
    title: "Settings",
    url: `https://libris-app.onrender.com/settings`,
  },
};
