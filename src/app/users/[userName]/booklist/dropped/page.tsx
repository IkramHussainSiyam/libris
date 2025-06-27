import BookEntryList from "../_components/BookEntryList";

export default async function UserProfileBooklistDroppedPage({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | undefined };
  params: { userName: string };
}) {
  return (
    <>
      <BookEntryList
        status="dropped"
        searchParams={searchParams}
        userName={params.userName}
      />
    </>
  );
}

export function generateMetadata({ params }: { params: { userName: string } }) {
  return {
    title: "Dropped - Booklist",
    openGraph: {
      title: "Dropped - Booklist",
      url: `https://libris.vercel.app/users/${params.userName}/booklist/dropped`,
    },
  };
}
