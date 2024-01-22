const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../db/dbConfig");

const { v4: uuidv4 } = require("uuid");

// return uuidv4();
// function generateUniqueQuestionId() {
// }

async function getWelcomeMessage(req, res) {
  try {
    const { username } = req;

    return res.status(StatusCodes.OK).json({ msg: `Welcome, ${username}! ` });
  } catch (error) {
    console.error(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, try again later" });
  }
}

async function getAllQuestions(req, res) {
  try {
    const [questionid] = await dbConnection.query(
      `SELECT questions.*, users.username FROM questions JOIN users ON questions.userid = users.userid`
    );
    return res.status(200).send(questionid);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "something went wrong,try again later!" });
  }
}

async function askQuestion(req, res) {
  req.body.questionid = uuidv4();
  // const questionid = generateUniqueQuestionId();

  const { questionid, title, description, tag, userid } = req.body;
  console.log(req.body);
  if (!title || !description) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Title And Description Are Required" });
  }

  try {
    await dbConnection.query("INSERT INTO questions (questionid, title, description, tag, userid) VALUES (?,?,?,?,?)", [
      questionid,
      title,
      description,
      tag,
      userid,
    ]);

    return res.status(StatusCodes.OK).json({ msg: "Success" });
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, try again later" });
  }
}

module.exports = { getWelcomeMessage, askQuestion, getAllQuestions };
