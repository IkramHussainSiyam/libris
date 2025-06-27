import AsyncBoundary from "~/components/helpers/AsyncBoundary";
import AddSubjectForm from "./_components/AddSubjectForm";
import Subjectlist from "./_components/Subjectlist";
import { SelectedSubjectsAction } from "./_components/SubjectSelector";

export default function SubjectPage() {
  return (
    <div className="space-y-4">
      <AddSubjectForm />
      <SelectedSubjectsAction />
      <div className="bg-light dark:bg-muted p-5 max-h-[calc(100vh-10rem)] scroll-area">
        <AsyncBoundary>
          <Subjectlist />
        </AsyncBoundary>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Subjects • Admin",
  openGraph: {
    title: "Subjects • Admin",
    url: `https://libris.vercel.app/admin/subjects`,
  },
};
