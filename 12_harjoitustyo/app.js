// 1. npm init
// 2. npm install express
// 3. npm install mongoose

const express = require("express"); // Add express library.
const mongoose = require("mongoose"); // Add mongoose library.
const order_controller = require("./order_controller.js"); // Add order_controller.js to use.
const body_parser = require("body-parser"); // Add body parser to use.
const PORT = process.env.PORT | 8081; // Define port.

const app = express();
app.use(body_parser.json()); // App shall use body-parser's JSON format.

// CRUD commands defined in order_controller.js.
// These can be used via POSTMAN.
app.post("/api/order", order_controller.api_post_order); // Create a order with machining parameters.
app.get("/api/orders", order_controller.api_get_orders); // Get all orders.
app.get("/api/order/:id", order_controller.api_get_order); // Get one order by id.
app.put("/api/order/:id", order_controller.api_put_order); // Update a order.
app.delete("/api/order/:id", order_controller.api_delete_order); // Delete a order.

const db_uri = "mongodb+srv://db_user_01:CKa6e2mo6Kxsm99x@cluster0.znacf.mongodb.net/machining_order_database?retryWrites=true&w=majority";
mongoose.connect(db_uri, {}).then(()=>{ // Create a connection to given MongoDB database.
    console.log("Connected to machining_order_database");
    console.log("Listening to port: " + PORT);
    app.listen(PORT); // App may receive requests only after connection creation.
});
