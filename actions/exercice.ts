"use server";
import { db } from "@/lib/db";

export async function createExercice({
  workoutId,
  exerciceId,
  sets,
  reps,
  weight,
  duration,
  description,
}: {
  workoutId: string;
  exerciceId: string;
  sets: number;
  reps: number;
  weight: number;
  duration: number;
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
        rpe: 0,
        duration,
        description,
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
      id: we.id,
      workoutId: we.workoutId,
      exerciceId: we.exerciceId,
      name: exercice?.name,
      sets: we.sets,
      reps: we.reps,
      weight: we.weight,
      description: we.description,
      rpe: we.rpe,
      duration: we.duration,
      type: exercice?.type,
    };
  });
}

export async function deleteWorkoutExerciceById(id: string) {
  const exercice = await db.workoutExercice.findUnique({
    where: { id },
  });

  if (!exercice) {
    throw new Error("Exercice not found");
  }
  try {
    return await db.workoutExercice.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Delete Error Details:", error); // Log full error
    throw new Error("Impossible de supprimer l'exercice");
  }
}

export async function updateWorkoutExercice({
  id,
  workoutId,
  exerciceId,
  sets,
  reps,
  weight,
  duration,
  description,
}: {
  id: string;
  workoutId: string;
  exerciceId: string;
  sets: number;
  reps: number;
  weight: number;
  duration: number;
  description: string;
}) {
  try {
    return await db.workoutExercice.update({
      where: {
        id,
      },
      data: {
        sets,
        workoutId,
        exerciceId,
        reps,
        weight,
        duration,
        description,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de mettre à jour l'exercice");
  }
}
