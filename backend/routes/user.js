const express = require("express");
const router = express.Router();
const {user} = require('../db.js');

/** Routes for all user queries*/

router.get("/userEmail", (req, res) => {
  try{
    const {email} = req.query;
    const rows = user.userEmail.all(email);
    res.json(rows);
  } catch (error) {
    res.status(500).json(`Error ${error.message}`);
  }
})

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

router.get("/userRelationship", (req, res) => {
  try{
    const {userID, godID} = req.query;
    console.log("Query params received:", { userID, godID });
    const rows = user.userRelationship.all(userID, godID);
    console.log("Rows returned:", rows);
    res.json(rows);

  } catch (error) {
    res.status(500).json(`test ${error.message}`);
  }
})

router.get("/userRelationships", (req, res) => {
  try{
    const {userID} = req.query;
    console.log("Query params received:", { userID});
    const rows = user.userRelationships.all(userID);
    console.log("Rows returned:", rows);
    res.json(rows);

  } catch (error) {
    res.status(500).json(`test ${error.message}`);
  }
})

router.get("/userProfile", (req, res) => {
  try{
    const {userID} = req.query;
    console.log("Query params received:", { userID});
    const rows = user.userProfile.all(userID);
    console.log("Rows returned:", rows);
    res.json(rows);

  } catch (error) {
    res.status(500).json(`test ${error.message}`);
  }
})

router.get("/userHistory", (req, res) => {
  try{
    const {userID, godID} = req.query;
    console.log("Query params received:", { userID, godID});
    const rows = user.userHistory.all(userID, godID);
    console.log("Rows returned:", rows);
    res.json(rows);

  } catch (error) {
    res.status(500).json(`test ${error.message}`);
  }
})

router.post("/addMessage", (req, res) => {
  try {
    const { sender, message, timestamp, userID, godID } = req.body;
    const result = user.addMessage.run(sender, message, timestamp, userID, godID);

    return res.status(201).json({
      inserted: result.changes > 0,
      id: result.lastInsertRowid,
      sender,
      message,
      timestamp,
      userID,
      godID
    });

  } catch (error) {
    console.error("Insert failed", error);
    return res.status(500).json({
      inserted: false,
      error: error.message
    });
  }
});

module.exports = router;
