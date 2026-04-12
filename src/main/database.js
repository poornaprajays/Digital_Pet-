import Database from 'better-sqlite3'
import { join } from 'path'
import { app } from 'electron'

const dbPath = join(app.getPath('userData'), 'digitalpet.db')
const db = new Database(dbPath)

// Create tables if they do not exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    github_id TEXT UNIQUE,
    username TEXT,
    avatar TEXT
  );

  CREATE TABLE IF NOT EXISTS goals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    title TEXT,
    target INTEGER,
    progress INTEGER DEFAULT 0,
    date TEXT,
    UNIQUE(type, date)
  );

  CREATE TABLE IF NOT EXISTS hearts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    count INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    duration INTEGER,
    type TEXT
  );
`)

export const getTodayGoals = (date) => {
  return db.prepare('SELECT * FROM goals WHERE date = ?').all(date)
}

export const upsertGoal = (type, title, target, progress, date) => {
  return db.prepare(`
    INSERT INTO goals (type, title, target, progress, date)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(type, date) DO NOTHING
  `).run(type, title, target, progress, date)
}

export const updateGoalProgress = (id, progress) => {
  return db.prepare('UPDATE goals SET progress = ? WHERE id = ?').run(progress, id)
}

export default db
