import sqlite3 from "sqlite3";
import fs from "fs";

// Path to SQLite database
const dbFile = "./prisma/dev.db";
const db = new sqlite3.Database(dbFile);

// List of JSON files and corresponding table names
const tables = [
  { file: "migration/exercices.json", table: "exercices" },
  { file: "migration/goals.json", table: "goals" },
  { file: "migration/prs.json", table: "prs" },
  { file: "migration/session_logs.json", table: "session_logs" },
  { file: "migration/users.json", table: "users" },
  { file: "migration/workout_exercises.json", table: "workout_exercises" },
  { file: "migration/workouts.json", table: "workouts" },
];

// SQL to create tables (adjust as per your schema)
const createTableQueries = {
  exercices: `
    CREATE TABLE IF NOT EXISTS exercices (
      id INTEGER PRIMARY KEY,
      name TEXT,
      description TEXT
    );
  `,
  goals: `
    CREATE TABLE IF NOT EXISTS goals (
      id INTEGER PRIMARY KEY,
      user_id INTEGER,
      goal TEXT,
      created_at TEXT
    );
  `,
  prs: `
    CREATE TABLE IF NOT EXISTS prs (
      id INTEGER PRIMARY KEY,
      exercice_id INTEGER,
      value REAL,
      created_at TEXT
    );
  `,
  session_logs: `
    CREATE TABLE IF NOT EXISTS session_logs (
      id INTEGER PRIMARY KEY,
      session_date TEXT,
      notes TEXT
    );
  `,
  users: `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT,
      email TEXT
    );
  `,
  workout_exercises: `
    CREATE TABLE IF NOT EXISTS workout_exercises (
      id INTEGER PRIMARY KEY,
      workout_id INTEGER,
      exercice_id INTEGER,
      sets INTEGER,
      reps INTEGER
    );
  `,
  workouts: `
    CREATE TABLE IF NOT EXISTS workouts (
      id INTEGER PRIMARY KEY,
      user_id INTEGER,
      name TEXT,
      created_at TEXT
    );
  `,
};

// Create tables
function createTables() {
  for (const [tableName, query] of Object.entries(createTableQueries)) {
    db.run(query, (err) => {
      if (err) console.error(`Error creating table ${tableName}:`, err.message);
      else console.log(`Table ${tableName} created or already exists.`);
    });
  }
}

// Insert data into a table
function insertData(table, data) {
  // Generate placeholders dynamically
  const placeholders = Object.keys(data[0])
    .map(() => "?")
    .join(", ");
  const query = `INSERT INTO ${table} (${Object.keys(data[0]).join(", ")}) VALUES (${placeholders})`;

  const stmt = db.prepare(query);

  data.forEach((row) => {
    stmt.run(Object.values(row), (err) => {
      if (err) console.error(`Error inserting into ${table}:`, err.message);
    });
  });

  stmt.finalize();
}

// Migrate JSON data to SQLite
function migrateData() {
  tables.forEach(({ file, table }) => {
    const jsonData = JSON.parse(fs.readFileSync(file, "utf-8"));
    console.log(`Migrating data to table: ${table}`);
    insertData(table, jsonData);
  });
}

// Main function to run the migration
function main() {
  createTables();

  // Delay data migration slightly to ensure tables are created
  setTimeout(() => {
    migrateData();
    db.close(() => console.log("Database migration complete."));
  }, 1000);
}

main();
