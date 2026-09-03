import cors from "cors";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import mongoose from "mongoose";
import { Chat } from "./models/chat.js";
import { ExpressError } from "./ExpressError.js";

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

//-------------------Mongo connection ---------------------
main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wathsapp");
}
//-------------------inserrting -------------

/* const chat1 = new Chat({
  from: "Aryan Sahu",
  to: "Aryan Rai",
  msg: "send me code",
  created_at: new Date(),
});

chat1
  .save()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  }); */
// ------------------routs-------------------
//get chats
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  // console.log(chats);
  res.render("index.ejs", { chats });
});

//create new chat
app.get("/chats/new", (req, res) => {
  // non async error handling
  // throw new ExpressError("This is a non-async error", 500);
  res.render("new.ejs");
});

app.post("/chats", async (req, res) => {
  let { from, msg, to } = req.body;

  let chat1 = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });

  /* chat1
    .save()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    }); */
  await chat1.save();
  res.redirect("/chats");
});

const handleValidationError = (err) => {
  console.log("this is validation error");
  console.dir(err.message);
  err.status = 400;
  return err;
};

app.use((err, req, res, next) => {
  console.error(err.name);
  if (err.name === "ValidationError") {
    err = handleValidationError(err);
  }
  next(err);
});
//------------------ asyncWrapper function to handle async errors
function asyncWrapper(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
}
// find chat by id
app.get(
  "/chats/:id",
  asyncWrapper(async (req, res) => {
    let { id } = req.params;

    // 1. Validate if the ID format is correct for MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ExpressError("Invalid Chat ID format", 400);
    }
    let chat = await Chat.findById(id);
    if (!chat) {
      throw new ExpressError("Chat not found", 404);
    }
    res.render("show.ejs", { chat });
  }),
);
//
//edit
//async error handling
app.get("/chats/:id/edit", async (req, res, next) => {
  let { id } = req.params;
  try {
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
  } catch (err) {
    // Intercept Mongoose CastError and convert to a 400 Bad Request
    if (err.name === "CastError") {
      return next(new ExpressError("Invalid Chat ID format", 400));
    }
    // Pass any other errors as they are
    next(err);
  }
});
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newmsg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newmsg.trim() }, // texarea add extra spaces that excides limits
    { runValidators: true, returnDocument: "after" },
  );
  console.log(updatedChat);

  res.redirect("/chats");
});
//delete
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
});

// ----------------error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || "Something went wrong");
});
//------------------listening ----------------

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
