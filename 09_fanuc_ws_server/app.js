// npm init
// npm installed express, socket.io and axios

const express = require("express");
const app = express();
const server = require("http").createServer(express); // create http server
const io = require("socket.io")(server);
const axios = require("axios");

const PORT = process.env.PORT || 3000;


const get_joint_values = ()=>{
    return axios
    .get('http://fanuc-robot-http-server.herokuapp.com')
    .then((robot_res)=>{
        const regexp = 'Joint   [1-6]: *(-?.*)';
        let joint_values = [];
        let matches = robot_res.data.matchAll(regexp);
        let count = 0;
        for (const match of matches) {
            count++;
            if (count > 6) break;
            const value = parseFloat(match[1]);
            joint_values.push(value);
        }
        return joint_values;
    });
}

const main_loop = ()=>{
    get_joint_values().then((joint_values)=>{
        console.log(joint_values);
        main_loop();
    });
}

main_loop(); // Call once. It calls itself after this one.

server.listen(PORT);
console.log("Listening port: " + PORT);