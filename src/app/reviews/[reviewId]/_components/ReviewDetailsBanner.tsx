import Image from "next/image";
import { getSingleBook_query } from "~/lib/db/books/getSingleBook.query";

export default async function ReviewDetailsBanner({
  reviewBookId,
}: {
  reviewBookId: string;
}) {
  const singleBook = await getSingleBook_query({
    slug: undefined,
    where: {
      id: reviewBookId,
    },
    options: {
      select: {
        cover_url: true,
        name: true,
      },
    },
  });

  return (
    <div className="absolute top-0 left-0 w-full">
      <div className="w-full h-64 mx-auto overflow-hidden relative">
        <Image
          className="size-full object-cover select-none pointer-events-none"
          src={singleBook?.cover_url ?? "https://placehold.co/1000x256/png"}
          alt={singleBook?.name ?? ""}
          width={1000}
          height={256}
        />
        <div className="absolute top-0 left-0 size-full bg-deep-gray/80" />
      </div>
    </div>
  );
}
