const express = require("express");
const Thing = require("../models/thing");
const stuffCntr = require("../controllers/stuffCntr");

const router = express.Router();

// Get things from database
router.get("/", stuffCntr.getAllStuff);
// create new thing
router.post("/", stuffCntr.createNew);
//update a thing in database
router.put("/:id", stuffCntr.updateStuff);
//search for Thing
router.get("/:id", stuffCntr.searchForStuff);
// Delete the thing from Database
router.delete("/:id", stuffCntr.deleteStuff);

module.exports = router;
