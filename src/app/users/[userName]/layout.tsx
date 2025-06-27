import { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "~/components/common/others/Container";
import If from "~/components/helpers/If";
import Alert from "~/components/layout/error/Alert";
import { getSingleUser_query } from "~/lib/db/users/getSingleUser.query";
import UserMetadata from "../_components/UserMetadata";
import UserNavLinks from "../_components/UserNavLinks";
import { validateUserPrivacy } from "../_hooks/validateUserPrivacy";

export default async function UserProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { userName: string };
}) {
  const { isUserExists, isShowPrivacyWarning } = await validateUserPrivacy({
    userName: params.userName,
  });

  if (!isUserExists) {
    notFound();
  }

  return (
    <div>
      <UserMetadata user_name={params.userName} />
      <If
        condition={isShowPrivacyWarning}
        then={
          <Container className="my-2 md:my-2">
            <Alert
              className="border-none rounded-none bg-primary text-primary-foreground"
              variant="info"
              message="This account is private"
              details="Only followers can view this account"
            />
          </Container>
        }
        otherwise={
          <>
            <div className="bg-light dark:bg-muted">
              <Container className="my-0 md:my-0">
                <UserNavLinks user_name={params.userName} />
              </Container>
            </div>
            <Container className="my-8 md:my-8">{children}</Container>
          </>
        }
      />
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { userName: string };
}): Promise<Metadata> {
  const singleUser = await getSingleUser_query({
    user_name: params.userName,
    options: { select: { image: true } },
  });

  return {
    title: {
      default: `${params.userName}'s profile`,
      template: `%s • ${params.userName}'s profile • Libris`,
    },
    keywords: `libris, libris user, profile, user details, libris user profile, libris ${params.userName}, ${params.userName} libris`,
    openGraph: {
      title: {
        default: `${params.userName}'s profile`,
        template: `%s • ${params.userName}'s profile • Libris`,
      },
      url: `https://libris.vercel.app/users/${params.userName}`,
      images: singleUser?.image ?? "https://placehold.co/64x64/png",
    },
  };
}
