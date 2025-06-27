import EmptyMessage from "~/components/common/others/EmptyMessage";
import For from "~/components/helpers/For";
import If from "~/components/helpers/If";
import { getCurrentSubjectsBooks_query } from "~/lib/db/books/getCurrentSubjectsBooks.query";
import { getAllSubjects_query } from "~/lib/db/subjects/getAllSubjects.query";
import SubjectAction from "./SubjectAction";
import { SubjectSelector } from "./SubjectSelector";

export default async function Subjectlist() {
  const { allSubjects } = await getAllSubjects_query();

  return (
    <If
      condition={allSubjects?.length > 0}
      then={
        <ul className="space-y-3">
          <For
            each={allSubjects}
            render={(subject) => (
              <li
                key={subject.id}
                className="flex items-center justify-between gap-6 text-sm border-b border-border/40 last:border-none last:pb-0 pb-3 rounded-sm"
              >
                <div className="flex items-center gap-2.5">
                  <SubjectSelector subject={subject} />
                  <div className="flex items-center gap-1.5">
                    <h6>{subject?.name}</h6>
                    <TotalBooks subjectId={subject.id} />
                  </div>
                </div>
                <SubjectAction subject={subject} />
              </li>
            )}
          />
        </ul>
      }
      otherwise={<EmptyMessage>No subjects found...</EmptyMessage>}
    />
  );
}

async function TotalBooks({ subjectId }: { subjectId: string }) {
  const currentSubjectsBooks = await getCurrentSubjectsBooks_query({
    subjectId,
  });
  return (
    <span className="text-xs text-accent-foreground/80">
      {currentSubjectsBooks?.length} books
    </span>
  );
}
