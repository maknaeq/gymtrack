"use client";
import { useEffect, useState } from "react";
import { deleteGoal, getUserGoals } from "@/actions/goals";
import { getAllExercices } from "@/actions/exercice";
import { AllExercice } from "@/app/(app)/goals/components/CreateGoal";
import { useRouter } from "next/navigation";
import { setAchievedGoal } from "@/actions/goals";
import Button from "@/components/ui/Button";
import { Square, SquareCheck, Trash } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export interface UserGoals {
  id: string;
  userId: string;
  exerciceId: string;
  targetWeight: number;
  deadline: Date | null;
  isAchieved: boolean;
  createdAt: Date;
}

export default function GoalList({ user }: { user: { id: string; name: string; email: string; } | null }) {
  const [goals, setGoals] = useState<UserGoals[]>([]);
  const [exercises, setExercises] = useState<AllExercice[]>([]);
  const router = useRouter();
  useEffect(() => {
    async function fetchGoals() {
      //fetch goals
      const res = await getUserGoals(user?.id as string);
      setGoals(res);
    }

    async function fetchExercises() {
      //fetch exercises
      const res = await getAllExercices();
      setExercises(res);
    }

    try {
      fetchGoals();
      fetchExercises();
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  function findExerciseName(exerciseId: string) {
    return exercises.find((ex) => ex.id === exerciseId)?.name;
  }

  async function handleAchievedGoal(goal: UserGoals) {
    try {
      //update the goal
      await setAchievedGoal(goal.id, !goal.isAchieved);
      //then update the state
      router.refresh();
      // setGoals(goals.map((g) => g.id === goal.id ? { ...g, isAchieved: !g.isAchieved } : g));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteGoal(goal: UserGoals) {
    try {
      //delete the goal
      await deleteGoal(goal.id);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={"mt-4"}>
      <ul className={"space-y-2"}>
        {
          goals.map((goal) => (
            <li key={goal.id} className={"border rounded-md shadow-sm p-4 "}>
              <div className={"flex items-center justify-between"}>
                <div className={"flex items-center gap-4"}>

                  <h3>{findExerciseName(goal.exerciceId)}</h3>
                  <ArrowRightIcon />
                  <p>{goal.targetWeight}kg</p>
                </div>
                <div className={"flex items-center justify-between gap-2"}>
                  {
                    goal.isAchieved ? <p className={"text-green-500"}>Objectif atteint</p> :
                      <p className={"text-red-500"}>Objectif non atteint</p>
                  }
                  <Button
                    onClick={() => handleAchievedGoal(goal)} className={twMerge("p-3",
                    goal.isAchieved ? "text-green-500" : "text-red-500"
                  )} variant={"ghost"}>
                    {goal.isAchieved ? <SquareCheck size={20} /> : <Square size={20} />}
                  </Button>
                  <Button onClick={() => handleDeleteGoal(goal)} className={"p-3"}
                          variant={"ghost"}><Trash size={20} /></Button>
                </div>
              </div>
              <p className={"text-sm text-zinc-900/40"}>Jusqu&apos;au {goal.deadline?.toLocaleDateString()}</p>

            </li>
          ))
        }
      </ul>
    </div>
  );
}