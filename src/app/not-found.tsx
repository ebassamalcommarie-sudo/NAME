import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page grid min-h-[60vh] place-items-center py-20 text-center">
      <div className="space-y-5">
        <p className="font-display text-7xl font-extrabold text-gradient">404</p>
        <h1 className="font-display text-2xl font-bold">Cette page n&apos;existe pas (ou plus).</h1>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Retour à l&apos;accueil
          </Link>
          <Link href="/formations" className="btn-secondary">
            Voir les formations
          </Link>
        </div>
      </div>
    </section>
  );
}
