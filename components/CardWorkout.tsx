import React from "react";
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
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

type WorkoutType = "lowerBody" | "upperBody" | "fullBody" | "cardio";

function CardWorkout({ workout }: { workout: Workout }) {
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
        <h2 className="text-lg">{typeFr[workout.type as WorkoutType].text}</h2>
        <div className="flex items-center gap-1">
          {typeFr[workout.type as WorkoutType].icon.map((icon, index) => (
            <Image key={index} src={icon} alt="icon" className="h-10 w-10" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardWorkout;
