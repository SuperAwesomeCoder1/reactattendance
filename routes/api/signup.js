require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

router.post("/createUser", async (req, res) => {
  token = await checkToken(req.body.token);
  user = req.body.user;
  if (!token) {
    res.end({ success: "false", err: "Token is undefined", errno: "0" });
  } else {
    user.slack_ID = token;
    //console.log(user);
    User.findOne({ slack_ID: user.slack_ID }).then(check => {
      if (check !== null) {
        console.log("Slack in Use");
        res.end(
          JSON.stringify({ success: "false", err: "Slack in Use", errno: "1" })
        );
      } else {
        const newUser = new User(user);
        newUser.save().then(userinfo => {
          console.log(userinfo);
        });
      }
    });
  }
});

async function checkToken(token) {
  return await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err === null) {
      return decoded.id;
    } else {
      return false;
    }
  });
}

module.exports = router;
