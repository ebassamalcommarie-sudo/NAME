"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRight, Loader2, Lock } from "lucide-react";
import { startCheckout, type CheckoutState } from "@/app/actions/checkout";

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary w-full justify-center text-base">
      {pending ? (
        <>
          <Loader2 className="size-5 animate-spin" aria-hidden /> Redirection vers le paiement…
        </>
      ) : (
        <>
          {label} <ArrowRight className="size-5" aria-hidden />
        </>
      )}
    </button>
  );
}

export function BuyButton({ productId, returnTo, label }: { productId: string; returnTo: string; label: string }) {
  const [state, action] = useActionState<CheckoutState, FormData>(startCheckout, undefined);
  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="returnTo" value={returnTo} />
      <Submit label={label} />
      {state?.error && (
        <p role="alert" className="rounded-2xl border border-orange-money/30 bg-orange-money/10 px-4 py-3 text-sm text-orange-200">
          {state.error}
        </p>
      )}
      <p className="flex items-center justify-center gap-1.5 text-xs text-muted">
        <Lock className="size-3.5" aria-hidden /> Paiement sécurisé · Orange Money, MTN MoMo, carte
      </p>
    </form>
  );
}
