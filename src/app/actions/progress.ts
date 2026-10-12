"use server";

import { refresh } from "next/cache";
import { packs } from "@/content/catalogue";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export async function setLessonCompleted(lessonId: string, completed: boolean) {
  const user = await getCurrentUser();
  if (!user) return;
  if (!packs.some((p) => p.lessons.some((l) => l.id === lessonId))) return;

  const supabase = await createClient();
  if (completed) {
    await supabase.from("lesson_progress").upsert({ user_id: user.id, lesson_id: lessonId }, { onConflict: "user_id,lesson_id" });
  } else {
    await supabase.from("lesson_progress").delete().eq("user_id", user.id).eq("lesson_id", lessonId);
  }
  refresh();
}
