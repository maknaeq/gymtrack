import sqlite3 from "sqlite3";
import fs from "fs";

// Path to your SQLite database
const db = new sqlite3.Database("./prisma/dev.db", sqlite3.OPEN_READONLY);

// List of tables to export
const tables = [
  "exercices",
  "goals",
  "prs",
  "session_logs",
  "users",
  "workout_exercices",
  "workouts",
];

// Function to export table data to JSON
const exportTableToJson = (table) => {
  db.all(`SELECT * FROM ${table}`, [], (err, rows) => {
    if (err) {
      console.error(`Error querying table ${table}:`, err.message);
      return;
    }

    // Write data to a JSON file
    const jsonData = JSON.stringify(rows, null, 2);
    const outputFileName = `./migration/${table}.json`;
    fs.writeFileSync(outputFileName, jsonData);

    console.log(`Data exported to ${outputFileName}`);
  });
};

// Export data for each table
tables.forEach((table) => exportTableToJson(table));

// Close the database after all queries are done
db.close();
