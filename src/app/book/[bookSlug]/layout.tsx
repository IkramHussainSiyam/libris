import Container from "~/components/common/others/Container";
import AsyncBoundary from "~/components/helpers/AsyncBoundary";
import { validateParam } from "~/lib/db/_config/validateParam";
import { getAllBooks_query } from "~/lib/db/books/getAllBooks.query";
import { getSingleBook_query } from "~/lib/db/books/getSingleBook.query";
import ContentSidebar from "../_components/content/ContentSidebar";
import DetailsHeader from "../_components/DetailsHeader";

export default async function BookDetailsLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { bookSlug: string };
}>) {
  await validateParam(getAllBooks_query, "slug", params, "bookSlug");

  return (
    <div className="shadow-sm shadow-muted/5">
      <DetailsHeader bookSlug={params.bookSlug} />
      <Container className="my-8 flex flex-col sm:flex-row gap-10">
        <ContentSidebar bookSlug={params.bookSlug} />
        <div className="flex-1">
          <AsyncBoundary>{children}</AsyncBoundary>
        </div>
      </Container>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { bookSlug: string };
}) {
  const singleBook = await getSingleBook_query({
    slug: params.bookSlug,
    options: { select: { name: true } },
  });

  return {
    title: `${singleBook?.name} • Book Details`,
    openGraph: {
      title: `${singleBook?.name} • Book Details`,
      url: `https://libris-app.onrender.com/book/${params.bookSlug}`,
    },
  };
}
