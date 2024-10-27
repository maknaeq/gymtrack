"use client";
import { ArrowRightIcon, ReloadIcon, TrashIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import Button from "./ui/Button";
import { findUserPrsByExerciseId } from "@/actions/prs";
import { deleteWorkoutExerciceById } from "@/actions/exercice";
import { useRouter } from "next/navigation";

type Exercice = {
  id: string;
  name?: string | undefined;
  type?: string | undefined;
  muscleGroup?: string | null | undefined;
  weight: number | null;
  sets: number | null;
  reps: number | null;
  workoutId: string;
  description: string | null;
  exerciceId: string;
  rpe: number | null;
  duration: number | null;
};

type Pr = {
  userId: string;
  id: string;
  exerciceId: string;
  weight: number;
  date: Date;
  createdAt: Date;
}[];

function CardExercice({
  exercice,
  userId,
}: {
  exercice: Exercice;
  userId: string | undefined;
}) {
  const [pr, setPr] = useState<Pr>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchPr = async () => {
      try {
        const res = await findUserPrsByExerciseId({
          userId,
          exerciceId: exercice.exerciceId,
        });
        setPr(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPr();
  }, [userId, exercice.exerciceId]);
  return (
    <div className="mx-auto max-w-[640px] rounded-md bg-slate-100 p-1">
      <li className="flex items-center justify-between rounded-md border bg-white p-4 shadow-sm">
        <div>
          <h3 className="font-bold">{exercice.name}</h3>
          <div className={exercice.description ? "space-y-2" : ""}>
            <div className="flex items-center gap-2">
              {exercice.type !== "cardio" ? (
                <>
                  <p className="font-semibold text-blue-500">
                    {exercice.weight}kg
                  </p>
                  <ArrowRightIcon />
                  <p>
                    {exercice.sets} x{" "}
                    {exercice.reps && exercice.reps > 1
                      ? exercice.reps + "reps"
                      : exercice.reps + "rep"}
                  </p>
                </>
              ) : (
                <p className="text-sm text-blue-500">{exercice.duration} min</p>
              )}
            </div>
            <p className="px-4 text-slate-400/60">
              {exercice.description && exercice.description}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="px-5 py-1 shadow-none"
          disabled={isDeleting}
          onClick={async () => {
            setIsDeleting(true);
            await deleteWorkoutExerciceById(exercice.id);
            setTimeout(() => {
              setIsDeleting(false);
              router.refresh();
            }, 1000);
          }}
        >
          {!isDeleting ? (
            <TrashIcon />
          ) : (
            <ReloadIcon className="animate-spin" />
          )}
        </Button>
      </li>
      <p>{pr.length > 0 ? "PR actuel: " + pr[0].weight + "kg" : ""}</p>
    </div>
  );
}

export default CardExercice;
