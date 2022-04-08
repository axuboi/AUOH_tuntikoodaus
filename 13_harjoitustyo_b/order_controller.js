const order_model = require("./order_model"); // Add order_model from order_model.js.

let update = false;
let connections = [];
let number_of_connections = 0;

// CREATE
const api_post_order = (req, res) => {
    let order = order_model(req.body);
    order
        .save()
        .then((order) => {
            console.log("Order created succesfully.");
            res.send(order);
        })
        .catch((err) => { // Catch any errors.
            console.log("500: Could not create order " + id + ". " + err.message);
            res.status(500); // Give internal error.
            res.send(err.message);
        });
};

// READ (all orders)
const api_get_orders = (req, res) => {
    order_model
    .find({}) // Empty object as a filter will return all orders.
    .then((orders) => {
        console.log("Orders listed succesfully.");
        res.send(orders);
    }).catch((err) => {
        console.log("500: Could not find orders. " + err.message);
        res.status(500); // Give internal error.
        res.send(err.message);
    });
};

// READ (one order)
const api_get_order = (req, res) => {
    const id = req.params.id;
    order_model
    .findById(id)
    .then((order) => {
        console.log("Order {" + id + "} listed succesfully.");
        res.send(order);
        update = true;
    }).catch((err) => {
        console.log("500: Could not find order " + id + ". " + err.message);
        res.status(500); // Give internal error.
        res.send(err.message);
    });
};

// UPDATE
const api_put_order = (req, res) => {
    const id = req.params.id;
    order_model
    .findByIdAndUpdate(id, req.body)
    .then((order) => {
        console.log("Order {" + id + "} updated succesfully.");
        res.send(order);
    }).catch((err) => {
        console.log("500: Could not update order " + id + ". " + err.message);
        res.status(500); // Give internal error.
        res.send(err.message);
    });
};

// DELETE
const api_delete_order = (req, res) => {
    const id = req.params.id;
    order_model
    .findByIdAndDelete(id)
    .then((order) => {
        console.log("Order {" + id + "} deleted succesfully.");
        res.send(order);
    }).catch((err) => {
        console.log("500: Could not delete order " + id + ". " + err.message);
        res.status(500); // Give internal error.
        res.send(err.message);
    });
};

// Export created CRUD commands for app.js to use.
module.exports.api_post_order = api_post_order;
module.exports.api_get_orders = api_get_orders;
module.exports.api_get_order = api_get_order;
module.exports.api_put_order = api_put_order;
module.exports.api_delete_order = api_delete_order;

if (update = true) {

    update = false;
}

const broadcast_message = (message)=>{
    for(let id in connections){
        const socket = connections[id];
        socket.emit("server-to-client", message);
    }
}

// handle the web socket
io.on("connection", (socket)=>{
    connections[socket.id] = socket;
    number_of_connections++;

    console.log("Client connected. Number of connections: ", number_of_connections);
    socket.on("disconnect", (socket)=>{
        delete connections[socket.id];
        number_of_connections--;
        console.log("Client disconnected. Number of connections: ", number_of_connections); 
    });
    
    socket.on("client-to-server", (message)=>{
        broadcast_message(message);
        console.log(message);
        console.log("tää on client to server");
    })
})