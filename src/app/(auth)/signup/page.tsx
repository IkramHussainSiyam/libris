import Link from "~/components/common/others/Link";
import { routes } from "~/lib/static-data/routes";
import AuthForm from "../_components/AuthForm";

export default function SignupPage() {
  return (
    <AuthForm
      title="Welcome to Libris!"
      description="Sign up with your social account."
    >
      <div className="text-center text-sm">
        Already joined?{" "}
        <Link href={routes.auth.login} className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </AuthForm>
  );
}

export const metadata = {
  title: "Sign up",
  openGraph: {
    title: "Sign up",
    url: `https://libris-app-eight.vercel.app/signup`,
  },
};
