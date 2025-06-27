import For from "~/components/helpers/For";

import { ChevronRight } from "lucide-react";
import Container from "~/components/common/others/Container";
import { Button } from "~/components/ui/button";
import { heroFeatures } from "~/lib/static-data/general";
import { routes } from "~/lib/static-data/routes";
import Link from "../others/Link";
import FeatureCard from "./FeatureCard";

export default function Hero() {
  return (
    <Container className="my-0 bg-deep-gray dark:bg-accent py-12 px-6 sm:px-10 lg:p-16 mb-24 lg:my-24 text-secondary-foreground relative">
      <div className="space-y-3 xl:space-y-4 flex flex-col items-center justify-center mb-14 xl:mb-20">
        <h1 className="text-3xl xl:text-4xl text-center font-semibold text-primary-foreground">
          The next-generation book platform
        </h1>
        <p className="text-base xl:text-lg font-light xl:w-1/2 text-center">
          Track, discover, and share your favorite books with Libris. Discover
          top-rated and popular books through reviews and recommendations. Sign
          up for free!
        </p>
      </div>
      <div className="w-full xl:w-5/6 mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-16 mb-6">
        <For
          each={heroFeatures}
          render={(feature) => (
            <FeatureCard
              key={feature.id}
              imgSrc={feature.imgSrc}
              imgAlt={feature.imgAlt}
              title={feature.title}
              description={feature.description}
            />
          )}
        />
      </div>
      <Button
        asChild
        size={"lg"}
        className="text-base pr-14 rounded-full hover:bg-primary hover:shadow-lg hover:shadow-primary/50 transition-all duration-500 absolute -bottom-5 left-1/2 -translate-x-1/2 [&_svg]:size-7 [&_svg]:bg-light [&_svg]:stroke-primary [&_svg]:rounded-full [&_svg]:p-1 [&_svg]:absolute [&_svg]:right-2.5 [&_svg]:pointer-events-none [&_svg]:select-none"
      >
        <Link href={routes.auth.signup}>
          Join Now <ChevronRight />
        </Link>
      </Button>
    </Container>
  );
}
