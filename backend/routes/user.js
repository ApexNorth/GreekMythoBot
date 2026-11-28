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
    const { username, pass, email, dob, date } = req.body;
    const result = user.addUser.run(username, pass, email, dob, date);

    return res.status(201).json({
      inserted: result.changes > 0,
      id: result.lastInsertRowid,
      username,
      email,
      dob,
      date
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

router.post("/changeUsername", (req, res) => {
  try {
    const { newUsername, userID, password } = req.body;

    if (!newUsername || !userID || !password) {
      return res.status(400).json({
        updated: false,
        error: "newUsername, userID, and password are required"
      });
    }

    const result = user.changeUsername.run(newUsername, userID, password);
    const updated = result.changes > 0;

    if (!updated) {
      return res.status(404).json({
        updated: false,
        error: "No user matched that userID and password"
      });
    }

    return res.status(200).json({
      updated: true,
      newUsername,
      userID
    });
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(409).json({
        updated: false,
        error: "That username is already taken"
      });
    }

    console.error("Update failed:", error);
    return res.status(500).json({
      updated: false,
      error: error.message
    });
  }
});

router.post("/changeEmail", (req, res) => {
  try {
    const { newEmail, userID, password } = req.body;

    if (!newEmail || !userID || !password) {
      return res.status(400).json({
        updated: false,
        error: "newEmail, userID, and password are required"
      });
    }

    const result = user.changeEmail.run(newEmail, userID, password);
    const updated = result.changes > 0;

    if (!updated) {
      return res.status(404).json({
        updated: false,
        error: "No user matched that userID and password"
      });
    }

    return res.status(200).json({
      updated: true,
      newEmail,
      userID
    });
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(409).json({
        updated: false,
        error: "That email is already taken"
      });
    }

    console.error("Update failed:", error);
    return res.status(500).json({
      updated: false,
      error: error.message
    });
  }
});

router.post("/changePassword", (req, res) => {
  try {
    const { newPassword, userID, password } = req.body;

    if (!newPassword || !userID || !password) {
      return res.status(400).json({
        updated: false,
        error: "newPassword, userID, and password are required"
      });
    }

    const result = user.changePassword.run(newPassword, userID, password);
    const updated = result.changes > 0;

    if (!updated) {
      return res.status(404).json({
        updated: false,
        error: "No user matched that userID and password"
      });
    }

    return res.status(200).json({
      updated: true,
      userID
    });
  } catch (error) {

    console.error("Update failed:", error);
    return res.status(500).json({
      updated: false,
      error: error.message
    });
  }
});

router.post("/changeAvatar", (req, res) => {
  try {
    const { avatar, userID } = req.body;

    const result = user.changeAvatar.run(avatar, userID);
    const updated = result.changes > 0;

    if (!updated) {
      return res.status(404).json({
        updated: false,
        error: "No user matched that userID"
      });
    }

    return res.status(200).json({
      updated: true,
      userID,
      avatar
    });
  } catch (error) {

    console.error("Update failed:", error);
    return res.status(500).json({
      updated: false,
      error: error.message
    });
  }
});

module.exports = router;
