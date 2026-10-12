import Link from "next/link";
import { nav } from "@/content/site";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/75 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Navigation principale" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted transition hover:bg-surface-2 hover:text-text"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/mon-espace"
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-text transition hover:bg-surface-2 sm:inline-flex"
          >
            Mon espace
          </Link>
          <Link href="/formations" className="btn-primary hidden !py-2 text-sm sm:inline-flex">
            Se former
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
