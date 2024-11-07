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

function groupByWorkoutName(exercises) {
  //format the data into : [{workoutName: nameOfTheExercice, data: [{date: date, weight: weight, duration: duration, sets: sets, reps: reps}]}]
  const groupedExercises = exercises.reduce((acc, curr) => {
    if (!acc[curr.workoutName]) {
      acc[curr.workoutName] = [];
    }
    acc[curr.workoutName].push({
      date: curr.date,
      weight: curr.weight,
      duration: curr.duration,
      sets: curr.sets,
      reps: curr.reps,
    });
    return acc;
  }, {});
  return Object.entries(groupedExercises).map(([key, value]) => {
    return {
      workoutName: key,
      data: value,
    };
  });
}

async function Performances() {
  const session = await auth();
  const allWorkoutExercices = await getAllWorkoutExercicesFromUserId({
    userId: session?.user?.id as string,
  });

  const groupedExercises = groupByWorkoutName(
    allWorkoutExercices,
  ) as GroupedExercise[];

  // console.log("all", allWorkoutExercices);

  return <PerformanceChart exercices={groupedExercises} />;
}

export default Performances;
