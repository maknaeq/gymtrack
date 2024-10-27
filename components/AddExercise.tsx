"use client";
import React, { useRef, useState } from "react";
import Button from "./ui/Button";
import { createExercice } from "@/actions/exercice";
import { useRouter } from "next/navigation";

type Exercise = {
  id: string;
  name: string;
  type: string;
  muscleGroup: string | null;
};

function AddExercise({
  exercices,
  workoutId,
  workoutType,
}: {
  exercices: Exercise[] | null;
  workoutId: string;
  workoutType: string;
}) {
  const [open, setOpen] = useState(false);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(
    null,
  );
  const router = useRouter();
  const form = useRef<HTMLFormElement | null>(null);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    setSelectedExerciseId(selectedOption.getAttribute("data-id"));
  };
  return (
    <>
      <dialog id="my_modal_1" className={`modal ${open ? "modal-open" : ""}`}>
        <div className="modal-box">
          <form
            className="form-control"
            id="form"
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
              await createExercice({
                workoutId,
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
            >
              <option value="">-- Sélectionner un exercice --</option>
              {exercices?.map((exercice) => (
                <option
                  key={exercice.id}
                  value={exercice.name}
                  data-id={exercice.id}
                >
                  {exercice.name}
                </option>
              ))}
            </select>

            <input
              type="hidden"
              name="exerciseId"
              value={selectedExerciseId || ""}
            />
            {workoutType !== "cardio" ? (
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
                <Button
                  form="form"
                  className="hover:animate-shake-strong"
                  type="submit"
                >
                  🏋🏼‍♂️ Ajouter
                </Button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
      <Button onClick={() => setOpen(true)} variant="primary" className="">
        {/* <PlusIcon /> */}
        Ajouter
      </Button>
    </>
  );
}

export default AddExercise;
