import BookEntryList from "../_components/BookEntryList";

export default async function UserProfileBooklistOnHoldPage({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | undefined };
  params: { userName: string };
}) {
  return (
    <>
      <BookEntryList
        status="on_hold"
        searchParams={searchParams}
        userName={params.userName}
      />
    </>
  );
}

export function generateMetadata({ params }: { params: { userName: string } }) {
  return {
    title: "On hold - Booklist",
    openGraph: {
      title: "On hold - Booklist",
      url: `https://libris-app.vercel.app/users/${params.userName}/booklist/on_hold`,
    },
  };
}
