"use server";
import { db } from "@/lib/db"; // Ensure you import your db instance

export async function createWorkout({
  type,
  date,
  userId,
}: {
  type: string;
  date: string | Date;
  userId: string;
}) {
  try {
    const dateObj = new Date(date);
    dateObj.setHours(0, 0, 0, 0); // Set time to midnight
    await db.workout.create({
      data: {
        type,
        date: dateObj,
        user: { connect: { id: userId } },
      },
    });
    //return the id of the workout
    return await db.workout.findFirst({
      where: {
        type,
        date: dateObj,
        userId,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de créer l'entrainement");
  }
}

export async function getUserWorkoutByDate({
  date,
  userId,
}: {
  date: Date | string;
  userId: string;
}) {
  // Ensure date is a Date object and set time to midnight
  const dateObj = new Date(date);
  dateObj.setHours(0, 0, 0, 0);
  const dateString = dateObj.toISOString().split("T")[0];

  return await db.workout.findMany({
    where: {
      userId,
      date: {
        gte: new Date(dateString),
        lt: new Date(
          new Date(dateString).setDate(new Date(dateString).getDate() + 1),
        ),
      },
    },
  });
}

export async function getWorkoutById(workoutId: string) {
  return await db.workout.findUnique({
    where: {
      id: workoutId,
    },
  });
}

export async function getWorkouts() {
  return await db.workout.findMany();
}

export async function getWorkoutByUserId(userId: string) {
  return await db.workout.findMany({
    where: {
      userId,
    },
  });
}

export async function deleteWorkout(workoutId: string) {
  // Delete related records first
  await db.workoutExercice.deleteMany({
    where: {
      workoutId,
    },
  });

  await db.sessionLog.deleteMany({
    where: {
      workoutId,
    },
  });

  // Delete the workout
  return await db.workout.delete({
    where: {
      id: workoutId,
    },
  });
}
