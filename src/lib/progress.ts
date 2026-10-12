import "server-only";
import { createClient } from "@/lib/supabase/server";

export async function getCompletedLessonIds(userId: string): Promise<Set<string>> {
  const supabase = await createClient();
  const { data } = await supabase.from("lesson_progress").select("lesson_id").eq("user_id", userId);
  return new Set((data ?? []).map((r) => r.lesson_id as string));
}
