import BookEntryList from "../_components/BookEntryList";

export default async function UserProfileBooklistCompletedPage({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | undefined };
  params: { userName: string };
}) {
  return (
    <>
      <BookEntryList
        status="completed"
        searchParams={searchParams}
        userName={params.userName}
      />
    </>
  );
}

export function generateMetadata({ params }: { params: { userName: string } }) {
  return {
    title: "Completed - Booklist",
    openGraph: {
      title: "Completed - Booklist",
      url: `https://libris-app.onrender.com/users/${params.userName}/booklist/completed`,
    },
  };
}
