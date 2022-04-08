// npm init
// npm install express
// npm install mongoose

const express = require("express"); // otetaan express käyttöön
const mongoose = require("mongoose"); // otetaan mongoose käyttöön
const alarm_controller = require("./alarm_controller"); // otetaan alarm_controller.js käyttöön
const body_parser = require("body-parser"); // otetaan body parser käyttöön
const PORT = process.env.PORT | 8080;

const app = express();
app.use(body_parser.json()); // käsketään apin käyttää body-parserin json-formaattia

// CREATE
app.post("/api/alarm", alarm_controller.api_post_alarm);

app.listen(PORT);