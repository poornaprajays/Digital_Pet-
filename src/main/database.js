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
    date TEXT
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

export default db
