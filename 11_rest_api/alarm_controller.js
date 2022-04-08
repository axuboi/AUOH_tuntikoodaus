const alarm_model = require("./alarm_model");

// CREATE
const api_post_alarm = (req, res)=>{ // luodaan käsittelijä api_post_alarm
    let model = alarm_model(req.body);
    model
        .save()
        .then((model)=>{
            res.send(model);
        })
        .catch((err)=>{ // virheenkäsittelijä
            res.status(500);
            res.send(err.message);
        });
}

module.exports.api_post_alarm = api_post_alarm;