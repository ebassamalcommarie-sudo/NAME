import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/content/site";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink("Bonjour Airgé Agency, j'aimerais en savoir plus sur vos services.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter avec Airgé sur WhatsApp"
      className="fixed right-4 bottom-4 z-30 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/40 transition hover:scale-105 active:scale-95"
    >
      <MessageCircle className="size-7" aria-hidden />
    </a>
  );
}
