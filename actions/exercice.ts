"use server";
import { db } from "@/lib/db";

export async function createExercice({
  workoutId,
  exerciceId,
  sets,
  reps,
  weight,
  description,
}: {
  workoutId: string;
  exerciceId: string;
  sets: number;
  reps: number;
  weight: number;
  description: string;
}) {
  try {
    return await db.workoutExercice.create({
      data: {
        workoutId,
        exerciceId,
        sets,
        reps,
        weight,
        description,
        rpe: 0,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de créer l'exercice");
  }
}

export async function getExercicesByType(type: string) {
  return db.exercice.findMany({
    where: {
      type,
    },
  });
}

export async function getExercicesByWorkoutId(workoutId: string) {
  const workoutExercices = await db.workoutExercice.findMany({
    where: {
      workoutId,
    },
  });
  const exercices = await db.exercice.findMany({
    where: {
      id: {
        in: workoutExercices.map((we) => we.exerciceId),
      },
    },
  });
  return workoutExercices.map((we) => {
    const exercice = exercices.find((e) => e.id === we.exerciceId);
    return {
      ...we,
      ...exercice,
    };
  });
}
