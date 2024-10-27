import {
  getExercicesByType,
  getExercicesByWorkoutId,
} from "@/actions/exercice";
import { getWorkoutById } from "@/actions/sessions";
import AddExercise from "@/components/AddExercise";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { auth } from "@/auth";
import Link from "next/link";
import CardExercice from "@/components/CardExercice";

async function page({ params }: { params: { id: string } }) {
  const workoutSession = await getWorkoutById(params.id);
  const availableExercises = workoutSession
    ? await getExercicesByType(workoutSession?.type)
    : null;
  const exercices = await getExercicesByWorkoutId(params.id);
  const user = await auth();
  return (
    <div>
      <Link
        href={"/sessions"}
        className="flex items-center gap-1 text-sm text-slate-500 underline-offset-2 hover:underline"
      >
        <ArrowLeftIcon />
        Liste des sessions
      </Link>
      <div className="mb-3 mt-8">
        <p className="text-sm">
          Le{" "}
          {workoutSession?.date.toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
        <div className="mx-auto mt-10 flex max-w-[640px] items-center justify-between">
          <h1 className="text-2xl font-bold">Exercices</h1>
          <AddExercise
            exercices={availableExercises}
            workoutId={params.id}
            workoutType={workoutSession?.type as string}
          />
        </div>
      </div>
      <div>
        <ul className="space-y-2">
          {exercices.map((exercice) => (
            <CardExercice
              exercice={exercice}
              key={exercice.id}
              userId={user?.user?.id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default page;
