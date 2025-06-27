import Image from "next/image";
import Link from "~/components/common/others/Link";
import assets from "~/lib/static-data/assets";
import { routes } from "~/lib/static-data/routes";

export default function Logo() {
  return (
    <Link href={routes.home} className="flex items-center">
      <Image
        src={assets.logo.src}
        alt={assets.logo.alt}
        width={50}
        height={50}
        className="mr-2 w-10"
      />
      <span className="inline-block text-2xl font-semibold text-primary-foreground capitalize">
        Libris
      </span>
    </Link>
  );
}
