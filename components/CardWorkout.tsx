import React, { useState } from "react";
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

type WorkoutType = "lowerBody" | "upperBody" | "fullBody" | "cardio";

function CardWorkout({ workout }: { workout: Workout }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const typeFr: Record<WorkoutType, { text: string; icon: StaticImageData[] }> =
    {
      lowerBody: {
        text: "Bas du corps",
        icon: [quads, hamstring, calves],
      },
      upperBody: {
        text: "Haut du corps",
        icon: [chest, shoulder, biceps, back],
      },
      fullBody: {
        text: "Full body",
        icon: [quads, hamstring, calves, chest, shoulder, biceps, back],
      },
      cardio: {
        text: "Cardio",
        icon: [abs, lowerBack],
      },
    };

  return (
    <div className="flex cursor-move items-center gap-2">
      <DragHandleDots2Icon />
      <div className="w-full rounded-md border bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-lg">
              {typeFr[workout.type as WorkoutType].text}
            </h2>
            <div className="flex items-center gap-1">
              {typeFr[workout.type as WorkoutType].icon.map((icon, index) => (
                <Image key={index} src={icon} alt="icon" className="h-8 w-8" />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/sessions/${workout.id}`}
              className="flex items-center gap-1 text-blue-500 underline-offset-2 hover:underline"
            >
              Personaliser <ArrowTopRightIcon />
            </Link>
            <Button
              onClick={async () => {
                setIsDeleting(true);
                await deleteWorkout(workout.id);
                setTimeout(() => setIsDeleting(false), 2000);
                router.refresh();
              }}
              type="button"
              className="rounded-md p-3 hover:bg-slate-100"
            >
              {isDeleting ? (
                <UpdateIcon className="animate-spin" />
              ) : (
                <TrashIcon />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardWorkout;
