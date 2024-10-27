-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_session_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workoutId" TEXT NOT NULL,
    "energyLevel" INTEGER NOT NULL,
    "fatigueLevel" INTEGER NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "session_logs_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "workouts" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_session_logs" ("createdAt", "energyLevel", "fatigueLevel", "id", "notes", "workoutId") SELECT "createdAt", "energyLevel", "fatigueLevel", "id", "notes", "workoutId" FROM "session_logs";
DROP TABLE "session_logs";
ALTER TABLE "new_session_logs" RENAME TO "session_logs";
CREATE TABLE "new_workout_exercices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workoutId" TEXT NOT NULL,
    "exerciceId" TEXT NOT NULL,
    "sets" INTEGER,
    "reps" INTEGER,
    "weight" REAL,
    "rpe" REAL,
    "duration" INTEGER,
    "description" TEXT,
    CONSTRAINT "workout_exercices_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "workouts" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "workout_exercices_exerciceId_fkey" FOREIGN KEY ("exerciceId") REFERENCES "exercices" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_workout_exercices" ("description", "exerciceId", "id", "reps", "rpe", "sets", "weight", "workoutId") SELECT "description", "exerciceId", "id", "reps", "rpe", "sets", "weight", "workoutId" FROM "workout_exercices";
DROP TABLE "workout_exercices";
ALTER TABLE "new_workout_exercices" RENAME TO "workout_exercices";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
