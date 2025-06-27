import Link from "~/components/common/others/Link";
import { routes } from "~/lib/static-data/routes";
import AuthForm from "../_components/AuthForm";

export default function LoginPage() {
  return (
    <AuthForm
      title="Welcome back again!"
      description="Login with your social account."
    >
      <div className="text-center text-sm">
        New to Libris?{" "}
        <Link
          href={routes.auth.signup}
          className="underline underline-offset-4"
        >
          Join now
        </Link>
      </div>
    </AuthForm>
  );
}

export const metadata = {
  title: "Login",
  openGraph: {
    title: "Login",
    url: `https://libris.up.railway.app/signup`,
  },
};
