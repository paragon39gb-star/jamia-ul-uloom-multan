import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Admission
  app.post("/api/admissions", (req, res) => {
    try {
      const admissionData = req.body;
      const filePath = path.join(__dirname, "admissions.json");
      
      let admissions = [];
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        admissions = JSON.parse(fileContent);
      }
      
      const newEntry = {
        id: Date.now().toString(),
        submittedAt: new Date().toISOString(),
        ...admissionData
      };
      
      admissions.push(newEntry);
      fs.writeFileSync(filePath, JSON.stringify(admissions, null, 2));
      
      console.log("New admission received:", newEntry.id);
      res.status(201).json({ success: true, id: newEntry.id });
    } catch (error) {
      console.error("Failed to save admission:", error);
      res.status(500).json({ error: "Failed to process application" });
    }
  });

  // Admin: Get all admissions
  app.get("/api/admin/admissions", (req, res) => {
    const role = req.headers["x-user-role"];
    if (role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
    
    const filePath = path.join(__dirname, "admissions.json");
    if (fs.existsSync(filePath)) {
      const admissions = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      res.json(admissions);
    } else {
      res.json([]);
    }
  });

  // Simulated Login
  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    
    // In a real app, check against a database
    // For this demo/setup, we use predefined roles
    if (username === "admin" && password === "admin123") {
      res.json({ id: "1", username: "Admin", role: "admin" });
    } else if (username === "faculty" && password === "faculty123") {
      res.json({ id: "2", username: "Prof. Ahmed", role: "faculty" });
    } else if (username === "student" && password === "student123") {
      res.json({ id: "3", username: "Zaid Khan", role: "student" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
