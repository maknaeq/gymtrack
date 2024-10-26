"use server";
import { db } from "@/lib/db";

export async function findUserPrsByExerciseId({
  userId,
  exerciceId,
}: {
  userId: string | undefined;
  exerciceId: string;
}) {
  if (!userId) {
    return [];
  }
  return await db.pR.findMany({
    where: {
      userId,
      exerciceId,
    },
  });
}
