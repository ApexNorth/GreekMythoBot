const express = require("express");
const router = express.Router();
const {gift} = require('../db.js');

/**Database Route connections for gifts*/

router.get("/gifts", (req, res) => {
  try{
    const rows = gift.gifts.all();
    console.log("Rows returned:", rows);
    res.json(rows);

  } catch (error) {
    res.status(500).json(`test ${error.message}`);
  }
})

router.get("/gift", (req, res) => {
  try{
    const {giftID} = req.query;
    console.log("Query params received:", {giftID});
    const rows = gift.gift.all(giftID);
    console.log("Rows returned:", rows);
    res.json(rows);

  } catch (error) {
    res.status(500).json(`test ${error.message}`);
  }
})

router.get("/giftGroups", (req, res) => {
  try{
    const rows = gift.giftGroups.all();
    console.log("Rows returned:", rows);
    res.json(rows);

  } catch (error) {
    res.status(500).json(`test ${error.message}`);
  }
})

router.get("/giftGroup", (req, res) => {
  try{
    const {groupID} = req.query;
    console.log("Query params received:", {groupID});
    const rows = gift.giftGroup.all(groupID);
    console.log("Rows returned:", rows);
    res.json(rows);

  } catch (error) {
    res.status(500).json(`test ${error.message}`);
  }
})

router.post("/addGift", (req, res) => {
  try {
    const { userID, giftID } = req.body;
    const result = gift.addGift.run(userID, giftID);

    return res.status(201).json({
      inserted: result.changes > 0,
      id: result.lastInsertRowid,
      userID,
      giftID
    });
  } catch (error) {
    console.error("Insert failed", error);
    return res.status(500).json({
      inserted: false,
      error: error.message
    });
  }
});

router.post("/deleteGift", (req, res) => {
  try {
    const { userID, giftID } = req.body;

    if (!userID || !giftID) {
      return res.status(400).json({
        deleted: false,
        error: "userID and giftID are required"
      });
    }

    const result = gift.removeGift.run(userID, giftID);
    const deleted = result.changes > 0;

    if (!deleted) {
      return res.status(404).json({
        deleted: false,
        error: "No matching gift row found to delete"
      });
    }

    return res.status(200).json({
      deleted: true,
      changes: result.changes,
      userID,
      giftID
    });
  } catch (error) {
    console.error("Delete failed:", error);
    return res.status(500).json({
      deleted: false,
      error: error.message
    });
  }
});

module.exports = router;
