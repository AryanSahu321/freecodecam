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

// one to many (n*1000) relationship between customer and order

const orderSchema = new mongoose.Schema({
  item: String,
  price: Number,
});
const Order = mongoose.model("Order", orderSchema);

const customerSchema = new mongoose.Schema({
  name: String,
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});
//-- mongoose middleware to delete the orders associated with that customer when the customer is deleted.
// before customer compilation
customerSchema.pre("findOneAndDelete", async function () {
  console.log("pre middleware triggered");
});

customerSchema.post("findOneAndDelete", async function (customer) {
  if (customer && customer.orders && customer.orders.length) {
    let res = await Order.deleteMany({ _id: { $in: customer.orders } });
    console.log(res);
  }
});

// 3. Compile the model LAST

const Customer = mongoose.model("Customer", customerSchema);

const addCustomer = async () => {
  const customer = new Customer({
    name: "Aryan",
  });

  let order1 = await Order.findOne({ item: "Samosa" });
  let order2 = await Order.findOne({ item: "Pizza" });
  customer.orders.push(order1);
  customer.orders.push(order2);
  let result = await customer.save();
  console.log(result);
};

const addOrders = async () => {
  let result = await Order.insertMany([
    { item: "Samosa", price: 100 },
    { item: "Pizza", price: 150 },
    { item: "Burger", price: 120 },
  ]);
  console.log(result);
};

//addOrders();
//addCustomer();

// populate means add oders in place of order ids in customer document.

const showCustomer = async () => {
  const customer = await Customer.findOne({ name: "Aryan" }).populate("orders");
  console.log(customer);
};

//showCustomer();

const showAllCustomers = async () => {
  try {
    // find({}) matches all documents in the collection
    const allCustomers = await Customer.find({}).populate("orders");
    console.log(JSON.stringify(allCustomers, null, 2));
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
};

const addCust = async () => {
  let newCust = new Customer({
    name: "Karan Arjun",
  });

  let newOrder = new Order({
    item: "Pizza",
    price: 250,
  });

  newCust.orders.push(newOrder);

  await newOrder.save();
  await newCust.save();
  console.log("Customer and Order added successfully");
};

//addCust();

// deleting  customer with findByIdAndDelete
// will not delete the orders associated with that customer.

const deleteCust = async () => {
  let customerId = "6a982f17c78178f5264fc416"; // Replace with the actual customer ID you want to delete
  let data = await Customer.findByIdAndDelete(customerId);
  //let data = await Customer.deleteMany({ name: "Karan Arjun" });

  console.log(data);
};

//deleteCust();

const deleteOrder = async () => {
  //let orderId = "64a7e3f0c1b8f5d2e4a1b2c4";
  //let data = await Order.findByIdAndDelete(orderId);
  //let data = await  Order.deleteMany({ item: "Pizza", price: 250 });
  console.log(data);
};
//deleteOrder();

// -- functions
//addCustomer();
//addOrders();
//showCustomer();
//addCust();
//deleteCust();
//deleteOrder();
//showAllCustomers();
