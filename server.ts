import express from "express";
import { createServer as createViteServer } from "vite";
import db from "./db.js";
import { v4 as uuidv4 } from 'uuid';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/videos", (req, res) => {
    try {
      const stmt = db.prepare(`
        SELECT videos.*, users.name as user_name, users.avatar as user_avatar, users.handle as user_handle 
        FROM videos 
        JOIN users ON videos.user_id = users.id 
        ORDER BY videos.created_at DESC
      `);
      const videos = stmt.all();
      res.json(videos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch videos" });
    }
  });

  app.get("/api/videos/:id", (req, res) => {
    try {
      const stmt = db.prepare(`
        SELECT videos.*, users.name as user_name, users.avatar as user_avatar, users.handle as user_handle 
        FROM videos 
        JOIN users ON videos.user_id = users.id 
        WHERE videos.id = ?
      `);
      const video = stmt.get(req.params.id);
      if (video) {
        res.json(video);
      } else {
        res.status(404).json({ error: "Video not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch video" });
    }
  });

  app.post("/api/videos", (req, res) => {
    try {
      const { title, description, url, thumbnail, user_id, category } = req.body;
      const id = uuidv4();
      
      // Basic validation
      if (!title || !url || !user_id) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const stmt = db.prepare(`
        INSERT INTO videos (id, title, description, url, thumbnail, user_id, category)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      
      stmt.run(id, title, description, url, thumbnail || '', user_id, category || 'General');
      
      const newVideo = db.prepare('SELECT * FROM videos WHERE id = ?').get(id);
      res.status(201).json(newVideo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create video" });
    }
  });

  app.get("/api/users/current", (req, res) => {
    // Mock current user for demo purposes
    // In a real app, this would come from session/auth
    const user = db.prepare('SELECT * FROM users LIMIT 1').get();
    res.json(user);
  });

  app.get("/api/users/:id", (req, res) => {
    try {
      const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  app.get("/api/users/:id/videos", (req, res) => {
    try {
      const stmt = db.prepare(`
        SELECT videos.*, users.name as user_name, users.avatar as user_avatar, users.handle as user_handle 
        FROM videos 
        JOIN users ON videos.user_id = users.id 
        WHERE videos.user_id = ?
        ORDER BY videos.created_at DESC
      `);
      const videos = stmt.all(req.params.id);
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user videos" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
