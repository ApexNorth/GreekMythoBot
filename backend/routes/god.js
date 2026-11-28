const express = require("express");
const router = express.Router();
const {god} = require('../db.js');


/**Database Route connections for the gods*/

router.get("/godNames", (req, res) => {
  try{
    const rows = god.godNames.all();
    console.log("Rows returned:", rows);
    res.json(rows);

  } catch (error) {
    res.status(500).json(`test ${error.message}`);
  }
})

router.get("/godInfo", (req, res) => {
  try{
    const rows = god.godInfo.all();
    console.log("Rows returned:", rows);
    res.json(rows);

  } catch (error) {
    res.status(500).json(`test ${error.message}`);
  }
})

router.get("/getGod", (req, res) => {
  try{
    const {godID} = req.query;
    console.log("Query params received:", {godID});
    const rows = god.getGod.all(godID);
    console.log("Rows returned:", rows);
    res.json(rows);

  } catch (error) {
    res.status(500).json(`test ${error.message}`);
  }
})

module.exports = router;
