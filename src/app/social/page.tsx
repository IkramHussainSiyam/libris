import Container from "~/components/common/others/Container";
import AsyncBoundary from "~/components/helpers/AsyncBoundary";
import ActivityBar from "./_components/activity/ActivityBar";
import ListProgressBar from "./_components/list-progress/ListProgressBar";

export default function SocialPage() {
  return (
    <Container className="flex flex-col xl:flex-row gap-10">
      <AsyncBoundary loadingWithBg>
        <ActivityBar />
      </AsyncBoundary>
      <ListProgressBar />
    </Container>
  );
}

export const metadata = {
  title: "Social Activities",
  openGraph: {
    title: "Social Activities",
    url: `https://libris.up.railway.app/social`,
  },
};
