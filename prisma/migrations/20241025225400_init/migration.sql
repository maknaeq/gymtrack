/*
  Warnings:

  - You are about to drop the `workout_exercises` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `exerciseId` on the `goals` table. All the data in the column will be lost.
  - You are about to drop the column `exerciseId` on the `prs` table. All the data in the column will be lost.
  - Added the required column `exerciceId` to the `goals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exerciceId` to the `prs` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "workout_exercises";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "workout_exercices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workoutId" TEXT NOT NULL,
    "exerciceId" TEXT NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" REAL,
    "rpe" REAL,
    "description" TEXT,
    CONSTRAINT "workout_exercices_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "workouts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "workout_exercices_exerciceId_fkey" FOREIGN KEY ("exerciceId") REFERENCES "exercices" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_goals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "exerciceId" TEXT NOT NULL,
    "targetWeight" REAL NOT NULL,
    "deadline" DATETIME,
    "isAchieved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "goals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "goals_exerciceId_fkey" FOREIGN KEY ("exerciceId") REFERENCES "exercices" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_goals" ("createdAt", "deadline", "id", "isAchieved", "targetWeight", "userId") SELECT "createdAt", "deadline", "id", "isAchieved", "targetWeight", "userId" FROM "goals";
DROP TABLE "goals";
ALTER TABLE "new_goals" RENAME TO "goals";
CREATE TABLE "new_prs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "exerciceId" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "prs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "prs_exerciceId_fkey" FOREIGN KEY ("exerciceId") REFERENCES "exercices" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_prs" ("createdAt", "date", "id", "userId", "weight") SELECT "createdAt", "date", "id", "userId", "weight" FROM "prs";
DROP TABLE "prs";
ALTER TABLE "new_prs" RENAME TO "prs";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
