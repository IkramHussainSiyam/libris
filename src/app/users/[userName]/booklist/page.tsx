import BookEntryList from "./_components/BookEntryList";

export default async function UserProfileBooklistReadingPage({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | undefined };
  params: { userName: string };
}) {
  return (
    <>
      <BookEntryList
        status="reading"
        searchParams={searchParams}
        userName={params.userName}
      />
    </>
  );
}

export function generateMetadata({ params }: { params: { userName: string } }) {
  return {
    title: "Reading - Booklist",
    openGraph: {
      title: "Reading - Booklist",
      url: `https://libris.vercel.app/users/${params.userName}/booklist`,
    },
  };
}
