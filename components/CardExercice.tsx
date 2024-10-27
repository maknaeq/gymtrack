"use client";
import {
  ArrowRightIcon,
  Pencil2Icon,
  ReloadIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
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

type ExerciceList =
  | {
      id: string;
      type: string;
      name: string;
      muscleGroup: string | null;
    }[]
  | null;

function CardExercice({
  exercice,
  exercicesList,
  userId,
}: {
  exercice: Exercice;
  userId: string | undefined;
  exercicesList: ExerciceList;
}) {
  const [pr, setPr] = useState<Pr>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(
    exercice.exerciceId,
  );
  const form = React.useRef<HTMLFormElement | null>(null);
  const router = useRouter();
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    setSelectedExerciseId(selectedOption.getAttribute("data-id"));
  };
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
  console.log("oui", exercice.name);
  console.log("exo list", exercicesList);
  return (
    <>
      <dialog id="my_modal_1" className={`modal ${open ? "modal-open" : ""}`}>
        <div className="modal-box">
          <form
            className="form-control"
            id="update-form"
            ref={form}
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const exerciceId = formData.get("exerciseId") as string;
              const sets = Number(formData.get("sets")) || 0;
              const reps = Number(formData.get("reps")) || 0;
              const weight = Number(formData.get("weight")) || 0;
              const description = formData.get("description") as string;
              const duration = Number(formData.get("duration")) || 0;
              await updateWorkoutExercice({
                id: exercice.id,
                workoutId: exercice.workoutId,
                exerciceId,
                sets,
                reps,
                weight,
                duration,
                description,
              });
              setOpen(false);
              router.refresh();
              form.current?.reset();
              setSelectedExerciseId(null);
            }}
          >
            <div className="label">
              <label htmlFor="name" className="label-text">
                Nom de l&apos;exercice
              </label>
            </div>
            <select
              id="name"
              name="name"
              className="select select-bordered w-full"
              onChange={handleSelectChange}
              required
              defaultValue={exercice.name as string}
            >
              <option value="">-- Sélectionner un exercice --</option>
              {exercicesList?.map((exo) => (
                <option key={exo.id} value={exo.name} data-id={exo.id}>
                  {exo.name}
                </option>
              ))}
            </select>

            <input
              type="hidden"
              name="exerciseId"
              defaultValue={selectedExerciseId || ""}
            />
            {exercice.type !== "cardio" ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="grow">
                    <div className="label">
                      <label htmlFor="series" className="label-text">
                        Séries
                      </label>
                    </div>
                    <input
                      type="number"
                      id="series"
                      name="sets"
                      placeholder="3"
                      className="input input-bordered w-full"
                      required
                      defaultValue={Number(exercice.sets)}
                    />
                  </div>
                  <div className="grow">
                    <div className="label">
                      <label htmlFor="reps" className="label-text">
                        Répétitions
                      </label>
                    </div>
                    <input
                      type="number"
                      id="reps"
                      name="reps"
                      placeholder="12"
                      className="input input-bordered w-full"
                      required
                      defaultValue={Number(exercice.reps)}
                    />
                  </div>
                </div>
                <div className="label">
                  <label htmlFor="weight" className="label-text">
                    Poids (kg)
                  </label>
                </div>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  placeholder="0"
                  className="input input-bordered w-full"
                  required
                  defaultValue={Number(exercice.weight)}
                />
              </>
            ) : (
              <>
                <div className="label">
                  <label htmlFor="duration" className="label-text">
                    Durée (minutes)
                  </label>
                </div>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  placeholder="0"
                  className="input input-bordered w-full"
                  required
                  defaultValue={Number(exercice.duration)}
                />
              </>
            )}
            <div className="label">
              <label htmlFor="desc" className="label-text">
                Note (optionel)
              </label>
            </div>
            <textarea
              id="desc"
              name="description"
              placeholder="Notes ou instructions supplémentaires…"
              className="textarea textarea-bordered w-full"
              defaultValue={exercice.description as string}
            ></textarea>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setOpen(false);
                    form.current?.reset();
                    setSelectedExerciseId(null);
                  }}
                >
                  Annuler
                </Button>
                <Button form="update-form" type="submit">
                  📝 Modifier
                </Button>
              </div>
            </form>
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
          <div>
            <Button
              variant="ghost"
              className="px-5 py-1 shadow-none"
              onClick={() => {
                setOpen(true);
              }}
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
