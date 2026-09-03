import mongoose from "mongoose";
import { Chat } from "./models/chat.js";

//-------------------Mongo connection ---------------------
/* main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });
 
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wathsapp");
} */

//-----------------------------insert many -----------

/* Chat.insertMany([
  {
    from: "Aryan Sahu",
    to: "Aryan Rai",
    msg: "Hey, did you finish the assignment?",
    created_at: new Date(),
  },
  {
    from: "Aryan Rai",
    to: "Aryan Sahu",
    msg: "Yeah, just sent it over email.",
    created_at: new Date(),
  },
  {
    from: "Aryan Mishra",
    to: "Aman Tiwari",
    msg: "Are we meeting today?",
    created_at: new Date(),
  },
  {
    from: "Aman Tiwari",
    to: "Aryan Mishra",
    msg: "Yes, at the usual coffee shop around 5.",
    created_at: new Date(),
  },
  {
    from: "Aryan Tiwari",
    to: "Aryan Sahu",
    msg: "Can you share the project repo link?",
    created_at: new Date(),
  },
  {
    from: "Aryan Sahu",
    to: "Aryan Tiwari",
    msg: "Sure, giving you access in a minute.",
    created_at: new Date(),
  },
  {
    from: "Aryan Rai",
    to: "Aman Tiwari",
    msg: "Happy Birthday buddy! 🎂",
    created_at: new Date(),
  },
  {
    from: "Aman Tiwari",
    to: "Aryan Rai",
    msg: "Thanks a lot bro!",
    created_at: new Date(),
  },
  {
    from: "Aryan Mishra",
    to: "Aryan Tiwari",
    msg: "Did you debug that Mongoose error?",
    created_at: new Date(),
  },
  {
    from: "Aryan Tiwari",
    to: "Aryan Mishra",
    msg: "Yes, it was just a capital M typo!",
    created_at: new Date(),
  },
])
  .then((res) => {
    console.log("Successfully inserted 10 chats:", res);
  })
  .catch((err) => {
    console.log("Error inserting chats:", err);
  });
 */
