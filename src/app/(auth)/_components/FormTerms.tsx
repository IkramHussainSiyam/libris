export default function FormTerms() {
  return (
    <div className="text-balance text-center text-xs text-accent-foreground [&_a]:underline [&_a]:underline-offset-4">
      By clicking continue, you agree to our{" "}
      <a className="hover:text-primary" href="#">
        Terms of Service
      </a>{" "}
      and{" "}
      <a className="hover:text-primary" href="#">
        Privacy Policy
      </a>
      .
    </div>
  );
}
