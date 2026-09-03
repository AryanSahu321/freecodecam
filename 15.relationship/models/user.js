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

// one to many (few) relationship between user and address

const userSchema = new mongoose.Schema({
  username: String,
  address: [{ _id: false, location: String, city: String }],
});

const User = mongoose.model("User", userSchema);

const addUsers = async () => {
  const user = new User({
    username: "Aryan",
    address: [
      {
        location: "123 Main St",
        city: "New York",
      },
    ],
  });
  user.address.push({
    location: "456 Elm St",
    city: "Los Angeles",
  });
  let result = await user.save();
  console.log(result);
};

addUsers();
