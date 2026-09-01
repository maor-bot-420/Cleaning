import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// MySQL Database Connection Pool using Aiven environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  ssl: {
    rejectUnauthorized: false
  }
});

// Initialize Database Tables
async function initDatabase() {
  try {
    const connection = await pool.getConnection();
    
    await connection.query(`
      CREATE TABLE IF NOT EXISTS teams (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        team_id INT,
        task_id INT,
        status VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    connection.release();
    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

// API route to fetch teams
app.get('/api/teams', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM teams');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Serve frontend static build files from the dist folder
app.use(express.static(path.join(__dirname, '../dist')));

// Fallback route using Express 5 named wildcard syntax
app.get('/*splat', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initDatabase();
});