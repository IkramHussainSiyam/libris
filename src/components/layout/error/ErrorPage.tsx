import Link from "~/components/common/others/Link";
import If from "~/components/helpers/If";
import { Button } from "~/components/ui/button";
import { routes } from "~/lib/static-data/routes";

export default function ErrorPage(props: IErrorPageProps) {
  return (
    <div className="h-full my-28 grid place-items-center overflow-hidden">
      <div className="flex flex-col items-center gap-2 font-display">
        <div className="text-[450px] leading-[0.9] font-bold">404</div>
        <div className="text-5xl font-medium mb-2">Opps!</div>
        <div className="text-xl flex flex-col items-center gap-1">
          <If
            condition={props.message !== undefined}
            then={<u className="underline-offset-8">{props.message}</u>}
            otherwise={
              <u className="underline-offset-8">Requested page not found</u>
            }
          />
        </div>
        <Button
          asChild
          className="mt-5 text-base bg-deep-gray hover:bg-deep-gray/80 dark:bg-light dark:hover:bg-light/80 dark:text-accent"
        >
          <Link href={routes.home}>Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}

type IErrorPageProps = {
  message?: string;
};
