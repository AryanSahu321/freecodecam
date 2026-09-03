import cors from "cors"; // cannnot do it globaly for all routes

import { insertComments } from "./insert.js";
import { initPool, runQuery } from "./dbconnect.js";
import { faker } from "@faker-js/faker";
// server
import express from "express";
import { v4 as uuidv4 } from "uuid";
const PORT = 8082;

// path --
import path from "node:path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
// Recreate __dirname and __filename in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app --
const app = express();
app.use(cors());

// to parse the request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

//---------------------view-------------

//viw engine setup used for rendering the ejs files
app.set("view engine", "ejs");

// set the views directory used to provide the path for the ejs files
app.set("views", path.join(__dirname, "views"));

// set the public folder path for static files that contains css, js, images etc. and can be accessed by the client
app.use(express.static(path.join(__dirname, "/public"))); // use before express.static() to set the public folder path for static files

//---------------insert----------

let fkcomments = () => {
  return {
    postId: faker.number.int({ min: 1, max: 10 }), // Generates a valid database NUMBER
    userName: faker.internet.username().substring(0, 50), // Ensures it fits VARCHAR2(50)
    text: faker.lorem.sentence(), // Fills your comment_text column cleanly
  };
};

let comms = [];
for (let i = 0; i <= 100; i++) {
  comms.push(fkcomments());
}

//insertComments(comms);

//----------------------------server-------------------------

// get all posts / comments
app.get("/", async (req, res) => {
  try {
    // 1. Get the total count
    const countData = await runQuery(`SELECT count(*) FROM comments`);
    let totalComments = countData[0]["COUNT(*)"];

    // 2. Get all the actual comment records for the list
    // Note: Adjust column names (POST_ID, USER_NAME, COMMENT_TEXT) to match your Oracle table schema
    const postsData = await runQuery(
      `SELECT comment_id AS id, user_name AS username, comment_text AS content FROM comments`,
    );

    // 3. Render the view passing both variables
    res.render("posts.ejs", { total: totalComments, posts: postsData });
  } catch (err) {
    console.error("DETAILED DB ERROR:", err);
    res.status(500).send("some error in DB: " + err.message);
  }
});

// see a  comment
app.get("/comments/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Use parameterized queries to prevent SQL Injection
    const query =
      "SELECT comment_id AS id, user_name AS username, comment_text AS content FROM comments WHERE comment_id = :id";
    const comment = await runQuery(query, [id]);
    //res.send(comment);
    res.render("show.ejs", { comment: comment[0] });
  } catch (err) {
    console.error("DETAILED DB ERROR:", err);
    res.status(500).send("some error in DB: " + err.message);
  }
});

//----------------------------
// ADD a new post

app.get("/posts/new", (req, res) => {
  res.render("newpost");
});

// Create a new comment/post route using insertComments
app.post("/posts", async (req, res) => {
  try {
    const { username, content } = req.body;
    let post_id = Math.floor(Math.random() * 10) + 1;

    // Format the incoming form data into an array of objects for insertComments
    const newCommentEntry = [
      {
        postId: post_id,
        userName: username,
        text: content,
      },
    ];

    // Use your insertComments function which handles the JSON procedure call
    await insertComments(newCommentEntry);

    // Redirect back to the main posts page
    res.redirect("/");
  } catch (err) {
    console.error("DETAILED DB ERROR:", err);
    res.status(500).send("some error in DB: " + err.message);
  }
});
// --------------------------------edit
// 2. UPDATE ROUTE: Handle the submission to modify the comment content
app.patch("/comments/:id", async (req, res) => {
  console.log("--- PATCH ROUTE HIT ---");
  console.log("Comment ID from params:", req.params.id);
  console.log("New content from body:", req.body.content);

  try {
    const { id } = req.params;
    const { content } = req.body;

    const query = `
      UPDATE comments 
      SET comment_text = :content 
      WHERE comment_id = :id
    `;

    const result = await runQuery(query, { content, id });
    console.log("Oracle Update Result:", result);

    res.redirect("/");
  } catch (err) {
    console.error("DETAILED DB ERROR:", err);
    res.status(500).send("some error in DB: " + err.message);
  }
});

// update post content by id
// 1. EDIT FORM ROUTE: Fetch the comment by ID and render the edit form
app.get("/comments/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT comment_id AS id, user_name AS username, comment_text AS content 
      FROM comments 
      WHERE comment_id = :id
    `;

    // Using positional binding array [id] with Oracle :1 or named binding { id }
    const rows = await runQuery(query, { id });

    if (!rows || rows.length === 0) {
      return res.status(404).send("Comment not found");
    }

    res.render("edit.ejs", { post: rows[0] });
  } catch (err) {
    console.error("DETAILED DB ERROR:", err);
    res.status(500).send("some error in DB: " + err.message);
  }
});

// 3. DELETE ROUTE: Remove the comment from the Oracle database by ID
app.delete("/comments/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      DELETE FROM comments 
      WHERE comment_id = :id
    `;

    await runQuery(query, { id });

    // Redirect back to the main posts page
    res.redirect("/");
  } catch (err) {
    console.error("DETAILED DB ERROR:", err);
    res.status(500).send("some error in DB: " + err.message);
  }
});
//---------------------------pool

async function startServer() {
  await initPool();
  console.log("Database pool initialized.");

  app.listen(8082, () => {
    console.log("Server is running on port 8082");
  });
}

startServer();
