// index.js
import cors from "cors";
import { insertComplaints } from "./insert.js";
import { initPool, runQuery } from "./dbconnect.js";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";

// Recreate __dirname and __filename in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8082;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));

// GET / - List all complaints
app.get("/", async (req, res) => {
  try {
    const countData = await runQuery(`SELECT count(*) FROM complaints`);
    let totalComplaints = countData[0]["COUNT(*)"];

    const complaintsData = await runQuery(
      `SELECT complaint_id AS id, user_name AS username, complaint_text AS content FROM complaints`,
    );

    res.render("posts.ejs", { total: totalComplaints, posts: complaintsData });
  } catch (err) {
    console.error("DETAILED DB ERROR:", err);
    res.status(500).send("some error in DB: " + err.message);
  }
});

// GET /posts/new - Render new complaint form
app.get("/posts/new", (req, res) => {
  res.render("newpost");
});

// POST /posts - Create a new complaint
app.post("/posts", async (req, res) => {
  try {
    const { username, content } = req.body;

    const newComplaintEntry = [
      {
        userName: username,
        text: content,
      },
    ];

    await insertComplaints(newComplaintEntry);
    res.redirect("/");
  } catch (err) {
    console.error("DETAILED DB ERROR:", err);
    res.status(500).send("some error in DB: " + err.message);
  }
});

// GET /comments/:id - View single complaint
app.get("/comments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query =
      "SELECT complaint_id AS id, user_name AS username, complaint_text AS content FROM complaints WHERE complaint_id = :id";
    const complaint = await runQuery(query, { id });
    res.render("show.ejs", { comment: complaint[0] });
  } catch (err) {
    console.error("DETAILED DB ERROR:", err);
    res.status(500).send("some error in DB: " + err.message);
  }
});

// GET /comments/:id/edit - Render edit form
app.get("/comments/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT complaint_id AS id, user_name AS username, complaint_text AS content 
      FROM complaints 
      WHERE complaint_id = :id
    `;
    const rows = await runQuery(query, { id });
    if (!rows || rows.length === 0) {
      return res.status(404).send("Complaint not found");
    }
    res.render("edit.ejs", { post: rows[0] });
  } catch (err) {
    console.error("DETAILED DB ERROR:", err);
    res.status(500).send("some error in DB: " + err.message);
  }
});

// PATCH /comments/:id - Update complaint text
app.patch("/comments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const query = `
      UPDATE complaints 
      SET complaint_text = :content 
      WHERE complaint_id = :id
    `;
    await runQuery(query, { content, id });
    res.redirect("/");
  } catch (err) {
    console.error("DETAILED DB ERROR:", err);
    res.status(500).send("some error in DB: " + err.message);
  }
});

// DELETE /comments/:id - Remove complaint
app.delete("/comments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      DELETE FROM complaints 
      WHERE complaint_id = :id
    `;
    await runQuery(query, { id });
    res.redirect("/");
  } catch (err) {
    console.error("DETAILED DB ERROR:", err);
    res.status(500).send("some error in DB: " + err.message);
  }
});

// Initialize pool and start server
async function startServer() {
  await initPool();
  console.log("Database pool initialized.");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
