const express = require("express");
const router = express.Router();

const { getWelcomeMessage, askQuestion, getAllQuestions } = require("../controller/questionController");

router.post("/welcome_message", getWelcomeMessage);
router.post("/ask_question", askQuestion);
router.get("/all_questions", getAllQuestions);

module.exports = router;
