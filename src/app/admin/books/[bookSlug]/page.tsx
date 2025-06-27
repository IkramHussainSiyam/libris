import Image from "next/image";
import EmptyMessage from "~/components/common/others/EmptyMessage";
import Link from "~/components/common/others/Link";
import RenderRichText from "~/components/common/others/RenderRichText";
import For from "~/components/helpers/For";
import If from "~/components/helpers/If";
import { validateParam } from "~/lib/db/_config/validateParam";
import { getAllBooks_query } from "~/lib/db/books/getAllBooks.query";
import { getRelatedBooks_query } from "~/lib/db/books/getRelatedBooks.query";
import { getSingleBook_query } from "~/lib/db/books/getSingleBook.query";
import { getCurrentBooksSubjects_query } from "~/lib/db/subjects/getCurrentBooksSubject.query";
import { routes } from "~/lib/static-data/routes";
import { formatDate } from "~/lib/utils/date-formatter";

export default async function AdminBookDetailsPage({
  params,
}: {
  params: { bookSlug: string };
}) {
  await validateParam(getAllBooks_query, "slug", params, "bookSlug");

  const singleBook = await getSingleBook_query({ slug: params.bookSlug });
  const [{ relatedBooks }, { currentBooksSubjects }] = await Promise.all([
    getRelatedBooks_query(singleBook?.related_book_IDs as string[]),
    getCurrentBooksSubjects_query({
      currentBooksSubIds: singleBook?.subject_IDs as string[],
    }),
  ]);

  return (
    <div className="bg-light dark:bg-muted p-4 flex items-start gap-4 max-w-fit">
      <div className="w-56 h-80 overflow-hidden">
        <Image
          className="w-full object-cover"
          src={singleBook?.cover_url || "https://placehold.co/224x320/png"}
          alt={singleBook?.name || "Book Cover"}
          width={224}
          height={320}
        />
      </div>
      <div className="flex-1 text-sm">
        <h3 className="text-2xl font-medium mb-3">{singleBook?.name}</h3>
        <div className="mb-5 leading-[1.4] max-h-24 h-fit scroll-area">
          <RenderRichText richTextContents={singleBook?.description || ""} />
        </div>
        <ul className="flex items-center flex-wrap gap-x-4 gap-y-2 max-h-20 h-full scroll-area">
          <li>
            Author:{" "}
            <span className="text-accent-foreground font-medium">
              {singleBook?.author}
            </span>
          </li>
          <li>
            Total Pages:{" "}
            <span className="text-accent-foreground font-medium">
              {singleBook?.total_pages}
            </span>
          </li>
          <li>
            Published Date:{" "}
            <span className="text-accent-foreground font-medium">
              {formatDate(singleBook?.published_date ?? "", "abbreviated")}
            </span>
          </li>
          <li>
            Subjects:{" "}
            <span className="text-accent-foreground font-medium">
              {currentBooksSubjects.map((sub) => sub.name).join(", ") || "N/A"}
            </span>
          </li>
          <li>
            Popularity:{" "}
            <span className="text-accent-foreground font-medium">
              0 {/* calculate based on how many people completed this book */}
            </span>
          </li>
          <li>
            Favorites:{" "}
            <span className="text-accent-foreground font-medium">
              {singleBook?.favored_by_user_IDs.length}
            </span>
          </li>
          <li>
            Average Score:{" "}
            <span className="text-accent-foreground font-medium">95%</span>{" "}
            {/* calculate based on review scores */}
          </li>
        </ul>
        <div className="mt-4 space-y-1.5">
          <h5>Related Books:</h5>
          <div className="flex flex-wrap gap-2.5 [&_a]:text-accent-foreground [&_span]:text-accent-foreground h-fit max-h-20 scroll-area">
            <If
              condition={relatedBooks.length > 0}
              then={
                <For
                  each={relatedBooks}
                  render={(book) => (
                    <Link
                      key={book.id}
                      href={routes.admin.books.details(book.slug ?? "")}
                      className="block cursor-pointer link border-r-2 pr-2.5 last:border-none last:pr-0"
                    >
                      {book.name}
                    </Link>
                  )}
                />
              }
              otherwise={<EmptyMessage>No Related Books...</EmptyMessage>}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { bookSlug: string };
}) {
  const book = await getSingleBook_query({ slug: params.bookSlug });

  return {
    title: `${book?.name} • Book Details • Admin`,
    openGraph: {
      title: `${book?.name} • Book Details • Admin`,
      url: `https://libris-app-eight.vercel.app/admin/books/${params.bookSlug}`,
    },
  };
}
