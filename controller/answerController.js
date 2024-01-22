const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../db/dbConfig");
const { v4: uuidv4 } = require("uuid");

// Fetch all answers
async function getAllAnswers(req, res) {
  //   try {
  //     const results = await dbConnection.query(`
  //       SELECT answers.answerid, answers.userid, answers.questionid, answers.answer, users.username
  //       FROM answers
  //       JOIN users ON answers.userid = users.userid
  //     `);
  //     return res.status(StatusCodes.OK).json({ answers: results[0] });
  //   } catch (error) {
  //     console.error(error.message);
  //     return res
  //       .status(StatusCodes.INTERNAL_SERVER_ERROR)
  //       .json({ msg: 'Something went wrong, try again later' });
  //   }
}

// Fetch a single answer by answerid
async function getAnswerById(req, res) {
  // const {questionid} = req.params.questionid;

  try {
    const [answers] = await dbConnection.query(
      "SELECT answers.answer,answers.userid,users.username,questions.questionid FROM answers JOIN users ON answers.userid = users.userid JOIN questions ON answers.questionid = questions.questionid"
    );
    console.log(answers);

    if (answers.length > 0) {
      return res.status(StatusCodes.OK).send(answers);
    } else {
      // Optionally, you might want to return a 404 if no answers are found
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "No answers found for the specified question." });
    }
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, please try again later!" });
  }
}

async function createAnswer(req, res) {
  const { userid, answer, questionid } = req.body;
  console.log(req.body);

  if (!answer) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "please Write your Answer first" });
  }

  try {
    await dbConnection.query("INSERT INTO answers(userid,questionid,answer) VALUES (?,?,?)", [userid, questionid, answer]);
    return res.status(StatusCodes.CREATED).json({ msg: "Your Answer Posted!" });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, please try again later!" });
  }
}

module.exports = { getAllAnswers, getAnswerById, createAnswer };
