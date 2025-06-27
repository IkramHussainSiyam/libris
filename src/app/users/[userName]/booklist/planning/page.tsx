import BookEntryList from "../_components/BookEntryList";

export default async function UserProfileBooklistPlanningPage({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | undefined };
  params: { userName: string };
}) {
  return (
    <>
      <BookEntryList
        status="planning"
        searchParams={searchParams}
        userName={params.userName}
      />
    </>
  );
}

export function generateMetadata({ params }: { params: { userName: string } }) {
  return {
    title: "Planning - Booklist",
    openGraph: {
      title: "Planning - Booklist",
      url: `https://libris-app-eight.vercel.app/users/${params.userName}/booklist/planning`,
    },
  };
}
