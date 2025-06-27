import { Star } from "lucide-react";
import For from "~/components/helpers/For";
import { Badge } from "~/components/ui/badge";
import { getCurrentBooksSubjects_query } from "~/lib/db/subjects/getCurrentBooksSubject.query";
import { TBook } from "~/lib/types/books.type";
import { formatDate } from "~/lib/utils/date-formatter";
import Card from "../card/Card";

export default async function BookPreview({ bookInfo }: Props) {
  const { currentBooksSubjects } = await getCurrentBooksSubjects_query({
    currentBooksSubIds: bookInfo.subject_IDs,
  });

  return (
    <Card.Root>
      <Card.Content className="px-0">
        <Card.Header>
          <Card.Title className="text-sm font-semibold line-clamp-2">
            {bookInfo.name}
          </Card.Title>
          <Card.Stats className="flex items-center gap-2">
            <div className="flex items-centerg gap-1">
              <Star className="stroke-none fill-amber-500 size-4" />
              <span className="text-accent-foreground">4.5</span>
            </div>
          </Card.Stats>
        </Card.Header>

        <Card.Description asChild>
          <div className="space-y-1 text-xs">
            <span className="text-primary block">{bookInfo.author}</span>
            <div className="flex items-center gap-1.5 text-accent-foreground">
              <span>{formatDate(bookInfo.published_date, "abbreviated")}</span>
              <span>•</span>
              <span>{bookInfo.total_pages} pages</span>
            </div>
          </div>
        </Card.Description>
        <Card.Footer>
          <div className="flex items-center flex-wrap gap-x-1.5 gap-y-2">
            <For
              each={currentBooksSubjects}
              render={(sub) => (
                <Badge key={sub.id} className="capitalize">
                  {sub.name}
                </Badge>
              )}
            />
          </div>
        </Card.Footer>
      </Card.Content>
    </Card.Root>
  );
}

type Props = {
  bookInfo: TBook;
};
