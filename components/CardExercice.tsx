"use client";
import { ArrowRightIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import Button from "./ui/Button";
import { findUserPrsByExerciseId } from "@/actions/prs";

type Exercice = {
  id: string;
  name?: string | undefined;
  type?: string | undefined;
  muscleGroup?: string | null | undefined;
  weight: number | null;
  sets: number;
  reps: number;
  workoutId: string;
  description: string | null;
  exerciceId: string;
  rpe: number | null;
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
  console.log(pr);

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
    <div className="mx-auto max-w-[640px] rounded-md bg-zinc-100 p-1">
      <li className="flex items-center justify-between rounded-md border bg-white p-4 shadow-sm">
        <div>
          <h3 className="font-bold">{exercice.name}</h3>
          <div className={exercice.description ? "space-y-2" : ""}>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-blue-500">{exercice.weight}kg</p>
              <ArrowRightIcon />
              <p>
                {exercice.sets} x{" "}
                {exercice.reps > 1
                  ? exercice.reps + "reps"
                  : exercice.reps + "rep"}
              </p>
            </div>
            <p className="text-zinc-400/60">
              {exercice.description && exercice.description}
            </p>
          </div>
        </div>
        <Button variant="ghost" className="px-5 py-1 shadow-none">
          <DotsHorizontalIcon />
        </Button>
      </li>
      <p>{pr.length > 0 ? "PR actuel: " + pr[0].weight + "kg" : ""}</p>
    </div>
  );
}

export default CardExercice;
