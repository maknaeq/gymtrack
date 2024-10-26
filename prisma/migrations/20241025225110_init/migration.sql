/*
  Warnings:

  - You are about to drop the `exercises` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "exercises";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "exercices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "muscleGroup" TEXT,
    "type" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_goals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "targetWeight" REAL NOT NULL,
    "deadline" DATETIME,
    "isAchieved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "goals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "goals_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercices" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_goals" ("createdAt", "deadline", "exerciseId", "id", "isAchieved", "targetWeight", "userId") SELECT "createdAt", "deadline", "exerciseId", "id", "isAchieved", "targetWeight", "userId" FROM "goals";
DROP TABLE "goals";
ALTER TABLE "new_goals" RENAME TO "goals";
CREATE TABLE "new_prs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "prs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "prs_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercices" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_prs" ("createdAt", "date", "exerciseId", "id", "userId", "weight") SELECT "createdAt", "date", "exerciseId", "id", "userId", "weight" FROM "prs";
DROP TABLE "prs";
ALTER TABLE "new_prs" RENAME TO "prs";
CREATE TABLE "new_workout_exercises" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workoutId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" REAL,
    "rpe" REAL,
    "description" TEXT,
    CONSTRAINT "workout_exercises_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "workouts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "workout_exercises_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercices" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_workout_exercises" ("description", "exerciseId", "id", "reps", "rpe", "sets", "weight", "workoutId") SELECT "description", "exerciseId", "id", "reps", "rpe", "sets", "weight", "workoutId" FROM "workout_exercises";
DROP TABLE "workout_exercises";
ALTER TABLE "new_workout_exercises" RENAME TO "workout_exercises";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
