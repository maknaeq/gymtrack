"use client";
import Button from "@/components/ui/Button";
import React, { useEffect, useState } from "react";
import { getAllExercices } from "@/actions/exercice";
import { LoaderCircle } from "lucide-react";
import { ResetIcon } from "@radix-ui/react-icons";
import { createGoal } from "@/actions/goals";
import { useRouter } from "next/navigation";

export interface AllExercice {
  id: string;
  name: string;
  muscleGroup: string | null;
  type: string;
}


export default function CreateGoal({ user }: { user: { id: string; name: string; email: string; } | null }) {
  const [goalModal, setGoalModal] = useState(false);
  const [exercise, setExercise] = useState<AllExercice[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [deadline, setDeadline] = useState<string | number | readonly string[] | undefined>(undefined);
  const formRef = React.useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchExercices() {
      const response = await getAllExercices();
      setExercise(response);
    }

    try {
      fetchExercices();
    } catch (error) {
      console.error(error);
    }

  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSending(true);
    const formData = new FormData(e.currentTarget);
    const goal = {
      userId: user?.id as string,
      exerciceId: exercise.find((ex) => ex.name === selectedExercise)?.id as string,
      targetWeight: Number(formData.get("weight")),
      deadline: formData.get("date") as string === "" ? undefined : new Date(formData.get("date") as string),
      isAchieved: false
    };

    try {
      //create the goal
      await createGoal(goal);
      //then close the modal and reset the form
      formRef.current?.reset();
      setIsSending(false);
      setGoalModal(false);
      router.refresh();
    } catch (error) {
      console.error(error);
    }

  }


  return (
    <>
      <dialog id="my_modal_1" className="modal bg-black/30" open={goalModal}>
        <div className="modal-box space-y-2">
          <form onSubmit={handleSubmit} ref={formRef}>
            <h3 className="font-bold text-lg">Ajouter un <span className={"text-blue-500 uppercase"}>goal</span></h3>
            <div>
              <div className="label">
                <label htmlFor="goal" className="label-text">Exercice</label>
              </div>
              <select id="goal" name="goal" className="select select-bordered w-full" required
                      onChange={(e) => setSelectedExercise(e.target.value)}>
                <option value="">-- Sélectionner un goal --</option>
                {exercise?.map((ex) => (
                  <option key={ex.id} value={ex.name}>
                    {ex.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className="label">
                <label htmlFor="weight" className="label-text">Poids</label>
              </div>
              <input type="number" id="weight" name="weight" className="input input-bordered w-full" required />
            </div>
            <div>
              <div className="label">
                <label htmlFor="date" className="label-text">Date limite</label>
              </div>
              <div className={"flex items-center gap-1"}>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="input input-bordered w-full"
                  value={deadline ? deadline.toString() : ""}
                  onChange={(e) => setDeadline(e.target.value)}
                />
                <Button
                  type="button"
                  onClick={() => setDeadline(undefined)}
                  variant="ghost"
                  className="px-4"
                >
                  <ResetIcon />
                </Button>
              </div>
            </div>
            <div className={"flex items-center gap-2 justify-end mt-8"}>
              <Button onClick={() => setGoalModal(false)} variant={"ghost"} disabled={isSending}>Fermer</Button>
              <Button type={"submit"} disabled={isSending}>
                {
                  isSending ? <LoaderCircle className={"animate-spin"} /> : "Enregistrer"
                }
              </Button>
            </div>
          </form>
        </div>
      </dialog>
      <Button onClick={() => setGoalModal(true)}>Ajouter un goal</Button>
    </>
  );
}