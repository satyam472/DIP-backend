const express = require("express");
const { getAllIdea, createIdea } = require("../controllers/ideaController");


const router = express.Router();

//Dashboard
router.get("/getAllIdea", getAllIdea);
router.post("/createIdea",createIdea);

module.exports = router;