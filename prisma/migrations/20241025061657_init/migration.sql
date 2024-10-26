/*
  Warnings:

  - You are about to drop the column `reps` on the `exercises` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `exercises` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_exercises" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "muscleGroup" TEXT
);
INSERT INTO "new_exercises" ("id", "muscleGroup", "name") SELECT "id", "muscleGroup", "name" FROM "exercises";
DROP TABLE "exercises";
ALTER TABLE "new_exercises" RENAME TO "exercises";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
