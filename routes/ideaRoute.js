const express = require("express");
const { getAllIdea, createIdea } = require("../controllers/ideaController");
const { uploadToIpfs } = require("../helpers/ipfs");
const storeFiles = require("../helpers/web3Storage-test")
const multer = require("multer");

// set up multer
const storage = multer.memoryStorage();
// const uploadMiddleware = multer({ storage }).array('course_image', 'tutor_icon');
const uploadMiddleware = multer({ storage }).any();

const router = express.Router();

//Dashboard
router.get("/getAllIdea", getAllIdea);
router.post("/createIdea",uploadMiddleware,createIdea);

module.exports = router;