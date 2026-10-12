"use client";

import { useTransition } from "react";
import { Check, Loader2 } from "lucide-react";
import { setLessonCompleted } from "@/app/actions/progress";

export function CompleteToggle({ lessonId, completed }: { lessonId: string; completed: boolean }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => setLessonCompleted(lessonId, !completed))}
      className={completed ? "btn-secondary !py-2.5 text-sm" : "btn-primary !py-2.5 text-sm"}
    >
      {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Check className="size-4" aria-hidden />}
      {completed ? "Vidéo terminée" : "Marquer comme terminée"}
    </button>
  );
}
