import BookPreview from "~/components/common/bookcard/BookPreview";
import Card from "~/components/common/card/Card";
import Link from "~/components/common/others/Link";
import HoverCard from "~/components/ui/hover-card";
import { routes } from "~/lib/static-data/routes";
import { TBook } from "~/lib/types/books.type";
import AdminBookCardActions from "./AdminBookCardActions";
import {
  AdminBookCardSelector,
  BookCardSelectedIndicator,
} from "./AdminBookCardSelector";

export default async function AdminBookCard({ book }: Props) {
  return (
    <HoverCard content={<BookPreview bookInfo={book} />}>
      <Card.Root className="flex-col items-start w-36 bg-transparent dark:bg-transparent group/bookCard relative">
        <div className="relative">
          <Link href={routes.admin.books.details(book.slug!)}>
            <Card.Image
              containerClassName="w-36 h-52"
              src={book.cover_url}
              alt={book.name}
              width={128}
              height={192}
            />
          </Link>
          <AdminBookCardActions bookInfo={book} />
          <BookCardSelectedIndicator book={book} />
        </div>

        <Card.Content className="px-0">
          <Card.Header>
            <Link href={routes.admin.books.details(book.slug!)}>
              <Card.Title className="mt-2 line-clamp-2 text-xs group-hover/bookCard:text-secondary">
                {book.name}
              </Card.Title>
            </Link>
          </Card.Header>
        </Card.Content>
        <AdminBookCardSelector book={book} />
      </Card.Root>
    </HoverCard>
  );
}

type Props = {
  book: TBook;
};
