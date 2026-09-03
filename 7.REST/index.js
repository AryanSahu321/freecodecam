const cors = require("cors"); // cannnot do it globaly for all routes
const express = require("express");
const app = express();
app.use(cors());
const PORT = 8081;
const path = require("path");
const methodOverride = require("method-override");

// to generate unique id for each post
const { v4: uuidv4 } = require("uuid");

// to parse the request body
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//viw engine setup used for rendering the ejs files
app.set("view engine", "ejs");

// set the views directory used to provide the path for the ejs files
app.set("views", path.join(__dirname, "views"));

// set the public folder path for static files that contains css, js, images etc. and can be accessed by the client
app.use(express.static(path.join(__dirname, "/public"))); // use before express.static() to set the public folder path for static files

// create a posts array to store the posts work as a database for this example. In real world, we will use a database like MongoDB, MySQL etc.
let posts = [
  {
    id: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6", // unique id for the post
    username: "Aryan Sahu",
    content: "This is my first post",
  },
  {
    id: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p7", // unique id for the post
    username: "Aryan Mishra",
    content: "This is my second post",
  },
  {
    id: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p8", // unique id for the post
    username: "Aryan Rai",
    content: "This is my third post",
  },
];

// get all posts
app.get("/posts", (req, res) => {
  res.render("posts", { posts: posts });
});

// ADD a new post
app.get("/posts/new", (req, res) => {
  res.render("newpost");
});

app.post("/posts", (req, res) => {
  let id = uuidv4(); // generate a unique id for the post
  const { username, content } = req.body;
  posts.push({ id, username, content });
  res.redirect("/posts");
});

// get post by id
app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  let post = posts.find((p) => p.id === id);
  if (!post) {
    return res.status(404).send("Post not found");
  }
  res.render("show", { post: post });
});

//Patch to update post content by id
app.patch("/posts/:id", (req, res) => {
  const { id } = req.params;
  const newContent = req.body.content;
  let post = posts.find((p) => p.id === id);
  post.content = newContent;
  console.log(post);
  res.redirect("/posts");
});

// update post content by id
app.get("/posts/:id/edit", (req, res) => {
  const { id } = req.params;
  let post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).send("Post not found 2");
  }
  res.render("edit", { post: post });
});

// delete post

app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter((p) => p.id !== id);
  res.redirect("/posts");
});

// write all code above

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
