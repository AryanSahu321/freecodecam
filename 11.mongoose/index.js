import mongoose from "mongoose";
const { Schema } = mongoose;

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

const userSchema = new Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model("User", userSchema);
//-----------------Schema Validation ----
// in books.js
//-----------------Delete---------------
//
/* User.deleteOne({ name: "Aryan Tiwari" })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  }); */

/* User.deleteMany({ age: 23 })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  }); */

/* User.findByIdAndDelete("6a8cd5b13f2a2ebc86b1224b")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  }); */

/* User.findOneAndDelete({ name: "Aryan Mishra" })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  }); */
//----------------Update----------------
/* User.updateOne({ name: "Aryan Tiwari" }, { age: 24 })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
 */

/* User.updateMany({ age: { $gt: 22 } }, { age: 23 })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  }); */

/* User.findOneAndUpdate({ name: "Aryan Tiwari" }, { age: 21 }, { new: true })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  }); */

/* User.findByIdAndUpdate("6a8cdc4b0b911bb3c1547054", { age: 22 }, { new: true })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  }); */
//----------------find-------------------
//
/* User.findById("6a8cdc4b0b911bb3c1547055")
  .then((res) => {
    console.log(res.name);
  })
  .catch((err) => {
    console.log(err);
  }); */

/* User.findOne({ age: { $gt: 22 } })
  .then((res) => {
    console.log(res.name);
  })
  .catch((err) => {
    console.log(err);
  });
 */
/* User.find({ age: { $gt: 22 } })
  .then((res) => {
    console.log(res[0].name);
  })
  .catch((err) => {
    console.log(err);
  });
 */

//--------------------insert----------------
//
/* User.insertMany([
  { name: "Aryan Mishra", email: "Mishra@gmail.com", age: 21 },
  { name: "Aryan Tiwari", email: "Tiwari@gmail.com", age: 23 },
  { name: "Aman Tiwari", email: "Aman@gmail.com", age: 24 },
])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  }); */

/* const user2 = new User({ name: "Aryan Rai", email: "rai@gmail.com", age: 22 });

user2
  .save()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
 */
