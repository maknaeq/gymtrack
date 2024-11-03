"use client";
import {
  ArrowRightIcon,
  Pencil2Icon,
  ReloadIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import React, { useEffect, useRef, useState } from "react";
import Button from "./ui/Button";
import { findUserPrsByExerciseId } from "@/actions/prs";
import {
  deleteWorkoutExerciceById,
  updateWorkoutExercice,
} from "@/actions/exercice";
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

type AvailableExercises = {
  id: string;
  type: string;
  name: string;
  muscleGroup: string | null;
}[];
function CardExercice({
  availableExercises,
  exercice,
  userId,
}: {
  exercice: Exercice;
  userId: string | undefined;
  availableExercises: AvailableExercises | null;
}) {
  const [pr, setPr] = useState<Pr>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const form = useRef<HTMLFormElement | null>(null);
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

  const formId = `update-form-${exercice.id}`;
  const modalId = `modal-${exercice.id}`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get(`name-update-${exercice.id}`) as string;
    const sets = Number(formData.get(`sets-update-${exercice.id}`));
    const reps = Number(formData.get(`reps-update-${exercice.id}`));
    const weight = Number(formData.get(`weight-update-${exercice.id}`));
    const duration = Number(formData.get(`duration-update-${exercice.id}`));
    const description = formData.get(
      `description-update-${exercice.id}`,
    ) as string;

    try {
      setIsUpdating(true);

      await updateWorkoutExercice({
        id: exercice.id,
        workoutId: exercice.workoutId,
        exerciceId: name,
        sets,
        reps,
        weight,
        duration,
        description,
      });
      setTimeout(() => {
        setIsUpdating(false);
        setOpen(false);
        router.refresh();
      }, 1000);
    } catch (error) {
      console.error(error);
      setIsUpdating(false);
    } finally {
      form.current?.reset();
    }
  };

  return (
    <>
      <dialog id={modalId} className={`modal ${open ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="text-lg font-bold">Edition</h3>
          <form onSubmit={handleSubmit} id={formId} ref={form}>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Nom de l&apos;exercice</span>
              </div>
              <select
                name={`name-update-${exercice.id}`}
                id={`name-${exercice.id}`}
                className="select select-bordered w-full"
                defaultValue={exercice.exerciceId}
              >
                {availableExercises?.map((exercise) => (
                  <option key={exercise.id} value={exercise.id}>
                    {exercise.name}
                  </option>
                ))}
              </select>
            </label>
            {exercice.type !== "cardio" ? (
              <>
                <div className="flex items-center gap-2">
                  <label className="form-control grow">
                    <div className="label">
                      <span className="label-text">Séries</span>
                    </div>
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      name={`sets-update-${exercice.id}`}
                      defaultValue={exercice.sets || 0}
                    />
                  </label>
                  <label className="form-control grow">
                    <div className="label">
                      <span className="label-text">Répétitions</span>
                    </div>
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      name={`reps-update-${exercice.id}`}
                      defaultValue={exercice.reps || 0}
                    />
                  </label>
                </div>
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Poid (kg)</span>
                  </div>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    name={`weight-update-${exercice.id}`}
                    defaultValue={exercice.weight || 0}
                  />
                </label>
              </>
            ) : (
              <>
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Durée (min)</span>
                  </div>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    name={`duration-update-${exercice.id}`}
                    defaultValue={exercice.duration || 0}
                  />
                </label>
              </>
            )}
            <label className="form-control grow">
              <div className="label">
                <span className="label-text">Note (optionel)</span>
              </div>
              <textarea
                className="textarea textarea-bordered w-full"
                name={`description-update-${exercice.id}`}
                defaultValue={exercice.description || ""}
                placeholder={exercice.description || "Insérer une note"}
              />
            </label>
          </form>
          <div className="modal-action">
            <Button
              className="btn"
              variant="ghost"
              onClick={() => {
                setOpen(false);
                form.current?.reset();
              }}
              disabled={isUpdating}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              form={formId}
              className="btn"
              disabled={isUpdating}
            >
              {!isUpdating ? "Mettre à jour" : "Mise à jour en cours..."}
            </Button>
          </div>
        </div>
      </dialog>
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
                      {exercice.sets}x
                      {exercice.reps && exercice.reps > 1
                        ? exercice.reps + "reps"
                        : exercice.reps + "rep"}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-blue-500">
                    {exercice.duration} min
                  </p>
                )}
              </div>
              <p className="px-4 text-slate-400/60">
                {exercice.description && exercice.description}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center md:block">
            <Button
              variant="ghost"
              className="px-5 py-1 shadow-none"
              onClick={() => setOpen(true)}
            >
              <Pencil2Icon />
            </Button>
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
          </div>
        </li>
        <p>{pr.length > 0 ? "PR actuel: " + pr[0].weight + "kg" : ""}</p>
      </div>
    </>
  );
}

export default CardExercice;
