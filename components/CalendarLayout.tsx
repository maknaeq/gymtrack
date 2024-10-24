"use client";
import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import "react-day-picker/style.css";
import Button from "@/components/ui/Button";
import { createWorkout, getUserWorkoutByDate } from "@/actions/workout";
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
};

function CalendarLayout({ user }: { user: User | null }) {
  const router = useRouter();
  const currentDate = new Date();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selected, setSelected] = useState<Date>(currentDate);
  const [loading, setLoading] = useState(true);

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

  console.log("Length", workouts.length);
  console.log("Loading", loading);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const type = formData.get("type") as string;
    const date = formData.get("date") as string;
    const userId = user?.id as string;
    await createWorkout({ type, date, userId });
    router.refresh();
  }
  return (
    <div className="space-y-8">
      <div className="flex items-start gap-5">
        <Calendar selected={selected} setSelected={setSelected} />
        <div className="w-full">
          <h1 className="text-xl font-bold">Nouvel entrainement</h1>
          <form onSubmit={handleSubmit} className="form-control flex flex-col">
            <label htmlFor="type" className="label label-text">
              Catégorie
            </label>

            <select
              name="type"
              id="type"
              className="select select-bordered"
              required
              defaultValue={"Selectionner un type d'entrainement"}
            >
              <option disabled>Selectionner un type d'entrainement</option>
              <option value="upperBody">Haut du corps</option>
              <option value="lowerBody">Bas du corps</option>
              <option value="fullBody">Full body</option>
              <option value="cardio">Cardio</option>
            </select>

            <label htmlFor="date" className="label label-text">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="input input-bordered"
              defaultValue={selected.toISOString().split("T")[0]}
              required
            />
            <div className="mt-4">
              <Button type="submit">Ajouter</Button>
            </div>
          </form>
        </div>
      </div>
      <div>
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
              <Reorder.Item key={workout.id} value={workout}>
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
