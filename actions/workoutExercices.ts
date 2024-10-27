"use server";
import { db } from "@/lib/db";

export async function getSessionExercices({
  workoutId,
}: {
  workoutId: string;
}) {
  const workoutExerciceId = await db.workoutExercice.findMany({
    where: {
      workoutId,
    },
  });
  const exerciceName = await db.exercice.findMany({
    where: {
      id: {
        in: workoutExerciceId.map((we) => we.exerciceId),
      },
    },
  });
  return workoutExerciceId.map((we) => {
    const exercice = exerciceName.find((e) => e.id === we.exerciceId);
    return {
      id: we.id,
      name: exercice?.name,
      sets: we.sets,
      reps: we.reps,
      weight: we.weight,
      description: we.description,
      rpe: we.rpe,
    };
  });
}
