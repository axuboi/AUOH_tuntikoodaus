// npm init
// npm install express
// npm install mongoose

const express = require("express"); // otetaan express käyttöön
const mongoose = require("mongoose"); // otetaan mongoose käyttöön
const alarm_controller = require("./alarm_controller"); // otetaan alarm_controller.js käyttöön
const body_parser = require("body-parser"); // otetaan body parser käyttöön
const PORT = process.env.PORT | 8080; // määrätään portti

const app = express();
app.use(body_parser.json()); // käsketään apin käyttää body-parserin json-formaattia

// CRUD
app.post("/api/alarm", alarm_controller.api_post_alarm); // create a alarm
app.get("/api/alarms", alarm_controller.api_get_alarms); // get all alarms
app.get("/api/alarm/:id", alarm_controller.api_get_alarm); // get alarm by id
app.put("/api/alarm/:id", alarm_controller.api_put_alarm); // update alarm

const db_uri = "mongodb+srv://db_user:nUIuj38QIhBoC4ku@cluster0.okfky.mongodb.net/alarm_db?retryWrites=true&w=majority"; // https://cloud.mongodb.com/v2/62502034c269cb499a563e7d#clusters
mongoose.connect(db_uri, {}).then(()=>{ // otetaan yhteys MongoDB tietokantaan
    console.log("Connected to MongoDB"); // yhdistetään ensin tietokantaan

    console.log("Listening to port: " + PORT);
    app.listen(PORT); // tietokantaan yhdistämisen jälkeen sovellus voi ottaa vastaan kyselyitä
});

// Testaus: 
// Postman 
// -> HTTP request 
// -> "localhost:8080/api/alarm" 
// -> body 
// -> raw 
// -> json
// {
//    "reason" : "Door is open",
//    "status" : "Active"
// }