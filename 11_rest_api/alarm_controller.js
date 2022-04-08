
// CREATE
const api_post_alarm = (req, res)=>{ // luodaan käsittelijä api_post_alarm
    console.log(req.body);
    res.send("asdf");
}

module.exports.api_post_alarm = api_post_alarm;