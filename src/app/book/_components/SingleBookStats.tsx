import For from "~/components/helpers/For";
import { Badge } from "~/components/ui/badge";
import { getAllBookEntries_query } from "~/lib/db/book_entries/getAllBookEntries.query";
import { cn } from "~/lib/utils/utils";

export default async function SingleBookStats({
  className,
  statCountText = "Users",
  book_ID,
}: {
  className?: string;
  statCountText: string;
  book_ID: string | undefined;
}) {
  const allBookEntris = await getAllBookEntries_query();

  const completedUserCount = allBookEntris.filter(
    (entry) => entry.book_ID === book_ID && entry.status === "completed"
  );
  const readingUserCount = allBookEntris.filter(
    (entry) => entry.book_ID === book_ID && entry.status === "reading"
  );
  const on_holdUserCount = allBookEntris.filter(
    (entry) => entry.book_ID === book_ID && entry.status === "on_hold"
  );
  const droppedUserCount = allBookEntris.filter(
    (entry) => entry.book_ID === book_ID && entry.status === "dropped"
  );
  const planningUserCount = allBookEntris.filter(
    (entry) => entry.book_ID === book_ID && entry.status === "planning"
  );

  const stats = [
    {
      id: 1,
      title: "Completed",
      booksCount: completedUserCount.length,
      styles: {
        bg: "bg-green-500 hover:bg-green-400",
        text: "text-green-500",
      },
    },
    {
      id: 2,
      title: "Planning",
      booksCount: planningUserCount.length,
      styles: {
        bg: "bg-blue-500 hover:bg-blue-400",
        text: "text-blue-500",
      },
    },
    {
      id: 3,
      title: "Reading",
      booksCount: readingUserCount.length,
      styles: {
        bg: "bg-purple-500 hover:bg-purple-400",
        text: "text-purple-500",
      },
    },
    {
      id: 4,
      title: "On Hold",
      booksCount: on_holdUserCount.length,
      styles: {
        bg: "bg-cyan-500 hover:bg-cyan-400",
        text: "text-cyan-500",
      },
    },
    {
      id: 5,
      title: "Dropped",
      booksCount: droppedUserCount.length,
      styles: {
        bg: "bg-rose-500 hover:bg-rose-400",
        text: "text-rose-500",
      },
    },
  ];

  return (
    <div
      className={cn(
        "w-full flex-1 bg-light dark:bg-muted p-5 grid grid-cols-2 lg:grid-cols-5 gap-3",
        className
      )}
    >
      <For
        each={stats}
        render={(stat) => (
          <div
            key={stat.id}
            className={cn(
              "flex flex-col gap-2",
              stat.title === "Completed" && "col-span-2 lg:col-span-1"
            )}
          >
            <Badge
              className={cn(
                "rounded-sm h-8 justify-center font-normal text-sm text-primary-foreground",
                stat.styles.bg
              )}
            >
              {stat.title}
            </Badge>
            <div className="self-center text-xs text-accent-foreground flex items-center gap-1">
              <span className={cn(stat.styles.text, "text-sm")}>
                {stat.booksCount}
              </span>{" "}
              {statCountText}
            </div>
          </div>
        )}
      />
    </div>
  );
}
