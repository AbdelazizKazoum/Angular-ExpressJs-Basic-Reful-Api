const express = require("express");
const Thing = require("../models/thing");
const stuffCntr = require("../controllers/stuffCntr");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

// Get things from database
router.get("/", authMiddleware, stuffCntr.getAllStuff);
// create new thing
router.post("/", authMiddleware, stuffCntr.createNew);
//update a thing in database
router.put("/:id", authMiddleware, stuffCntr.updateStuff);
//search for Thing
router.get("/:id", authMiddleware, stuffCntr.searchForStuff);
// Delete the thing from Database
router.delete("/:id", authMiddleware, stuffCntr.deleteStuff);

module.exports = router;
