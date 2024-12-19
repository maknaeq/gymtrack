import { getUserByEmail } from "@/actions/users";
import { getAllWorkoutExercicesFromUserId } from "@/actions/workoutExercices";
import { auth } from "@/auth";
import PerformanceChart, { ExerciceData } from "@/components/PerformanceChart";
import React from "react";

export type WorkoutExercice = {
  id: string;
  workoutId: string;
  workoutName: string | undefined;
  exerciceId: string;
  exerciceName: string | undefined;
  type: string | undefined;
  sets: number | null;
  reps: number | null;
  weight: number | null;
  duration: number | null;
  description: string | undefined;
  rpe: number | null;
  date: Date | undefined;
}[];

export type GroupedExercise = {
  workoutName: string;
  data: ExerciceData[];
};

function groupByWorkoutName(exercises: WorkoutExercice): GroupedExercise[] {
  const groupedExercises = exercises.reduce(
    (acc: Record<string, ExerciceData[]>, curr) => {
      if (!acc[curr.workoutName as string]) {
        acc[curr.workoutName as string] = [];
      }
      acc[curr.workoutName as string].push({
        date: curr.date as Date,
        weight: curr.weight,
        duration: curr.duration,
        sets: curr.sets as number,
        reps: curr.reps as number,
      });
      return acc;
    },
    {},
  );

  return Object.entries(groupedExercises).map(([key, value]) => ({
    workoutName: key,
    data: value,
  }));
}

async function Performances() {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email as string);
  const allWorkoutExercices = await getAllWorkoutExercicesFromUserId({
    userId: user?.id as string,
  });

  const groupedExercises = groupByWorkoutName(
    allWorkoutExercices as WorkoutExercice,
  ) as GroupedExercise[];

  return <PerformanceChart exercices={groupedExercises} />;
}

export default Performances;
