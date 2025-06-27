"use client";
import Image from "next/image";
import { FaDiscord, FaGithub, FaGoogle, FaReddit } from "react-icons/fa6";
import { toast } from "sonner";
import Link from "~/components/common/others/Link";
import SubmitButton from "~/components/common/submit/SubmitButton";
import For from "~/components/helpers/For";
import LoadingText from "~/components/layout/loading/LoadingText";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { authClient } from "~/lib/auth-client";
import assets from "~/lib/static-data/assets";
import { routes } from "~/lib/static-data/routes";
import { cn } from "~/lib/utils/utils";
import FormTerms from "./FormTerms";

const authButtons: TAuthButtons[] = [
  {
    id: 1,
    provider: "google",
    content: (
      <>
        <FaGoogle /> Login with Google
      </>
    ),
  },
  {
    id: 2,
    provider: "reddit",
    content: (
      <>
        <FaReddit /> Login with Reddit
      </>
    ),
  },
  {
    id: 3,
    provider: "discord",
    content: (
      <>
        <FaDiscord /> Login with Discord
      </>
    ),
  },
  {
    id: 4,
    provider: "github",
    content: (
      <>
        <FaGithub /> Login with Github
      </>
    ),
  },
];

export default function AuthForm({
  className,
  children,
  title,
  description,
  ...props
}: {
  title: string;
  description: string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">) {
  // -

  async function signInUserAction(formData: FormData) {
    const provider = formData.get("provider") as TAuthProviders;
    await authClient.signIn.social(
      {
        provider,
        callbackURL: routes.social.list,
        newUserCallbackURL: routes.settings.account,
        errorCallbackURL: routes.error,
      },
      {
        onError(error) {
          toast.error(error.error.message);
          console.error(error.error);
        },
      }
    );
  }

  return (
    <div className="my-10 flex flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-[420px] flex-col gap-6">
        <Link
          href={routes.home}
          className="flex items-center gap-1 self-center font-medium text-lg"
        >
          <Image
            src={assets.logo.src}
            alt={assets.logo.alt}
            width={36}
            height={36}
          />
          Libris.
        </Link>
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card className="border-border/50">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <For
                    each={authButtons}
                    render={(item) => (
                      <form action={signInUserAction}>
                        <SubmitButton
                          key={item.id}
                          value={item.provider}
                          render={(pending) =>
                            pending ? (
                              <LoadingText showDots noText dotSize="8px" />
                            ) : (
                              item.content
                            )
                          }
                          name="provider"
                          variant={"outlined"}
                          className="w-full"
                        />
                      </form>
                    )}
                  />
                </div>

                {children}
              </div>
            </CardContent>
          </Card>
          <FormTerms />
        </div>
      </div>
    </div>
  );
}
type TAuthButtons = {
  id: number;
  provider: TAuthProviders;
  content: React.ReactNode;
};

type TAuthProviders =
  | "apple"
  | "discord"
  | "facebook"
  | "github"
  | "google"
  | "microsoft"
  | "spotify"
  | "twitch"
  | "twitter"
  | "dropbox"
  | "linkedin"
  | "gitlab"
  | "tiktok"
  | "reddit"
  | "roblox"
  | "vk"
  | "kick"
  | "zoom";
