import FooterLinks from "./FooterLinks";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Footer() {
  return (
    <footer className="bg-deep-gray text-muted-foreground">
      <div className="py-16 container grid gap-12 grid-cols-1 sm:grid-cols-3 lg:grid-cols-5">
        <ThemeSwitcher />
        <FooterLinks />
        <FooterLinks />
        <FooterLinks />
        <FooterLinks />
      </div>
    </footer>
  );
}
