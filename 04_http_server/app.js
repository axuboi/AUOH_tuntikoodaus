const axios = require('axios');
const express = require('express'); // Import express library as dependency.
const PORT = process.env.PORT || 8081; // Open a selected port.
let app = express();


app.get("/users/active/count", (req, res, next) => {
    axios.get('https://gorest.co.in/public/v1/users').then(
        (users_res)=>{
            let count = 0;
            users_res.data.data.forEach((user)=>{
                if(user.status == "active"){
                    count++;
                }
            });
            res.send({count});
        }
    );
});

app.listen(PORT); // Start the app.