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
      type: exercice?.type,
      sets: we.sets,
      reps: we.reps,
      weight: we.weight,
      duration: we.duration,
      description: we.description,
      rpe: we.rpe,
    };
  });
}

export async function getAllWorkoutExercicesFromUserId({
  userId,
}: {
  userId: string;
}) {
  const workouts = await db.workout.findMany({
    where: {
      userId,
    },
  });
  const workoutExercices = await db.workoutExercice.findMany({
    where: {
      workoutId: {
        in: workouts.map((w) => w.id),
      },
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
    const workout = workouts.find((w) => w.id === we.workoutId);
    return {
      id: we.id,
      workoutId: we.workoutId,
      workoutName: exercice?.name,
      exerciceId: we.exerciceId,
      exerciceName: exercice?.name,
      type: exercice?.type,
      sets: we.sets,
      reps: we.reps,
      weight: we.weight,
      duration: we.duration,
      description: we.description,
      rpe: we.rpe,
      date: workout?.date,
    };
  });
}
