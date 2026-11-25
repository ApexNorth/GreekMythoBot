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

module.exports = router;
