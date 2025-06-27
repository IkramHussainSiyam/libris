import SettingsItem from "../_components/SettingsItem";
import BooklistExporter from "./_components/BooklistExporter";
import BooklistImporter from "./_components/BooklistImporter";

export default function ImportListsSettingsPage() {
  return (
    <div className="space-y-8">
      <SettingsItem heading="Export your book lists (Make sure you don't change anything major.)">
        <BooklistExporter />
      </SettingsItem>
      <SettingsItem heading="Import Book List (Make sure you have correct exported '.json' file)">
        <BooklistImporter />
      </SettingsItem>
    </div>
  );
}

export const metadata = {
  title: "Import & Export Booklists",
  openGraph: {
    title: "Import & Export Booklists",
    url: `https://libris.vercel.app/import-export-lists`,
  },
};
