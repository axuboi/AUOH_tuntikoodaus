const alarm_model = require("./alarm_model");

// CREATE
const api_post_alarm = (req, res) => { // luodaan käsittelijä api_post_alarm
    let model = alarm_model(req.body);
    model
        .save()
        .then((model) => {
            res.send(model);
        })
        .catch((err) => { // virheenkäsittelijä
            res.status(500);
            res.send(err.message);
        });
};

// READ (all alarms)
const api_get_alarms = (req, res) => {
    alarm_model
    .find({}) // tyhjä objekti filtterinä palauttaa kaikki
    .then((alarms) => {
        res.send(alarms);
    });
};

// READ (one alarm)
const api_get_alarm = (req, res) => {
    const id = req.params.id;
    alarm_model
    .findById(id)
    .then((alarm) => {
        res.send(alarm);
    }).catch(() => {
        res.status(404);
        res.send("ID not found");
    });
};

// UPDATE
const api_put_alarm = (req, res) => {
    const id = req.params.id;
    alarm_model
    .findByIdAndUpdate(id, req.body)
    .then((alarm) => {
        res.send(alarm);
    });
};

// DELETE
const api_delete_alarm = (req, res) => {
    const id = req.params.id;
    alarm_model
    .findByIdAndDelete(id)
    .then((alarm) => {
        res.send(alarm);
    })
};

module.exports.api_post_alarm = api_post_alarm;
module.exports.api_get_alarms = api_get_alarms;
module.exports.api_get_alarm = api_get_alarm;
module.exports.api_put_alarm = api_get_alarm;
module.exports.api_delete_alarm = api_delete_alarm;