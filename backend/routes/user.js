const express = require("express");
const router = express.Router();
const {user} = require('../db.js');

/** Routes for all user queries*/

//Checks if the requested username as password match.
router.get("/userInfo", (req, res) => {
  try{
    const {email, password} = req.query;
    console.log("Query params received:", { email, password });
    const rows = user.userInfo.all(email, password);
    console.log("Rows returned:", rows);
    res.json(rows);

  } catch (error) {
    res.status(500).json(`test ${error.message}`);
  }
})

//Adds a user to the database.
router.post("/addUser", (req, res) => {
  try{
    const {username, pass, email, dob} = req.body;
    const result = user.addUser.run(username, pass, email, dob);

    res.status(201).json({
      id: result.lastInsertRowid,
      username,
      pass,
      email,
      dob
    });
  } catch (error) {
    console.error("Insert failed", error);
    res.status(500);
  }
})
module.exports = router;
