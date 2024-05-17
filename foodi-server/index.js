const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
const jwt = require('jsonwebtoken');

// middleware
app.use(cors());
app.use(express.json());
// ----------------------------------------------------------
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@food-delivery.xn1v8dw.mongodb.net/?retryWrites=true&w=majority&appName=food-delivery`
  )
  .then(console.log("Mongodb connected successfully!"))
  .catch((error) => console.log("Error connecting to MongoDB: " + error));

// jwt authentication

// jwt related api
app.post("/jwt", async (req, res) => {
  const user = req.body;
  // console.log(user)
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  res.send({ token });
});

// import routes
const menuRoutes = require("./api/routes/menuRoutes");
const cartsRoutes = require("./api/routes/cartRoutes");
const usersRoutes = require("./api/routes/userRoutes");
const paymentRoutes = require("./api/routes/paymentRoutes");
const adminStats =  require('./api/routes/adminStats');
 const orderStats = require('./api/routes/orderStats')
app.use("/menu", menuRoutes);
app.use("/carts", cartsRoutes);
app.use("/users", usersRoutes);
app.use("/payments", paymentRoutes);
app.use('/admin-stats', adminStats);
app.use('/order-stats', orderStats);


// payment methods routes
const verifyToken = require('./api/middlewares/verifyToken')

app.post("/create-payment-intent",verifyToken, async (req, res) => {
  const { price } = req.body;
  const amount = price*100;
  // console.log(amount);

  // Create a PaymentIntent 
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "inr",
    payment_method_types: ["card"],
    description: "Foodi payment",
  });

  const customer = await stripe.customers.create({
    name: 'Jenny Rosen',
    address: {
      line1: '510 Townsend St',
      postal_code: '560001',
      city: 'San Francisco',
      state: 'KA',
      country: 'IND',
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    customer: customer,
  });
});

app.get("/", (req, res) => {
  res.send("Foodi Server is Running!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
