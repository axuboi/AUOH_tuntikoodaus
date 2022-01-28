const express = require("express"); // remember to npm install express
const app = express(); // create express object
const server = require("http").createServer(app);
const io = require("socket.io")(server); // remember to npm install socket.io

const PORT = process.env.port || 8081;

let connections = [];
let number_of_connections = 0;

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
    console.log(socket.id)
})

app.use(express.static("public"));

server.listen(PORT);