const express = require("express");
const router = express.Router();
const { createAnswer, getAllAnswers, getAnswerById } = require("../controller/answerController");

router.post("/create_Answer", createAnswer);
router.get("/answe/:answerid", getAnswerById);

module.exports = router;
