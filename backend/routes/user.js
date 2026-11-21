const express = require("express");
const router = express.Router();
const {user} = require('../db.js');

router.get("/userInfo", (req, res) => {
  try{
    const {email, password} = req.query;
    console.log("Query params received:", { email, password });
    const rows = user.userInfo.all(email, password);
    console.log("Rows returned:", rows);
    res.json(rows);
    /*
    const {username, password} = req.query;
    const rows = user.getUserInfo(username, password);
    res.json(rows);
    */
  } catch (error) {
    res.status(500).json(`test ${error.message}`);
  }
})

router.post("/addUser", (req, res) => {
  try{
    const {username} = req.body;
    const result = user.addUser.run(username);

    res.status(201).json({
      id: result.lastInsertRowid,
      username
    });
  } catch (error) {
    console.error("Insert failed", error);
    res.status(500);
  }
})
module.exports = router;
