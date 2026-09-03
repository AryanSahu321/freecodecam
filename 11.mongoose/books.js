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
  await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}

//-----------------Schema Validation --------

const booksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
    min: [1, "price is to low"], // custom error message
  },
  category: {
    type: String,
    enum: ["fition", "non-fiction"],
  },
  genre: [String],
});

const Book = mongoose.model("Book", booksSchema);

/* Book.findByIdAndUpdate(
  "6a8cf2c6c450de39c46a02de",
  { price: 0 },
  { new: true, runValidators: true },
)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err.errors.price.properties.message);
  }); */

/* const book1 = new Book({
  title: "The jungle Book",
  author: "Ruskin Bond",
  price: 1000,
  category: "fition",
  genre: ["comic", "jungle"],
});

book1
  .save()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err._message);
  });
 */
