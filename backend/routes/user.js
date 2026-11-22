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
  try {
    const { username, pass, email, dob } = req.body;
    const result = user.addUser.run(username, pass, email, dob);

    return res.status(201).json({
      inserted: result.changes > 0,
      id: result.lastInsertRowid,
      username,
      email,
      dob
    });
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(409).json({
        inserted: false,
        error: "Duplicate entry: unique constraint violated"
      });
    }

    console.error("Insert failed", error);
    return res.status(500).json({
      inserted: false,
      error: error.message
    });
  }
});
module.exports = router;
