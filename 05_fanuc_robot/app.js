const axios = require('axios');
const express = require('express'); // Import express library as dependency.
const PORT = process.env.PORT || 8081; // Open a selected port.
const regexp = 'Joint   [1-6]: *(-?.*)';
let app = express();

app.get("/robot/joint_values/", (req, res, next) => {
    axios.get('http://fanuc-robot-http-server.herokuapp.com').then(
        (jointAngles_res)=>{
            let joint_values = [];
            let matches = jointAngles_res.data.matchAll(regexp);
            let count = 0;
            for (const match of matches) {
                count++;
                if (count > 6) break;
                const value = parseFloat(match[1]);
                joint_values.push(value);
            }
            res.send([joint_values]);
        }
    );
});

app.listen(PORT); // Start the app.