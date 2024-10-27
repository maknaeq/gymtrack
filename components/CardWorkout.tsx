import React, { useEffect, useState } from "react";
import { Workout } from "@/components/CalendarLayout";
import abs from "@/public/images/abs.png";
import back from "@/public/images/back.png";
import biceps from "@/public/images/biceps.png";
import calves from "@/public/images/calves.png";
import chest from "@/public/images/chest.png";
import hamstring from "@/public/images/hamstring.png";
import lowerBack from "@/public/images/lowerBack.png";
import quads from "@/public/images/quads.png";
import shoulder from "@/public/images/shoulder.png";
import Image, { StaticImageData } from "next/image";
import {
  ArrowTopRightIcon,
  DragHandleDots2Icon,
  TrashIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import Button from "@/components/ui/Button";
import { deleteWorkout } from "@/actions/sessions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSessionExercices } from "@/actions/workoutExercices";

type WorkoutType = "lowerBody" | "upperBody" | "fullBody" | "cardio";

type Exercice = {
  id: string;
  name: string | undefined;
  sets: number;
  reps: number;
  weight: number | null;
  description: string | null;
  rpe: number | null;
}[];

function CardWorkout({ workout }: { workout: Workout }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const typeFr: Record<
    WorkoutType,
    {
      text: string;
      // icon: StaticImageData[]
      icon: string;
    }
  > = {
    lowerBody: {
      text: "Bas du corps",
      // icon: [quads, hamstring, calves],
      icon: "🦵",
    },
    upperBody: {
      text: "Haut du corps",
      // icon: [chest, shoulder, biceps, back],
      icon: "🦾",
    },
    fullBody: {
      text: "Full body",
      // icon: [quads, hamstring, calves, chest, shoulder, biceps, back],
      icon: "🏋🏼",
    },
    cardio: {
      text: "Cardio",
      // icon: [abs, lowerBack],
      icon: "🫁",
    },
  };
  const [exercices, setExercices] = useState<Exercice>([]);

  useEffect(() => {
    const fetchExercices = async () => {
      try {
        const res = await getSessionExercices({
          workoutId: workout?.id as string,
        });
        setExercices(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchExercices();
  }, [workout]);

  return (
    <div className="flex cursor-move items-center gap-2">
      <DragHandleDots2Icon />
      <div className="w-full rounded-md border bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-lg">
              <p>{typeFr[workout?.type as WorkoutType].icon}</p>
              <p>{typeFr[workout?.type as WorkoutType].text}</p>
            </h2>
            <div className="flex items-center gap-1">
              {/* {typeFr[workout?.type as WorkoutType].icon.map((icon, index) => (
                <Image key={index} src={icon} alt="icon" className="h-8 w-8" />
              ))} */}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/sessions/${workout?.id}`}
              className="flex items-center gap-1 text-blue-500 underline-offset-2 hover:underline"
            >
              Personaliser <ArrowTopRightIcon />
            </Link>
            <Button
              onClick={async () => {
                setIsDeleting(true);
                await deleteWorkout(workout?.id as string);
                setTimeout(() => setIsDeleting(false), 2000);
                router.refresh();
              }}
              type="button"
              variant="ghost"
              className="px-4 shadow-none"
            >
              {isDeleting ? (
                <UpdateIcon className="animate-spin" />
              ) : (
                <TrashIcon />
              )}
            </Button>
          </div>
        </div>
        {exercices.length > 0 ? (
          <div className="space-y-2 p-2">
            {exercices.map((exercice) => (
              <div
                key={exercice.id}
                className="flex items-center justify-between gap-2 rounded-md bg-slate-50 p-2 shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{exercice.name}</p>
                    <p>
                      {exercice.sets}x{exercice.reps}
                    </p>
                  </div>
                  <p className="ml-4 text-sm text-slate-500">
                    {exercice.description}
                  </p>
                </div>
                <p className="font-bold">{exercice.weight} kg</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="px-4 text-sm text-slate-500">
            Aucun exercice pour cette séance
          </p>
        )}
      </div>
    </div>
  );
}

export default CardWorkout;
