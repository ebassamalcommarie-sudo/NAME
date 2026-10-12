import { CreditCard } from "lucide-react";

export function PaymentMethods({ compact = false }: { compact?: boolean }) {
  const chip = compact ? "px-2.5 py-1 text-[0.7rem]" : "px-3.5 py-1.5 text-xs";
  return (
    <ul className="flex flex-wrap items-center gap-2" aria-label="Moyens de paiement acceptés">
      <li className={`${chip} rounded-full bg-orange-money/15 font-semibold text-orange-money ring-1 ring-orange-money/30`}>
        Orange Money
      </li>
      <li className={`${chip} rounded-full bg-mtn/15 font-semibold text-mtn ring-1 ring-mtn/30`}>MTN MoMo</li>
      <li className={`${chip} inline-flex items-center gap-1.5 rounded-full bg-white/8 font-semibold text-text ring-1 ring-white/15`}>
        <CreditCard className="size-3.5" aria-hidden /> Visa · Mastercard
      </li>
    </ul>
  );
}
