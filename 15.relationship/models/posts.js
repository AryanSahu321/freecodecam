// connect to mongoose db
const mongoose = require("mongoose");

main()
  .then(() => console.log("connected to DB"))
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

// one to many (trillions) relationship between user and posts

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
});

const postSchema = new mongoose.Schema({
  content: String,
  likes: Number,
  instaUser: { type: mongoose.Schema.Types.ObjectId, ref: "instaUser" },
});

const instaUser = mongoose.model("instaUser", userSchema);
const Post = mongoose.model("Post", postSchema);

const addUser = async () => {
  const instaUser1 = new instaUser({
    username: "Aryan",
    email: "aryan@example.com",
  });
  //const instaUser = await instaUser.findOne({ username: "Aryan" });

  let post = new Post({
    content: "bye bye Aryan",
    likes: 100,
  });
  post.instaUser = instaUser1;

  await post.save();
  await instaUser1.save();
  console.log(post);
  console.log(instaUser1);
};

//addUser();

async function clearDatabase() {
  try {
    // Delete all documents from both collections
    const userResult = await instaUser.deleteMany({});
    const postResult = await Post.deleteMany({});

    // Log the number of deleted documents
    console.log(`Deleted ${userResult.deletedCount} users.`);
    console.log(`Deleted ${postResult.deletedCount} posts.`);
  } catch (error) {
    console.error("Error clearing database:", error);
  }
}

//clearDatabase();

const showPost = async () => {
  const post = await Post.findOne({}).populate("instaUser", "username");
  console.log(post);
};

showPost();
