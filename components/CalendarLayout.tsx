"use client";
import React, { useEffect, useRef, useState } from "react";
import Calendar from "./Calendar";
import "react-day-picker/style.css";
import Button from "@/components/ui/Button";
import { createWorkout, getUserWorkoutByDate } from "@/actions/sessions";
import { useRouter } from "next/navigation";
import CardWorkout from "@/components/CardWorkout";
import { Reorder } from "framer-motion";

export type User = { id: string; name: string; email: string };

export type Workout = {
  id: string;
  userId: string;
  date: Date;
  type: string;
  duration: number | null;
  notes: string | null;
  createdAt: Date;
} | null;

// const exercices = {
//   upperBody: [
//     "Développé couché",
//     "Pompes",
//     "Tirage vertical",
//     "Rowing avec haltères",
//     "Élévations latérales",
//     "Développé militaire",
//     "Curls biceps",
//     "Extensions triceps",
//     "Face pulls",
//     "Dips",
//   ],
//   lowerBody: [
//     "Squat",
//     "Fentes",
//     "Presse à cuisses",
//     "Soulevé de terre",
//     "Soulevé de terre jambes tendues",
//     "Extension des jambes",
//     "Flexion des ischio-jambiers",
//     "Pont fessier",
//     "Élévation des mollets",
//     "Step-ups",
//   ],
//   fullBody: [
//     "Burpees",
//     "Thrusters",
//     "Soulevé de terre",
//     "Kettlebell swings",
//     "Snatch",
//     "Clean & Jerk",
//     "Push Press",
//     "Mountain Climbers",
//     "Sauts sur box",
//     "Renegade Rows",
//   ],
//   cardio: [
//     "Course à pied",
//     "Vélo",
//     "Rameur",
//     "Corde à sauter",
//     "Natation",
//     "Marche",
//     "HIIT",
//     "Zumba",
//     "Aérobic",
//     "Boxe",
//   ],
// };

export type ExerciseType = "upperBody" | "lowerBody" | "fullBody" | "cardio";

function CalendarLayout({ user }: { user: User | null }) {
  const router = useRouter();
  const currentDate = new Date();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selected, setSelected] = useState<Date>(currentDate);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [workoutId, setWorkoutId] = useState("");
  const form = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchWorkouts = async () => {
      const workouts = await getUserWorkoutByDate({
        date: selected,
        userId: user?.id as string,
      });
      setWorkouts(workouts);
      setLoading(false);
    };
    try {
      fetchWorkouts();
    } catch (error) {
      console.error(error);
    }
  }, [selected, user]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const type = formData.get("type") as string;
    const date = formData.get("date") as string;
    const userId = user?.id as string;
    const workout = await createWorkout({ type, date, userId });
    router.refresh();
    setOpen(true);
    const workoutId = workout?.id;
    if (workoutId) setWorkoutId(workoutId);
    form.current?.reset();
  }
  return (
    <div className="space-y-8 pb-4">
      <dialog id="my_modal_1" className={`modal ${open ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            Tu veins de créer une <span className="text-blue-500">séance!</span>{" "}
            💪
          </h3>
          <p className="py-4">
            À présent, tu peux ajouter des exercices à cette séance pour la
            rendre plus complète ou les ajouter plus tard.
          </p>
          <div className="modal-action">
            <form method="dialog">
              <div className="flex items-center gap-1">
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Plus tard
                </Button>
                <Button
                  onClick={() => {
                    setOpen(false);
                    router.push(`/sessions/${workoutId}`);
                  }}
                  className="hover:animate-shake-strong"
                >
                  🔥 Ajouter
                </Button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
      <div className="flex items-start gap-12">
        <Calendar selected={selected} setSelected={setSelected} />
        <div className="w-full">
          <h1 className="text-xl font-bold">Crée une séance</h1>
          <form
            onSubmit={handleSubmit}
            className="form-control flex flex-col gap-3"
          >
            <div>
              <label htmlFor="type" className="label label-text">
                Catégorie
              </label>

              <select
                name="type"
                id="type"
                className="select select-bordered w-full"
                required
                defaultValue={"Selectionner un type d'entrainement"}
              >
                <option disabled>
                  Selectionner un type d&apos;entrainement
                </option>
                <option value="upperBody">Haut du corps</option>
                <option value="lowerBody">Bas du corps</option>
                <option value="fullBody">Full body</option>
                <option value="cardio">Cardio</option>
              </select>
            </div>

            <div>
              <label htmlFor="date" className="label label-text">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="input input-bordered w-full"
                defaultValue={selected.toISOString().split("T")[0]}
                required
              />
            </div>
            <div className="mt-4">
              <Button type="submit">Ajouter</Button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <h2 className="mb-5 text-xl font-bold">
          {workouts.length > 1 ? "Séances" : "Séance"} du{" "}
          {selected.toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </h2>
        {loading ? (
          <p>Chargement des entrainements...</p>
        ) : workouts.length === 0 ? (
          <p>Aucun entrainement pour cette date</p>
        ) : (
          <Reorder.Group
            values={workouts}
            onReorder={setWorkouts}
            className="space-y-2"
          >
            {workouts.map((workout) => (
              <Reorder.Item key={workout?.id} value={workout}>
                <CardWorkout workout={workout} />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </div>
    </div>
  );
}

export default CalendarLayout;
