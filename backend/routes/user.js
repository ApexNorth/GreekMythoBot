const express = require("express");
const router = express.Router();
const {user} = require('../db.js');

router.get("/userInfo", (res, req) => {
  try{
    const rows = results.getUserInfo().all();
    res.json(rows);
  } catch (error) {
    res.status(500).json({error: "Can't get user info"})
  }
})
