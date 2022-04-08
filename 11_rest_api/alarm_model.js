const mongoose = require("mongoose"); // otetaan mongoose kirjasto käyttöön

const schema = new mongoose.Schema( // luodaan uusi mongoose skeema ja määritellään sen malli
    {
        reason:{
            type: String,
            required: True
        },
        status:{
            type: String,
            required: True
        }
    }
);


module.exports = mongoose.model("alarm", schema); // exportataan model, jolla nimi ja skeema.