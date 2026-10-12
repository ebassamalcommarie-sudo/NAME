import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo-airge.png";

export function Logo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Airgé Agency — accueil" className="flex items-center gap-2">
      <Image src={logo} alt="Airgé" priority className={className} sizes="160px" />
      <span className="hidden font-display text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-muted sm:inline">
        Agency
      </span>
    </Link>
  );
}
