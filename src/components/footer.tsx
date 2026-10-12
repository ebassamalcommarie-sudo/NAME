import Link from "next/link";
import { site, nav } from "@/content/site";
import { Logo } from "./logo";
import { PaymentMethods } from "./payment-methods";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-surface/50">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo className="h-8 w-auto" />
          <p className="max-w-sm text-sm leading-relaxed text-muted">{site.description}</p>
          <PaymentMethods compact />
        </div>
        <div>
          <p className="mb-4 font-display text-sm font-semibold text-text">Navigation</p>
          <ul className="space-y-3 text-sm text-muted">
            {nav.map((item) => (
              <li key={item.href}>
                <Link className="transition hover:text-brand-300" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="transition hover:text-brand-300" href="/mon-espace">
                Mon espace élève
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-4 font-display text-sm font-semibold text-text">Suivre Airgé</p>
          <ul className="space-y-3 text-sm text-muted">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a className="transition hover:text-brand-300" href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a className="transition hover:text-brand-300" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {site.name}. Tous droits réservés.</p>
          <div className="flex gap-5">
            <Link className="hover:text-text" href="/cgv">
              Conditions de vente
            </Link>
            <Link className="hover:text-text" href="/confidentialite">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
