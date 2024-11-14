"use server";

import { db } from "@/lib/db";

export async function getUserGoals(userId: string) {
  return db.goal.findMany(
    {
      where: { userId }
    }
  );
}

type Goal = {
  userId: string;
  exerciceId: string;
  targetWeight: number;
  deadline?: Date | undefined;
  isAchieved: boolean;
}

export async function createGoal(goal: Goal) {
  return db.goal.create({
    data: {
      userId: goal.userId,
      exerciceId: goal.exerciceId,
      targetWeight: goal.targetWeight,
      deadline: goal.deadline,
      isAchieved: goal.isAchieved
    }
  });
}

export async function setAchievedGoal(goalId: string, isAchieved: boolean) {
  return db.goal.update({
    where: { id: goalId },
    data: { isAchieved }
  });
}

export async function deleteGoal(goalId: string) {
  return db.goal.delete({
    where: { id: goalId }
  });
}